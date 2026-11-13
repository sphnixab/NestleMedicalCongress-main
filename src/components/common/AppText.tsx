import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { fontFamily, fontSize } from '../../constants/fonts';

export type TextVariant = 'display' | 'h1' | 'h2' | 'h3' | 'title' | 'body' | 'bodyStrong' | 'caption' | 'label' | 'overline';

const variantStyles: Record<TextVariant, TextStyle> = {
  display: { fontFamily: fontFamily.extraBold, fontSize: fontSize.display, letterSpacing: 0.5 },
  h1: { fontFamily: fontFamily.extraBold, fontSize: fontSize.xxxl },
  h2: { fontFamily: fontFamily.extraBold, fontSize: fontSize.xxl },
  h3: { fontFamily: fontFamily.bold, fontSize: fontSize.xl },
  title: { fontFamily: fontFamily.bold, fontSize: fontSize.lg },
  body: { fontFamily: fontFamily.medium, fontSize: fontSize.md },
  bodyStrong: { fontFamily: fontFamily.bold, fontSize: fontSize.md },
  caption: { fontFamily: fontFamily.medium, fontSize: fontSize.sm },
  label: { fontFamily: fontFamily.bold, fontSize: fontSize.xs },
  overline: { fontFamily: fontFamily.extraBold, fontSize: fontSize.xxs, letterSpacing: 1 },
};

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export const AppText = ({ variant = 'body', color = colors.textPrimary, style, ...rest }: AppTextProps) => (
  <Text allowFontScaling={false} style={[variantStyles[variant], { color }, style]} {...rest} />
);
