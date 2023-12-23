const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const JsonpTemplatePlugin = require('webpack/lib/web/JsonpTemplatePlugin');
const path = require('path');
const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');
const EntryOptionPlugin = require('webpack/lib/EntryOptionPlugin');
const webpack = require('webpack');

class AwesomePlugin {
    constructor() {
      // Define compilation name and output name
      this.childCompilerName = 'awesome-plugin-compilation';
      this.outputFileName = 'hello.js';

      // To make child compiler work, you have to have a entry in the file system
      console.log(path.join(__dirname,'./src'));
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

        // Add SingleEntryPlugin to make all this work
       //new SingleEntryPlugin(compiler.context, this.compilationEntry, this.outputFileName).apply(childCompiler);
       debugger;
       EntryOptionPlugin.applyEntryOption(childCompiler, compiler.context, this.compilationEntry.entry);
       new SubresourceIntegrityPlugin().apply(childCompiler),


        new JsonpTemplatePlugin().apply(childCompiler);

        childCompiler.runAsChild((err, entries, childCompilation) => {
          (err) = console.log(err);
        });


        // compilation.hooks.additionalAssets.tapAsync(
        //   this.childCompilerName,
        //   childProcessDone => {

        //     childCompiler.runAsChild((err, entries, childCompilation) => {
        //       if (err) {
        //         return childProcessDone(err);
        //       }

        //       if (childCompilation.errors.length > 0) {
        //         return childProcessDone(childCompilation.errors[0]);
        //       }


        //       compilation.hooks.processAssets.tap(this.childCompilerName, () => {
        //         compilation.assets = Object.assign(
        //           childCompilation.assets,
        //           compilation.assets,
        //         );

        //         compilation.namedChunkGroups = Object.assign(
        //           childCompilation.namedChunkGroups,
        //           compilation.namedChunkGroups,
        //         );

        //         const childChunkFileMap = childCompilation.chunks.reduce(
        //           (chunkMap, chunk) => {
        //             chunkMap[chunk.name] = chunk.files;
        //             return chunkMap;
        //           },
        //           {},
        //         );

        //         compilation.chunks.forEach(chunk => {
        //           const childChunkFiles = childChunkFileMap[chunk.name];

        //           if (childChunkFiles) {
        //             chunk.files.push(
        //               ...childChunkFiles.filter(v => !chunk.files.includes(v)),
        //             );
        //           }
        //         });
        //       });

        //       childProcessDone();
        //     });
        //   },
        // );




    })
  }
}

  module.exports = AwesomePlugin;
