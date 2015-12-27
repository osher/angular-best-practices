var path = require('path');
var gulp = require('gulp');
var karma = require('karma').server;
var isTravis = process.env.TRAVIS || false;
var pathToKarmaConf = process.cwd();

module.exports = gulp.task('test', function (done) {
  karma.start({
    configFile: path.join(pathToKarmaConf ,'karma.conf.js'),
    singleRun: isTravis
  }, done);
});
