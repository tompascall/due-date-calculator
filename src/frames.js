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
      console.log(frame.type);
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

frames.validate = function(timeFrames){
  if (timeFrames !== null && timeFrames !== undefined) {
    if (Array.isArray(timeFrames)) {
      frames.checkObjects(timeFrames);
      frames.checkKeys(timeFrames);
      frames.checkTimeFormats(timeFrames);
      return true;
    }
  }
  frames.errorMissing();

};

module.exports = frames;
