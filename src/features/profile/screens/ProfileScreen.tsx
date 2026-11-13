import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { AppText } from '../../../components/common/AppText';
import { Avatar } from '../../../components/common/Avatar';
import { AppHeader } from '../../../components/common/AppHeader';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { colors } from '../../../constants/colors';
import { radius, sizes } from '../../../constants/dimensions';
import { screenPadding, spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { useAppData } from '../../../context/AppDataContext';
import { useAuth } from '../../../context/AuthContext';
import { mockSessions } from '../../../data/mockSessions';
import { ProfileStackParamList } from '../../../navigation/navigationTypes';
import { padCount } from '../../../utils/formatUtils';

type Navigation = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

export const ProfileScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { user, logout } = useAuth();
  const { sessionIds } = useAppData();
  const totalSessions = mockSessions.length;
  const savedSessions = sessionIds.length;

  const goHome = useCallback(() => {
    navigation.getParent()?.navigate('HomeTab');
  }, [navigation]);

  const confirmLogout = useCallback(() => {
    Alert.alert(strings.profile.logout, strings.profile.logoutBody, [
      { text: 'Cancel', style: 'cancel' },
      { text: strings.profile.logout, style: 'destructive', onPress: logout },
    ]);
  }, [logout]);

  if (!user) {
    return null;
  }

  return (
    <ScreenContainer>
      <AppHeader
        title={strings.profile.title}
        onBack={goHome}
        rightIcon="settings-outline"
        rightLabel={strings.profile.settings}
        onRightPress={() => navigation.navigate('Settings')}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Avatar name={user.fullName} size={sizes.avatarXl} ringColor={colors.gold300} />
          <AppText variant="h2" color={colors.white}>
            {user.fullName}
          </AppText>
          <AppText variant="caption" color={colors.textOnDarkMuted}>
            {strings.profile.attendee}
          </AppText>
          <View style={styles.idPill}>
            <AppText variant="label" color={colors.gold300}>
              ID: {user.badgeId}
            </AppText>
          </View>
        </View>

        <View style={styles.card}>
          <InfoRow icon="mail-outline" label={strings.profile.email} value={user.email} />
          <InfoRow icon="call-outline" label={strings.profile.phone} value={user.phone || '—'} />
          <InfoRow icon="location-outline" label={strings.profile.location} value={user.location} last />
        </View>

        <View style={styles.stats}>
          <Stat icon="calendar-outline" value={padCount(totalSessions)} label={strings.profile.sessions} />
          <Stat icon="bookmark" value={padCount(savedSessions)} label={strings.profile.saved} />
          <Stat icon="ribbon-outline" value={padCount(user.certificates)} label={strings.profile.certificates} />
        </View>

        <AppButton
          title={strings.profile.editProfile}
          leftIcon="create-outline"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <AppButton title={strings.profile.logout} variant="gold" leftIcon="log-out-outline" onPress={confirmLogout} />
      </ScrollView>
    </ScreenContainer>
  );
};

const InfoRow = ({ icon, label, value, last }: { icon: string; label: string; value: string; last?: boolean }) => (
  <View style={[styles.infoRow, !last && styles.infoDivider]}>
    <View style={styles.infoIcon}>
      <AppIcon name={icon} size={sizes.iconSm} color={colors.blue500} />
    </View>
    <View style={styles.flex}>
      <AppText variant="caption" color={colors.textMuted}>
        {label}
      </AppText>
      <AppText variant="bodyStrong" numberOfLines={1}>
        {value}
      </AppText>
    </View>
  </View>
);

const Stat = ({ icon, value, label }: { icon: string; value: string; label: string }) => (
  <View style={styles.stat}>
    <AppIcon name={icon} size={sizes.iconMd} color={colors.blue500} />
    <AppText variant="h3">{value}</AppText>
    <AppText variant="caption" color={colors.textMuted}>
      {label}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: screenPadding, paddingTop: 0, paddingBottom: spacing.xxxl, gap: spacing.lg },
  header: { alignItems: 'center', gap: spacing.xs },
  idPill: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(246,199,94,0.5)',
  },
  card: { padding: spacing.lg, borderRadius: radius.xl, backgroundColor: colors.white },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  infoDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: { flexDirection: 'row', gap: spacing.md },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
  },
});
