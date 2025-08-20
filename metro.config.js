const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Completely disable New Architecture and TurboModules
config.resolver.unstable_enableSymlinks = false;
config.resolver.unstable_enablePackageExports = false;

// Force legacy architecture
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: false,
  hermesParser: false,
};

// Disable experimental features that might trigger TurboModules
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;
