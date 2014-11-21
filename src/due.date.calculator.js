// due.date.calculator.js

'use strict';

var calc = {};

calc.Turnaround = function(workingHours){
  this.days = Math.floor(workingHours / 8);
  this.hours = workingHours % 8;
};

calc.SubmitDate = function(date){
  this.day = date.getDate();
  this.hours = date.getHours();
  this.minutes = date.getMinutes();
};

module.exports = calc;
