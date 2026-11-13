import { Dimensions, PixelRatio } from 'react-native';

const BASE_WIDTH = 390;
const { width, height } = Dimensions.get('window');

export const screen = { width, height };

const ratio = Math.min(Math.max(width / BASE_WIDTH, 0.85), 1.25);

export const scale = (size: number): number =>
  Math.round(PixelRatio.roundToNearestPixel(size * ratio));

export const ms = (size: number, factor = 0.5): number =>
  Math.round(PixelRatio.roundToNearestPixel(size + (size * ratio - size) * factor));

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
  pill: 999,
} as const;

export const sizes = {
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  iconXl: 32,
  headerButton: 44,
  inputHeight: 42,
  buttonHeight: 42,
  tabBarHeight: 64,
  avatarSm: 48,
  avatarMd: 64,
  avatarXl: 112,
  chipHeight: 36,
} as const;

export const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 } as const;
