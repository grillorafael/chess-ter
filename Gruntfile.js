'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      src: ['js/piece/*.js', 'js/*.js'],
      options: {
        vendor: 'js/vendor/*.js',
        specs: 'spec/*_spec.js',
        helpers: 'spec/*_helper.js'
      }
    },
    watch: {
      js: {
        files: ['js/*.js', 'Gruntfile.js'],
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
        'js/*.js'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('default', ['watch']);
};
