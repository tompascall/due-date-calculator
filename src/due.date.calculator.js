// due.date.calculator.js

'use strict';

var calc = {
  startWorkingHours : 9,
  endWorkingHours : 17
};

calc.copyDate = function(srcDate, destDate){
  destDate.setTime(srcDate.getTime());
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

calc.SubmitDate.prototype.remainingHoursOnSubmitDay = function(){
  if (!this.minutes) {
    return calc.endWorkingHours - this.hours;
  }
  else {
    return calc.endWorkingHours - this.hours - 1;
  }
};

calc.Due = function(){

};

calc.Due.prototype.setSubmitDate = function(submitDate){
  var date = new Date();
  calc.copyDate(submitDate, date);
  this.submitDate = new calc.SubmitDate(date);
  this.storeSubmitDate = new calc.SubmitDate(date);
};

calc.Due.prototype.setTurnaroundTime = function(turnaroundTime){
  this.turnaroundTime = new calc.Turnaround(turnaroundTime);
  this.storeTurnaroundTime = new calc.Turnaround(turnaroundTime);
};

calc.Due.prototype.onSubmitDay = function(){
  return (this.submitDate.remainingMinutesOnSubmitDay() < this.turnaroundTime.minutes) ? false : true;
};

calc.Due.prototype.dayDistance = function(){
  if (this.onSubmitDay()) return 0;
  var date = new Date();
  calc.copyDate(this.submitDate.date, date);
  //var dist = this.turnaroundTime.days; // minimum day distance

  //date.setDate(date.getDate() + dist);

};

calc.Due.prototype.calculateDueDate = function(submitDate, turnaroundTime){
  this.setSubmitDate(submitDate);
  this.setTurnaroundTime(turnaroundTime);
  var dueDate = new Date();
  calc.copyDate(submitDate, dueDate);
  if (this.dayDistance() === 0){
    dueDate.setMinutes(this.submitDate.date.getMinutes() + this.turnaroundTime.minutes);
    return dueDate;
  }
};

module.exports = calc;
