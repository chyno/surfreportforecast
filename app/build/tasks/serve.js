var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000

 

gulp.task('serve', ['build'], function(done) {
 
    browserSync({
     browser: "google chrome",
     reloadOnRestart: true,
    online: false,
    open: false,
    port: 9000,
     
  }, done);
});

 


 