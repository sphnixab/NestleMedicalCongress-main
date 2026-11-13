import React from 'react';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { AppText } from '../../../components/common/AppText';
import { Avatar } from '../../../components/common/Avatar';
import { EmptyState } from '../../../components/common/EmptyState';
import { ModuleScreen } from '../../../components/common/ModuleScreen';
import { colors } from '../../../constants/colors';
import { radius, sizes } from '../../../constants/dimensions';
import { screenPadding, spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { useAppData } from '../../../context/AppDataContext';
import { mockSessions } from '../../../data/mockSessions';
import { HomeScreenProps } from '../../../navigation/navigationTypes';
import { formatLongDateFull, formatTimeRange } from '../../../utils/dateUtils';

export const SessionDetailScreen = ({ navigation, route }: HomeScreenProps<'SessionDetail'>) => {
  const { sessionIds, toggleSession } = useAppData();
  const session = mockSessions.find(item => item.id === route.params.sessionId);
  const bookmarked = sessionIds.includes(route.params.sessionId);

  if (!session) {
    return (
      <ModuleScreen title={strings.agenda.detailTitle} onBack={navigation.goBack}>
        <EmptyState title={strings.errors.notFound} icon="alert-circle-outline" />
      </ModuleScreen>
    );
  }

  return (
    <ModuleScreen
      title={strings.agenda.detailTitle}
      onBack={navigation.goBack}
      rightIcon={bookmarked ? 'bookmark' : 'bookmark-outline'}
      rightLabel={bookmarked ? strings.agenda.removeBookmark : strings.agenda.addBookmark}
      onRightPress={() => toggleSession(session.id)}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.tag}>
          <AppText variant="overline" color={colors.gold500}>
            {session.category.toUpperCase()}
          </AppText>
        </View>
        <AppText variant="h2">{session.title}</AppText>

        <View style={styles.infoCard}>
          <InfoRow icon="calendar-outline" label={formatLongDateFull(session.date)} />
          <InfoRow icon="time-outline" label={formatTimeRange(session.startTime, session.endTime)} />
          <InfoRow icon="location-outline" label={session.location} />
        </View>

        {session.speakerId ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('SpeakerDetail', { speakerId: session.speakerId })}
            style={styles.speaker}>
            <Avatar name={session.speakerName} size={sizes.avatarSm} />
            <View style={styles.speakerCopy}>
              <AppText variant="overline" color={colors.blue500}>
                {strings.agenda.speaker.toUpperCase()}
              </AppText>
              <AppText variant="bodyStrong">{session.speakerName}</AppText>
            </View>
            <AppIcon name="chevron-forward" size={sizes.iconMd} color={colors.textMuted} />
          </Pressable>
        ) : null}

        <AppText variant="title">{strings.agenda.about}</AppText>
        <AppText variant="body" color={colors.textSecondary} style={styles.description}>
          {session.description}
        </AppText>

        <AppButton
          title={bookmarked ? strings.agenda.removeBookmark : strings.agenda.addBookmark}
          leftIcon={bookmarked ? 'bookmark' : 'bookmark-outline'}
          variant={bookmarked ? 'outline' : 'primary'}
          onPress={() => toggleSession(session.id)}
        />
      </ScrollView>
    </ModuleScreen>
  );
};

const InfoRow = ({ icon, label }: { icon: string; label: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIcon}>
      <AppIcon name={icon} size={sizes.iconMd} color={colors.blue500} />
    </View>
    <AppText variant="bodyStrong" style={styles.infoText}>
      {label}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  content: { padding: screenPadding, paddingBottom: spacing.xxxl, gap: spacing.lg },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.gold100,
  },
  infoCard: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: { flex: 1 },
  speaker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  speakerCopy: { flex: 1 },
  description: { lineHeight: 22 },
});
