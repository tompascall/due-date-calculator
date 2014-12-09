// due.date.calculator.js

'use strict';

var calc = {};

calc.copyDate = function(src, dest){
  dest.setTime(src.getTime());
};

calc.checkArgs = function(args){
  var argArr = Array.prototype.slice.call(args);
  if (argArr.length < 2) {
    throw new Error('calculateDueDate() function must have at least 2 arguments');
  }
  var date = new Date();
  if (!date.isPrototypeOf(argArr[0])) {
    throw new Error('submitDate argument must be a date object');
  }
};

calc.calculateDueDate = function(submitDate, turnaroundTime, timeFrames){
  calc.checkArgs(arguments);
};

module.exports = calc;
