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

module.exports = calc;
