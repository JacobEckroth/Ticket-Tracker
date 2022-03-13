import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Heading, Page, TextStyle, Layout, EmptyState } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import ResourceListWithProducts from './components/ResourceList';
import store from 'store-js'

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
// Sets the state for the resource picker
class Index extends React.Component {
  state = { open: false };
  render() {

    const emptyState = !store.get('ids')
    return (
      <Page>
        <TitleBar
          primaryAction={{
            content: 'Select products',
            onAction: () => this.setState({ open: true }),
          }}
        />
        <ResourcePicker // Resource picker component
          resourceType="Product"
          showVariants={false}
          open={this.state.open}
          onSelection={(resources) => this.handleSelection(resources)}
          onCancel={() => this.setState({ open: false })}
        />
        {emptyState ?
          (<Layout>
            <EmptyState
              heading="Add Ticket Trackers to Items"
              action={{
                content: 'Select products',
                onAction: () => this.setState({ open: true }),
              }}
              image={img}
            >
              <p>Select products to add ticket trackers to</p>
            </EmptyState>
          </Layout>) : (
            <ResourceListWithProducts />
          )
        }

      </Page>
    );
  }
  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false });
    store.set('ids',idsFromResources)
  };
}
export default Index