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
module.exports = calc;
