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
    var workingHours = 19;
    turnaround = new calc.Turnaround(workingHours);
    expect(turnaround.days).to.equal(2);
    expect(turnaround.remainderHours).to.equal(3);
  });

  it('should calculate minutes of turnaround time', function(){
    var workingHours = 2;
    turnaround = new calc.Turnaround(workingHours);
    expect(turnaround.minutes).to.equal(120);
  });
});

describe('Submit Date', function(){
  var date;
  var submitDate;

  beforeEach(function(){
    date = new Date('December 6, 2014 15:05:30');
  });

  it('should create submitDate object', function(){
    submitDate = new calc.SubmitDate(date);
    expect(submitDate).to.be.an('object');
  });

  it('should get day of the submit date', function(){
    date.setDate(1);
    submitDate = new calc.SubmitDate(date);
    expect(submitDate.day).to.equal(1);
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

  it('should calculate remaining minutes on submit date', function(){
    submitDate = new calc.SubmitDate(date);
    expect(submitDate.remainingMinutes()).to.equal(115);
  });
});

describe('Due Date', function(){
  //var date;
  var submitDate;
  var dueDate;
  //var workingHours;
  var turnaroundTime;

  beforeEach(function(){
    submitDate = new Date('December 6, 2014 15:05:30');
    //submitDate = new calc.SubmitDate(date);
    turnaroundTime = 19;
    //turnaround = new calc.Turnaround(workingHours);
  });

  it('should create a dueDate object', function(){
    dueDate = new calc.DueDate(submitDate, turnaroundTime);
    expect(dueDate).to.be.an('object');
  });

  it('should check if there is enough time on the day of submit day', function(){

  });
});
