var path = require('path');
var webpack = require('webpack');
require("dotenv").config();

const getEnvironmentVariables = () => {
    const keys = Object.keys(process.env);
    const envs = {};
    keys
        .filter(key => /^REACT_APP/.test(key))
        .forEach(key => envs[key] = JSON.stringify(process.env[key]) );

    return envs;
};

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname),
        filename: 'app.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    stats: {
        colors: true
    },
    plugins: [
        new webpack.DefinePlugin(getEnvironmentVariables())
    ],
};