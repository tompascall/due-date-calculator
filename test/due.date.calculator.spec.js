// due.date.calculator.spec.js

'use strict';

var expect = require('expect.js');
var calc = require('../src/due.date.calculator.js');

describe('due date calculation', function(){
  var timeFrames = {
    restingHours : function(date){
      var startWorkingHours = 9;
      var endWorkingHours = 17;
      if ((date.getHours() > endWorkingHours) ||
        (date.getHours() === endWorkingHours && date.getTime() !== 0)){
        date.setDate(date.getDate() + 1);
        date.setHours(startWorkingHours);
      }
      return date;
    },
    weekend : function(date){
      var saturday = 6;
      if (date.getDay === saturday){
        date.setDate(date.getDate + 2);
      }
      return date;
    }
  };

  it('should get back submit day if turnaround time = 0', function(){
    var submitDate = new Date('December 5, 2014 15:15:30');
    var turnaroundTime = 0;
    var dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
    expect(dueDate.getTime()).to.equal(submitDate.getTime());
  });
});
