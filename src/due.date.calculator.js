// due.date.calculator.js

'use strict';

var calc = {};

calc.copyDate = function(src, dest){
  dest.setTime(src.getTime());
};

// calc.calculateDueDate = function(submitDate, turnaroundTime, timeFrames){

// };

module.exports = calc;
