const { merge } = require('webpack-merge');
const development = require('./config/webpack/development');
const production = require('./config/webpack/production');
const common = require('./config/webpack/common');

module.exports = (env, args) => {
    switch (args.mode) {
        case 'development':
            return merge(common, development);
        case 'production':
            return merge(common, production);
        default:
            throw new Error('no mode configuration!');
    }
}