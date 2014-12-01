// due.date.calculator.js

'use strict';

var calc = {};

calc.copyDate = function(src, dest){
  dest.setTime(src.getTime());
};

calc.HandleFrames = function(timeFrames){
 this.timeFrames = timeFrames.sort(this.compare);
};

calc.HandleFrames.prototype.compare = function(a, b){
  if (a.priority > b.priority) return 1; // sort time frames by priority
};

calc.HandleFrames.prototype.isInFrame = function(frame, date){
  var startDate = new Date();
  var endDate = new Date();
  calc.copyDate(date, startDate);
  calc.copyDate(date, endDate);
  if (frame.unit === 'hour') {
    startDate.setHours(frame.start);
    endDate.setTime(startDate.getTime() + frame.length);
    if (date.getTime() > startDate.getTime() &&
      date.getTime() < endDate.getTime()) {
      return true;
    }
  }
};

calc.HandleFrames.prototype.setDateAFterFrame = function(date, frame){
  date.setTime(date.getTime() + frame.length);
};

calc.HandleFrames.prototype.nextDate = function(date){
  if (this.isInFrame(this.timeFrames[0], date)) {
    this.setDateAFterFrame(date, this.timeFrames[0]);
  }
  return date;
};

calc.calculateDueDate = function(submitDate, turnaroundTime, timeFrames){
  var dueDate = new Date();
  this.copyDate(submitDate, dueDate);
  if (turnaroundTime === 0) return dueDate;
  var handleFrames = new calc.HandleFrames(timeFrames);
  for (var i = 0; i < turnaroundTime; i++){
    dueDate.setHours(dueDate.getHours() + 1); // step to next hour
    dueDate = handleFrames.nextDate(dueDate);
  }
  return dueDate;
};

module.exports = calc;
