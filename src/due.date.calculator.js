// due.date.calculator.js

'use strict';

var calc = {

};

calc.DueDate = function(){

};


calc.DueDate.prototype.validateSubmitDate = function(submitDate){
  if (submitDate instanceof Date) {
    return true;
  }
  else throw new Error('submitDate is not a Date object');
};

calc.DueDate.prototype.checkWorkingHours = function(submitDate, startWorkingHours, endWorkingHours){
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
  this.submitDate = date;
};

calc.DueDate.prototype.setTurnaroundTime = function(turnaroundTime){
  this.turnaroundTime = turnaroundTime;
};

calc.DueDate.prototype.init = function(submitDate, turnaroundTime){
  if (this.validateSubmitDate(submitDate) && this.checkWorkingHours(submitDate)){
    this.setSubmitDate(submitDate);
  }
  if (this.validateTurnaroundTime(turnaroundTime)) this.setTurnaroundTime(turnaroundTime);
};

calc.DueDate.prototype.calculateDueDate = function(submitDate, turnaroundTime){
  this.init(submitDate, turnaroundTime);
};

module.exports = calc;
