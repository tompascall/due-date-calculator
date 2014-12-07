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

frames.checkNameKey = function(frame){
  if (!frame.hasOwnProperty('name')) {
    throw new Error('Frame must have "name" key');
  }
  if (typeof frame.name !== 'string'){
    throw new Error('"name" key of frames must be a string');
  }
};

frames.checkTypeKey = function(frame){
  if (!frame.hasOwnProperty('type')) {
    throw new Error('Frame must have "type" key');
  }
  if (frames.types.indexOf(frame.type) === -1) {
    throw new Error('Frame must be "daily", "weekly", "monthly", or "dates" type');
  }
};

frames.checkStartEndKey = function(frame){
  if (!frame.hasOwnProperty('start') || !frame.hasOwnProperty('end')) {
    throw new Error('Frame must have "start" and "end" keys');
  }
};

frames.checkKeys = function(timeFrames){
  timeFrames.forEach(function(frame){
    frames.checkNameKey(frame);
    frames.checkTypeKey(frame);
    frames.checkStartEndKey(frame);
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
  var days = /^\d\d\.\d\d\:\d\d$/; // dd:hh:mm
  var day;
  timeFrames.forEach(function(frame) {
    if (frame.type === 'weekly') {
      day = days.exec(frame.start);
      if (day === null) {
        throw new Error('"start" and "end" format of "weekly" time frame ' +
        'must be the following: "dd.hh:mm", where the "dd" must be ' +
        '"00" to "06", where "00" means Sunday');
      }

      day = days.exec(frame.end);
      if (day === null) {
        throw new Error('"start" and "end" format of "weekly" time frame ' +
        'must be the following: "dd.hh:mm", where the "dd" must be ' +
        '"00" to "06", where "00" means Sunday');
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

frames.checkDatesFormat = function(timeFrames){
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

frames.checkTimeFormats = function(timeFrames){
  frames.checkDailyFormat(timeFrames);
  frames.checkWeeklyFormat(timeFrames);
  frames.checkMonthlyFormat(timeFrames);
  frames.checkDatesFormat(timeFrames);
};

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
  var time = /^(\d\d)\.(\d\d)\:(\d\d)$/;
  var timeStart, timeEnd;
  timeFrames.forEach(function(frame){
    if (frame.type === 'weekly'){
      timeStart = time.exec(frame.start);
      timeEnd = time.exec(frame.end);
      if (parseInt(timeStart[1]) > 6 ||
        parseInt(timeStart[2]) > 23 || parseInt(timeStart[3]) > 59 ||
        parseInt(timeEnd[2]) > 23 || parseInt(timeEnd[3]) > 59) {
          throw new Error('the value of "start" end "end" of "weekly" time frame must be valid time value');
      }
    }
  });
};

frames.checkMonthlyValues = function(timeFrames) {
  var time = /^(\d\d)\.(\d\d)\:(\d\d)$/;
  var timeStart, timeEnd;
  timeFrames.forEach(function(frame){
    if (frame.type === 'monthly'){
      timeStart = time.exec(frame.start);
      timeEnd = time.exec(frame.end);
      if (parseInt(timeStart[1]) === 0 || parseInt(timeStart[1]) > 31 ||
        parseInt(timeStart[2]) > 23 || parseInt(timeStart[3]) > 59 ||
        parseInt(timeEnd[2]) > 23 || parseInt(timeEnd[3]) > 59) {
          throw new Error('the value of "start" end "end" of "monthly" time frame must be valid day and time value');
      }
    }
  });
};

frames.checkDatesValues = function(timeFrames){
  var startDate, endDate;
  timeFrames.forEach(function(frame){
    if (frame.type === 'dates'){
      startDate = new Date(frame.start);
      endDate = new Date(frame.end);
      if (startDate.getTime() > endDate.getTime()) {
        throw new Error('the "start" date of "dates" time frame must be before the "end" date');
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

frames.CreateFrame = function(frame, referenceDate){
  this.name = frame.name;
  this.type = frame.type;
  this.startTime = this.setFrameStartTime(frame);
  this.startDay = this.setFrameStartDay(frame);
  this.referenceDate = this.cloneDate(referenceDate);
  this.length = this.setFrameLength(frame);
};

frames.CreateFrame.prototype.cloneDate = function(date) {
  if (date !== undefined) {
    var clone = new Date();
    clone.setTime(date.getTime());
    return clone;
  }
};

frames.CreateFrame.prototype.setDailyFrameStartTime = function(frame){
  var time = /^(\d\d)\:(\d\d)$/;
  var timeStart = time.exec(frame.start);
  return parseInt(timeStart[1]) * 60 + parseInt(timeStart[2]); // start measured in minutes
};

frames.CreateFrame.prototype.setWeeklyFrameStartTime = function(frame){
  var days = /^\d\d\.(\d\d)\:(\d\d)$/; // dd:hh:mm
  var time;
  time = days.exec(frame.start);
  return parseInt(time[1]) * 60 + parseInt(time[2]); // start time measured in minutes
};

frames.CreateFrame.prototype.setMonthlyFrameStartTime = function(frame) {
  var days = /^\d\d\.(\d\d)\:(\d\d)$/; // dd:hh:mm
  var time;
  time = days.exec(frame.start);
  return parseInt(time[1]) * 60 + parseInt(time[2]); // start time measured in minutes
};

frames.CreateFrame.prototype.setFrameStartDay = function(frame){
  var days;
  switch(frame.type){
    case 'weekly':
      days = /^(\d\d)\.\d\d\:\d\d$/.exec(frame.start);
      return parseInt(days[1]);
    case 'monthly':
      days = /^(\d\d)\.\d\d\:\d\d$/.exec(frame.start);
      return parseInt(days[1]);
    default:
      return;
  }
};

frames.CreateFrame.prototype.setFrameStartTime = function(frame){
  switch(frame.type){
    case 'daily':
      return this.setDailyFrameStartTime(frame);
    case 'weekly':
      return this.setWeeklyFrameStartTime(frame);
    case 'monthly':
      return this.setMonthlyFrameStartTime(frame);
    default:
      throw new Error('Cannot set frame start because frame type is unknown');
  }
};

frames.CreateFrame.prototype.setDailyFrameLength = function(frame){
  var time = /^(\d\d)\:(\d\d)$/;
  var timeStart = time.exec(frame.start);
  var timeEnd = time.exec(frame.end);
  var timeStartInMins = parseInt(timeStart[1]) * 60 + parseInt(timeStart[2]);
  var timeEndInMins = parseInt(timeEnd[1]) * 60 + parseInt(timeEnd[2]);
  var length = timeEndInMins - timeStartInMins;
  var msInMin = 60 * 1000;
  if (length >= 0) {
    return length * msInMin;
  }
  else {
    return (24 * 60 - timeStartInMins + timeEndInMins) * msInMin; // it ends in the other day
  }
};

frames.CreateFrame.prototype.setWeeklyFrameLength = function(frame){
  var days = /^(\d\d)\.(\d\d)\:(\d\d)$/; // dd.hh:mm
  var msInMin = 60 * 1000;
  //var start = days.exec(frame.start);
  var end = days.exec(frame.end);
  var timeEndInMins = parseInt(end[2]) * 60 + parseInt(end[3]);
  var endDay = parseInt(end[1]);
  if (this.startDay < endDay) {
    return (endDay - this.startDay) * (24 * 60 * msInMin) - (this.startTime - timeEndInMins) * msInMin;
  }
  if (this.startDay === endDay) {
    if (this.startTime <= timeEndInMins) {
      return (timeEndInMins - this.startTime) * msInMin;
    }
    else {
      return (7 * 24 * 60 * msInMin) - (this.startTime - timeEndInMins) * msInMin;
    }
  }
  if (this.startDay > endDay) {
    return ((7 - this.startDay + endDay) * 24 * 60 * msInMin) - (this.startTime - timeEndInMins) * msInMin;
  }
};

frames.CreateFrame.prototype.lastDayOfMonth = function() {
  if (this.referenceDate !== undefined) {
    var date = new Date();
    date.setTime(this.referenceDate.getTime());
    var currentMonth = date.getMonth(); // 0 - 11 as Jan - Dec
    var day;
    do {
      day = date.getDate();
      date.setDate(date.getDate() + 1);
    }
    while (date.getMonth() === currentMonth);
    return day;
  }
};

frames.CreateFrame.prototype.setMonthlyFrameLength = function(frame){
  var days = /^(\d\d)\.(\d\d)\:(\d\d)$/; // dd.hh:mm
  var msInMin = 60 * 1000;
  //var start = days.exec(frame.start);
  var end = days.exec(frame.end);
  var timeEndInMins = parseInt(end[2]) * 60 + parseInt(end[3]);
  var endDay = parseInt(end[1]);
  if (this.startDay < endDay) {
    return (endDay - this.startDay) * (24 * 60 * msInMin) - (this.startTime -
      timeEndInMins) * msInMin;
  }
  if (this.startDay === endDay) {
    if (this.startTime <= timeEndInMins) {
      return (timeEndInMins - this.startTime) * msInMin;
    }
    else {
      return (this.lastDayOfMonth() * 24 * 60 * msInMin) - (this.startTime -
        timeEndInMins) * msInMin;
    }
  }
  if (this.startDay > endDay) {
    return (this.lastDayOfMonth() - this.startDay + endDay) * 24 * 60 * msInMin -
      (this.startTime - timeEndInMins) * msInMin;
  }
};

frames.CreateFrame.prototype.setFrameLength = function(frame){
  switch(frame.type){
    case 'daily':
      return this.setDailyFrameLength(frame);
    case 'weekly':
      return this.setWeeklyFrameLength(frame);
    case 'monthly':
      return this.setMonthlyFrameLength(frame);
    default:
      throw new Error('Cannot set frame length because frame type is unknown');
  }
};

module.exports = frames;
