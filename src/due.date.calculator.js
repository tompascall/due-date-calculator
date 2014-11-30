// due.date.calculator.js

'use strict';

var calc = {};

calc.copyDate = function(src, dest){
  dest.setTime(src.getTime());
};

calc.timeFrames = function(date){
  restingHours(date);
  weekend(date);
  return date;

  function restingHours(date){
    var startWorkingHours = 9;
    var endWorkingHours = 17;
    var endWorkingDate = getEndworkingDate(date, new Date());

    var diff = date.getTime() - endWorkingDate.getTime();
    if (diff > 0) {
      date.setHours(date.getHours() + (24 - endWorkingHours + startWorkingHours));
    }
    return date;

    function getEndworkingDate(date, endWorkingDate){
      endWorkingDate.setTime(date.getTime());
      endWorkingDate.setHours(endWorkingHours, 0, 0, 0);
      return endWorkingDate;
    }
  }
  function weekend(date){
    var saturday = 6;
    if (date.getDay() === saturday){
      date.setDate(date.getDate() + 2);
    }
    return date;
  }
};

calc.calculateDueDate = function(submitDate, turnaroundTime){
  var dueDate = new Date();
  this.copyDate(submitDate, dueDate);
  if (turnaroundTime === 0) return dueDate;
  for (var i = 0; i < turnaroundTime; i++){
    dueDate.setHours(dueDate.getHours() + 1); // step to next hour
    dueDate = this.timeFrames(dueDate);
  }
  return dueDate;
};

module.exports = calc;
