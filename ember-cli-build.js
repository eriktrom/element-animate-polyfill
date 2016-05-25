/* globals __dirname, require, module */

var merge = require('broccoli-merge-trees');
var typescript = require('broccoli-typescript-compiler');
var transpileES6 = require('emberjs-build/lib/utils/transpile-es6');
var stew = require('broccoli-stew');
var mv = stew.mv;
var find = stew.find;

function transpile(tree, label) {
  return transpileES6(tree, label, { sourceMaps: 'inline' });
}

module.exports = function() {

  var tsOptions = {
    tsconfig: {
      compilerOptions: {
        target: "es2015",
        inlineSourceMap: true,
        inlineSources: true,
        moduleResolution: "node",

        /* needed to get typescript to emit the desired sourcemaps */
        rootDir: '.',
        mapRoot: '/'
      }
    }
  };

  var tsTree = find(__dirname + '/' + 'src', {
    include: ['**/*.ts'],
    exclude: ['**/*.d.ts']
  });

  var jsTree = typescript(tsTree, tsOptions);

  var es6LibTree = mv(jsTree, 'es6');
  jsTree = transpile(jsTree, 'ES5 Lib Tree');
  var es5LibTree = mv(jsTree, 'named-amd');

  var finalTrees = [
    es5LibTree,
    es6LibTree
  ];

  return merge(finalTrees);
};
