import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppIcon as Icon } from './AppIcon';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { AppButton } from './AppButton';
import { AppText } from './AppText';

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({ title, message, icon = 'search-outline', actionLabel, onAction }: EmptyStateProps) => (
  <View style={styles.container}>
    <Icon name={icon} size={44} color={colors.textMuted} />
    <AppText variant="title" color={colors.textPrimary}>
      {title}
    </AppText>
    {message ? (
      <AppText variant="caption" color={colors.textSecondary} style={styles.message}>
        {message}
      </AppText>
    ) : null}
    {actionLabel && onAction ? (
      <AppButton title={actionLabel} onPress={onAction} variant="outline" style={styles.button} />
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: spacing.xxxl, gap: spacing.sm },
  message: { textAlign: 'center' },
  button: { alignSelf: 'stretch', marginTop: spacing.md },
});
