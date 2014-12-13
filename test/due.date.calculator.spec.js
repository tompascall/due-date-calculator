// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');
var helper = require('../lib/testHelpers.js');
var msInMin = 1000 * 60 * 60;

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

    turnaroundTime = 1.2;
    message = 'turnaroundTime argument must be an integer number';
    if (!helper.testExceptionMessage(message, calc.calculateDueDate, submitDate, turnaroundTime)) {
      expect().fail();
    }
  });

  it('should throw exception if timeFrames validation fails', function(){
    var submitDate = new Date();
    var turnaroundTime = 1;
    var timeFrames = {};
    expect(calc.calculateDueDate).withArgs(submitDate, turnaroundTime, timeFrames).to.throwException();
  });
});

describe('Calculate due date', function(){

  it('should calculate due date if turnaround time equals zero', function(){
    var submitDate = new Date('2014-12-05T12:15:35+01:00');
    var turnaroundTime = 0;
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime);
    expect(dueDate.getTime()).to.be(submitDate.getTime());
  });

  it('should calculate due date if there are no timeframes', function(){
    var submitDate = new Date('2014-12-05T12:15:35+01:00');
    var turnaroundTime = 60; // minutes
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime);
    expect(dueDate.getTime()).to.be(submitDate.getTime() + 60 * msInMin);
  });

  it('should calculate due date if there is only one daily time frame and submit date is in the frame', function(){
    var submitDate = new Date('2014-12-05T12:15:35+01:00');
    var turnaroundTime = 1;
    var timeFrames = [
    {   name: 'foo',
        type: 'daily',
        start: '12:00',
        end: '12:30'
      }
    ];
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    var testDate = new Date('2014-12-05T12:31:00+01:00');
    expect(dueDate.getTime()).to.be(testDate.getTime());

    timeFrames = [
    {   name: 'foo',
        type: 'daily',
        start: '23:00',
        end: '01:00'
      }
    ];
    submitDate = new Date('2014-12-05T23:59:35+01:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    testDate = new Date('2014-12-06T01:01:00+01:00');
    expect(dueDate.getTime()).to.be(testDate.getTime());
  });

  it('should calculate due date if there is only one daily time frame ' +
       'and submit date is before the frame', function(){
    var turnaroundTime = 1;
    var timeFrames = [
    {   name: 'foo',
        type: 'daily',
        start: '12:00',
        end: '12:30'
      }
    ];
    var submitDate = new Date('2014-12-05T11:59:35+01:00');
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    var testDate = new Date('2014-12-05T12:30:35+01:00');
    console.log(dueDate.toString());
    expect(dueDate.getTime()).to.be(testDate.getTime());
  });

   it('should calculate due date if there are a daily time frame and a weekly time frame', function(){
    var turnaroundTime = 1;
    var timeFrames = [
      { name: 'non-working-hours',
        type: 'daily',
        start: '17:00',
        end: '09:00'
      },
      { name: 'weekend',
        type: 'weekly',
        start: '06.00:00',
        end: '01.00:00'
      }

    ];
    var submitDate = new Date('2014-12-05T16:59:35+01:00');
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    var testDate = new Date('2014-12-08T09:00:35+01:00');
    expect(dueDate.getTime()).to.be(testDate.getTime());
   });

   it('should calculate due date if there are a monthly frame', function(){
    var turnaroundTime = 1;
    var timeFrames = [
      { name: 'middle time',
        type: 'monthly',
        start: '15.00:00',
        end: '16.00:00'
      }
    ];
    var submitDate = new Date('2014-12-14T23:59:35+01:00');
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    var testDate = new Date('2014-12-16T00:00:35+01:00');
    expect(dueDate.getTime()).to.be(testDate.getTime());

    submitDate = new Date('2014-12-15T00:00:00+01:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    testDate = new Date('2014-12-16T00:01:00+01:00');
    console.log(dueDate.toString());
    expect(dueDate.getTime()).to.be(testDate.getTime());
  });
});

