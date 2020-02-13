# validate-cnj
 [![npm version](https://badge.fury.io/js/validate-cnj.svg)](https://npmjs.org/package/validate-cnj)  [![build status](https://travis-ci.org/bipbop/validate-cnj.svg)](https://travis-ci.org/bipbop/validate-cnj)  [![coverage status](https://coveralls.io/repos/bipbop/validate-cnj/badge.svg)](https://coveralls.io/github/bipbop/validate-cnj)  [![dependency status](https://david-dm.org/bipbop/validate-cnj.svg?theme=shields.io)](https://david-dm.org/bipbop/validate-cnj)  [![devDependency status](https://david-dm.org/bipbop/validate-cnj/dev-status.svg)](https://david-dm.org/bipbop/validate-cnj#info=devDependencies)  [![Gitter](https://badges.gitter.im/bipbop/validate-cnj.svg)](https://gitter.im/bipbop/validate-cnj) 

Validador da numeração CNJ escrito em JavaScript com suporte para navegadores, pegar e usar.


## Installation

```sh
npm install validate-cnj --save
```

# TL-DR
```js
import { Validate } from 'validate-cnj'

Validate.load("1500345-34.2017.8.26.0248")
// Thrown: ValidateCNJException: Checksum not correct - CNJ number is invalid. Expected is 31, received 34.

Validate.load("1500345-31.2017.8.26.0248")
// ValidateCNJ {
//   dv: '31',
//   proc: '1500345',
//   year: '2017',
//   justice: '8',
//   number: '26',
//   court: '0248'
// }

Validate.load("1500345-31.2017.8260248").generate(true)
// '1500345-31.2017.8.26.0248'

Validate.load("1500345-31.2017.8260248").generate(false)
// '15003453120178260248'

Validate.factory("1500345", {justice:8, court: 248, number: 26}, 2020).generate(true)
// '1500345-26.2020.8.26.0248'

```

## License
[MIT](https://opensource.org/licenses/MIT)
