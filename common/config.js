const fs = require('fs');

// read the configuration from file synchronously
const config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));

module.exports = config;
