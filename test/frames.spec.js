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

  it('should check that all frame has "name" key', function(){
    var timeFrames = [{}, {}];
    var message = 'Frame must have "name" key';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check that all frame has "type" key', function(){
    var timeFrames = [{name: 'lunch time'}];
    var message = 'Frame must have "type" key';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check that "name" key is a string', function(){
    var timeFrames = [
      { name: 42,
        type: 'bar'},
    ];
    var message = '"name" key of frames must be a string';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check that "type" key has a valid value', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'notValid'},
    ];
    var message = 'Frame must be "daily", "weekly", "monthly", or "dates" type';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check if time frames has "start" and "end" keys', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'daily',
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
      { name: 'foo',
        type: 'daily',
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
      { name: 'foo',
        type: 'weekly',
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
      { name: 'foo',
        type: 'monthly',
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

  it('should check "start" and "end" values of "daily" time frames', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'daily',
        start: '09:15',
        end: '25:77'
      }
    ];
    var message = 'the value of "start" end "end" of "daily" time frame must be valid time value';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check "start" and "end" values of "weekly" time frames', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'weekly',
        start: 'Wen:22:75',
        end: 'Thu:22:22'
      }
    ];
    var message = 'the value of "start" end "end" of "weekly" time frame must be valid time value';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check "start" and "end" values of "monthly" time frames', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'monthly',
        start: '01.22:75',
        end: '02.22:22'
      }
    ];
    var message = 'the value of "start" end "end" of "monthly" time frame must be valid time value';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check "start" and "end" values of "dates" time frames', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'dates',
        start: '22014-12-05T10:00+02:00',
        end: '2014-12-05T10:00+02:00' // ISO8601 string
      }
    ];
    var message = 'the value of "start" end "end" of "dates" time frame must be valid ISO date string';
    if (!testExceptMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });
});

describe('Create frames', function(){
  var msInMin = 60 * 1000;

  it('should create a daily frame', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'daily',
        start: '09:15',
        end: '12:15'
      }
    ];
    var daily = new frames.CreateFrame(timeFrames[0]);
    expect(daily.type).to.be('daily');
    expect(daily.start).to.be(9 * 60 + 15); // daily start measured in minutes
    expect(daily.length).to.be(3 * 60 * msInMin); //length measured in milliseconds

    timeFrames = [
      { name: 'foo',
        type: 'daily',
        start: '17:15',
        end: '09:15'
      }
    ];
    daily = new frames.CreateFrame(timeFrames[0]);
    expect(daily.type).to.be('daily');
    expect(daily.start).to.be(17 * 60 + 15);
    expect(daily.length).to.be(16 * 60 * msInMin);
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
