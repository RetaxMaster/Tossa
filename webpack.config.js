const path = require('path');

module.exports = {
    entry: './src/public/js/input/problems.js',
    output: {
        filename: 'problems.js',
        path: path.join(__dirname, 'src/public/js/output/')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    mode: "development"
};