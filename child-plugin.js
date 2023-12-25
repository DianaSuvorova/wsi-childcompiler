
const JsonpTemplatePlugin = require('webpack/lib/web/JsonpTemplatePlugin');
const path = require('path');
const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');
const EntryOptionPlugin = require('webpack/lib/EntryOptionPlugin');
const webpack = require('webpack');

class AwesomePlugin {
    constructor() {

      this.childCompilerName = 'awesome-plugin-compilation';
      this.outputFileName = 'hello.js';
      this.compilationEntry  = webpack.config.getNormalizedWebpackOptions({
        entry: {
          main: ['./src/index.js']
        },
      });
    }

    apply(compiler) {
      // Listen to `make` event
      compiler.hooks.make.tap( this.childCompilerName, (compilation, callback) => {
        // Creating child compiler with params
        const childCompiler = compilation.createChildCompiler(this.childCompilerName, {
          filename: this.outputFileName
        });

        childCompiler.context = compiler.context;
        childCompiler.inputFileSystem = compiler.inputFileSystem;
        childCompiler.outputFileSystem = compiler.outputFileSystem;

       EntryOptionPlugin.applyEntryOption(childCompiler, compiler.context, this.compilationEntry.entry);
       new SubresourceIntegrityPlugin().apply(childCompiler),


        new JsonpTemplatePlugin().apply(childCompiler);

        childCompiler.runAsChild((err, entries, childCompilation) => {});

    })
  }
}

  module.exports = AwesomePlugin;
