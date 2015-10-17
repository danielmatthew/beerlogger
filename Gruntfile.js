'use strict';
module.exports = function(grunt) {
  let config = {
    app: 'src',
    dist: 'dist'
  };

  grunt.initConfig({
    config: config,
    pkg: grunt.file.readJSON('package.json'),

    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: [
        '<%= config.app %>/app/views/index.html'
      ]
    },

    usemin: {
      html: ['<%= config.dist %>/{,*/}*.html']
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    uglify: {
      dist: {
        files: {
          '<%= config.dist %>/scripts.js': [
            '<%= config.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    concat: {
      dist: {}
    },

    copy: {
      dist: {
        files: [
          {
            cwd: '<%= config.app %>',
            dest: '<%= config.dist %>',
            src: [
              '{,*/}*.html'
            ]
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-useminPrepare');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', [
    'useminPrepare',
    'concat',
    'uglify',
    'copy',
    'usemin'
  ]);
};
