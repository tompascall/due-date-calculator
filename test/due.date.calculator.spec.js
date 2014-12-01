// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');
var timeFrames = {
  restingHours : {
    unit : 'hour',
    regularity : 'day',
    start : 17,
    length : 16,
    priority : 1
  },
  weekend : {
    unit : 'dayOfWeek',
    regularity : 'week',
    start : 6,
    length : 2,
    priority : 1
  }
};


describe('due date calculation', function(){
  it('should get back submit day if turnaround time = 0', function(){
    var submitDate = new Date('December 5, 2014 15:15:30');
    var turnaroundTime = 0;
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(submitDate.getTime());
  });

  it('should add turnaround time to submit date', function(){
    var submitDate = new Date('December 5, 2014 15:00:00');
    var turnaroundTime = 2;
    var testDate = new Date('December 5, 2014 17:00:00');
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });
});
