module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    ts: {
      app: {
        src: ['src/api/**/*.ts'],
        outDir: 'server',
        options: {
          module: 'commonjs',
          noLib: false,
          target: 'es5',
          sourceMap: false,
          emitDecoratorMetadata: true,
          experimentalDecorators: true
        }
      }
    },
    tslint: {
      options: {
        configuration: 'tslint.json'
      },
      files: {
        src: ['src/api/**/*.ts']
      }
    },
    watch: {
      ts: {
        files: ['src/api/**/*.ts'],
        tasks: ['ts', 'tslint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-tslint');

  grunt.registerTask('default', [
    'ts',
    'tslint'
  ]);

};