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
  // {
  //   name : 'weekend',
  //   unit : 'dayOfWeek',
  //   start : 6,  // Saturday
  //   length : 2 * 24 * msInHour,
  //   priority : 3000 // the higher the number the lower the priority
  // },
  // {
  //   name : 'restingHours',
  //   unit : 'hour',
  //   start : 17,
  //   length : 16 * msInHour,
  //   priority : 2000
  // },
  {
    name : 'holiday',
    unit : 'date',
    start : 'December 6, 2014 00:00:00',
    length : 2 * 24 * msInHour,
    priority : 1000
  }
];

submitDate = new Date('December 5, 2014 22:00:00');
turnaroundTime = 4;
testDate = new Date('December 8, 2014 02:00:00');
dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
console.log(dueDate.toString());
