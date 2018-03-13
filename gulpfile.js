const path = require('path');
const gulp = require('gulp');
const { rollup } = require('rollup');

const rollupGenerator = require('./utils/rollup-generator');
const pkg = require('./package.json');

/* eslint import/no-extraneous-dependencies: 0 */

gulp.task('pack:test', () => rollup(rollupGenerator({
  istanbul: true,
})).then(bundle => bundle.write({
  format: 'cjs',
  exports: 'named',
  name: 'CalculateCNJ',
  extend: true,
  file: path.join(__dirname, 'tests', 'coverage', 'index.js'),
})));

gulp.task('pack:cjs', () => rollup(rollupGenerator()).then(bundle => bundle.write({
  format: 'cjs',
  exports: 'named',
  name: 'CalculateCNJ',
  extend: true,
  file: path.join(__dirname, pkg.main),
})));

gulp.task('pack:dist', ['pack:test', 'pack:cjs']);

gulp.task('listener', () => gulp.watch('lib/**/*.js', ['pack:test']));
gulp.task('default', ['pack:test', 'pack:dist']);
