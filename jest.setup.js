/* eslint-env jest */
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@react-native-vector-icons/ionicons', () => ({ Ionicons: 'Ionicons' }));
jest.mock('react-native-qrcode-svg', () => 'QRCode');
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
