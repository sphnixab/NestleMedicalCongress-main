import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { AppText } from '../../../components/common/AppText';
import { ControlledInput } from '../../../components/common/ControlledInput';
import { colors } from '../../../constants/colors';
import { hitSlop, radius, sizes } from '../../../constants/dimensions';
import { spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { AuthScreenProps } from '../../../navigation/navigationTypes';
import { ForgotPasswordForm, forgotPasswordSchema } from '../../../utils/validationUtils';
import { AuthCard } from '../components/AuthComponents';
import { AuthLayout } from '../components/AuthLayout';

export const ForgotPasswordScreen = ({ navigation }: AuthScreenProps<'ForgotPassword'>) => {
  const [succeeded, setSucceeded] = useState(false);
  const { control, handleSubmit } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  // There is no backend, so a valid email just shows the confirmation screen.
  const onSubmit = handleSubmit(() => setSucceeded(true));

  return (
    <AuthLayout>
      <Pressable
        hitSlop={hitSlop}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={navigation.goBack}
        style={styles.back}>
        <AppIcon name="chevron-back" size={sizes.iconLg} color={colors.white} />
      </Pressable>

      <View style={styles.hero}>
        <AppText variant="h1" color={colors.white}>
          {strings.auth.resetTitle}
        </AppText>
        <AppText variant="body" color={colors.textOnDarkMuted}>
          {strings.auth.resetSubtitle}
        </AppText>
      </View>

      <AuthCard>
        {succeeded ? (
          <View style={styles.success}>
            <View style={styles.successIcon}>
              <AppIcon name="mail-open-outline" size={32} color={colors.success} />
            </View>
            <AppText variant="h3">{strings.auth.resetSuccessTitle}</AppText>
            <AppText variant="body" color={colors.textSecondary} style={styles.center}>
              {strings.auth.resetSuccessBody}
            </AppText>
            <AppButton
              title={strings.auth.backToSignIn}
              onPress={() => navigation.navigate('Login')}
              style={styles.fullWidth}
            />
          </View>
        ) : (
          <>
            <ControlledInput
              control={control}
              name="email"
              icon="mail-outline"
              placeholder={strings.auth.emailAddress}
              keyboardType="email-address"
              autoComplete="email"
              onSubmitEditing={onSubmit}
            />
            <AppButton
              title={strings.auth.resetAction}
              onPress={onSubmit}
              testID="forgot-submit"
            />
          </>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  back: {
    width: sizes.headerButton,
    height: sizes.headerButton,
    borderRadius: radius.md,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: { gap: spacing.sm },
  success: { alignItems: 'center', gap: spacing.md },
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: { textAlign: 'center' },
  fullWidth: { alignSelf: 'stretch' },
});
