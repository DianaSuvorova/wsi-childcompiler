const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');

class Demo {
    apply(compiler) {
      const webpack = compiler.webpack;
      this.outputFileName = './dist/custom-file.js';
      compiler.hooks.thisCompilation.tap('DemoPlugin',
      (compilation) => {
        compilation.hooks.processAssets.tapAsync(
          {
            name: 'DemoPlugin',
            stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
          },
          (compilationAssets, callback) => {
            const compilerName = 'DemoPluginCompiler';
            const childCompiler = compilation.createChildCompiler(compilerName, outputOptions, [
            //  new SingleEntryPlugin(compiler.context, './src/index.js', this.outputFileName)
            ]);
            console.log(compiler.options);
            Object.keys(compiler.options.entry).forEach(entry => {
              console.log(entry);
              childCompiler.apply(
                new SingleEntryPlugin(
                  compiler.context,
                  compiler.options.entry[entry], entry
                )
              );
            });
            childCompiler.runAsChild((err, entries, childCompilation) => {
              callback();
            });
          });
        })

    }
  }

  module.exports = Demo;
