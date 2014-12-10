// frames.spec.js

'use strict';

var expect = require('expect.js');
var frames = require('../src/frames.js');
var helper = require('../lib/testHelpers.js');

describe('Validate frames', function(){

  it('should check if timeFrames parameter is an array', function(){
    var timeFrames = [];
    expect(frames.validate(timeFrames)).to.be(true);
  });

  it('should throw exception ' +
    'if timeFrames parameter is not an array', function(){
    var timeFrames = {};
    var message = 'TimeFrames argument is not an array';
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check that all elements of the array is an object', function(){
    var timeFrames = [undefined, {}];
    var message = 'Time frames must be objects';
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check that all frame has "name" key', function(){
    var timeFrames = [{}, {}];
    var message = 'Frame must have "name" key';
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check that all frame has "type" key', function(){
    var timeFrames = [{name: 'lunch time'}];
    var message = 'Frame must have "type" key';
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check that "name" key is a string', function(){
    var timeFrames = [
      { name: 42,
        type: 'bar'},
    ];
    var message = '"name" key of frames must be a string';
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check that "type" key has a valid value', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'notValid'},
    ];
    var message = 'Frame must be "daily", "weekly", "monthly", or "dates" type';
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
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
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
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
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check "start" and "end" format of "weekly" time frame', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'weekly',
        start: '01.09:15',
        end: 'Tue:19:15'
      }
    ];
    var message = '"start" and "end" format of "weekly" time frame ' +
        'must be the following: "dd.hh:mm", where the "dd" must be ' +
        '"00" to "06", where "00" means Sunday';
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
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
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check "start" and "end" format of "dates" time frames', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'dates',
        start: '22014-12-05T10:00+02:00',
        end: '2014-12-05T10:00+02:00' // ISO8601 string
      }
    ];
    var message = 'the value of "start" end "end" of "dates" time frame must be valid ISO date string';
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
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
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check "start" and "end" values of "weekly" time frames', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'weekly',
        start: '01.22:75',
        end: '02.22:22'
      }
    ];
    var message = 'the value of "start" end "end" of "weekly" time frame must be valid time value';
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
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
    var message = 'the value of "start" end "end" of "monthly" time frame must be valid day and time value';
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
      expect().fail();
    }
  });

  it('should check "start" and "end" values of "dates" time frames', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'dates',
        start: '2015-12-05T10:00+02:00',
        end: '2014-12-05T10:00+02:00'
      }
    ];
    var message = 'the "start" date of "dates" time frame must be before the "end" date';
    if (!helper.testExceptionMessage(message, frames.validate, timeFrames)) {
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
    expect(daily.startTime).to.be(9 * 60 + 15); // daily start measured in minutes
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
    expect(daily.startTime).to.be(17 * 60 + 15);
    expect(daily.length).to.be(16 * 60 * msInMin);
  });

  it('should create a weekly frame', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'weekly',
        start: '01.09:15',
        end: '02.12:15'
      }
    ];
    var weekly = new frames.CreateFrame(timeFrames[0]);
    expect(weekly.type).to.be('weekly');
    expect(weekly.startDay).to.be(1);
    expect(weekly.startTime).to.be(9 * 60 + 15);
    expect(weekly.length).to.be((24 + 3) * 60 * msInMin);

    timeFrames = [
      { name: 'foo',
        type: 'weekly',
        start: '01.12:15',
        end: '01.09:15'
      }
    ];
    weekly = new frames.CreateFrame(timeFrames[0]);
    expect(weekly.length).to.be(7 * 24 * 60 * msInMin - 3 * 60 * msInMin);

    timeFrames = [
      { name: 'foo',
        type: 'weekly',
        start: '01.12:15', // Mon
        end: '00.09:15' // Sun
      }
    ];
    weekly = new frames.CreateFrame(timeFrames[0]);
    expect(weekly.length).to.be(6 * 24 * 60 * msInMin - 3 * 60 * msInMin);
  });

  it('should create a monthly frame', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'monthly',
        start: '01.12:15',
        end: '02.22:15'
      }
    ];
    var monthly = new frames.CreateFrame(timeFrames[0]);
    expect(monthly.type).to.be('monthly');
    expect(monthly.startDay).to.be(1);
    expect(monthly.startTime).to.be(12 * 60 + 15);
    expect(monthly.length).to.be((24 + 10) * 60 * msInMin);

    timeFrames = [
      { name: 'foo',
        type: 'monthly',
        start: '01.12:15',
        end: '01.22:15'
      }
    ];
    monthly = new frames.CreateFrame(timeFrames[0]);
    expect(monthly.length).to.be((10) * 60 * msInMin);

    timeFrames = [
      { name: 'overflow',
        type: 'monthly',
        start: '01.22:15',
        end: '01.12:15'
      }
    ];
    var referenceDate = new Date('2014-12-05T10:00+01:00');
    monthly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(monthly.lastDayOfMonth()).to.be(31);
    expect(monthly.length).to.be((31 * 24) * 60 * msInMin - 10 * 60 * msInMin);

    timeFrames = [
      { name: 'overflow',
        type: 'monthly',
        start: '02.12:15',
        end: '01.15:15'
      }
    ];
    referenceDate = new Date('2014-12-05T10:00+01:00');
    monthly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(monthly.length).to.be((30 * 24) * 60 * msInMin + 3 * 60 * msInMin);
  });

  it('should create a dates time frame', function(){
    var timeFrames = [
      { name: 'Xmas',
        type: 'dates',
        start: '2014-12-24T10:15+01:00',
        end: '2014-12-26T12:15+01:00'
      }
    ];
    var dates = new frames.CreateFrame(timeFrames[0]);
    expect(dates.type).to.be('dates');
    expect(dates.length).to.be((24 * 2 + 2) * 60 * msInMin);

  });

  it('should set start date of a non overflown "daily" frames by referenceDate', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'daily',
        start: '09:15',
        end: '12:00'
      }
    ];
    var referenceDate = new Date('2014-12-05T09:30+01:00');
    var testStartDate = new Date('2014-12-05T09:15+01:00');
    var daily = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(daily.startDate.getTime()).to.be(testStartDate.getTime());

    referenceDate = new Date('2014-12-05T09:14+01:00');
    daily = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(daily.startDate).to.be(null);

    referenceDate = new Date('2014-12-05T12:01+01:00');
    daily = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(daily.startDate).to.be(null);
  });

  it('should set start date of overflown "daily" frames by referenceDate', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'daily',
        start: '17:00',
        end: '09:00'
      }
    ];
    var referenceDate = new Date('2014-12-05T19:30+01:00');
    var testStartDate = new Date('2014-12-05T17:00+01:00');
    var daily = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(daily.startDate.getTime()).to.be(testStartDate.getTime());

    referenceDate = new Date('2014-12-05T08:30+01:00');
    testStartDate = new Date('2014-12-04T17:00+01:00');
    daily = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(daily.startDate.getTime()).to.be(testStartDate.getTime());

    referenceDate = new Date('2014-12-05T14:00+01:00');
    daily = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(daily.startDate).to.be(null);
  });

  it('should set start date of non overflown "weekly" frames by referenceDate', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'weekly',
        start: '05.12:15', // Fri
        end: '06.14:15' // Sat
      }
    ];
    var referenceDate = new Date('2014-12-05T13:01+01:00');
    var testStartDate = new Date('2014-12-05T12:15+01:00');
    var weekly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(weekly.startDate.getTime()).to.be(testStartDate.getTime());

    referenceDate = new Date('2014-12-05T11:01+01:00');
    weekly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(weekly.startDate).to.be(null);

    referenceDate = new Date('2014-12-06T14:16+01:00');
    weekly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(weekly.startDate).to.be(null);
  });

  it('should set start date of overflown "weekly" frames by referenceDate', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'weekly',
        start: '06.12:15', // Sat
        end: '02.14:15' // Tue
      }
    ];
    var referenceDate = new Date('2014-12-08T13:01+01:00');
    var testStartDate = new Date('2014-12-06T12:15+01:00');
    var weekly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(weekly.startDate.getTime()).to.be(testStartDate.getTime());

    referenceDate = new Date('2014-12-05T13:01+01:00');
    weekly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(weekly.startDate).to.be(null);

    referenceDate = new Date('2014-12-10T13:01+01:00'); // Wed
    weekly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(weekly.startDate).to.be(null);
  });

  it('should set start date of non overflown "monthly" frames by referenceDate', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'monthly',
        start: '01.12:15',
        end: '03.22:15'
      }
    ];
    var referenceDate = new Date('2014-12-02T13:01+01:00');
    var testStartDate = new Date('2014-12-01T12:15+01:00');
    var monthly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(monthly.startDate.getTime()).to.be(testStartDate.getTime());

    referenceDate = new Date('2014-12-01T10:15+01:00');
    monthly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(monthly.startDate).to.be(null);

    referenceDate = new Date('2014-12-04T10:15+01:00');
    monthly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(monthly.startDate).to.be(null);
  });

  it('should set start date of overflown "monthly" frames by referenceDate', function(){
    var timeFrames = [
      { name: 'foo',
        type: 'monthly',
        start: '28.12:15',
        end: '02.22:15'
      }
    ];
    var referenceDate = new Date('2015-01-01T13:01+01:00');
    var testStartDate = new Date('2014-12-28T12:15+01:00');
    var monthly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(monthly.startDate.getTime()).to.be(testStartDate.getTime());

    referenceDate = new Date('2015-02-03T13:01+01:00');
    monthly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(monthly.startDate).to.be(null);

    referenceDate = new Date('2015-02-27T13:01+01:00');
    monthly = new frames.CreateFrame(timeFrames[0], referenceDate);
    expect(monthly.startDate).to.be(null);
  });
});



