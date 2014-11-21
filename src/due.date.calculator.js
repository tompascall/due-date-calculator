// due.date.calculator.js

'use strict';

var calc = {
  startWorkingHours : 9,
  endWorkingHours : 17
};

calc.Turnaround = function(workingHours){
  this.days = Math.floor(workingHours / (calc.endWorkingHours - calc.startWorkingHours));
  this.remainderHours = workingHours % (calc.endWorkingHours - calc.startWorkingHours);
  this.minutes = workingHours * 60;
};

calc.SubmitDate = function(date){
  this.day = date.getDate();
  this.hours = date.getHours();
  this.minutes = date.getMinutes();
};

calc.SubmitDate.prototype.remainingMinutes = function(){
  return 60 - this.minutes + (calc.endWorkingHours - (this.hours + 1)) * 60;
};

calc.DueDate = function(submitDate, turnaroundTime){
  this.submitDate = new calc.SubmitDate(submitDate);
  this.turnaroundTime = new calc.Turnaround(turnaroundTime);
};

module.exports = calc;
