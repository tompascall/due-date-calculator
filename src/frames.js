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

function Frame(frame, referenceDate) {
  this.name = frame.name;
  this.type = frame.type;
  this.msInMin = 60 * 1000;
  this.startTime = this.setFrameStartTime(frame);
  this.startDay = this.setFrameStartDay(frame);
  this.referenceDate = this.cloneDate(referenceDate);
  this.length = this.setFrameLength(frame);
  this.startDate = this.setStartDate(referenceDate);
}

Frame.prototype.setFrameStartTime = function(){
};

Frame.prototype.setFrameStartDay = function(){
};

Frame.prototype.cloneDate = function(date){
  if (date !== undefined) {
    var clone = new Date();
    clone.setTime(date.getTime());
    return clone;
  }
};

Frame.prototype.setStartDate = function(){
};

Frame.prototype.setFrameLength = function(){
};

function DailyFrame(frame, referenceDate) {
  Frame.call(this, frame, referenceDate);
}
DailyFrame.prototype = Object.create(Frame.prototype);
DailyFrame.prototype.constructor = DailyFrame;

DailyFrame.prototype.setFrameStartTime = function(frame) {
  var time = /^(\d\d)\:(\d\d)$/;
  var timeStart = time.exec(frame.start);
  return parseInt(timeStart[1]) * 60 + parseInt(timeStart[2]); // start measured in minutes
};

DailyFrame.prototype.setFrameLength = function(frame){
  var time = /^(\d\d)\:(\d\d)$/;
  var timeStart = time.exec(frame.start);
  var timeEnd = time.exec(frame.end);
  var timeStartInMins = parseInt(timeStart[1]) * 60 + parseInt(timeStart[2]);
  var timeEndInMins = parseInt(timeEnd[1]) * 60 + parseInt(timeEnd[2]);
  var length = timeEndInMins - timeStartInMins;
  if (length >= 0) {
    return length * this.msInMin;
  }
  else {
    return (24 * 60 - timeStartInMins + timeEndInMins) * this.msInMin; // it ends in the other day
  }
};

DailyFrame.prototype.helperFrameStartDate = function(referenceDate) {
  var helperFrameStartDate = this.cloneDate(referenceDate);
  helperFrameStartDate.setHours(0, 0, 0, 0);
  helperFrameStartDate.setMinutes(this.startTime);
  return helperFrameStartDate;
};

DailyFrame.prototype.helperFrameEndDate = function(helperFrameStartDate) {
  var helperFrameEndDate = new Date();
  helperFrameEndDate.setTime(helperFrameStartDate.getTime() + this.length);
  return helperFrameEndDate;
};

DailyFrame.prototype.setStartDate = function(referenceDate) {
  if (referenceDate !== undefined) {
    var helperFrameStartDate = this.helperFrameStartDate(referenceDate);
    var helperFrameEndDate = this.helperFrameEndDate(helperFrameStartDate);
    var helperFrameStartInMins = this.startTime;
    var helperFrameEndInMins = helperFrameEndDate.getHours() * 60 +
      helperFrameEndDate.getMinutes();
    var referenceDateInMins = referenceDate.getHours() * 60 + referenceDate.getMinutes();

    if (helperFrameStartInMins < helperFrameEndInMins) { // not overflown
      if (helperFrameStartInMins <= referenceDateInMins &&
          helperFrameEndInMins >= referenceDateInMins) {
        return helperFrameStartDate;
      }
    }
    if (helperFrameStartInMins > helperFrameEndInMins) { // overflown
      if (helperFrameStartInMins <= referenceDateInMins) {
        return helperFrameStartDate;
      }
      if (helperFrameEndInMins >= referenceDateInMins) {
        helperFrameStartDate.setDate(helperFrameStartDate.getDate() - 1);
        return helperFrameStartDate;
      }
    }
    return null;
  }
};

function WeeklyFrame(frame, referenceDate) {
  Frame.call(this, frame, referenceDate);
}

WeeklyFrame.prototype = Object.create(Frame.prototype);
WeeklyFrame.prototype.constructor = WeeklyFrame;

WeeklyFrame.prototype.setFrameStartTime = function(frame) {
  var days = /^\d\d\.(\d\d)\:(\d\d)$/; // dd:hh:mm
  var time;
  time = days.exec(frame.start);
  return parseInt(time[1]) * 60 + parseInt(time[2]); // start time measured in minutes
};

WeeklyFrame.prototype.setFrameStartDay = function(frame){
  var days = /^(\d\d)\.\d\d\:\d\d$/.exec(frame.start);
  return parseInt(days[1]);
};

WeeklyFrame.prototype.setFrameLength = function(frame) {
  var days = /^(\d\d)\.(\d\d)\:(\d\d)$/; // dd.hh:mm
  var end = days.exec(frame.end);
  var timeEndInMins = parseInt(end[2]) * 60 + parseInt(end[3]);
  var endDay = parseInt(end[1]);
  if (this.startDay < endDay) {
    return (endDay - this.startDay) * (24 * 60 * this.msInMin) - (this.startTime - timeEndInMins) * this.msInMin;
  }
  if (this.startDay === endDay) {
    if (this.startTime <= timeEndInMins) {
      return (timeEndInMins - this.startTime) * this.msInMin;
    }
    else {
      return (7 * 24 * 60 * this.msInMin) - (this.startTime - timeEndInMins) * this.msInMin;
    }
  }
  if (this.startDay > endDay) {
    return ((7 - this.startDay + endDay) * 24 * 60 * this.msInMin) - (this.startTime - timeEndInMins) * this.msInMin;
  }
};

