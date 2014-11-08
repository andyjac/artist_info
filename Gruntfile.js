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
    },
    watch: {
      jade: {
        files: 'views/results.jade',
        tasks: 'jade'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
