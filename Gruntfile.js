'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    jasmine: {
    	coverage: {
        src: [
          'js/pieces/piece/*.js',
          'js/pieces/*.js',
          'js/board_position.js',
          'js/board.js',
          'js/player.js',
          'js/main.js',
          'js/scripts.js'
        ],
        options: {
          vendor: 'js/vendor/*.js',
          specs: 'spec/*_spec.js',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            requireConfig: {
              baseUrl: '.grunt/grunt-contrib-jasmine/src/main/js/'
            },
            coverage: 'coverage/coverage.json',
            report: [
              {
                type: 'html',
                options: {
                  dir: 'coverage/html'
                }
              },
              {
                type: 'cobertura',
                options: {
                  dir: 'coverage/cobertura'
                }
              },
              {
                type: 'text-summary'
              }
            ]
          }
        }
      }
    },
    watch: {
      js: {
        files: ['js/*.js', 'js/pieces/**/*.js', 'Gruntfile.js'],
        tasks: ['jshint']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc.js',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'js/*.js',
        'js/pieces/*.js',
        'js/pieces/piece/*.js',
      ]
    },
    inline: {
      options: {
        cssmin: true,
        uglify: true,
        tag: ''
      },
      dist: {
        src: [ 'index.html' ],
        dest: ['dest/']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-inline');
  grunt.registerTask('coverage', 'jasmine:istanbul');
  grunt.registerTask('test:coverage', ['jasmine:coverage']);
  grunt.registerTask('default', ['watch']);
};
