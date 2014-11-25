// due.date.calculator.js

'use strict';

var calc = {

};

calc.DueDate = function(){

};


calc.DueDate.prototype.validateSubmitDate = function(submitDate){
  return submitDate instanceof Date;
};

calc.DueDate.prototype.checkWorkingHours = function(submitDate, startWorkingHours, endWorkingHours){
  return submitDate.getHours() >= startWorkingHours && submitDate.getHours() <= endWorkingHours;
};

calc.DueDate.prototype.validateTurnaroundTime = function(turnaroundTime){
  return typeof(turnaroundTime) === 'number' && turnaroundTime === Math.floor(turnaroundTime);
};

module.exports = calc;
