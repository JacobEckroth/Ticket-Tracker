const webpack = require("webpack");
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);

module.exports = {

    webpack: (config, { isServer }) => {

        const env = { API_KEY: apiKey };
        config.plugins.push(new webpack.DefinePlugin(env));
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        // Add ESM support for .mjs files in webpack 4
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto",
        });

        return config;
    },
};