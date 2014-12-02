// due.date.calculator.js

'use strict';

var calc = {};

calc.copyDate = function(src, dest){
  dest.setTime(src.getTime());
};

calc.Term = function(startDate, endDate, type){
  this.startDate = startDate;
  this.endDate = endDate;
  this.type = (type || 'noFrame');
};

calc.HandleFrames = function(timeFrames){
 this.timeFrames = timeFrames.sort(this.compare);
};

calc.HandleFrames.prototype.compare = function(a, b){
  if (a.priority > b.priority) return 1; // sort time frames by priority
};

calc.HandleFrames.prototype.setDay = function(date, day) {
  date.setDate(date.getDate() - date.getDay() + day);
};

calc.HandleFrames.prototype.setStartDate = function(startDate, frame){
  switch(frame.unit){
    case 'hour':
      startDate.setHours(frame.start);
      break;
    case 'dayOfWeek':
      this.setDay(startDate, frame.start);
      startDate.setHours(0);
      break;
    case 'date':
      startDate = new Date(frame.start);
      break;
    default:
      throw new Error('invalid frame unit');
  }
  return startDate;
};

calc.HandleFrames.prototype.setEndDate = function(startDate, endDate, frame) {
  endDate.setTime(startDate.getTime() + frame.length);
  return endDate;
};

calc.HandleFrames.prototype.isInFrame = function(frame, date){
  var startDate = new Date();
  var endDate = new Date();
  calc.copyDate(date, startDate);
  calc.copyDate(date, endDate);

  startDate = this.setStartDate(startDate, frame);
  endDate = this.setEndDate(startDate, endDate, frame);
  if (date.getTime() > startDate.getTime() &&
    date.getTime() < endDate.getTime()) {
    return true;
  }
  else return false;
};

calc.HandleFrames.prototype.getDateTime = function(date){
  var baseDate = new Date();
  calc.copyDate(date, baseDate);
  baseDate.setHours(0, 0, 0, 0);
  return date.getTime() - baseDate.getTime();
};

calc.HandleFrames.prototype.setDateAFterFrame = function(date, frame){
  date.setTime(date.getTime() + frame.length);
};

calc.HandleFrames.prototype.nextDate = function(date){
  for (var i = 0; i < this.timeFrames.length; i++) {
    if (this.isInFrame(this.timeFrames[i], date)) {
      this.setDateAFterFrame(date, this.timeFrames[i]);
    }
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
    //dueDate = handleFrames.nextDate(dueDate);
  }
  return dueDate;
};

module.exports = calc;
