// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');

describe('Turnaround Time', function(){
  var turnaround;

  it('should create a turnaround object', function(){
    turnaround = new calc.Turnaround();
    expect(turnaround).to.be.an('object');
  });

  it('should calculate days and remainder hours of turnaround time', function(){
    var turnaroundTime = 19;
    turnaround = new calc.Turnaround(turnaroundTime);
    expect(turnaround.days).to.equal(2);
    expect(turnaround.remainderHours).to.equal(3);
  });

  it('should calculate turnaround time as minutes', function(){
    var turnaroundTime = 2;
    turnaround = new calc.Turnaround(turnaroundTime);
    expect(turnaround.minutes).to.equal(120);
  });
});

describe('Submit Date', function(){
  var date;
  var submitDate;

  beforeEach(function(){
    date = new Date('December 5, 2014 15:05:30');
  });

  it('should create submitDate object', function(){
    submitDate = new calc.SubmitDate(date);
    expect(submitDate).to.be.an('object');
  });

  it('should get day of the submit date', function(){
    date.setDate(15);
    submitDate = new calc.SubmitDate(date);
    expect(submitDate.day).to.equal(15);
  });

  it('should get hours of submit date', function(){
    date.setHours(14);
    submitDate = new calc.SubmitDate(date);
    expect(submitDate.hours).to.equal(14);
  });

  it('should get minutes of submit date', function(){
    date.setMinutes(30);
    submitDate = new calc.SubmitDate(date);
    expect(submitDate.minutes).to.equal(30);
  });

  it('should calculate remaining minutes on submit day', function(){
    submitDate = new calc.SubmitDate(date);
    expect(submitDate.remainingMinutesOnSubmitDay()).to.equal(115); // we don't care seconds
  });

  it('should calculate remaining hours on submit day', function(){
    submitDate = new calc.SubmitDate(date);
    expect(submitDate.remainingHoursOnSubmitDay()).to.equal(1);
  });
});

describe('Due Date', function(){
  var submitDate;
  var due;
  var turnaroundTime;

  beforeEach(function(){
    submitDate = new Date('December 5, 2014 15:05:30');
    turnaroundTime = 19;
  });

  it('should create a due object', function(){
    due = new calc.Due();
    expect(due).to.be.an('object');
  });

  it('should set submit date', function(){
    due = new calc.Due();
    due.setSubmitDate(submitDate);
    expect(due.submitDate.date.getTime()).to.equal(submitDate.getTime());
  });

  it('should set turnaround time', function(){
    due = new calc.Due();
    due.setTurnaroundTime(turnaroundTime);
    expect(due.turnaroundTime.minutes).to.equal(turnaroundTime * 60);
  });

  it('should check if there is due time on the day of submit day', function(){
    due = new calc.Due();
    due.init(submitDate, turnaroundTime);
    expect(due.onSubmitDay()).to.equal(false);

    turnaroundTime = 1;
    due.init(submitDate, turnaroundTime);
    expect(due.onSubmitDay()).to.equal(true);
  });

  it('should calculate due date if due time is on submit day', function(){
    turnaroundTime = 1;
    var testDueDate = new Date('December 5, 2014 16:05:30');
    due = new calc.Due();
    due.init(submitDate, turnaroundTime);
    var dueDate = due.calculateDueDate(submitDate, turnaroundTime);
    expect(dueDate.getTime()).to.equal(testDueDate.getTime());
  });

  it('should copy date', function(){
    var date = new Date();
    calc.copyDate(submitDate, date);
    expect(date.getTime()).to.equal(submitDate.getTime());
  });

  it('should get the day of due date', function(){
    turnaroundTime = 1;
    due = new calc.Due();
    due.init(submitDate, turnaroundTime);
    expect(due.getDueDay().getDate()).to.equal(5);

    turnaroundTime = 2;
    due = new calc.Due();
    due.init(submitDate, turnaroundTime);
    expect(due.getDueDay().getDate()).to.equal(8);

    turnaroundTime = 19;
    due = new calc.Due();
    due.init(submitDate, turnaroundTime);
    expect(due.getDueDay().getDate()).to.equal(10);
  });

  it('should get due date if there are overflow hours', function(){
    turnaroundTime = 19; // 3 hours as overflow
    due = new calc.Due();
    due.init(submitDate, turnaroundTime);
    var testDate = new Date('December 10, 2014 11:05:30');
    var dueDate = due.calculateDueDate(submitDate, turnaroundTime);
    expect(testDate.getTime()).to.equal(dueDate.getTime());
  });

  it('should get due date if there are no overflow hours', function(){
    turnaroundTime = 17; // 1 hour as not overflow
    due = new calc.Due();
    due.init(submitDate, turnaroundTime);
    var testDate = new Date('December 9, 2014 16:05:30');
    var dueDate = due.calculateDueDate(submitDate, turnaroundTime);
    expect(testDate.getTime()).to.equal(dueDate.getTime());
  });
});
