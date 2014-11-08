module.exports = function(grunt) {
  grunt.initConfig({
    jade: {
      compile: {
        options: {
          client: true,
          namespace: false
        },
        files: {
          'public/javascripts/results.js': 'views/results.jade'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.registerTasks('jade', 'grunt-contrib-jade');
};
