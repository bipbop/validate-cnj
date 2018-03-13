const path = require('path');
const buble = require('rollup-plugin-buble');
const license = require('rollup-plugin-license');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const istanbul = require('rollup-plugin-istanbul');

const external = Object.keys(require('../package.json').dependencies);

/* eslint import/no-extraneous-dependencies: 0 */
module.exports = function configuration(confs = {}) {
  const plugins = [
    resolve(),
    commonjs(),
    license({ banner: { file: path.join(__dirname, '..', 'banner.txt') } }),
    buble(),
  ];

  if (confs.istanbul) {
    plugins.push(istanbul({ exclude: ['tests/**/*', 'node_modules/**/*'] }));
  }

  return {
    input: 'lib/index.js',
    external,
  };
};
