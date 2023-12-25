const path = require('path');
const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');
const AwesomePlugin = require('./child-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    plugins: [
        new SubresourceIntegrityPlugin(),
        new AwesomePlugin(),
        (compiler) => {
            compiler.hooks.done.tap('OutputIntegrity', (stats) => {
              const json = stats.toJson();
              for (const asset of json.assets) {
                  console.log(asset.name, asset.integrity);
              }
            });
          }
    ],
}
