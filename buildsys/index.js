/**
 * index.js
 * Index of buildsys. Handles loading of all tasks and setting up environment from flags.
*/

import fs from 'fs';
import gulp from 'gulp';
import logger from './utils/logger';
import config from './config';
import pkg from '../package.json';

// Grab command line arguments
var argv = require('yargs').argv;


/**
    Set build environment (dev, stage, or prod)
*/
var env = 'dev';
if      (argv.stage) { env = 'stage'; }
else if (argv.prod)  { env = 'prod';  }


/**
    Build-only mode?
*/
var buildOnlyMode = false;
if(argv.build) { buildOnlyMode = true; }


/**
    Globals
*/

// Make environment globally accessible
global.env = env;

// Make gulp globally accessible
global.gulp = gulp;

// Make logger globally accessible
global.logger = logger;

// Make config globally accessible
global.config = config;

// Make build-only mode globally accessible
global.buildOnlyMode = buildOnlyMode;


/**
    Startup Banner log
*/
logger.banner('S I L V V R  Started');
logger.header(`${pkg.name} @version ${pkg.version}`);
logger.header(`By ${pkg.author}`);


/**
    Require all gulp tasks
*/
var tasks = fs.readdirSync('./buildsys/tasks/');
tasks.forEach(function (task) {
    if(/\.js/.test(task)) {
        logger.info('Requiring task ' + task + '...');
        require(`./tasks/${task}`);
    }
});


/**
    Require gulp commands
*/
require('./commands');
