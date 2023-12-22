const path = require('path');
const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AwesomePlugin = require('./child-plugin');


module.exports = {
    mode: 'production',
    entry: './src/index.js',
    // outputFileName: {
    //     filename: 'main.js',
    //     path: path.resolve(__dirname, 'dist'),
    //     crossOriginLoading: "anonymous",
    // },
    plugins: [
        new HtmlWebpackPlugin({inject: true }),
        new SubresourceIntegrityPlugin({ hash: true, filename: "index.html", }),
        new AwesomePlugin(),
    ],
}
