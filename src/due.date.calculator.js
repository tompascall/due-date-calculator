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

calc.getRest = function(date) {
  return date.getSeconds() * 1000 + date.getMilliseconds();
};

calc.calculateDueDate = function(submitDate, turnaroundTime, timeFrames){
  calc.checkArgs(arguments);
  var dueDate = calc.cloneDate(submitDate);
  if (turnaroundTime === 0) return dueDate;
  if (timeFrames === undefined) {
    dueDate.setTime(dueDate.getTime() + turnaroundTime * calc.msInMin);
    return dueDate;
  }
  var actualFrame;
  var rest = calc.getRest(dueDate);
  /*jshint -W083 */ // we can use forEach within a loop
  for (var i = 0; i < turnaroundTime; i++) {
    timeFrames.forEach(function(frame){
      actualFrame = frames.createFrame(frame, dueDate);
      if (actualFrame.startDate !== null) {
        dueDate.setTime(actualFrame.endDate.getTime());
      }
    });
    dueDate.setMinutes(dueDate.getMinutes() + 1);
  }
  dueDate.setTime(dueDate.getTime() + rest);
  return dueDate;
};

module.exports = calc;
