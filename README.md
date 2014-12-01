###Due Date Calculator

This project represents `calculateDueDate(submitDate, turnaroundTime, timeFrames)` method for calculating due date, folowing the rules below:

- A submisson can only be during non time-frame period
- `turnaroundTime` argument must be given in hours
- `timeFrames` is an array, that contains time frame objects as following:

```js
timeFrames = [
  {
    name : 'weekend',
    unit : 'dayOfWeek',
    start : 6,  // Saturday
    length : 2 * 24 * msInHour,
    priority : 3000 // the higher the number the lower the priority
  },
  {
    name : 'restingHours',
    unit : 'hour',
    start : 17,
    length : 16 * msInHour,
    priority : 2000
  },
  {
    name : 'holiday',
    unit : 'date',
    start : 'December 22, 2014 00:00:00',
    length : 2 * 24 * msInHour,
    priority : 1000
  }
];
```

The `name` key is just informative, you can leave them.

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
