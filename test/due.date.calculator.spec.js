// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');

describe('Validation', function(){
  it('should create DueDate() object', function(){
    var due = new calc.DueDate();
    expect(due).to.be.an('object');
  });

  it('should validate that submitDate argument is a date object', function(){
    var due = new calc.DueDate();
    var submitDate = new Date();
    expect(due.validateSubmitDate(submitDate)).to.equal(true);
  });

  it('should check that submitDate argument is within working hours', function(){
    var startWorkingHours = 9;
    var endWorkingHours = 17;
    var due = new calc.DueDate();
    var submitDate = new Date();
    submitDate.setHours(10);
    expect(due.checkWorkingHours(submitDate, startWorkingHours, endWorkingHours)).to.equal(true);
  });
});
