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
  this.date = date;
};

calc.SubmitDate.prototype.remainingMinutes = function(){
  return 60 - this.minutes + (calc.endWorkingHours - (this.hours + 1)) * 60;
};

calc.Due = function(submitDate, turnaroundTime){
  this.submitDate = new calc.SubmitDate(submitDate);
  this.turnaroundTime = new calc.Turnaround(turnaroundTime);
};

calc.Due.prototype.onSubmitDay = function(){
  return (this.submitDate.remainingMinutes() < this.turnaroundTime.minutes) ? false : true;
};

calc.Due.prototype.calculateDueDate = function(submitDate, turnaroundTime){
  this.dueDate = new calc.SubmitDate(submitDate);
  this.turnaroundTime = new calc.Turnaround(turnaroundTime);
    // to set this.turnaroundTime is quite unnecessary, because it has been set
    // in the constructor already, but according to the description of the task
    // the calculateDueDate() method needs turnaroundTime parameter
  if (this.onSubmitDay){
    this.dueDate.date.setMinutes(this.submitDate.date.getMinutes() +
      this.turnaroundTime.minutes);
  }
  return this.dueDate.date;
};

module.exports = calc;
