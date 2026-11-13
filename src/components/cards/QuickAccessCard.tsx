import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients } from '../../constants/colors';
import { radius, sizes } from '../../constants/dimensions';
import { spacing } from '../../constants/spacing';
import { QuickAccessItem } from '../../types/models.types';
import { AppIcon } from '../common/AppIcon';
import { AppText } from '../common/AppText';

interface QuickAccessCardProps {
  item: QuickAccessItem;
  onPress: (item: QuickAccessItem) => void;
}

/** Compact dark tile used on the home dashboard. */
export const QuickAccessTile = memo(({ item, onPress }: QuickAccessCardProps) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={item.title}
    onPress={() => onPress(item)}
    style={({ pressed }) => [tileStyles.tile, pressed && tileStyles.pressed]}>
    <AppIcon name={item.icon} size={sizes.iconLg} color={colors.cyan300} />
    <AppText variant="overline" color={colors.textOnDarkMuted} numberOfLines={1} style={tileStyles.label}>
      {item.title}
    </AppText>
  </Pressable>
));

/** Large white card used on the Quick Access screen. */
export const QuickAccessCard = memo(({ item, onPress }: QuickAccessCardProps) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={item.title}
    onPress={() => onPress(item)}
    style={({ pressed }) => [cardStyles.card, pressed && cardStyles.pressed]}>
    <LinearGradient colors={[...gradients.icon]} style={cardStyles.icon}>
      <AppIcon name={item.icon} size={sizes.iconLg} color={colors.white} />
    </LinearGradient>
    <AppText variant="title" style={cardStyles.title}>
      {item.title}
    </AppText>
    <AppText variant="caption" color={colors.textSecondary} numberOfLines={2} style={cardStyles.subtitle}>
      {item.subtitle}
    </AppText>
    <View style={cardStyles.footer}>
      <View style={cardStyles.badge}>
        <AppText variant="overline" color={colors.gold500}>
          {item.category}
        </AppText>
      </View>
      <AppIcon name="arrow-forward" size={sizes.iconMd} color={colors.blue500} />
    </View>
  </Pressable>
));

const tileStyles = StyleSheet.create({
  tile: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radius.lg,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  pressed: { backgroundColor: colors.glassStrong },
  label: { letterSpacing: 0.2 },
});

const cardStyles = StyleSheet.create({
  card: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  pressed: { opacity: 0.9 },
  icon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: { marginTop: spacing.xs },
  subtitle: { minHeight: 32 },
  footer: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.sm,
    backgroundColor: colors.gold100,
  },
});
