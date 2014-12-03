###Due Date Calculator

This project represents `calculateDueDate(submitDate, turnaroundTime, timeFrames)` method for calculating due date, folowing the rules below:

- A submisson can only be during a non time-frame period
- `turnaroundTime` argument must be given in whole hours
- `timeFrames` argument is an array, that contains time frame objects. For the moment there are 3 types of time frames, you can distinct them by the unit of the frame. **If the unit is**
  - **`dayOfWeek`**, you can give a starting day of the week, and the length of the frame in milliseconds. If you give a time frame like this, you have this timeframe every week
  - **`restingHours`**, you can give a starting hour, and the length of the frame in milliseconds. If you give a time frame like this, you have this timeframe every day
  - **`date`**, you can give a term by a date string and a length. This frame is not a regular one.

When we calculate due date, we count the elapsed time between time frames. The unit of the calculation is in **hour**. It means that we scan the length of `turnaroundTime` per hour, and if we clash with a time frame, we jump over the frame and continue scanning.

The `name` key of the timeFrame object is just informative, it is not necessary for the calculation.

For example

```js
var msInHour = 60 * 60 * 1000;
var timeFrames = [
  {
    name : 'weekend',
    unit : 'dayOfWeek',
    start : 6,  // Saturday
    length : 2 * 24 * msInHour
  },
  {
    name : 'restingHours',
    unit : 'hour',
    start : 17,
    length : 16 * msInHour
  },
  {
    name : 'holiday',
    unit : 'date',
    start : 'December 22, 2014 00:00:00',
    length : 2 * 24 * msInHour
  }
];
```

With these set of objects we create the following time frames:
- we have a 2 days long frame from December 22, 2014 to December 24, 2014
- we have a 16 hours long frame per every day from 17 to 9,
- we have a 2 days long frame per every week from Saturday to Sunday

#####Limitations

- hour type timeframe must be at least 2 hours length
- hour type timeframes start and end at whole hours
- length of hour type time frames must be smaller than 24 hours
- length of time frames must be more than 1 hour


#####Using `calculateDueDate()` method

The `calculateDueDate()` method gives back a **Date() object**. It is a method of `calc` object:

```js
var dueDate = calc.calculateDueDate(submitDate, turnaroundTime, timeFrames);
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
  - `grunt-contrib-clean` (cleaning up the boilerplate)
- Expect.js as an assertion framework

####EditorConfig

EditorConfig is used to maintain consistent coding styles. There is an `.editorconfig` file in the project root directory, that defines the main styles.

You have [EditorConfig plugins](http://editorconfig.org/) for lots of editors.

As opening a file, EditorConfig plugins look for a file named `.editorconfig` in the directory of the opened file and in every parent directory. A search for `.editorconfig` files will stop if the root filepath is reached or an `.editorconfig` file with `root=true` is found.
