'use strict';

module.exports = function (grunt) {

  // Automatically load required grunt tasks
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'src',
    dist: 'dist'
  };

  var modRewrite = require('connect-modrewrite');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/**/*.js', 'Gruntfile.js'],
        tasks: ['eslint']
      },
      styles: {
        files: ['<%= config.app %>/assets/styles/**/*.less'],
        tasks: ['less', 'postcss']
      },
      yaml: {
        files: ['<%= config.app %>/data/src/**/*.yaml'],
        tasks: ['dumpDir']
      }
    },

    browserSync: {
      options: {
        notify: false,
        background: true,
        watchOptions: {
          ignored: ''
        }
      },
      livereload: {
        options: {
          files: [
            '<%= config.app %>/**/*.html',
            '.tmp/assets/styles/{,*/}*.css',
            '<%= config.app %>/assets/images/**/*',
            '<%= config.app %>/**/*.js'
          ],
          port: 9000,
          server: {
            baseDir: ['.tmp', config.app],
            routes: {
              '/bower_components': './bower_components'
            },
            middleware: [
              modRewrite([
                '^.([^\\.]+)$ /index.html [L]'
              ])
            ]
          }
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      target: [
        'Gruntfile.js',
        '<%= config.app %>/**/*.js',
        '!<%= config.app %>/assets/scripts/vendor/*'
      ]
    },

    postcss: {
      options: {
        map: true,
        processors: [
          // Add vendor prefixed styles
          require('autoprefixer')({
            browsers: ['> 1%', 'last 4 versions']
          })
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/assets/styles/',
          src: ['app.css'],
          dest: '.tmp/assets/styles/'
        }]
      }
    },

    // Compile LESS to CSS
    less: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/assets/styles/',
          src: ['app.less'],
          dest: '.tmp/assets/styles/',
          ext: '.css'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        src: ['<%= config.app %>/index.html'],
        ignorePath: /^(\.\.\/)*\.\./
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= config.dist %>/assets/scripts/**/*.js',
          '<%= config.dist %>/assets/styles/**/*.css',
          '<%= config.dist %>/assets/images/core/**/*.*',
          '<%= config.dist %>/assets/fonts/**/*.*',
          '<%= config.dist %>/*.{ico,png}'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/assets/images',
          '<%= config.dist %>/assets/styles'
        ],
        patterns: {
          js: [
            [/(assets\/images\/core\/header-bg\.jpg)/g, 'Replacing reference to header-bg.jpg']
          ]
        }
      },
      html: ['<%= config.dist %>/**/*.html'],
      css: ['<%= config.dist %>/assets/styles/**/*.css'],
      js: ['<%= config.dist %>/assets/scripts/**/*.js']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/assets/images',
          src: '**/*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/assets/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/assets/images',
          src: '**/*.svg',
          dest: '<%= config.dist %>/assets/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          // true would impact styles with attribute selectors
          removeRedundantAttributes: false,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '**/*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'data/**/*.*',
            'assets/images/**/*.webp',
            '**/*.html',
            '*.md',
            'CNAME',
            'assets/fonts/**/*.*'
          ]
        }]
      },
      err404: {
        files: [{
          cwd: '<%= config.dist %>',
          dest: '<%= config.dist %>/',
          expand: true,
          src: ['index.html'],
          rename: function (dest, src) {
            return dest + src.replace('index', '404');
          }
        }]
      }
    },

    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:cssbristol/cssbristol.github.io.git',
          branch: 'master'
        }
      }
    }
  });

  grunt.registerTask('dumpDir', 'Dump directory to json', function (target) {

    target = target === undefined ? 'all' : target;
    var cwd;

    if (target === 'sponsors' || target === 'all') {
      cwd = config.app + '/data/src/';
      grunt.file.write(config.app + '/data/dist/sponsors.json', JSON.stringify(grunt.file.readYAML(cwd + 'sponsors.yaml')));
    }

    if (target === 'featured' || target === 'all') {
      cwd = config.app + '/data/src/';
      grunt.file.write(config.app + '/data/dist/featuredItems.json', JSON.stringify(grunt.file.readYAML(cwd + 'featuredItems.yaml')));
    }

    if (target === 'jobs' || target === 'all') {

      cwd = config.app + '/data/src/jobs/';
      var files = grunt.file.expand({ cwd: cwd }, '*.yaml');

      var dump = {};
      for (var i = 0; i < files.length; i++) {
        dump[files[i]] = grunt.file.readYAML(cwd + files[i]);
      }

      grunt.file.write(config.app + '/data/dist/allJobs.json', JSON.stringify(dump));
    }

    if (target === 'tutorials' || target === 'all') {

      cwd = config.app + '/data/src/tutorials/';
      var files = grunt.file.expand({ cwd: cwd }, '*.yaml');
      
      var dump = {};
      for (var i = 0; i < files.length; i++) {
        dump[files[i]] = grunt.file.readYAML(cwd + files[i]);
      }

      grunt.file.write(config.app + '/data/dist/allTutorials.json', JSON.stringify(dump));
    }
  });

  grunt.registerTask('serve', 'Start the server and preview app', function (target) {

    // if (target === 'dist') {
    //   return grunt.task.run(['build', 'browserSync:dist']);
    // }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'less',
      'dumpDir',
      'postcss',
      'browserSync:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('dist', ['build']);

  grunt.registerTask('build', [
    'eslint',
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'less',
    'dumpDir',
    'imagemin',
    'svgmin',
    'postcss',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', ['serve']);

  grunt.registerTask('deploy', ['buildcontrol:pages']);
};
