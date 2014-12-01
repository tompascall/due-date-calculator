// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');
var msInHour = 60 * 60 * 1000;
var timeFrames = [
  {
    name : 'weekend',
    unit : 'dayOfWeek',
    regularity : 'week',
    start : 6,  // Saturday
    length : 2 * 24 * msInHour,
    priority : 2000
  },
  {
    name : 'restingHours',
    unit : 'hour',
    regularity : 'day',
    start : 17,
    length : 16 * msInHour,
    priority : 1000
  }
];


describe('due date calculation', function(){
  var submitDate;
  var turnaroundTime;
  var dueDate;
  var testDate;

  it('should get back submit day if turnaround time = 0', function(){
    submitDate = new Date('December 5, 2014 15:15:30');
    turnaroundTime = 0;
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(submitDate.getTime());
  });

  it('should add turnaround time to submit date', function(){
    submitDate = new Date('December 5, 2014 15:00:00');
    turnaroundTime = 2;
    testDate = new Date('December 5, 2014 17:00:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });

  it('should pass if we will clash with restingHours time frame', function(){
    submitDate = new Date('December 4, 2014 15:00:00');
    turnaroundTime = 3;
    testDate = new Date('December 5, 2014 10:00:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());

    submitDate = new Date('December 4, 2014 15:05:00');
    turnaroundTime = 3;
    testDate = new Date('December 5, 2014 10:05:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });

  it('should get dueDate if we clash with weekend time frame', function(){
    submitDate = new Date('December 5, 2014 15:05:00');
    turnaroundTime = 3;
    testDate = new Date('December 8, 2014 10:05:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });
});
