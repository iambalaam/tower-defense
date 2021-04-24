const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = resolve(__dirname, 'dist');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: BUILD_DIR
    },
    devServer: {
        contentBase: BUILD_DIR,
        port: 3000
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Tower Defense'
    })]
};