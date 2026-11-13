import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppIcon as Icon } from './AppIcon';
import { colors, gradients } from '../../constants/colors';
import { radius, sizes } from '../../constants/dimensions';
import { screenPadding, spacing } from '../../constants/spacing';
import { AppText } from './AppText';

interface HeroCardProps {
  icon: string;
  title: string;
  subtitle: string;
  tone?: 'blue' | 'gold';
}

export const HeroCard = ({ icon, title, subtitle, tone = 'blue' }: HeroCardProps) => (
  <View style={styles.card}>
    <LinearGradient
      colors={[...(tone === 'gold' ? gradients.goldIcon : gradients.icon)]}
      style={styles.icon}>
      <Icon name={icon} size={sizes.iconLg} color={tone === 'gold' ? colors.navy800 : colors.white} />
    </LinearGradient>
    <View style={styles.copy}>
      <AppText variant="h3" color={colors.white}>
        {title}
      </AppText>
      <AppText variant="caption" color={colors.textOnDarkMuted} style={styles.subtitle}>
        {subtitle}
      </AppText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: screenPadding,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1 },
  subtitle: { marginTop: spacing.xs },
});
