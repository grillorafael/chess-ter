'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    jasmine: {
      src: [
        'js/pieces/piece/*.js',
        'js/pieces/*.js',
        'js/board_position.js',
        'js/board.js',
        'js/player.js',
        'js/main.js',
        'js/scripts.js'],
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
