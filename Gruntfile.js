module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            scripts: {
                files: ['templates/*.html'],
                tasks: ['build']
            }
        },

        copy: {
            lib: {
                files: [
                {
                    expand: true,
                    flatten: true,
                    dest: 'app/js/lib/',
                    src: [
                    'bower_components/jquery/jquery.js',
                    'bower_components/jquery/jquery.min.map',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/handlebars/handlebars.runtime.js',
                    'bower_components/eventEmitter/EventEmitter.js',
                    ]
                },
                {
                    expand: true,
                    flatten: true,
                    dest: 'app/css/',
                    src: [
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'bower_components/font-awesome/css/font-awesome.css'
                    ]
                },
                {
                    expand: true,
                    flatten: true,
                    dest: 'app/fonts/',
                    src: [
                    'bower_components/bootstrap/dist/fonts/*',
                    'bower_components/font-awesome/fonts/*'
                    ]
                }
                ]
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: 'templates',
                    partialsUseNamespace: true,
                    processName: function(filename) {
                        return filename.replace('templates/', '').replace('.html', '');
                    }
                },
                files: {
                    'app/js/lib/template.js': 'templates/*.html'
                }
            }
        }
    });

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-handlebars');
grunt.loadNpmTasks('grunt-contrib-copy');

grunt.registerTask('build', ['handlebars', 'copy:lib']);

};
