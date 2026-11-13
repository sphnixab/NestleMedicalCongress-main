import React, { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppIcon } from '../../../components/common/AppIcon';
import { AppText } from '../../../components/common/AppText';
import { colors } from '../../../constants/colors';
import { hitSlop, radius, sizes } from '../../../constants/dimensions';
import { spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';

export const AuthCard = ({ children }: PropsWithChildren) => <View style={styles.card}>{children}</View>;

export const OrDivider = ({ label }: { label: string }) => (
  <View style={styles.dividerRow}>
    <View style={styles.line} />
    <AppText variant="overline" color={colors.textMuted}>
      {label}
    </AppText>
    <View style={styles.line} />
  </View>
);

export const SocialButtons = ({ onPress }: { onPress: () => void }) => (
  <View style={styles.socialRow}>
    {(['google', 'apple'] as const).map(provider => (
      <Pressable
        key={provider}
        accessibilityRole="button"
        accessibilityLabel={provider === 'google' ? 'Continue with Google' : 'Continue with Apple'}
        onPress={onPress}
        style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}>
        <AppIcon
          name={provider === 'google' ? 'logo-google' : 'logo-apple'}
          size={sizes.iconLg}
          color={provider === 'google' ? '#DB4437' : colors.black}
        />
      </Pressable>
    ))}
  </View>
);

export const ErrorBanner = ({ message }: { message: string }) => (
  <View style={styles.banner} accessibilityRole="alert">
    <AppIcon name="alert-circle" size={sizes.iconMd} color={colors.danger} />
    <AppText variant="caption" color={colors.danger} style={styles.bannerText}>
      {message}
    </AppText>
  </View>
);

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
  error?: string;
}

export const Checkbox = ({ checked, onToggle, label, error }: CheckboxProps) => (
  <View>
    <Pressable
      hitSlop={hitSlop}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onToggle}
      style={styles.checkRow}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <AppIcon name="checkmark" size={14} color={colors.white} /> : null}
      </View>
      <AppText variant="caption" color={colors.textSecondary} style={styles.checkLabel}>
        {label}
      </AppText>
    </Pressable>
    {error ? (
      <AppText variant="caption" color={colors.danger} style={styles.checkError}>
        {error}
      </AppText>
    ) : null}
  </View>
);

export const FeatureStrip = () => {
  const items = [
    { icon: 'people', label: strings.auth.featureExperts },
    { icon: 'laptop-outline', label: strings.auth.featureSessions },
    { icon: 'star-outline', label: strings.auth.featureNetworking },
  ];
  return (
    <View style={styles.strip}>
      {items.map(item => (
        <View key={item.icon} style={styles.stripItem}>
          <View style={styles.stripIcon}>
            <AppIcon name={item.icon} size={sizes.iconMd} color={colors.cyan300} />
          </View>
          <AppText variant="overline" color={colors.textOnDarkMuted} style={styles.stripLabel}>
            {item.label}
          </AppText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.xl,
    borderRadius: radius.xxl,
    backgroundColor: colors.white,
    gap: spacing.sm,
  },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  socialRow: { flexDirection: 'row', gap: spacing.sm },
  socialButton: {
    flex: 1,
    height: sizes.buttonHeight,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { backgroundColor: colors.surfaceMuted },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.dangerSoft,
  },
  bannerText: { flex: 1 },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  boxChecked: { backgroundColor: colors.blue500, borderColor: colors.blue500 },
  checkLabel: { flex: 1 },
  checkError: { marginTop: spacing.xs, marginLeft: 34 },
  strip: {
    flexDirection: 'row',
    padding: spacing.sm,
    borderRadius: radius.xl,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    gap: spacing.xxs,
  },
  stripItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  stripIcon: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: colors.glassStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stripLabel: { flex: 1, fontSize: 7},
});
