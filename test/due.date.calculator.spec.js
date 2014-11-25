// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');

describe('Validation', function(){
  it('should create DueDate() object', function(){
    var due = new calc.DueDate();
    expect(due).to.be.an('object');
  });

  it('should validate that submit date argument is a date object', function(){
    var due = new calc.DueDate();
    var submitDate = new Date();
    expect(due.validateSubmitDate(submitDate)).to.equal(true);
  });
});
