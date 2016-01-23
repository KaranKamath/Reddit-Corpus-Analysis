module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      './public/js/main.js': ['./client/d3_cloud_example.js']
    },
    watch: {
      files: [ "client/**/*.js"],
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