WeeklyFrame.prototype.setDay = function(date, day) {
  var currentDay = date.getDay();
  date.setDate(date.getDate() - currentDay + day);
};

WeeklyFrame.prototype.helperFrameStartDate = function(referenceDate) {
  var helperFrameStartDate = this.cloneDate(referenceDate);
  this.setDay(helperFrameStartDate, this.startDay);
  helperFrameStartDate.setHours(0, 0, 0, 0);
  helperFrameStartDate.setMinutes(this.startTime);
  return helperFrameStartDate;
};

WeeklyFrame.prototype.helperFrameEndDate = function(helperFrameStartDate) {
  var helperFrameEndDate = this.cloneDate(helperFrameStartDate);
  helperFrameEndDate.setTime(helperFrameEndDate.getTime() + this.length);
  return helperFrameEndDate;
};

WeeklyFrame.prototype.setStartDate = function(referenceDate) {
  if (referenceDate !== undefined) {
    var helperFrameStartDate = this.helperFrameStartDate(referenceDate);
    var helperFrameEndDate = this.helperFrameEndDate(helperFrameStartDate);
    if (referenceDate.getTime() >= helperFrameStartDate.getTime() &&
        referenceDate.getTime() <= helperFrameEndDate.getTime()) {
        //console.log(helperFrameStartDate.toString());
      return helperFrameStartDate;
    }
    if (helperFrameStartDate.getDay() > helperFrameEndDate.getDay()) {
      if (referenceDate.getTime() < (helperFrameEndDate.getTime() - 7 * 24 * 60 * this.msInMin)) {
        helperFrameStartDate.setDate(helperFrameStartDate.getDate() - 7);
        //console.log(helperFrameStartDate.toString());
        return helperFrameStartDate;
      }
    }
    return null;
  }
};

function MonthlyFrame(frame, referenceDate) {
  Frame.call(this, frame, referenceDate);
}

MonthlyFrame.prototype = Object.create(Frame.prototype);
MonthlyFrame.prototype.constructor = MonthlyFrame;

MonthlyFrame.prototype.setFrameStartTime = function(frame) {
  var days = /^\d\d\.(\d\d)\:(\d\d)$/; // dd:hh:mm
  var time;
  time = days.exec(frame.start);
  return parseInt(time[1]) * 60 + parseInt(time[2]); // start time measured in minutes
};

MonthlyFrame.prototype.setFrameStartDay = function(frame) {
  var days = /^(\d\d)\.\d\d\:\d\d$/.exec(frame.start);
  return parseInt(days[1]);
};

MonthlyFrame.prototype.lastDayOfMonth = function() {
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
MonthlyFrame.prototype.setFrameLength = function(frame) {
  var days = /^(\d\d)\.(\d\d)\:(\d\d)$/; // dd.hh:mm
  var end = days.exec(frame.end);
  var timeEndInMins = parseInt(end[2]) * 60 + parseInt(end[3]);
  var endDay = parseInt(end[1]);
  if (this.startDay < endDay) {
    return (endDay - this.startDay) * (24 * 60 * this.msInMin) - (this.startTime -
      timeEndInMins) * this.msInMin;
  }
  if (this.startDay === endDay) {
    if (this.startTime <= timeEndInMins) {
      return (timeEndInMins - this.startTime) * this.msInMin;
    }
    else {
      return (this.lastDayOfMonth() * 24 * 60 * this.msInMin) - (this.startTime -
        timeEndInMins) * this.msInMin;
    }
  }
  if (this.startDay > endDay) {
    return (this.lastDayOfMonth() - this.startDay + endDay) * 24 * 60 * this.msInMin -
      (this.startTime - timeEndInMins) * this.msInMin;
  }
};

function DatesFrame(frame, referenceDate) {
  Frame.call(this, frame, referenceDate);
}

DatesFrame.prototype = Object.create(Frame.prototype);
DatesFrame.prototype.constructor = DatesFrame;

DatesFrame.prototype.setFrameLength = function(frame) {
  var startDate = new Date(frame.start);
  var endDate = new Date(frame.end);
  startDate.setSeconds(0, 0); // we don't deal with seconds & ms
  endDate.setSeconds(0, 0);
  return (endDate.getTime() - startDate.getTime());
};

frames.CreateFrame = function(frame, referenceDate) {
  switch(frame.type){
    case 'daily':
      return new DailyFrame(frame, referenceDate);
    case 'weekly':
      return new WeeklyFrame(frame, referenceDate);
    case 'monthly':
      return new MonthlyFrame(frame, referenceDate);
    case 'dates':
      return new DatesFrame(frame, referenceDate);
    default:
      throw new Error('Cannot create frame because frame type is unknown');
  }
};

module.exports = frames;
