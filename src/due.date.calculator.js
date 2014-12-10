// due.date.calculator.js

'use strict';

var calc = {};

calc.cloneDate = function(date){
  var clone = new Date();
  clone.setTime(date.getTime());
  return clone;
};


calc.checkArgsNumber = function(args) {
  if (args.length < 2) {
    throw new Error('calculateDueDate() function must have at least 2 arguments');
  }
};

calc.checkArgSubmitDate = function(args) {
  if (!(args[0] instanceof Date)){
    throw new Error('submitDate argument must be a date object');
  }
};

calc.checkArgTurnaroundTime = function(args) {
  if (typeof args[1] !== 'number'){
    throw new Error('turnaroundTime argument must be a number');
  }
  if (Math.floor(args[1]) !== args[1]) {
    throw new Error('turnaroundTime argument must be an integer number');
  }
};

calc.checkArgs = function(args){
  calc.checkArgsNumber(args);
  calc.checkArgSubmitDate(args);
  calc.checkArgTurnaroundTime(args);
};

calc.calculateDueDate = function(submitDate, turnaroundTime, timeFrames){
  calc.checkArgs(arguments);
};

module.exports = calc;
