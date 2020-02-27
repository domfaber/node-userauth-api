// requires
const _ = require('lodash');

// module variables
var loadConfigToModify = require('./config.json');

//we need to load the credentials for production db from environment variable and add it manually to the config
//loadConfigToModify.production.db_user = process.env.SECRET_DBUSERNAME;
//loadConfigToModify.production.db_password = process.env.SECRET_DBPASSWORD;

const config = loadConfigToModify;

const defaultConfig = config.local;
const environment = process.env.NODE_ENV || 'local'; 
const environmentConfig = config[environment];


const finalConfig = _.merge(defaultConfig, environmentConfig);

// as a best practice
// all global variables should be referenced via global. syntax
// and their names should always begin with g
global.gConfig = finalConfig;

// log global.gConfig
console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);
