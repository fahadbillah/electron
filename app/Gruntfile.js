module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    wiredep: {
      app: {
        src: [
        'application/views/main.php',
        ],
        options: {
          ignorePath: '../../',
          // https://github.com/taptapship/wiredep#configuration
          fileTypes: {
            html: {
              block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
              detect: {
                js: /<script.*src=['"]([^'"]+)/gi,
                css: /<link.*href=['"]([^'"]+)/gi
              },
              replace: {
                js: '<script src="<?php echo base_url() ?>{{filePath}}"></script>',
                css: '<link rel="stylesheet" href="<?php echo base_url() ?>{{filePath}}" />'
              }
            },
          },

          exclude: [
          'bower_components/angular-file-upload/dist/angular-file-upload.min.js'
          // 'bower_components/jstree/dist/themes/default/style.css',
          // 'bower_components/jstree/dist/jstree.js',
          // 'bower_components/ng-js-tree/dist/ngJsTree.js',
          // 'bower_components/jquery-slimscroll/jquery.slimscroll.min.js'
          ]
        }
      },
      test: {
        devDependencies: true,
        src: 'karma.conf.js',
        // options: {
        //   ignorePath: '../../'
        //   // https://github.com/taptapship/wiredep#configuration
        // }
      }
    },
    useminPrepare: {
      php: ['dist/application/views/main.php','dist/application/views/login.php','dist/assets/js/controllers/**/*.js'],
      options: {
        // root: '/',
        dest: 'dist/',
        flow: {
          php: {
            steps: {
              js: ['concat', 'uglify'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    usemin: {
      php: ['dist/application/views/main.php','dist/application/views/login.php'],
        // 
      css: ['dist/assets/css/{,*/}*.css'],
        //   //
      js: ['dist/assets/js/{,*/}*.js'],
    },
    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      all: {
        src: ['dist/assets/js/**/*.js', 'dist/assets/css/**/*.css', 'dist/assets/images/**/*.{jpg,jpeg,gif,png,webp}'],
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      main: {
        expand: true,
        src: ['.htaccess','index.php','application/**/*','assets/js/controllers/**/*','assets/images/**/*','assets/fonts/**/*','system/**/*'],
        dest: 'dist/',
      },
      bowerLazyLoad: {
        expand: true,
        src: [
		'bower_components/jstree/dist/themes/default/style.min.css',
		'bower_components/jstree/dist/jstree.js',
		'bower_components/ng-js-tree/dist/ngJsTree.js',
        'bower_components/angular-file-upload/dist/angular-file-upload.js'
        ],
        dest: 'dist/',
      },
      lineicon: {
		expand: true,
		cwd: 'bower_components/simple-line-icons/fonts/',
		src: '*',
		dest: 'dist/assets/fonts/'
      },
      glyphicon:
      {
		expand: true,
		cwd: 'bower_components/bootstrap/dist/fonts/',
		src: '*',
		dest: 'dist/assets/fonts/'	
      }
    },
    clean: {
      dist: {
        src: ['dist/']
      },
      docs: {
        src: ['docs/']
      }
    },
    shell: {
      installBower: {
        command: 'bower install',
      },
      installNpm: {
        command: 'npm install',
      },
      installBothBowerNpm: {
        command: 'npm install && bower install',
      },
      phpDocumentor: {
        command: 'vendor/phpdocumentor/phpdocumentor/bin/phpdoc -t docs/api/ -i application/tests/,application/config/ -d application/',
      }
    },
    replace: {
      before: {
        options: {
          patterns: [
          {
            match: /<\?php echo base_url\(\) *\;* *\?>bower_components/g,
            replacement: '../../../bower_components'
          },
          {
            match: /<\?php echo base_url\(\) *\;* *\?>assets\/js/g,
            replacement: '../../../assets/js'
          },
          {
            match: /<\?php echo base_url\(\) *\;* *\?>assets\/css/g,
            replacement: '../../../assets/css'
          }
          ]
        },
        files: [
        {expand: true, flatten: true, src: ['application/views/main.php','dist/application/views/login.php'], dest: 'dist/application/views/'}
        ]
      },
      after: {
        options: {
          patterns: [
          {
            match: /src="assets/g,
            replacement: 'src="<?php echo base_url() ?>assets'
          },
          {
            match: /href="assets/g,
            replacement: 'href="<?php echo base_url() ?>assets'
          }
          ]
        },
        files: [
        {expand: true, flatten: true, src: ['dist/application/views/main.php','dist/application/views/login.php'], dest: 'dist/application/views/'}
        ]
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: '.jshintrc',
      },
      app: ['assets/**/*.js'],
      grunt: ['Gruntfile.js']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        port: 9999,
        singleRun: true,
        browsers: ['PhantomJS'],
        logLevel: 'ERROR'
      }
    },
    // concat: {
    //   dist: {
    //     src: [
    //     'dist/assets/js/controllers/**/*.js',
    //     'dist/assets/js/services/**/*.js',
    //     'dist/assets/js/directives/**/*.js',
    //     'dist/assets/js/filters/**/*.js',
    //     ],
    //     dest: 'dist/built.js',
    //   },
    // },
    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/assets/js/',
          src: '**/*.js',
          dest: 'dist/assets/js/'
        }]
      }
    },
    watch: {
      scripts: {
        files: ['assets/**/*.js'],
        tasks: ['jshint:app'],
        options: {
          spawn: false,
        },
      },
    },
    jsdoc : {
      app : {
        src: ['assets/js/**/*.js'],
        options: {
          destination: 'docs/js/app/',
          template: 'node_modules/ink-docstrap/template',
          configure: 'node_modules/ink-docstrap/template/jsdoc.conf.json'
        }
      },
      test : {
        src: ['tests/**/*.js'],
        options: {
          destination: 'docs/js/test/'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-replace');
  // grunt.loadNpmTasks('grunt-shell');
  // grunt.loadNpmTasks('grunt-wiredep');
  // grunt.loadNpmTasks('grunt-usemin');
  // grunt.loadNpmTasks('grunt-filerev');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-karma');
  // grunt.loadNpmTasks('grunt-jsdoc');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  // grunt.registerTask('integrate', ['wiredep']);
  // grunt.registerTask('setup', ['shell:installBothBowerNpm','wiredep']);
  // grunt.registerTask('build', [
  //   'jshint:app',
  //   'clean',
  //   'copy',
  //   'replace:before',
  //   'useminPrepare',
  //   'concat:generated',
  //   'cssmin:generated',
  //   'uglify',
  //   // 'filerev',
  //   'usemin',
  //   'replace:after'
  //   ]);
  // grunt.registerTask('test', ['karma']);
  grunt.registerTask('dev', ['watch']);
  // grunt.registerTask('doc', ['shell:phpDocumentor']);
  // grunt.registerTask('test',['clean','copy','replace']);

};