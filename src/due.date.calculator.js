// due.date.calculator.js

'use strict';

var calc = {
  startWorkingHours: 9,
  endWorkingHours: 17,
  timeOfRest: 16 //24 - (this.endWorkingHours - this.startingHours)
};

calc.DueDate = function(){

};

calc.SubmitDate = function(date){
  this.date = date;
  this.startingHours = this.date.getHours();
};

calc.DueDate.prototype.validateSubmitDate = function(submitDate){
  if (submitDate instanceof Date) {
    return true;
  }
  else throw new Error('submitDate is not a Date object');
};

calc.DueDate.prototype.checkSubmitDateInWorkingHours = function(submitDate, startWorkingHours, endWorkingHours){
  if (submitDate.getHours() >= startWorkingHours && submitDate.getHours() <= endWorkingHours) {
    return true;
  }
  else throw new Error('submitDate is not within working hours');
};

calc.DueDate.prototype.validateTurnaroundTime = function(turnaroundTime){
  if (typeof(turnaroundTime) === 'number' && turnaroundTime === Math.floor(turnaroundTime)) {
    return true;
  }
  else throw new Error('turnaroundTime is not a whole number');
};

calc.DueDate.prototype.copyDate = function(source, dest){
  dest.setTime(source.getTime());
};

calc.DueDate.prototype.setSubmitDate = function(submitDate){
  var date = new Date();
  this.copyDate(submitDate, date);
  this.submitDate = new calc.SubmitDate(date);
};

calc.DueDate.prototype.setTurnaroundTime = function(turnaroundTime){
  this.turnaroundTime = turnaroundTime;
};

calc.DueDate.prototype.init = function(submitDate, turnaroundTime){
  if (this.validateSubmitDate(submitDate) &&
    this.checkSubmitDateInWorkingHours(submitDate, calc.startWorkingHours, calc.endWorkingHours)){
    this.setSubmitDate(submitDate);
  }
  if (this.validateTurnaroundTime(turnaroundTime)) this.setTurnaroundTime(turnaroundTime);
};

calc.DueDate.prototype.calculateDueDate = function(submitDate, turnaroundTime){
  this.init(submitDate, turnaroundTime);
};

calc.SubmitDate.prototype.setRemainingHours = function(){
  if (this.date.getMinutes() === 0) {
    this.remainingHours = calc.endWorkingHours - this.startingHours;
  }
  else {
    this.remainingHours = calc.endWorkingHours - this.startingHours - 1;
  }
};

calc.DueDate.prototype.checkSaturday = function(distance){
  var date = new Date();
  this.copyDate(this.submitDate.date, date);
  date.setHours(date.getHours() + distance);
  return date.getDay() === 6; // Saturday
};

calc.DueDate.prototype.distInHours = function(startingHours, turnaroundTime, distance){
  var remainHours = calc.endWorkingHours - startingHours;
  if (remainHours >= turnaroundTime) return turnaroundTime + (distance || 0);
//   distance += remainHours + 1 + calc.timeOfRest;
//   turnaroundTime -= (remainHours + 1);
//   if (this.checkSaturday(distance)){
//     distance += 48;
//   }
//   if (turnaroundTime === 0) return distance;
//   return this.distInHours(calc.startingHours, turnaroundTime, distance);
};

module.exports = calc;
