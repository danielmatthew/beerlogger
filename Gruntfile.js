module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['public_html/app/app.js', 'public_html/app/routes.js', ],
        dest: 'public_html/app/bundle.js'
      }
    },
    uglify: {
      dist: {
        src: 'public_html/app/bundle.js',
        dest: 'public_html/app/bundle.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};
