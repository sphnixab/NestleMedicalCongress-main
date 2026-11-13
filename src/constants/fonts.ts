import { ms } from './dimensions';

export const fontFamily = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  semiBold: 'PlusJakartaSans-SemiBold',
  bold: 'PlusJakartaSans-Bold',
  extraBold: 'PlusJakartaSans-ExtraBold',
} as const;

export const fontSize = {
  xxs: ms(10),
  xs: ms(11),
  sm: ms(12),
  md: ms(14),
  lg: ms(16),
  xl: ms(18),
  xxl: ms(22),
  xxxl: ms(28),
  display: ms(34),
  hero: ms(38),
} as const;
