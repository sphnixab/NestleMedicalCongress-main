module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-vector-icons|@react-navigation|react-native-.*)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
};
