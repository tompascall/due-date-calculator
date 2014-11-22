###Due Date Calculator

This project represents `calculateDueDate(submitDate, turnaroundTime)` method for calculating due date, folowing the rules below:

- Working hours are 9AM to 5PM every working day (Monday through Friday)
- The program does not deal with holidays, which means that a holiday on a Thursday is still considered as a working day. Also a working Saturday will still be considered as a nonworking day
- `turnaroundTime` must be given in working hours, which means for example that 2 days are 16 hours. As an example: if a problem was reported at 2:12PM on Tuesday then it is due by 2:12PM on Thursday.
- A submisson can only be during working hours, which means that all submit date values fall between 9AM and 5PM.

`calculateDueDate()` method gives back a **Date() object**.

It is a method of `calc.Due` class, so you need to instantiate it, for example

```js
var due = new calc.Due();
var dueDate = due.calculateDueDate(submitDate, turnaroundTime);
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
- Sinon.js as a mocking tool

####EditorConfig

EditorConfig is used to maintain consistent coding styles. There is an `.editorconfig` file in the project root directory, that defines the main styles.

You have [EditorConfig plugins](http://editorconfig.org/) for lots of editors.

As opening a file, EditorConfig plugins look for a file named `.editorconfig` in the directory of the opened file and in every parent directory. A search for `.editorconfig` files will stop if the root filepath is reached or an `.editorconfig` file with `root=true` is found.
