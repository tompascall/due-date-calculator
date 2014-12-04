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

frames.checkTimeFormats = function(timeFrames){
  var time = /^\d\d\:\d\d$/;
  timeFrames.forEach(function(frame) {
    if (frame.type === 'daily' && (!time.test(frame.start) || !time.test(frame.end))) {
      throw new Error('"start" and "end" format of "daily" time frame must be "hh:mm"');
    }
  });
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
