import React, { useCallback } from 'react';
import { Alert, ScrollView, Share, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { AppIcon } from '../../../components/common/AppIcon';
import { AppText } from '../../../components/common/AppText';
import { Avatar } from '../../../components/common/Avatar';
import { ModuleScreen } from '../../../components/common/ModuleScreen';
import { eventInfo } from '../../../constants/appConfig';
import { colors, gradients } from '../../../constants/colors';
import { radius, sizes } from '../../../constants/dimensions';
import { screenPadding, spacing } from '../../../constants/spacing';
import { format, strings } from '../../../constants/strings';
import { useAuth } from '../../../context/AuthContext';
import { HomeScreenProps } from '../../../navigation/navigationTypes';

export const NameTagScreen = ({ navigation }: HomeScreenProps<'NameTag'>) => {
  const { user } = useAuth();

  const qrValue = JSON.stringify({
    badge: user?.badgeId ?? '',
    name: user?.fullName ?? '',
    event: eventInfo.name,
  });

  const share = useCallback(async () => {
    if (!user) {
      return;
    }
    try {
      await Share.share({
        message: format(strings.nameTag.shareMessage, {
          name: user.fullName,
          designation: user.designation,
          badgeId: user.badgeId,
          event: eventInfo.name,
          dates: eventInfo.dateRangeLabel,
        }),
      });
    } catch {
      Alert.alert(strings.nameTag.title, strings.nameTag.shareFailed);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <ModuleScreen title={strings.nameTag.title} onBack={navigation.goBack} rightIcon="print" rightLabel="Share badge" onRightPress={share}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.badge}>
          <LinearGradient colors={[...gradients.primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.banner}>
            <AppText variant="h3" color={colors.white}>
              {strings.common.appNameUpper.replace(' CONGRESS', '')}
            </AppText>
            <AppText variant="overline" color={colors.gold300}>
              {strings.common.congress2026}
            </AppText>
          </LinearGradient>

          <View style={styles.avatar}>
            <Avatar name={user.fullName} size={sizes.avatarXl} ringColor={colors.gold300} />
          </View>
          <AppText variant="h2" style={styles.center}>
            {user.fullName}
          </AppText>
          <AppText variant="body" color={colors.textSecondary} style={styles.center}>
            {user.designation} · {user.attendeeType}
          </AppText>

          <View style={styles.rows}>
            <Row icon="id-card-outline" label={strings.nameTag.badgeId} value={user.badgeId} />
            <Row icon="location-outline" label={strings.nameTag.location} value={user.location} />
            <Row icon="calendar-outline" label={strings.nameTag.congressDate} value={eventInfo.dateRangeLabel} />
          </View>

          <View style={styles.qr}>
            <QRCode value={qrValue} size={132} color={colors.navy900} backgroundColor={colors.white} />
          </View>
          <AppText variant="caption" color={colors.textMuted} style={styles.center}>
            {strings.nameTag.scanHint}
          </AppText>
        </View>
      </ScrollView>
    </ModuleScreen>
  );
};

const Row = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View style={styles.row}>
    <View style={styles.rowIcon}>
      <AppIcon name={icon} size={sizes.iconMd} color={colors.blue500} />
    </View>
    <View>
      <AppText variant="caption" color={colors.textMuted}>
        {label}
      </AppText>
      <AppText variant="bodyStrong">{value}</AppText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  content: { padding: screenPadding, paddingBottom: spacing.xxxl },
  badge: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  banner: { padding: spacing.lg, borderRadius: radius.lg, alignItems: 'center' },
  avatar: { alignItems: 'center', marginTop: spacing.sm },
  center: { textAlign: 'center' },
  rows: { gap: spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qr: { alignSelf: 'center', padding: spacing.md, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border },
});
