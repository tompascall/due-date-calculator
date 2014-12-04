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

frames.checkType = function(timeFrames){
  var isType = true;
  timeFrames.forEach(function(frame){
    if (!frame.hasOwnProperty('type')) {
      isType = false;
    }
  });
  if (!isType) {
    throw new Error('Frame must have type key');
  }
};

frames.validate = function(timeFrames){
  if (timeFrames !== null && timeFrames !== undefined) {
    if (Array.isArray(timeFrames)) {
      frames.checkObjects(timeFrames);
      frames.checkType(timeFrames);
      return true;
    }
  }
  frames.errorMissing();

};

module.exports = frames;
