// due.date.calculator.js

'use strict';

var calc = {};

calc.copyDate = function(src, dest){
  dest.setTime(src.getTime());
};

calc.checkArgs = function(args){
  if (args.length < 2) {
    throw new Error('calculateDueDate() function must have at least 2 arguments');
  }
  if (!(args[0] instanceof Date)){
    throw new Error('submitDate argument must be a date object');
  }
  if (typeof args[1] !== 'number'){
    throw new Error('turnaroundTime argument must be a number');
  }
};

calc.calculateDueDate = function(submitDate, turnaroundTime, timeFrames){
  calc.checkArgs(arguments);
};

module.exports = calc;
