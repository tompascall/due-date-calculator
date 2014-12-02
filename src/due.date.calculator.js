// due.date.calculator.js

'use strict';

var calc = {};

calc.copyDate = function(src, dest){
  dest.setTime(src.getTime());
};


calc.HandleFrames = function(submitDate, timeFrames){
 this.submitDate = calc.copyDate(submitDate, new Date());
 this.timeFrames = timeFrames.sort(this.compare);
 this.strip = [];
 this.swags = 0;
};

calc.HandleFrames.prototype.compare = function(a, b){
  if (a.priority > b.priority) return 1; // sort time frames by priority
};

calc.Frame = function(frame, date){
  var startDate = new Date();
  var endDate = new Date();
  calc.copyDate(date, startDate);
  calc.copyDate(date, endDate);

  this.startDate = this.setStartDate(startDate, frame);
  this.endDate = this.setEndDate(startDate, endDate, frame);
};

calc.Frame.prototype.setDay = function(date, day) {
  date.setDate(date.getDate() - date.getDay() + day);
};

calc.Frame.prototype.setStartDate = function(startDate, frame){
  switch(frame.unit){
    case 'hour':
      if (startDate.getHours() <= frame.start) {
        startDate.setHours(frame.start - 24);
      }
      else {
        startDate.setHours(frame.start);
      }
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

calc.Frame.prototype.setEndDate = function(startDate, endDate, frame) {
  endDate.setTime(startDate.getTime() + frame.length);
  return endDate;
};

calc.HandleFrames.prototype.isInFrame = function(frame, date){
  var frameDates = new calc.Frame(frame, date);

  if (date.getTime() > frameDates.startDate.getTime() &&
    date.getTime() < frameDates.endDate.getTime()) {
    return frameDates;
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

calc.HandleFrames.prototype.getSwagLength = function(frame, date){
  return date.getTime() - frame.startDate.getTime();
};

calc.HandleFrames.prototype.improveStrip = function(date){
  var frame;
  var frameDates;
  var i = 0;
  var firstFrame = true;

  do {
    frame = this.timeFrames[i];
    console.log('frame: ' + frame.name);
    frameDates = this.isInFrame(frame, date);
    if (frameDates) {
      if (firstFrame) this.swags += this.getSwagLength(frameDates, date);
      firstFrame = false;
      console.log('improve ' + this.swags);
      date.setTime(frameDates.endDate.getTime());
      console.log('endDate: ' + date.toString());
      i = 0;
    }
    else {
      i++;
    }
  }
  while (i < this.timeFrames.length);
};

calc.calculateDueDate = function(submitDate, turnaroundTime, timeFrames){
  var dueDate = new Date();
  this.copyDate(submitDate, dueDate);
  if (turnaroundTime === 0) return dueDate;
  var handleFrames = new calc.HandleFrames(submitDate, timeFrames);
  for (var i = 0; i < turnaroundTime; i++){
    dueDate.setHours(dueDate.getHours() + 1); // step to next hour
    handleFrames.improveStrip(dueDate);
    console.log('dueDate: ' + dueDate.toString());
    console.log('swags: ' + i + '. :' + handleFrames.swags / 1000 / 60 / 60);
  }
  if (handleFrames.swags > 0) {
    dueDate.setTime(dueDate.getTime() + handleFrames.swags);
  }
  return dueDate;
};

module.exports = calc;
