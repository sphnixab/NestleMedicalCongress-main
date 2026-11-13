import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
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
import { mockSpeakers } from '../../../data/mockSpeakers';
import { HomeScreenProps } from '../../../navigation/navigationTypes';
import { formatShortMonthDay, to12Hour } from '../../../utils/dateUtils';

export const SpeakerDetailScreen = ({ navigation, route }: HomeScreenProps<'SpeakerDetail'>) => {
  const { speakerIds, toggleSpeaker } = useAppData();
  const { speakerId } = route.params;
  const speaker = mockSpeakers.find(item => item.id === speakerId);
  const sessions = mockSessions.filter(item => item.speakerId === speakerId);
  const favourite = speakerIds.includes(speakerId);

  if (!speaker) {
    return (
      <ModuleScreen title={strings.speakers.detailTitle} onBack={navigation.goBack}>
        <EmptyState title={strings.errors.notFound} icon="alert-circle-outline" />
      </ModuleScreen>
    );
  }

  return (
    <ModuleScreen
      title={strings.speakers.detailTitle}
      onBack={navigation.goBack}
      rightIcon={favourite ? 'star' : 'star-outline'}
      rightLabel="Toggle favourite"
      onRightPress={() => toggleSpeaker(speaker.id)}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Avatar name={speaker.name} size={sizes.avatarXl - 16} />
          {speaker.featured ? (
            <View style={styles.featured}>
              <AppText variant="overline" color={colors.gold500}>
                {strings.speakers.featured}
              </AppText>
            </View>
          ) : null}
          <AppText variant="h2" style={styles.center}>
            {speaker.name}
          </AppText>
          <AppText variant="body" color={colors.textSecondary} style={styles.center}>
            {speaker.designation}
          </AppText>
        </View>

        <View style={styles.facts}>
          <Fact icon="location-outline" label={strings.speakers.country} value={speaker.country} />
          <Fact icon="ribbon-outline" label={strings.speakers.specialization} value={speaker.specialization} />
        </View>

        <AppText variant="title">{strings.speakers.biography}</AppText>
        <AppText variant="body" color={colors.textSecondary} style={styles.bio}>
          {speaker.bio}
        </AppText>

        <AppText variant="title">{strings.speakers.sessions}</AppText>
        {sessions.length === 0 ? (
          <AppText variant="caption" color={colors.textMuted}>
            {strings.speakers.noSessions}
          </AppText>
        ) : (
          sessions.map(session => {
            const clock = to12Hour(session.startTime);
            return (
              <Pressable
                key={session.id}
                accessibilityRole="button"
                onPress={() => navigation.navigate('SessionDetail', { sessionId: session.id })}
                style={styles.session}>
                <View style={styles.sessionCopy}>
                  <AppText variant="bodyStrong" numberOfLines={2}>
                    {session.title}
                  </AppText>
                  <AppText variant="caption" color={colors.textMuted}>
                    {formatShortMonthDay(session.date)} · {clock.time} {clock.period} · {session.location}
                  </AppText>
                </View>
                <AppIcon name="chevron-forward" size={sizes.iconMd} color={colors.textMuted} />
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </ModuleScreen>
  );
};

const Fact = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View style={styles.fact}>
    <AppIcon name={icon} size={sizes.iconMd} color={colors.blue500} />
    <View style={styles.factCopy}>
      <AppText variant="overline" color={colors.textMuted}>
        {label.toUpperCase()}
      </AppText>
      <AppText variant="bodyStrong">{value}</AppText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  content: { padding: screenPadding, paddingBottom: spacing.xxxl, gap: spacing.lg },
  header: { alignItems: 'center', gap: spacing.sm },
  center: { textAlign: 'center' },
  featured: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.gold100,
  },
  facts: { gap: spacing.md },
  fact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  factCopy: { flex: 1 },
  bio: { lineHeight: 22 },
  session: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sessionCopy: { flex: 1, gap: spacing.xxs },
});
