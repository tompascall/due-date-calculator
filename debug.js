// for debugging

'use strict';

var expect = require('expect.js');
var calc = require('./src/due.date.calculator.js');
var msInHour = 60 * 60 * 1000;

var submitDate;
var turnaroundTime;
var dueDate;
var testDate;
var timeFrames = [
    {
      name : 'restingHours',
      unit : 'hour',
      start : 17,
      length : 16 * msInHour,
      priority : 1000
    },
    {
      name : 'lunchTime',
      unit : 'hour',
      start : 12,
      length : 2 * 24 * msInHour,
      priority : 2000
    }
  ];

submitDate = new Date('December 1, 2014 9:00:00');
turnaroundTime = 10;
testDate = new Date('December 2, 2014 15:00:00');
dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
console.log(dueDate.toString());
