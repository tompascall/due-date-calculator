// frames.spec.js

'use strict';

var expect = require('expect.js');
var frames = require('../src/frames.js');

function exMessage(message, func, param1, param2, param3){
   try {
      func(param1, param2, param3);
    }
    catch(e) {
      expect(e.message).to.be(message);
      return true;
    }
    return false;
}

describe('Validate frames', function(){

  it('should check if timeFrames parameter is an array', function(){
    var timeFrames = [];
    expect(frames.validate(timeFrames)).to.be(true);
  });

  it('should throw exception ' +
    'if timeFrames parameter missing or not an array', function(){
    var timeFrames;
    if (!exMessage('TimeFrames argument missing or not an array',
      frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check that all elements of the array is an object', function(){
    var timeFrames = [{}, undefined];
    if (!exMessage('Time frames must be objects',
      frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check that all frame has type key', function(){
    var timeFrames = [{}, {type: 'daily'}];
    if (!exMessage('Frame must have type key',
      frames.validate, timeFrames)) {
      expect().fail();
    }
  });
});
