import path from 'path';
import nconf from 'nconf';

nconf.env().argv();

const pathToConfigFile = `${path.resolve('./config')}/config.json`;
console.log(pathToConfigFile);
nconf.file(pathToConfigFile);

const defaults = require('./defaults.json');
nconf.defaults(defaults);

export const config = nconf;
