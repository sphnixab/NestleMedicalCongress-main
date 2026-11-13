import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppIcon as Icon } from './AppIcon';
import { colors } from '../../constants/colors';
import { hitSlop, radius, sizes } from '../../constants/dimensions';
import { screenPadding, spacing } from '../../constants/spacing';
import { AppText } from './AppText';
import { strings } from '../../constants/strings';

interface AppHeaderProps {
  title: string;
  onBack?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  rightLabel?: string;
}

export const AppHeader = ({ title, onBack, rightIcon, onRightPress, rightLabel }: AppHeaderProps) => (
  <View style={styles.row}>
    {onBack ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={hitSlop}
        onPress={onBack}
        style={styles.button}>
        <Icon name="chevron-back" size={sizes.iconLg} color={colors.white} />
      </Pressable>
    ) : (
      <View style={styles.spacer} />
    )}
    <AppText variant="h3" color={colors.white} style={styles.title} numberOfLines={1}>
      {title}
    </AppText>
    {rightIcon ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={rightLabel ?? 'Action'}
        hitSlop={hitSlop}
        disabled={!onRightPress}
        onPress={onRightPress}
        style={[styles.button, styles.rightButton]}>
        <Icon name={rightIcon} size={sizes.iconMd} color={ title != strings.profile.title ? colors.gold400 : colors.white} />
      </Pressable>
    ) : (
      <View style={styles.spacer} />
    )}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  button: {
    width: sizes.headerButton,
    height: sizes.headerButton,
    borderRadius: radius.md,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: { backgroundColor: colors.glassStrong },
  spacer: { width: sizes.headerButton },
  title: { flex: 1 },
});
