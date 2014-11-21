// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');

describe('Turnaround Time', function(){
  it('should create object', function(){
    var turnaround = new calc.Turnaround();
    expect(turnaround).to.be.an('object');
  });

  it('should calculate days and hours of turnaround time', function(){
    var workingHours = 19;
    var turnaround = new calc.Turnaround(workingHours);
    expect(turnaround.days).to.equal(2);
    expect(turnaround.hours).to.equal(3);
  });
});

describe('Submit Date', function(){
  it('should create object', function(){
    var date = new Date();
    var submitDate = new calc.SubmitDate(date);
    expect(submitDate).to.be.an('object');
  });

  it('should get day of the month', function(){
    var date = new Date();
    date.setDate(1);
    var submitDate = new calc.SubmitDate(date);
    expect(submitDate.day).to.equal(1);
  });
});
