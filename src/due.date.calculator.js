// due.date.calculator.js

'use strict';

var calc = {};

calc.copyDate = function(src, dest){
  dest.setTime(src.getTime());
};


calc.HandleFrames = function(submitDate, timeFrames){
 this.submitDate = calc.copyDate(submitDate, new Date());
 this.timeFrames = timeFrames;
 this.swags = 0;
};

calc.Frame = function(frame, date){
  var startDate = new Date();
  var endDate = new Date();
  calc.copyDate(date, startDate);
  calc.copyDate(date, endDate);

  this.startDate = this.setStartDate(startDate, frame);
  this.endDate = this.setEndDate(endDate, frame);
};

calc.Frame.prototype.setDay = function(date, day) {
  if (date.getDay() !== 0) {
    date.setDate(date.getDate() - date.getDay() + day);
  }
  else {
    date.setDate(date.getDate() - 7 + day);
  }
};

calc.Frame.prototype.setStartDate = function(startDate, frame){

  switch(frame.unit){
    case 'hour':
      var testStartDate = new Date();
      var testEndDate = new Date();
      calc.copyDate(startDate, testStartDate);
      calc.copyDate(startDate, testEndDate);

      testStartDate.setHours(frame.start, 0, 0, 0);
      testEndDate.setTime(testStartDate.getTime() + frame.length);

      if (startDate.getTime() > testStartDate.getTime()) {
        startDate = testStartDate;
      }
      else {
        testEndDate.setHours(testEndDate.getHours() - 24);
        if (startDate.getTime() < testEndDate.getTime()) {
          startDate.setHours(testStartDate.getHours() - 24);
        }
      }

      break;
    case 'dayOfWeek':
      this.setDay(startDate, frame.start);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'date':
      startDate = new Date(frame.start);
      break;
    default:
      throw new Error('invalid frame unit');
  }
  return startDate;
};

calc.Frame.prototype.setEndDate = function(endDate, frame) {
  endDate.setTime(this.startDate.getTime() + frame.length);
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
    frameDates = this.isInFrame(frame, date);
    if (frameDates) {
      if (firstFrame) {
        this.swags += this.getSwagLength(frameDates, date);
        firstFrame = false;
      }
      date.setTime(frameDates.endDate.getTime());
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
  var msInHour = 1000 * 60 * 60;
  this.copyDate(submitDate, dueDate);
  if (turnaroundTime === 0) return dueDate;
  var handleFrames = new calc.HandleFrames(submitDate, timeFrames);
  for (var i = 0; i < turnaroundTime; i++){
    dueDate.setHours(dueDate.getHours() + 1); // step to next hour
    handleFrames.improveStrip(dueDate);
  }

  while (Math.floor(handleFrames.swags / msInHour) > 0) {
    handleFrames.swags -= msInHour;
    dueDate.setHours(dueDate.getHours() + 1); // step to next hour
    handleFrames.improveStrip(dueDate);
  }


  dueDate.setTime(dueDate.getTime() + (handleFrames.swags % msInHour));
  return dueDate;
};

module.exports = calc;
