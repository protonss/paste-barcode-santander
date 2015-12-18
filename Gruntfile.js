module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    package: grunt.file.readJSON("package.json"),
    asciify: {
      options: {
        font: "colossal",
        log: true
      },
      logo: {
        text: "Paste Barcode SantanderBR"
      }
    },
    clean: {
      packages: ["node_modules", "bower_components"],
      cache: ["dump.rdb", ".DS_Store"],
      build: ["dist"],
      log: ["npm-debug.log"]
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: "app/styles/css",
          src: ["*.css", "!*.min.css"],
          dest: "dist/styles/css",
          ext: ".min.css"
                }]
      }
    },
    copy: {
      images: {
        expand: true,
        cwd: "app/styles/images/",
        src: "**",
        dest: "dist/styles/images/",
        flatten: true,
        filter: "isFile"
      },
      main: {
        files: [{
          src: "app/manifest.json",
          dest: "dist/manifest.json"
                }]
      },
      html: {
        expand: true,
        cwd: "app/",
        src: "*.html",
        dest: "dist/",
        flatten: true,
        filter: "isFile"
      }
    },
    githooks: {
      all: {
        "pre-commit": "test"
      }
    },
    imagemin: {
      dist: {
        options: {
          cache: false
        },
        files: [{
          expand: true,
          cwd: "dist/styles/images/",
          src: ["**/*.{png,jpg,gif}"],
          dest: "dist/styles/images/"
                }]
      }
    },
    jsbeautifier: {
      options: {
        config: ".jsbeautifyrc"
      },
      files: {
        src: [
                    "Gruntfile.js",
                    "app/scripts/**/*.js"
                ]
      },
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        reporter: require("jshint-stylish")
      },
      files: {
        src: [
                    "Gruntfile.js"
                ]
      }
    },
    notify: {
      install: {
        options: {
          title: "PasteBarCodeSantanderBR",
          message: "Installation completed successfully"
        }
      },
      test: {
        options: {
          title: "PasteBarCodeSantanderBR",
          message: "Test has finished running"
        }
      },
      build: {
        options: {
          title: "PasteBarCodeSantanderBR",
          message: "Build completed successfully"
        }
      }
    },
    shell: {
      bower: {
        command: function() {
          return "bower install --allow-root";
        }
      }
    },
    uglify: {
      options: {
        mangle: true,
        compress: {
          drop_console: true
        },
        banner: "/*! <%= package.name %> - v<%= package.version %> */"
      },
      dist_inject: {
        options: {
          sourceMap: true,
          sourceMapName: "dist/scripts/inject.min.js.map"
        },
        files: {
          "dist/scripts/inject.min.js": [
                        "app/scripts/inject.js",
                        "app/scripts/functions.js"
                    ]
        }
      },
      dist_popup: {
        options: {
          sourceMap: true,
          sourceMapName: "dist/scripts/popup.min.js.map"
        },
        files: {
          "dist/scripts/popup.min.js": [
                        "app/scripts/popup.js"
                    ]
        }
      },
    },
    compress: {
      main: {
        options: {
          archive: "<%= package.name %> - v<%= package.version %>.zip"
        },
        files: [ // includes files in path
          {
            expand: true,
            cwd: "dist/",
            src: ["**"],
            filter: "isFile"
          }
                ]
      }
    },
    watch: {
      json: {
        files: [
                    "app/manifest.json"
                ],
        tasks: [
                    "copy"
                ]
      },
      js: {
        files: [
                    "Gruntfile.js",
                    "app/scripts/**/*.js"
                ],
        tasks: [
                    "jsbeautifier",
                    "jshint",
                    "uglify"
                ]
      },
      css: {
        files: [
                    "app/styles/css/**/*.css"
                ],
        tasks: [
                    "cssmin"
                ]
      },
      html: {
        files: [
                    "app/**/*.html"
                ],
        tasks: [
                    "copy"
                ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-asciify");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-githooks");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks("grunt-newer");
  grunt.loadNpmTasks("grunt-notify");
  grunt.loadNpmTasks("grunt-shell");

  grunt.registerTask("build", [
        "shell:bower",
        "clean:build",
        "copy",
        "jsbeautifier",
        "jshint",
        "cssmin",
        "newer:imagemin",
        "newer:uglify",
        "asciify",
        "notify:build"
    ]);

  grunt.registerTask("default", ["install"]);
  grunt.registerTask("install", ["build", "notify:install"]);
  grunt.registerTask("run", ["watch"]);
  grunt.registerTask("deploy", ["build", "compress"]);
  grunt.registerTask("test", ["jshint", "notify:test"]);

};
