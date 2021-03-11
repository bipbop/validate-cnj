import buble from '@rollup/plugin-buble'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

const pkgDetails = require('./package.json');

export default {
  input: './src/index.js',
  external: Object.keys(pkgDetails.dependencies || {}),
  plugins: [
    commonjs(),
    resolve(),
    buble(),
  ],
  output: {
    file: pkgDetails.main,
    exports: 'named',
    format: 'umd',
    name: 'ValidateCNJ',
  },
};
