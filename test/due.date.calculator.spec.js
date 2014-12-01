// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');
var timeFrames = [
  {
    name : 'weekend',
    unit : 'dayOfWeek',
    regularity : 'week',
    start : 6,
    length : 2 * 24 * 60 * 60 * 1000,
    priority : 1100
  },
  {
    name : 'restingHours',
    unit : 'hour',
    regularity : 'day',
    start : 17,
    length : 16 * 60 * 60 * 1000,
    priority : 1000
  }
];


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

  it('should pass if we will clash with restingHours time frame', function(){
    var submitDate = new Date('December 4, 2014 15:00:00');
    var turnaroundTime = 3;
    var testDate = new Date('December 5, 2014 10:00:00');
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });
});
