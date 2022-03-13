import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Layout, Button, Banner, Toast, Stack, Frame } from '@shopify/polaris';

import { Context } from '@shopify/app-bridge-react';
// GraphQL mutation that updates the prices of products
const ADD_VARIANT = gql`
mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) {
    product {
      title
    }
    userErrors {
      field
      message
    }
  }
}
`;

// do something with the returned data

class ApplyTicketTracker extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);

  }

  render() {
    return ( // Uses mutation's input to update product prices
      <Mutation mutation={ADD_VARIANT}>
        {(handleSubmit, { error, data }) => {
          const [hasResults, setHasResults] = useState(false);

          const showError = error && (
            <Banner status="critical">{error.message}</Banner>
          );

          const showToast = hasResults && (
            <Toast
              content="Successfully updated"
              onDismiss={() => setHasResults(false)}
            />
          );

          return (
            <Frame>
              {showToast}
              <Layout.Section>
                {showError}
              </Layout.Section>

              <Layout.Section>
                <Stack distribution={"center"}>
                  <Button
                    primary
                    textAlign={"center"}
                    onClick={() => {
                      let promise = new Promise((resolve) => resolve());
                      for (const itemId in this.props.selectedItems) {

                        const productVariableInput = {
                   
                            "id": `${itemId}`,
                            "images": [],
                            "metafields": [],
                          
                            "privateMetafields": [],
                            "productPublications": [],
                           
                          
                    
                            
                            "variants": {
                           
                            
                              "metafields": {
                                "description": "Vote Amount",
                             
                                "key": "vote_amount_20",
                                "namespace": "ticket-tracker-ns",
                             
                                "value": "20"
                              },
                            
                              "privateMetafields": [],
                              "productId": `${itemId}`,
                            
                            },
                       
                          
                        }
                        
                        ;
                        promise = promise.then(() => handleSubmit({ variables: { input: productVariableInput } }));
                      }

                      if (promise) {
                        promise.then(() => this.props.onUpdate().then(() => setHasResults(true)));
                      }

                    }
                    }
                  >
                    Apply Ticket Tracking
                  </Button>
                </Stack>
              </Layout.Section>
            </Frame>
          );
        }}
      </Mutation>
    );
  }
}

export default ApplyTicketTracker