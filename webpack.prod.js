const baseConfig = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = Object.assign({}, baseConfig, {
    plugins: [
        new UglifyJsPlugin()
    ],
    mode: 'production',
});

module.exports = config;
