/* global validateCnj */
const CalculateCNJ = require('..');
const { expect } = require('chai');

'use strict';
describe('Validação da numeração CNJ', function () {

  it('Valida um número CNJ verdadeiro', () => {
    new CalculateCNJ.Validate('1001879','75','2014','8','26','0053');
  });
  it('Informa um número CNJ inválido', () => {
    try {
      new CalculateCNJ.Validate('1001879','72','2014','8','26','0053');
    } catch (e) {
      return;
    }
  });
  it('Validações', () => {
    expect(CalculateCNJ.Validate.load('0090009-33.2015.8.26.0050').pieces).to.deep.equal({
      proc: '0090009',
      year: '2015',
      justice: '8',
      number: '26',
      court: '0050',  
    });
  });
});
