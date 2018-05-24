var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'jest-matcher-redux-saga.min.js',
        libraryTarget: 'umd'
    },
    externals: {
        'jest-diff': {
            commonjs: 'jest-diff',
            commonjs2: 'jest-diff'
        }
    }
};
