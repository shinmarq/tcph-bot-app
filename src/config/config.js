module.exports = {
    name: require('./../../package.json').name,
    version: require('./../../package.json').version,
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3978,
}