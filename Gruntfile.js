module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      options: {
        transform: ['reactify']
      },
      './public/js/main.js': ['./client/d3_cloud_example.js'],
      './public/js/app.js': ['./client/app.js']
    },
    watch: {
      files: [ "client/**/*.js", "Gruntfile.js"],
      tasks: [ 'browserify' ]
    },
    serve: {
      options: {
        serve: {
          path: './public'
        },
        port: 8000
      }
    }
  })
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-serve')
}
