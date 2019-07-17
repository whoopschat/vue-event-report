const path = require('path');
const rules = require('./webpack.rules.js');

const outputPath = path.resolve('./lib');

const entry = {
    'index': path.resolve('./src/index.js'),
}

const config = {
    entry: entry,
    output: {
        path: outputPath,
        filename: '[name].js',
        libraryTarget: 'umd',
    },
    externals: {
    },
    module: {
        rules,
    },
    plugins: [],
    mode: 'development',
};

module.exports = config;
