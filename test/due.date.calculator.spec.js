// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');

describe('Validation', function(){
  var due;
  var submitDate;

  beforeEach(function(){
    due = new calc.DueDate();
  });

  it('should create DueDate() object', function(){
    due = new calc.DueDate();
    expect(due).to.be.an('object');
  });

  it('should validate that submitDate argument is a date object', function(){
    submitDate = new Date();
    expect(due.validateSubmitDate(submitDate)).to.equal(true);
  });

  it('should check that submitDate argument is within working hours', function(){
    submitDate = new Date();
    var startWorkingHours = 9;
    var endWorkingHours = 17;
    submitDate.setHours(10);
    expect(due.checkSubmitDateInWorkingHours(submitDate, startWorkingHours, endWorkingHours)).to.equal(true);
  });

  it('should check that value of turnaroundTime is a whole number', function(){
    var turnaroundTime = 10;
    expect(due.validateTurnaroundTime(turnaroundTime)).to.equal(true);
  });

  it('should throw exception if submitDate is not a date object', function(){
    submitDate = 234;
    expect(due.validateSubmitDate).withArgs(submitDate).to.throwException('submitDate is not a Date object');
  });

  it('should throw exception if submitDate is not within working hours', function(){
    submitDate = new Date();
    var startWorkingHours = 9;
    var endWorkingHours = 17;
    submitDate.setHours(8);
    expect(due.checkSubmitDateInWorkingHours).withArgs(submitDate, startWorkingHours, endWorkingHours)
      .to.throwException('submitDate is not within working hours');
  });

  it('should throw exception if turnaroundTime is not a whole number', function(){
    var turnaroundTime = 10.2;
    expect(due.validateTurnaroundTime).withArgs(turnaroundTime).to
      .throwException('turnaroundTime is not a whole number');
  });

  it('should copy date', function(){
    var source = new Date('December 24, 2014 18:00:00');
    var dest = new Date();
    due.copyDate(source, dest);
    expect(dest.getTime()).to.equal(source.getTime());
  });

  it('should set submitDate property', function(){
    submitDate = new Date('December 24, 2014 18:00:00');
    due.setSubmitDate(submitDate);
    expect(due.submitDate.date.getTime()).to.equal(submitDate.getTime());
  });

  it('should set TurnaroundTime property', function(){
    var turnaroundTime = 3;
    due.setTurnaroundTime(turnaroundTime);
    expect(due.turnaroundTime).to.equal(turnaroundTime);
  });
});

describe('Calculate the number of hours to due date', function(){
  var due;
  var submitDate;
  var turnaroundTime;

  beforeEach(function(){
    due = new calc.DueDate();
  });

  it('should get distance of the nth working hour if n <= 8', function(){
    submitDate = new Date('December 5, 2014 15:05:00');
    turnaroundTime = 2;
    var currentDistance = 1;
    due.init(submitDate, turnaroundTime);
    expect(due.distanceOfNextWorkingHour(currentDistance)).to.equal(66);

    submitDate = new Date('December 5, 2014 9:05:00');
    turnaroundTime = 8;
    currentDistance = 7;
    due.init(submitDate, turnaroundTime);
    expect(due.distanceOfNextWorkingHour(currentDistance)).to.equal(72);

    submitDate = new Date('December 5, 2014 9:00:00');
    turnaroundTime = 8;
    currentDistance = 7;
    due.init(submitDate, turnaroundTime);
    expect(due.distanceOfNextWorkingHour(currentDistance)).to.equal(8);
  });

  it('should get due date', function(){
    submitDate = new Date('December 5, 2014 15:05:00');
    turnaroundTime = 19;
    var testDate = new Date('December 10, 2014 10:05:00');
    var dueDate = due.calculateDueDate(submitDate, turnaroundTime);
    expect(dueDate.getTime()).to.equal(testDate.getTime());

    submitDate = new Date('December 5, 2014 15:00:00');
    turnaroundTime = 2;
    testDate = new Date('December 5, 2014 17:00:00');
    dueDate = due.calculateDueDate(submitDate, turnaroundTime);
    expect(dueDate.getTime()).to.equal(testDate.getTime());

    submitDate = new Date('December 5, 2014 15:05:00');
    turnaroundTime = 19 + 40;
    testDate = new Date('December 17, 2014 10:05:00');
    dueDate = due.calculateDueDate(submitDate, turnaroundTime);
    expect(dueDate.getTime()).to.equal(testDate.getTime());
  });
});
