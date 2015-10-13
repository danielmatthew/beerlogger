'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      dist: {
        files: [
          {
            src: 'src/app/views/index.html',
            dest: 'dist/index.html',
          }
        ]
      }
    },
    // concat: {
    //   generated: {
    //     files: [
    //       {
    //         dest: 'app/tmp.js',
    //         src: [
    //           'app/libs/angular/angular.min.js',
    //           'app/libs/angular-route/angular-route.min.js',
    //           'app/libs/ui-bootstrap-custom-build/ui-bootstrap-custom-tpls-0.13.4.min.js',
    //           'app/libs/moment/min/moment.min.js',
    //           'app/libs/angular-moment/angular-moment.min.js'
    //         ]
    //       }
    //     ]
    //   },
    //   dist: {
    //     src: ['public_html/app/app.js'],
    //     dest: 'public_html/app/bundle.js'
    //   }
    // },
    // uglify: {
    //   generated: {
    //     files: [
    //       {
    //         dest: 'src/app/libs.js',
    //         src: ['src/app/tmp.js']
    //       }
    //     ]
    //   },
    //   dist: {
    //     src: 'src/app/bundle.js',
    //     dest: 'dist/app/bundle.min.js'
    //   }
    // },

    useminPrepare: {
      html: ['src/app/views/index.html'],
      options: {
        dest: 'dist',
      }
    },

    usemin: {
      html: ['dist/index.html']
    }
  });

  grunt.loadNpmTasks('grunt-useminPrepare');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', [
    'useminPrepare',
    'copy',
    'concat',
    'uglify',
    'usemin'
  ]);
};
