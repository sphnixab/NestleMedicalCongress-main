import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { screenPadding, spacing } from '../../../constants/spacing';

export const AuthLayout = ({ children }: PropsWithChildren) => (
  <ScreenContainer edges={['top', 'bottom']}>
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  </ScreenContainer>
);

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: screenPadding,
    paddingVertical: spacing.xl,
    gap: spacing.xl,
  },
});
