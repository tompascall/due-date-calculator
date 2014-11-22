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
};

calc.Due.prototype.setTurnaroundTime = function(turnaroundTime){
  this.turnaroundTime = new calc.Turnaround(turnaroundTime);
};

calc.Due.prototype.init = function(submitDate, turnaroundTime){
  this.setSubmitDate(submitDate);
  this.setTurnaroundTime(turnaroundTime);
  this.overflowHours = this.submitDate.remainingHoursOnSubmitDay() <
    this.turnaroundTime.remainderHours;
};

calc.Due.prototype.onSubmitDay = function(){
  return (this.submitDate.remainingMinutesOnSubmitDay() >
    this.turnaroundTime.minutes) ? true : false;
};

calc.Due.prototype.getNextDay = function(date, day){
  day++;
  date.setDate(day);
  if (date.getDay() === 6) { // Saturday
    day += 2;
  }
  return day;
};

calc.Due.prototype.getDueDay = function(){
  var day = this.submitDate.day;
  var date = new Date();
  calc.copyDate(this.submitDate.date, date);

  if (this.onSubmitDay()) return date;

  if (!this.turnaroundTime.days) {
    day = this.getNextDay(date, day);
    date.setDate(day);
    return date;
  }

  for (var i = 1; i <= this.turnaroundTime.days; i++){
    day = this.getNextDay(date, day);
  }

  if (this.overflowHours){
    day = this.getNextDay(date, day);
  }

  date.setDate(day);
  return date;
};

calc.Due.prototype.dueDateOnSameDay = function(dueDate){
  dueDate.setMinutes(this.submitDate.date.getMinutes() + this.turnaroundTime.minutes);
  return dueDate;
};

calc.Due.prototype.calculateDueDate = function(submitDate, turnaroundTime){
  this.init(submitDate, turnaroundTime);
  var dueDate = this.getDueDay();

  if (dueDate.getDate() === this.submitDate.date.getDate()){
    return this.dueDateOnSameDay(dueDate);
  }

  if (this.overflowHours) {
    var diff = this.turnaroundTime.remainderHours -
      this.submitDate.remainingHoursOnSubmitDay();
    dueDate.setHours(calc.startWorkingHours + diff);
    return dueDate;
  }

  dueDate.setHours(this.submitDate.hours + this.turnaroundTime.remainderHours);
  return dueDate;
};

module.exports = calc;
