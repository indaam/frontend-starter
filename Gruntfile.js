module.exports = function(grunt) {
    require("path");
    grunt.loadNpmTasks("grunt-contrib-cssmin"), 
    grunt.loadNpmTasks("grunt-contrib-uglify"), 
    grunt.loadNpmTasks("grunt-contrib-concat"),
    grunt.loadNpmTasks("grunt-contrib-watch"),
    grunt.loadNpmTasks("css-mqpacker"),
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        /*
        ============ Concat: Merge File
        */
        concat: {
            options: {
                stripBanners: true,
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> */\n",
                separator: '\n;',
            },
            all: {
                src: [
                    "<%= pkg.source %>/libs/jQuery2/dist/jquery.min.js",
                    "<%= pkg.source %>/libs/underscore/underscore-min.js",
                    "<%= pkg.source %>/js/tools.js",
                    "<%= pkg.source %>/js/main.js"
                    ],
                dest: "<%= pkg.dist %>/js/all.js"
            }
        },

        /*
        ============ uglify: Minify And beautifuly your codex
        */
        uglify: {
            js_min: {
                options: {
                    banner: '/*\nDeveloper: <%= pkg.dev %> \nName: <%= pkg.name %>\nVersion: <%= pkg.version %>\nLast Compile: <%= grunt.template.today("yyyy-mm-dd h:MM:ss") %> */\n',
                    compress: {
                        drop_console: true
                    },
                },
                files: [
                    {
                        expand: true,
                        cwd: "<%= pkg.dist %>/js/",
                        // src: [ "*.js", "!*.min.js" ],
                        src: [ "*", "!*.beautify.js", "!*.min.js", "!*/**" ],
                        // src: [ "*.js", "!*.beautify.js", "!*.min.js" ],
                        dest: "<%= pkg.dist %>/js/",
                        ext: ".min.js"
                    },
                ]
            },
        },
        /*
        ============ Sorting Media Query
        */
        css_mqpacker: {
            options: {
                // map: {
                //   inline: false,
                //   sourcesContent: false
                // }
                map: false
            },
            main: {
                expand: true,
                cwd: "<%= pkg.dist %>/css/",
                src: [ "*.css", "!*.min.css", "!*.sort.css" ],
                dest: "<%= pkg.dist %>/css/",
                ext: ".sort.css"
            }
        },
        /*
        ============ cssmin: Minify css
        */
        cssmin: {
            options: {
                banner: '/*\nDeveloper: <%= pkg.dev %> \nName: <%= pkg.name %>\nVersion: <%= pkg.version %>\nLast Compile: <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mediaMerging : true,
                semanticMerging  : true,
                shorthandCompacting  : true
            },
            minify: {
                expand: true,
                cwd: "<%= pkg.dist %>/css/",
                // src: [ "*.css", "*.*.css", "!*.min.css" ],
                src: [ "*.sort.css" ],
                dest: "<%= pkg.dist %>/css/",
                ext: ".min.css"
            }
        },
        watch: {
            options: {
                livereload: true,
                nospawn: true
            },
            css: {
                files: [ "<%= pkg.dist %>/css/*"],
                // files: [ "<%= pkg.dir %>/ori/sass/**/*" ],
                // tasks: [ "compass" ]
                // tasks: [ "newer:compass" ]
            },
            js: {
                files: [ "<%= pkg.source %>/js/**/*", "<%= pkg.source %>/libs/**/*" ],
                // tasks: [ "newer:uglify" ]
            },
            html: {
                files: [ "*.html"],
                // tasks: [ "newer:uglify" ]
            },
        }
    }),

    grunt.registerTask("c",                 [ "concat" ]);
    grunt.registerTask("u",                 [ "uglify" ]);
    grunt.registerTask("csort",             [ "css_mqpacker" ]);
    grunt.registerTask("cmin",              [ "cssmin" ]);
    grunt.registerTask("w",                 [ "watch" ]);

};