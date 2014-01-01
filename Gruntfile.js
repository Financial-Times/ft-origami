module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    sass: {
      docs: {
        options: {
          style: 'compressed',
          loadPath: './bower_components'
        },
        files: {
          './buildcache/bundle.css': './main.scss'
        }
      }
    },
    browserify: {
      dist: {
        files: {
          './buildcache/bundle.js': ['./main.js'],
        },
        options: {
          transform: ['debowerify']
        }
      }
    },
    watch: {
      sass: {
        files: ['./main.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['./main.js'],
        tasks: ['browserify']
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'browserify']);
  grunt.registerTask('js', ['browserify']);
  grunt.registerTask('css', ['sass']);


};
