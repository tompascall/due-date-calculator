// frames.spec.js

'use strict';

var expect = require('expect.js');
var frames = require('../src/frames.js');

describe('Validate frames', function(){

  it('should check if timeFrames parameter is an array', function(){
    var timeFrames = [];
    expect(frames.validate(timeFrames)).to.be(true);
  });

  it('should throw exception ' +
    'if timeFrames parameter missing or not an array', function(){
    var timeFrames;
    var message = 'TimeFrames argument missing or not an array';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check that all elements of the array is an object', function(){
    var timeFrames = [undefined, {}];
    var message = 'Time frames must be objects';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check that all frame has "type" key', function(){
    var timeFrames = [{}, {type: 'daily'}];
    var message = 'Frame must have type key';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check that "type" key has a valid value', function(){
    var timeFrames = [
      {type: 'notValid'},
    ];
    var message = 'Frame must be "daily", "weekly", "monthly", or "dates" type';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check if time frames has "start" and "end" keys', function(){
    var timeFrames = [
      { type: 'daily',
        start: ''
      },
    ];
    var message = 'Frame must have "start" and "end" keys';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check "start" and "end" format of "daily" time frame', function(){
    var timeFrames = [
      { type: 'daily',
        start: '9:15',
        end: '09:15'
      },
    ];
    var message = '"start" and "end" format of "daily" time frame must be "hh:mm"';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check "start" and "end" format of "weekly" time frame', function(){
    var timeFrames = [
      { type: 'weekly',
        start: 'Sun:09:15',
        end: 'Sum:19:15'
      }
    ];
    var message = '"start" and "end" format of "weekly" time frame ' +
        'must be the following: "Day:hh:mm", where the "Day" must be ' +
        '"Sun", "Mon", "Tue", "Wen", "Thu", "Fri", or "Sat"';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check "start" and "end" format of "monthly" time frame', function(){
   var timeFrames = [
      { type: 'monthly',
        start: '1.09:15',
        end: '02.19:15'
      }
    ];
    var message = '"start" and "end" format of "monthly" time frame ' +
        'must be the following: "dd.hh:mm", where the "dd" must be ' +
        'the number of day of the month (an integer between 01 and 31)';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });
});

function testExceptMessage(message, func, param1, param2, param3){
   try {
      func(param1, param2, param3); // works with max. 3 parameters
    }
    catch(e) {
      expect(e.message).to.be(message);
      return true;
    }
    return false;
}
