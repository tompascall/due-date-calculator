// due.date.calculator.js

'use strict';

var calc = {};

calc.Turnaround = function(turnaroundTime){
  this.days = Math.floor(turnaroundTime / 8);
  this.hours = turnaroundTime % 8;
};

module.exports = calc;
