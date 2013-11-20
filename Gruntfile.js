path = require('path');

module.exports = function(grunt) {
    /**
    * Load Modules
    */
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');

    
    grunt.initConfig({
        
        /**
        * Compile jade files in "src/template directory" to "dist" directory
        */
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/html',
                    src: ['*.jade'],
                    dest: 'dist/camera/html',
                    ext: '.html',
                }]
            }
        },

        /**
        * Compass is awesome
        */

        compass: {                  // Task
          dist: {                   // Target
            options: {              // Target options
              config : "config.rb"
            }
          }
        },
        
        /**
        * Watches Jade file(s) changes and compile the changes
        */
        watch: {
            options: {
                livereload: true,
                nospawn: true
            },
            css: {
              files: ['src/sass/**/*'],
              tasks: ['compass'],
            },
            templates: {
                files: [
                    'src/html/**/*'],
                tasks: [
                    'jade'],
                options: {
                    nospawn: true
                }
            }
        }
    })
    
    /**
    * Compile jade file while on watch, but only the changed file being compiled.  
    */
    grunt.event.on('watch', function(action, filepath){
        grunt.config(
            ['jade', 'compile', 'files'], 
            [{
                src: filepath, dest: 'dist/' + path.basename(filepath, '.jade') + '.html'
            }]
        );
    });
    
    /**
    * Default task
    */
    grunt.registerTask('jalan', ['compass', 'jade', 'watch']);

}