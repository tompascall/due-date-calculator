// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');

describe('Validation', function(){
  var due;
  var submitDate;

  beforeEach(function(){
    due = new calc.DueDate();
    submitDate = new Date();
  });

  it('should create DueDate() object', function(){
    expect(due).to.be.an('object');
  });

  it('should validate that submitDate argument is a date object', function(){
    expect(due.validateSubmitDate(submitDate)).to.equal(true);
  });

  it('should check that submitDate argument is within working hours', function(){
    var startWorkingHours = 9;
    var endWorkingHours = 17;
    submitDate.setHours(10);
    expect(due.checkWorkingHours(submitDate, startWorkingHours, endWorkingHours)).to.equal(true);
  });

  it('should check that value of turnaroundTime is a whole number', function(){
    var turnaroundTime = 10.2;
    expect(due.validateTurnaroundTime(turnaroundTime)).to.equal(false);
  });

});
