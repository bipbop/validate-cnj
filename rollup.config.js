const path = require('path');
const buble = require('@rollup/plugin-buble');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');

const pkgDetails = require('./package.json');

module.exports = {
  input: 'src/index.js',
  external: Object.keys(pkgDetails.dependencies),
  plugins: [
    commonjs(),
    resolve({
      preferBuiltins: false,
    }),
    buble(),
  ],
  output: {
    file: pkgDetails.main,
    exports: 'named',
    format: 'umd',
    name: 'JuristekParser',
    globals: {
      cheerio: 'cheerio',
      moment: 'moment',
      numeral: 'numeral',
    },
  },
};
