import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { AppButton } from '../../../components/common/AppButton';
import { AppText } from '../../../components/common/AppText';
import { ControlledInput } from '../../../components/common/ControlledInput';
import { colors } from '../../../constants/colors';
import { fontSize } from '../../../constants/fonts';
import { spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { useAuth } from '../../../context/AuthContext';
import { AuthScreenProps } from '../../../navigation/navigationTypes';
import { RegisterForm, registerSchema } from '../../../utils/validationUtils';
import { AuthCard, Checkbox, ErrorBanner, OrDivider, SocialButtons } from '../components/AuthComponents';
import { AuthLayout } from '../components/AuthLayout';

export const RegisterScreen = ({ navigation }: AuthScreenProps<'Register'>) => {
  const { register, demoSocialLogin } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema) as Resolver<RegisterForm>,
    defaultValues: { fullName: '', email: '', organization: '', password: '', acceptedTerms: false },
  });

  const onSubmit = handleSubmit(async ({ fullName, email, organization, password }) => {
    setError(null);
    setLoading(true);
    const result = await register({ fullName, email, organization, password });
    if (!result.ok) {
      setError(result.error);
      setLoading(false);
    }
  });

  const onSocialPress = () => {
    Alert.alert(strings.auth.demoSocialTitle, strings.auth.demoSocialBody, [
      { text: 'Continue', onPress: demoSocialLogin },
    ]);
  };

  return (
    <AuthLayout>
      <View style={styles.hero}>
        <AppText style={styles.joinThe} color={colors.white}>
          {strings.auth.joinThe}
        </AppText>
        <AppText style={styles.title} color={colors.gold400}>
          {strings.auth.heroTitleTop}
        </AppText>
        <AppText style={styles.title} color={colors.gold400}>
          {strings.auth.heroTitleBottom}
        </AppText>
        <AppText variant="caption" color={colors.textOnDarkMuted} style={styles.subtitle}>
          {strings.auth.registerSubtitle}
        </AppText>
      </View>

      <AuthCard>
        {error ? <ErrorBanner message={error} /> : null}
        <ControlledInput
          control={control}
          name="fullName"
          icon="person-outline"
          placeholder={strings.auth.fullName}
          autoCapitalize="words"
          autoComplete="name"
        />
        <ControlledInput
          control={control}
          name="email"
          icon="mail-outline"
          placeholder={strings.auth.emailAddress}
          keyboardType="email-address"
          autoComplete="email"
        />
        <ControlledInput
          control={control}
          name="organization"
          icon="business-outline"
          placeholder={strings.auth.organization}
          autoCapitalize="words"
        />
        <ControlledInput
          control={control}
          name="password"
          icon="lock-closed-outline"
          placeholder={strings.auth.createPassword}
          secure
          autoComplete="new-password"
          textContentType="newPassword"
        />
        <Controller
          control={control}
          name="acceptedTerms"
          render={({ field, fieldState }) => (
            <Checkbox
              checked={field.value}
              onToggle={() => field.onChange(!field.value)}
              label={strings.auth.terms}
              error={fieldState.error?.message}
            />
          )}
        />
        <AppButton
          title={strings.auth.createAccount}
          leftIcon="person-add"
          loading={loading}
          onPress={onSubmit}
          testID="register-submit"
        />
        <OrDivider label={strings.auth.orSignUpWith} />
        <SocialButtons onPress={onSocialPress} />
      </AuthCard>

      <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Login')} style={styles.switchRow}>
        <AppText variant="body" color={colors.white}>
          {strings.auth.haveAccount}{' '}
        </AppText>
        <AppText variant="bodyStrong" color={colors.gold400}>
          {strings.auth.signIn}
        </AppText>
      </Pressable>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  hero: { alignItems: 'center' },
  joinThe: { fontFamily: 'PlusJakartaSans-ExtraBold', fontSize: fontSize.xxxl, lineHeight: fontSize.xxxl + 4 },
  title: { fontFamily: 'PlusJakartaSans-ExtraBold', fontSize: fontSize.xxxl + 4, letterSpacing: 1, lineHeight: fontSize.xxxl + 14 },
  subtitle: { textAlign: 'center', marginTop: spacing.md },
  switchRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
