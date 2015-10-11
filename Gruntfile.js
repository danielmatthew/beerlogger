module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      dist: {
        files: [
          {
            src: 'public_html/app/views/index.html',
            dest: 'public_html/dist/index.html',
          }
        ]
      }
    },
    concat: {
      generated: {
        files: [
          {
            dest: 'public_html/app/tmp.js',
            src: [
              'public_html/app/libs/angular/angular.min.js',
              'public_html/app/libs/angular-route/angular-route.min.js',
              'public_html/app/libs/ui-bootstrap-custom-build/ui-bootstrap-custom-tpls-0.13.4.min.js',
              'public_html/app/libs/moment/min/moment.min.js',
              'public_html/app/libs/angular-moment/angular-moment.min.js'
            ]
          }
        ]
      },
      dist: {
        src: ['public_html/app/app.js'],
        dest: 'public_html/app/bundle.js'
      }
    },
    uglify: {
      generated: {
        files: [
          {
            dest: 'public_html/app/libs.js',
            src: ['public_html/app/tmp.js']
          }
        ]
      },
      dist: {
        src: 'public_html/app/bundle.js',
        dest: 'public_html/app/bundle.min.js'
      }
    },

    useminPrepare: {
      html: 'public_html/app/views/index.html',
      options: {
        dest: 'public_html/dist',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglify']
            }
          }
        }
      }
    },

    usemin: {
      html: ['public_html/dist/index.html'],
      css: ['/dist/css/{,*/}*.css'],
      js: ['/dist/js/{,*/}*.js']
    }
  });

  grunt.loadNpmTasks('grunt-useminPrepare');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-surge');

  grunt.registerTask('build', [
    'useminPrepare',
    'copy',
    'concat:generated',
    'uglify:generated',
    'usemin'
  ]);
};
