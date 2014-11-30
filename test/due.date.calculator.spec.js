// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');

describe('due date calculation', function(){
  it('should get back submit day if turnaround time = 0', function(){
    var submitDate = new Date('December 5, 2014 15:15:30');
    var turnaroundTime = 0;
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime);
    expect(dueDate.getTime()).to.equal(submitDate.getTime());
  });

  it('should add turnaround time to submit date', function(){
    var submitDate = new Date('December 5, 2014 15:00:00');
    var turnaroundTime = 2;
    var testDate = new Date('December 5, 2014 17:00:00');
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });

  it('should count dueDate', function(){
    var submitDate = new Date('December 5, 2014 15:00:00');
    var turnaroundTime = 3;
    var testDate = new Date('December 8, 2014 10:00:00');
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime);
    expect(dueDate.getTime()).to.equal(testDate.getTime());

    submitDate = new Date('December 5, 2014 15:05:00');
    turnaroundTime = 3;
    testDate = new Date('December 8, 2014 10:05:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime);
    expect(dueDate.getTime()).to.equal(testDate.getTime());

    submitDate = new Date('December 5, 2014 15:05:00');
    turnaroundTime = 19;
    testDate = new Date('December 10, 2014 10:05:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });
});
