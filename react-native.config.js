module.exports = {
  dependencies: {
    // Disable auto-linking for problematic packages
    'react-native-reanimated': {
      platforms: {
        android: null,
        ios: null,
      },
    },
  },
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/'],
};
