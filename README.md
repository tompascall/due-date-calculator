###Due Date Calculator

This project represents `calculateDueDate(submitDate, turnaroundTime, timeFrames)` method for calculating due date, folowing the rules below:

- `submitDate` must be a `Date` object
- `turnaroundTime` must be given in **minutes**
- `timeFrames` argument must be an array, that contains time frame objects. For the moment there are 4 types of time frames, `daily`, `weekly`, `monthly`, `dates`, you can distinct them by the `type` property of the frame object.

####Daily time frame object
```js
{ name: 'non-working-hours', // you can give any name you like
  type: 'daily',
  start: '17:00', // the format is "hh:mm"
  end: '09:00' // the format is "hh:mm"
}
```
If you give a time frame like this, you have this time frame **every day**. It can overflow into the next day, if the `start` time is later than the `end` time, like in the example above.

####Weekly time frame object
```js
{ name: 'weekend',
  type: 'weekly',
  start: '06.00:00', // the format is dd.hh:mm, where dd is the day of the week
                      // starting from Sunday (00), so 06 means Saturday
  end: '01.00:00' // the format is dd.hh:mm
}
```
If you give a time frame like this, you have this time frame **every week**. It can overflow into the next week, if the day of the `start` date is later than the day of the `end` time, like in the example above.

####Monthly time frame object
```js
{ name: 'middle time',
  type: 'monthly',
  start: '15.00:00', // format is dd.hh:mm, where dd is the day of the month
  end: '16.00:00' // format is dd.hh.mm
}
```
If you give a time frame like this, you have this time frame **every month**. It means that the max. start or the end day of the frame must be 28, because every month has at least 28 days. It can overflow into the next month, if the day of the `start` date is later than the day of the `end` time.

####Dates time frame object
```js
{ name: 'foo',
  type: 'dates',
  start: '2014-12-15T13:00+01:00',
  end: '2014-12-16T17:01+01:00'
}
```

The value of `start` end `end` of "dates" time frame must be valid [ISO date string](http://www.w3.org/TR/NOTE-datetime). The `end` date cannot be earlier than the `start` date.

####Using more time frames

You can mix any time frames as you like:

```js
var timeFrames = [
  { name: 'non-working-hours',
    type: 'daily',
    start: '17:00',
    end: '09:00'
  },
  { name: 'weekend',
    type: 'weekly',
    start: '06.00:00',
    end: '01.00:00'
  }
];
```

####Using `calculateDueDate()` method

The `calculateDueDate()` method gives back a **Date() object**. It is a method of `calc` object:

```js
var calc = require('../src/due.date.calculator.js');
var dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
```

####Example

```js
'use strict';

var calc = require('../src/due.date.calculator.js');
var submitDate = new Date('2014-12-12T16:59:35+01:00');
var turnaroundTime = 1;
var timeFrames = [
  { name: 'non-working-hours',
    type: 'daily',
    start: '17:00',
    end: '09:00'
  },
  { name: 'weekend',
    type: 'weekly',
    start: '06.00:00',
    end: '01.00:00'
  },
  { name: 'middle time',
    type: 'monthly',
    start: '15.00:00',
    end: '16.00:00'
  },
  { name: 'foo',
    type: 'dates',
    start: '2014-12-15T13:00+01:00',
    end: '2014-12-16T17:01+01:00'
  }
];
var dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
console.log(dueDate.toString()); // Wed Dec 17 2014 09:00:35 GMT+0100 (CET)
```

####Prerequisities for development

- [Node.js](http://nodejs.org/)
- [Grunt](http://gruntjs.com/getting-started)

####Installation

Clone the project, then run `npm install`.

####Grunt tasks

We have the following tasks:
- jshint to lint .js files
- mochacli to run tests

When developing, run:

- `grunt watch` results in running grunt tasks automatically when a file is changed in the watched directory.

- `grunt test:dev` to lint your code and run your tests. The task stops if there's any failing test. The same happens if you run `grunt` without any arguments.

- `grunt test:all` to lint your code and run the test suite with all the tests, no matter if there's a failing one.

####Used packages

- Grunt.js for task automaton
  - `grunt-contrib-jshint` for linting
  - `grunt-newer` for running Grunt tasks on newer files only
  - `grunt-contrib-watch`
  - `grunt-mocha-cli` (Mocha testing framework for Grunt)
- Expect.js as an assertion framework

####EditorConfig

EditorConfig is used to maintain consistent coding styles. There is an `.editorconfig` file in the project root directory, that defines the main styles.

You have [EditorConfig plugins](http://editorconfig.org/) for lots of editors.

As opening a file, EditorConfig plugins look for a file named `.editorconfig` in the directory of the opened file and in every parent directory. A search for `.editorconfig` files will stop if the root filepath is reached or an `.editorconfig` file with `root=true` is found.
