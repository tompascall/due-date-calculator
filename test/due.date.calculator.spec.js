// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');

describe('Turnaround Time', function(){
  it('should check create object', function(){
    var turnaround = new calc.Turnaround();
    expect(turnaround).to.be.an('object');
  });

  it('should calculate days and hours of turnaround time', function(){
    var turnaroundTime = 19;
    var turnaround = new calc.Turnaround(turnaroundTime);
    expect(turnaround.days).to.equal(2);
    expect(turnaround.hours).to.equal(3);
  });
});
