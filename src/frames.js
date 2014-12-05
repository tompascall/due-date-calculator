// frames.js

'use strict';

var frames = {};

frames.errorMissing = function(){
  throw new Error('TimeFrames argument missing or not an array');
};

frames.checkObjects = function(timeFrames){
  var isObject = true;
  timeFrames.forEach(function(frame){
    if (typeof frame !== 'object') {
      isObject = false;
    }
  });
  if (!isObject) {
    throw new Error('Time frames must be objects');
  }
};

frames.types = ['daily', 'weekly', 'monthly', 'dates'];
frames.days = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];

frames.checkKeys = function(timeFrames){
  timeFrames.forEach(function(frame){
    if (!frame.hasOwnProperty('type')) {
      throw new Error('Frame must have type key');
    }
    if (frames.types.indexOf(frame.type) === -1) {
      throw new Error('Frame must be "daily", "weekly", "monthly", or "dates" type');
    }
    if (!frame.hasOwnProperty('start') || !frame.hasOwnProperty('end')) {
      throw new Error('Frame must have "start" and "end" keys');
    }
  });
};

frames.checkDailyFormat = function(timeFrames){
  var time = /^\d\d\:\d\d$/; // hh:mm
  timeFrames.forEach(function(frame) {
    if (frame.type === 'daily' && (!time.test(frame.start) || !time.test(frame.end))) {
      throw new Error('"start" and "end" format of "daily" time frame must be "hh:mm"');
    }
  });
};

frames.checkWeeklyFormat = function(timeFrames){
  var days = /^(\D{3})\:\d\d\:\d\d$/; // Day:hh:mm
  var day;
  timeFrames.forEach(function(frame) {
    if (frame.type === 'weekly') {
      day = days.exec(frame.start);
      if (!day || frames.days.indexOf(day[1]) === -1) {
        throw new Error('"start" and "end" format of "weekly" time frame ' +
        'must be the following: "Day:hh:mm", where the "Day" must be ' +
        '"Sun", "Mon", "Tue", "Wen", "Thu", "Fri", or "Sat"');
      }

      day = days.exec(frame.end);
      if (!day || frames.days.indexOf(day[1]) === -1) {
        throw new Error('"start" and "end" format of "weekly" time frame ' +
        'must be the following: "Day:hh:mm", where the "Day" must be ' +
        '"Sun", "Mon", "Tue", "Wen", "Thu", "Fri", or "Sat"');
      }
    }
  });
};

frames.checkMonthlyFormat = function(timeFrames) {
  var day = /^\d\d\.\d\d\:\d\d$/; // dd.hh:mm
  timeFrames.forEach(function(frame) {
    if (frame.type === 'monthly' && (!day.test(frame.start) || !day.test(frame.end))) {
      throw new Error('"start" and "end" format of "monthly" time frame ' +
        'must be the following: "dd.hh:mm", where the "dd" must be ' +
        'the number of day of the month (an integer between 01 and 31)');
    }
  });
};

frames.checkTimeFormats = function(timeFrames){
  frames.checkDailyFormat(timeFrames);
  frames.checkWeeklyFormat(timeFrames);
  frames.checkMonthlyFormat(timeFrames);
};

frames.buffer = [];

// frames.Frame = function(type, startHour, startMin, endHour, endMin, startDay, endDay){
//   this.type = frame.type;
//   this.start = this.setStart(frame);
//   this.end = this.setEnd(frame);
// };

// frames.Frame.prototype.setStart = function(frame){
//   return frame.start;
// };

// frames.Frame.prototype.setEnd = function(frame){
//   return frame.end;
// };

frames.checkDailyValues = function(timeFrames){
  var time = /^(\d\d)\:(\d\d)$/;
  var timeStart, timeEnd;
  timeFrames.forEach(function(frame){
    if (frame.type === 'daily'){
      timeStart = time.exec(frame.start);
      timeEnd = time.exec(frame.end);
      if (parseInt(timeStart[1]) > 23 || parseInt(timeStart[2]) > 59 ||
        parseInt(timeEnd[1]) > 23 || parseInt(timeEnd[2]) > 59) {
          throw new Error('the value of "start" end "end" of "daily" time frame must be valid time value');
      }
    }
  });
};

frames.checkWeeklyValues = function(timeFrames){
  var time = /^\D{3}\:(\d\d)\:(\d\d)$/;
  var timeStart, timeEnd;
  timeFrames.forEach(function(frame){
    if (frame.type === 'weekly'){
      timeStart = time.exec(frame.start);
      timeEnd = time.exec(frame.end);
      if (parseInt(timeStart[1]) > 23 || parseInt(timeStart[2]) > 59 ||
        parseInt(timeEnd[1]) > 23 || parseInt(timeEnd[2]) > 59) {
          throw new Error('the value of "start" end "end" of "weekly" time frame must be valid time value');
      }
    }
  });
};

frames.checkMonthlyValues = function(timeFrames) {
  var time = /^\d\d\.(\d\d)\:(\d\d)$/;
  var timeStart, timeEnd;
  timeFrames.forEach(function(frame){
    if (frame.type === 'monthly'){
      timeStart = time.exec(frame.start);
      timeEnd = time.exec(frame.end);
      if (parseInt(timeStart[1]) > 23 || parseInt(timeStart[2]) > 59 ||
        parseInt(timeEnd[1]) > 23 || parseInt(timeEnd[2]) > 59) {
          throw new Error('the value of "start" end "end" of "monthly" time frame must be valid time value');
      }
    }
  });
};

frames.checkDatesValues = function(timeFrames){
  var startDate, endDate;
  timeFrames.forEach(function(frame){
    if (frame.type === 'dates') {
      try {
        startDate = new Date(frame.start).toISOString();
        endDate = new Date(frame.end).toISOString();
      }
      catch(e) {
        throw new Error('the value of "start" end "end" of "dates" time frame must be valid ISO date string');
      }
    }
  });
};

frames.checkValues = function(timeFrames){
  frames.checkDailyValues(timeFrames);
  frames.checkWeeklyValues(timeFrames);
  frames.checkMonthlyValues(timeFrames);
  frames.checkDatesValues(timeFrames);

};

frames.validate = function(timeFrames){
  if (timeFrames !== null && timeFrames !== undefined) {
    if (Array.isArray(timeFrames)) {
      frames.checkObjects(timeFrames);
      frames.checkKeys(timeFrames);
      frames.checkTimeFormats(timeFrames);
      frames.checkValues(timeFrames);
      return true;
    }
  }
  frames.errorMissing();

};

module.exports = frames;
