const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Keep it simple for web builds
config.resolver.unstable_enableSymlinks = false;

module.exports = config;
