import iso from 'iso-7064';
import pad from 'pad';
import ExtendableError from 'es6-error';

class Exception extends ExtendableError {}

const SIZES = [7, 2, 4, 1, 2, 4];
const NOT_NUMBERS = /[^0-9]/g;

export class Validate {
  constructor(...parameters) {
    const args = parameters.map((v, i) => {
      let r = v;
      if (typeof r === 'number') r = r.toString();
      if (typeof r !== 'string') return r;
      if (!SIZES[i]) return r;
      return pad(SIZES[i], r, '0');
    });

    const [proc, dv, year, justice, number, court] = args;

    const firstStep = iso.compute(proc).toString();
    const secondStep = iso.compute(firstStep + year + justice + number).toString();
    const thirdStep = iso.compute(`${secondStep + court}00`).toString();

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

export { Exception };
