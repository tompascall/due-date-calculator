// Gruntfile.js

'use strict';

module.exports = function(grunt){

  var files = {
      src: 'src/**/*.js',
      test: 'test/**/*.js',
      grunt: 'Gruntfile.js',
    };

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    watch: {
      js: {
        files: [files.src],
        tasks: ['test:dev']
      },
      tests: {
        files: [files.test],
        tasks: ['test:dev']
      },
      config: {
        files: [files.grunt],
        tasks: ['jshint:config']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      js: [files.src],
      tests: [files.test],
      config: [files.grunt]
    },

    'node-inspector': {
      dev: {}
    },

    mochacli: {
      options: {
        files: [files.test],
      },
      all: {
          options: {
            bail: false
          }
      },
      dev: {
          options: {
            bail: true
          }
      }
    }
  });


  grunt.registerTask('default', ['jshint:config', 'test:dev']);
  grunt.registerTask('test:dev', ['newer:jshint:tests',
    'newer:jshint:js', 'mochacli:dev']);
  grunt.registerTask('test:all', ['newer:jshint:tests',
    'newer:jshint:js', 'mochacli:all']);
};
