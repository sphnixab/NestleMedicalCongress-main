import { colors, gradients } from '../constants/colors';
import { radius, sizes } from '../constants/dimensions';
import { fontFamily, fontSize } from '../constants/fonts';
import { spacing } from '../constants/spacing';

export const theme = {
  colors,
  gradients,
  spacing,
  radius,
  sizes,
  fontFamily,
  fontSize,
  shadow: {
    card: {
      shadowColor: '#050C33',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 14,
      elevation: 4,
    },
    soft: {
      shadowColor: '#050C33',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
  },
} as const;

export type AppTheme = typeof theme;
