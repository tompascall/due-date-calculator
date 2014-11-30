// due.date.calculator.js

'use strict';

var calc = {};

calc.copyDate = function(src, dest){
  dest.setTime(src.getTime());
};

calc.restingHours = {
  startWorkingHours : 9,
  endWorkingHours : 17,
  regular : true,
  frequency : 'day',
  frameLength : function(){
    return (24 - this.endWorkingHours + this.startWorkingHours) * 60 * 60 * 1000; // in ms
  },
  isInFrame : function(date){
    var testStartDate = new Date();
    var testEndDate = new Date();
    testStartDate.setTime(date.getTime());
    testEndDate.setTime(date.getTime());
    testStartDate.setHours(this.startWorkingHours, 0, 0, 0);
    testEndDate.setHours(this.endWorkingHours, 0, 0, 0);
    return date.getTime() < testStartDate.getTime ||
      date.getTime() > testEndDate.getTime();
  },
  setAfterTimeFrame: function(date){
    date.setTime(date.getTime() + this.frameLength());
    return date;
  }
};

calc.calculateDueDate = function(submitDate, turnaroundTime){
  var dueDate = new Date();
  this.copyDate(submitDate, dueDate);
  if (turnaroundTime === 0) return dueDate;
  for (var i = 0; i < turnaroundTime; i++){
    dueDate.setHours(dueDate.getHours() + 1); // step to next hour
    if (this.restingHours.isInFrame(dueDate)) {
      dueDate = this.restingHours.setAfterTimeFrame(dueDate);
    }
  }
  console.log(dueDate.toString());
  return dueDate;
};

module.exports = calc;
