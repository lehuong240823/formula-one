const env = process.env.NODE_ENV || 'default';
const config = require(`./${env}.js`);
module.exports = config;