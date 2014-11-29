// due.date.calculator.js

'use strict';

var calc = {};

calc.calculateDueDate = function(submitDate, turnaroundTime, timeFrames){
  var dueDate = new Date();
  dueDate.setTime(submitDate.getTime()); // copy date
  if (turnaroundTime === 0) return dueDate;
  for (var i = 0; i < turnaroundTime; i++){
    dueDate.setHours(dueDate.getHours() + 1); // step to next hour
    dueDate = timeFrames.restingHours(dueDate);
    dueDate = timeFrames.weekend(dueDate);
  }
  return dueDate;
};

module.exports = calc;
