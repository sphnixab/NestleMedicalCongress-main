import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { AppText } from '../../../components/common/AppText';
import { ControlledInput } from '../../../components/common/ControlledInput';
import { colors, gradients } from '../../../constants/colors';
import { radius, sizes } from '../../../constants/dimensions';
import { fontSize } from '../../../constants/fonts';
import { spacing } from '../../../constants/spacing';
import { format, strings } from '../../../constants/strings';
import { useAuth } from '../../../context/AuthContext';
import { DEMO_CREDENTIALS } from '../../../data/mockUsers';
import { AuthScreenProps } from '../../../navigation/navigationTypes';
import { LoginForm, loginSchema } from '../../../utils/validationUtils';
import { AuthCard, ErrorBanner, FeatureStrip, OrDivider, SocialButtons } from '../components/AuthComponents';
import { AuthLayout } from '../components/AuthLayout';

export const LoginScreen = ({ navigation }: AuthScreenProps<'Login'>) => {
  const { login, demoSocialLogin } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async values => {
    setError(null);
    setLoading(true);
    const result = await login(values.email, values.password);
    // On success the navigator swaps to the main app, so only a failure needs handling here.
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
        <View style={styles.pill}>
          <AppText variant="overline" color={colors.white}>
            {strings.common.appNameUpper}
          </AppText>
        </View>
        <AppText style={styles.titleTop} color={colors.white}>
          {strings.auth.heroTitleTop}
        </AppText>
        <AppText style={styles.titleBottom} color={colors.gold400}>
          {strings.auth.heroTitleBottom}
        </AppText>
        <View style={styles.rule} />
        <AppText variant="title" color={colors.white} style={styles.tagline}>
          {strings.auth.tagline}
        </AppText>
      </View>

      <AuthCard>
        <View style={styles.cardHeader}>
          <View style={styles.flex}>
            <AppText variant="h2">{strings.auth.welcomeBack}</AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              {strings.auth.signInSubtitle}
            </AppText>
          </View>
          <LinearGradient colors={[...gradients.icon]} style={styles.shield}>
            <AppIcon name="shield-checkmark" size={sizes.iconLg} color={colors.white} />
          </LinearGradient>
        </View>

        {error ? <ErrorBanner message={error} /> : null}

        <ControlledInput
          control={control}
          name="email"
          icon="person-outline"
          placeholder={strings.auth.emailPlaceholder}
          keyboardType="email-address"
          autoComplete="email"
          textContentType="username"
        />
        <ControlledInput
          control={control}
          name="password"
          icon="lock-closed-outline"
          placeholder={strings.auth.passwordPlaceholder}
          secure
          autoComplete="password"
          textContentType="password"
          onSubmitEditing={onSubmit}
        />
        <AppButton
          title={strings.auth.signIn}
          rightIcon="arrow-forward"
          loading={loading}
          onPress={onSubmit}
          testID="login-submit"
        />

        <OrDivider label={strings.auth.orContinueWith} />
        <SocialButtons onPress={onSocialPress} />

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgot}>
          <AppIcon name="lock-closed" size={sizes.iconSm} color={colors.blue500} />
          <AppText variant="bodyStrong" color={colors.blue500}>
            {strings.auth.forgotPassword}
          </AppText>
        </Pressable>
        <AppText variant="caption" color={colors.textMuted} style={styles.demo}>
          {format(strings.auth.demoHint, DEMO_CREDENTIALS)}
        </AppText>
      </AuthCard>

      <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Register')} style={styles.switchRow}>
        <AppText variant="body" color={colors.white}>
          {strings.auth.noAccount}{' '}
        </AppText>
        <AppText variant="bodyStrong" color={colors.gold400}>
          {strings.auth.createAccount} →
        </AppText>
      </Pressable>

      <FeatureStrip />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1},
  hero: { alignItems: 'center', gap: spacing.xxs },
  pill: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(246,199,94,0.5)',
    // marginBottom: spacing.xxs,
  },
  titleTop: { fontFamily: 'PlusJakartaSans-ExtraBold', fontSize: fontSize.hero, letterSpacing: 1, lineHeight: fontSize.hero + 18},
  titleBottom: { fontFamily: 'PlusJakartaSans-ExtraBold', fontSize: fontSize.hero, letterSpacing: 1, lineHeight: fontSize.hero + 2  },
  rule: { width: 56, height: 2, backgroundColor: colors.gold400, marginVertical: spacing.sm },
  tagline: { textAlign: 'center', fontFamily: 'PlusJakartaSans-Regular', color: colors.textMuted  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  shield: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.xxs },
  demo: { textAlign: 'center' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
