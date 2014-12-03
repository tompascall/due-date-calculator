// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');
var msInHour = 60 * 60 * 1000;

describe('due date calculation', function(){
  var submitDate;
  var turnaroundTime;
  var dueDate;
  var testDate;
  var timeFrames = [
    {
      name : 'weekend',
      unit : 'dayOfWeek',
      start : 6,  // Saturday
      length : 2 * 24 * msInHour
    },
    {
      name : 'restingHours',
      unit : 'hour',
      start : 17,
      length : 16 * msInHour
    },
    {
      name : 'holiday',
      unit : 'date',
      start : 'December 22, 2014 00:00:00',
      length : 2 * 24 * msInHour
    }
  ];

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
    submitDate = new Date('December 5, 2014 15:00:00');
    turnaroundTime = 3;
    testDate = new Date('December 8, 2014 10:00:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());

    submitDate = new Date('December 5, 2014 15:05:00');
    turnaroundTime = 19;
    testDate = new Date('December 10, 2014 10:05:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });

  it('should handle frames which have date unit', function(){
    submitDate = new Date('December 5, 2014 15:05:00');
    turnaroundTime = 19 + 8 * 10; // + 2 weeks
    testDate = new Date('December 26, 2014 10:05:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });
});

describe('test two hour-type time frames', function(){
  var submitDate;
  var turnaroundTime;
  var dueDate;
  var testDate;


  it('should work with two separated hour-type frames', function(){
    var timeFrames = [
      {
        name : 'restingHours',
        unit : 'hour',
        start : 17,
        length : 16 * msInHour,
      },
      {
        name : 'lunchTime',
        unit : 'hour',
        start : 12,
        length : 2 * msInHour,
      }
    ];
    submitDate = new Date('December 1, 2014 9:00:00');
    turnaroundTime = 10;
    testDate = new Date('December 2, 2014 15:00:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });

  it('should work with two overlapped hour type frames', function(){
    var timeFrames = [
      {
        name : 'restingHours',
        unit : 'hour',
        start : 17,
        length : 16 * msInHour
      },
      {
        name : 'lunchTime',
        unit : 'hour',
        start : 16,
        length : 2 * msInHour
      }
    ];
    submitDate = new Date('December 1, 2014 9:00:00');
    turnaroundTime = 10;
    testDate = new Date('December 2, 2014 12:00:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());

    submitDate = new Date('December 1, 2014 9:05:00');
    turnaroundTime = 15;
    testDate = new Date('December 3, 2014 10:05:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());

    timeFrames = [
      {
        name : 'restingHours',
        unit : 'hour',
        start : 17,
        length : 16 * msInHour
      },
      {
        name : 'lunchTime',
        unit : 'hour',
        start : 6,
        length : 2 * msInHour
      }
    ];

    submitDate = new Date('December 1, 2014 9:05:00');
    turnaroundTime = 10;
    testDate = new Date('December 2, 2014 11:05:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });
});


describe('test dayOfWeek time frames', function(){
  var submitDate;
  var turnaroundTime;
  var dueDate;
  var testDate;
  var timeFrames = [
    {
      name : 'weekend',
      unit : 'dayOfWeek',
      start : 6,  // Saturday
      length : 2 * 24 * msInHour
    },
    {
      name : 'Thursday',
      unit : 'dayOfWeek',
      start : 4,  // Thursday
      length : 1 * 24 * msInHour
    }
  ];

  it('should work with two separated dayOfWeek frames', function(){
    submitDate = new Date('December 1, 2014 9:05:00');
    turnaroundTime = 5 * 24;
    testDate = new Date('December 9, 2014 9:05:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });

  it('should work with two overlapped dayOfWeek frames', function(){
    timeFrames = [
      {
        name : 'weekend',
        unit : 'dayOfWeek',
        start : 6,  // Saturday
        length : 2 * 24 * msInHour
      },
      {
        name : 'Thursday-Saturday',
        unit : 'dayOfWeek',
        start : 4,  // Thursday
        length : 3 * 24 * msInHour
      }
    ];

    submitDate = new Date('December 1, 2014 9:05:00');
    turnaroundTime = 3 * 24;
    testDate = new Date('December 8, 2014 9:05:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });
});
