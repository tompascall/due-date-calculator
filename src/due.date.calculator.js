// due.date.calculator.js

'use strict';

var calc = {};

calc.copyDate = function(src, dest){
  dest.setTime(src.getTime());
};

calc.FrameOptions = function() {
  this.startHours = 0;
  this.endHours = 0;
  this.days = 0;
  this.regular = false;
  this.priority = 0;
};

calc.TimeFrame = function(frameOptions){
  var keys = Object.keys(frameOptions);
  var self = this;
  keys.forEach(function(key){
    self[key] = frameOptions[key];
  });

  this.isInFrame = function(date){
    var testStartDate = new Date();
    testStartDate.setTime(date.getTime());
    var testEndDate = new Date();
    testEndDate.setTime(date.getTime());

    testStartDate.setHours(this.startHours, 0, 0, 0);
    if (this.endHours >= this.startHours) {
      testEndDate.setHours(this.endHours + this.days * 24, 0, 0, 0);
    }
    else {
      testEndDate.setHours(this.endHours + 24 + this.days * 24, 0, 0, 0);
    }
    // console.log('date: ' + date.toString());
    // console.log('testStartDate: ' + testStartDate.toString());
    // console.log('testEndDate: ' + testEndDate.toString() + '\n');
    return date.getTime() > testStartDate.getTime() &&
      date.getTime() < testEndDate.getTime();
  };
};

calc.TimeFrame.prototype.frameLength = function(){
  var millisecondsOfHour = 60 * 60 * 1000;
  if (this.startHours === this.endHours) {
    return this.days * 24 * millisecondsOfHour;
  }
  if (this.startHours < this.endHours) {
    return (this.endHours - this.startHours) * millisecondsOfHour +
      this.days * 24 * millisecondsOfHour;
  }
  return (24 - this.startHours + this.endHours) * millisecondsOfHour +
    this.days * 24 * millisecondsOfHour;
};

calc.TimeFrame.prototype.setAfterTimeFrame = function(date){
  date.setTime(date.getTime() + this.frameLength());
  return date;
};


calc.calculateDueDate = function(submitDate, turnaroundTime, restingHoursFrameOptions){
  var dueDate = new Date();
  this.copyDate(submitDate, dueDate);
  if (turnaroundTime === 0) return dueDate;
  var restingHours = new calc.TimeFrame(restingHoursFrameOptions);
  for (var i = 0; i < turnaroundTime; i++){
    dueDate.setHours(dueDate.getHours() + 1); // step to next hour
    if (restingHours.isInFrame(dueDate)) {
      dueDate = restingHours.setAfterTimeFrame(dueDate);
    }
  }
  //console.log(dueDate.toString());
  return dueDate;
};

module.exports = calc;
