(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('iso-7064'), require('pad'), require('es6-error')) :
	typeof define === 'function' && define.amd ? define(['exports', 'iso-7064', 'pad', 'es6-error'], factory) :
	(factory((global.CalculateCNJ = global.CalculateCNJ || {}),global.iso7064,global.pad,global.ExtendableError));
}(this, (function (exports,iso7064,pad,ExtendableError) { 'use strict';

pad = pad && pad.hasOwnProperty('default') ? pad['default'] : pad;
ExtendableError = ExtendableError && ExtendableError.hasOwnProperty('default') ? ExtendableError['default'] : ExtendableError;

class Exception extends ExtendableError {}

const SIZES = [7, 2, 4, 1, 2, 4];
const NOT_NUMBERS = /[^0-9]/g;

class Validate {
  constructor(...parameters) {
    const args = parameters.map((v, i) => {
      let r = v;
      if (typeof r === 'number') r = r.toString();
      if (typeof r !== 'string') return r;
      if (!SIZES[i]) return r;
      return pad(SIZES[i], r, '0');
    });

    const [proc, dv, year, justice, number, court] = args;

    const firstStep = iso7064.compute(proc).toString();
    const secondStep = iso7064.compute(firstStep + year + justice + number).toString();
    const thirdStep = iso7064.compute(`${secondStep + court}00`).toString();

    const ndv = 98 - (thirdStep % 97);
    this.dv = pad(2, ndv.toString(), '0');

    if (dv !== null && dv !== this.dv) {
      throw new Exception();
    }

    this.proc = proc;
    this.year = year;
    this.justice = justice;
    this.number = number;
    this.court = court;
  }

  static factory(proc, { justice, number, court }, year) {
    return new Validate(proc, null, year, justice, number, court);
  }

  get pieces() {
    return {
      proc: this.proc,
      year: this.year,
      justice: this.justice,
      number: this.number,
      court: this.court,
    };
  }

  static load(cnj) {
    const numcnj = cnj.replace(NOT_NUMBERS, '');
    let pos = 0;
    return new Validate(...SIZES.map((i) => {
      const substr = numcnj.substr(pos, i);
      pos += i;
      return substr;
    }));
  }

  generate(mask = true) {
    return !mask ? this.proc + this.dv + this.year + this.justice + this.number + this.court :
      [this.proc, [this.dv, this.year, this.justice, this.number, this.court].join('.')].join('-');
  }
}

exports.default = Validate;
exports.Exception = Exception;

Object.defineProperty(exports, '__esModule', { value: true });

})));
