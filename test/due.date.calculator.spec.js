// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');

function timeFrames(date){
  restingHours(date);
  weekend(date);
  return date;

  function restingHours(date){
    var startWorkingHours = 9;
    var endWorkingHours = 17;
    var endWorkingDate = getEndworkingDate(date, new Date());

    var diff = date.getTime() - endWorkingDate.getTime();
    if (diff > 0) {
      date.setHours(date.getHours() + (24 - endWorkingHours + startWorkingHours));
    }
    return date;

    function getEndworkingDate(date, endWorkingDate){
      endWorkingDate.setTime(date.getTime());
      endWorkingDate.setHours(endWorkingHours, 0, 0, 0);
      return endWorkingDate;
    }
  }
  function weekend(date){
    var saturday = 6;
    if (date.getDay() === saturday){
      date.setDate(date.getDate() + 2);
    }
    return date;
  }
}

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

  it('should count dueDate', function(){
    var submitDate = new Date('December 5, 2014 15:00:00');
    var turnaroundTime = 3;
    var testDate = new Date('December 8, 2014 10:00:00');
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());

    submitDate = new Date('December 5, 2014 15:05:00');
    turnaroundTime = 3;
    testDate = new Date('December 8, 2014 10:05:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());

    submitDate = new Date('December 5, 2014 15:05:00');
    turnaroundTime = 19;
    testDate = new Date('December 10, 2014 10:05:00');
    dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });
});
