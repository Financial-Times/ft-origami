module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    sass: {
      docs: {
        options: {
          style: 'compressed',
          loadPath: './bower_components',
          sourcemap: "none"
        },
        files: {
          './buildcache/bundle.css': './main.scss'
        }
      }
    },
    watch: {
      sass: {
        files: ['./main.scss'],
        tasks: ['sass']
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass']);

};
