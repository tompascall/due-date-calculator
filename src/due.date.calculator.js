// due.date.calculator.js

'use strict';

var calc = {};

calc.copyDate = function(src, dest){
  dest.setTime(src.getTime());
};

calc.calculateDueDate = function(submitDate, turnaroundTime, timeFrames){
  var dueDate = new Date();
  this.copyDate(submitDate, dueDate);
  if (turnaroundTime === 0) return dueDate;
  for (var i = 0; i < turnaroundTime; i++){
    dueDate.setHours(dueDate.getHours() + 1); // step to next hour
    dueDate = timeFrames(dueDate);
  }
  return dueDate;
};

module.exports = calc;
