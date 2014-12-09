// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');
var helper = require('../lib/testHelpers.js');

describe('Validate arguments', function(){
  it('should check that calculateDueDate() function has been called with at least 2 arguments', function(){
    var message = 'calculateDueDate() function must have at least 2 arguments';
    var submitDate = new Date();
    if (!helper.testExceptionMessage(message, calc.calculateDueDate, submitDate)) {
      expect().fail();
    }
  });

  it('should check that submitDate argument is a date object', function(){
    var message = 'submitDate argument must be a date object';
    var submitDate = 'not a date object';
    var turnaroundTime;
    if (!helper.testExceptionMessage(message, calc.calculateDueDate, submitDate, turnaroundTime)) {
      expect().fail();
    }
  });

  it('should check that turnaround time is an integer number', function(){
    var submitDate = new Date();
    var turnaroundTime = 'foo';
    var message = 'turnaroundTime argument must be a number';
    if (!helper.testExceptionMessage(message, calc.calculateDueDate, submitDate, turnaroundTime)) {
      expect().fail();
    }
  });
});

