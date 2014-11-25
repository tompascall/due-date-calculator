// due.date.calculator.js

'use strict';

var calc = {

};

calc.DueDate = function(){

};


calc.DueDate.prototype.validateSubmitDate = function(submitDate){
  return submitDate instanceof Date;
};

module.exports = calc;
