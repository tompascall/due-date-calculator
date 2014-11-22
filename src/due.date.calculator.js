// due.date.calculator.js

'use strict';

var calc = {
  startWorkingHours : 9,
  endWorkingHours : 17
};

calc.Turnaround = function(turnaroundTime){
  this.days = Math.floor(turnaroundTime / (calc.endWorkingHours - calc.startWorkingHours));
  this.remainderHours = turnaroundTime % (calc.endWorkingHours - calc.startWorkingHours);
  this.minutes = turnaroundTime * 60;
};

calc.SubmitDate = function(date){
  this.day = date.getDate();
  this.hours = date.getHours();
  this.minutes = date.getMinutes();
  this.date = date;
};

calc.SubmitDate.prototype.remainingMinutesOnSubmitDay = function(){
  return 60 - this.minutes + (calc.endWorkingHours - (this.hours + 1)) * 60;
};

calc.Due = function(){

};

calc.Due.prototype.setSubmitDate = function(submitDate){
  var date = new Date();
  date.setTime(submitDate.getTime());
  this.submitDate = new calc.SubmitDate(date);
};

calc.Due.prototype.setTurnaroundTime = function(turnaroundTime){
  this.turnaroundTime = new calc.Turnaround(turnaroundTime);
};

calc.Due.prototype.onSubmitDay = function(){
  return (this.submitDate.remainingMinutesOnSubmitDay() < this.turnaroundTime.minutes) ? false : true;
};

calc.Due.prototype.calculateDueDate = function(submitDate, turnaroundTime){
  this.setSubmitDate(submitDate);
  this.setTurnaroundTime(turnaroundTime);
  var dueDate = new Date();
  dueDate.setTime(submitDate.getTime());
  if (this.onSubmitDay){
    dueDate.setMinutes(this.submitDate.date.getMinutes() + this.turnaroundTime.minutes);
    return dueDate;
  }

};

module.exports = calc;
