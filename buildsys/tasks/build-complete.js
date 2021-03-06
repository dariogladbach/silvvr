/**
 * tasks/build-complete.js
 * ------------------------------------
 * TASK: Build Complete
 * 'gulp build-complete'
*/

import del from 'del';
import runSequence from 'run-sequence';

/**
    $ gulp build-complete
    > Copies files from '.tmp' into 'dist'.
*/
gulp.task('build-complete', function (cb) {
    logger.task('RUNNING TASK : build-complete');
    runSequence('build-complete:copy-tmp', 'build-complete:delete-tmp', cb);
});


/* $ gulp build-complete:copy-tmp */

gulp.task('build-complete:copy-tmp', function () {
    // Only copy '.tmp' to './dist' if build-only mode is on
    if(buildOnlyMode) {
        return gulp.src('./.tmp/**/*')
            .pipe(gulp.dest(config.oldBuildDir.root));
    }
});


/* $ gulp build-complete:delete-tmp */

gulp.task('build-complete:delete-tmp', function () {
    // Delete '.tmp' folder
    return del('./.tmp');
});