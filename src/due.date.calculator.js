// due.date.calculator.js

'use strict';

var calc = {};
var frames = require('./frames.js');

calc.msInMin = 1000 * 60 * 60;

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

calc.checkTimeFrames = function(args) {
  try {
    frames.validate(args[2]);
  }
  catch(e) {
    throw new Error('something went wrong: ' + e.message);
  }
};

calc.checkArgs = function(args){
  calc.checkArgsNumber(args);
  calc.checkArgSubmitDate(args);
  calc.checkArgTurnaroundTime(args);
  calc.checkTimeFrames(args);
};

calc.getRestTime = function(date) {
  return date.getSeconds() * 1000 + date.getMilliseconds();
};

calc.checkFrames = function(timeFrames, dueDate, restTime) {
  restTime = restTime || 0;
  var actualFrame;
  timeFrames.forEach(function(frame){
      actualFrame = frames.createFrame(frame, dueDate);
      if (actualFrame.startDate !== null) {
        dueDate.setTime(actualFrame.endDate.getTime() + restTime);
        dueDate = calc.checkFrames(timeFrames, dueDate, restTime);
      }
    });
  return dueDate;
};

calc.SubmitDateIsInFrame = function(submitDate, timeFrames){
  var actualFrame;
  var result = false;
  timeFrames.forEach(function(frame){
      actualFrame = frames.createFrame(frame, submitDate);
      if (actualFrame.startDate !== null) {
        result = true;
      }
    });
  return result;
};

calc.calculateDueDate = function(submitDate, turnaroundTime, timeFrames){
  calc.checkArgs(arguments);
  var dueDate = calc.cloneDate(submitDate);
  if (turnaroundTime === 0) return dueDate;
  if (timeFrames === undefined) {
    dueDate.setTime(dueDate.getTime() + turnaroundTime * calc.msInMin);
    return dueDate;
  }
  var restTime;
  if (calc.SubmitDateIsInFrame(submitDate, timeFrames)) {
    restTime = 0;
  }
  else {
    restTime = calc.getRestTime(dueDate);
  }
  for (var i = 1; i <= turnaroundTime; i++) {
    dueDate = calc.checkFrames(timeFrames, dueDate, restTime);
    dueDate.setMinutes(dueDate.getMinutes() + 1);
    console.log(i, dueDate.toString());
  }
  dueDate = calc.checkFrames(timeFrames, dueDate, restTime);

  return dueDate;
};

module.exports = calc;
