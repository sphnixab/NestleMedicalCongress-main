import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { hitSlop, radius, sizes } from '../../constants/dimensions';
import { spacing } from '../../constants/spacing';
import { Session, SessionCategory } from '../../types/models.types';
import { to12Hour } from '../../utils/dateUtils';
import { AppIcon } from '../common/AppIcon';
import { AppText } from '../common/AppText';

const categoryIcon: Record<SessionCategory, string> = {
  Keynote: 'mic',
  Nutrition: 'nutrition-outline',
  Research: 'flask-outline',
  Pediatrics: 'heart-outline',
};

interface SessionCardProps {
  session: Session;
  bookmarked: boolean;
  onPress: (session: Session) => void;
  onToggleBookmark: (sessionId: string) => void;
}

export const SessionCard = memo(({ session, bookmarked, onPress, onToggleBookmark }: SessionCardProps) => {
  const clock = to12Hour(session.startTime);
  const gold = session.category === 'Keynote';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${session.title}, ${clock.time} ${clock.period}`}
      onPress={() => onPress(session)}
      style={[styles.card, bookmarked && styles.cardActive]}>
      <View style={styles.time}>
        <AppText variant="bodyStrong" color={colors.blue500}>
          {clock.time}
        </AppText>
        <AppText variant="overline" color={colors.textMuted}>
          {clock.period}
        </AppText>
      </View>
      <View style={styles.divider} />
      <View style={[styles.icon, { backgroundColor: gold ? colors.gold100 : colors.infoSoft }]}>
        <AppIcon
          name={categoryIcon[session.category]}
          size={sizes.iconMd}
          color={gold ? colors.gold500 : colors.blue500}
        />
      </View>
      <View style={styles.copy}>
        <AppText variant="overline" color={colors.gold500}>
          {session.category.toUpperCase()}
        </AppText>
        <AppText variant="bodyStrong" numberOfLines={2}>
          {session.title}
        </AppText>
        <View style={styles.meta}>
          <AppIcon name="location-outline" size={sizes.iconSm - 3} color={colors.textMuted} />
          <AppText variant="caption" color={colors.textMuted} numberOfLines={1} style={styles.metaText}>
            {session.speakerName} · {session.location}
          </AppText>
        </View>
      </View>
      <Pressable
        hitSlop={hitSlop}
        accessibilityRole="button"
        accessibilityLabel={bookmarked ? 'Remove bookmark' : 'Bookmark session'}
        onPress={() => onToggleBookmark(session.id)}>
        <AppIcon
          name={bookmarked ? 'bookmark' : 'bookmark-outline'}
          size={sizes.iconMd}
          color={bookmarked ? colors.gold500 : colors.textMuted}
        />
      </Pressable>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardActive: { borderColor: colors.gold400, backgroundColor: '#FFFCF3' },
  time: { width: 44, alignItems: 'center' },
  divider: { width: 1, alignSelf: 'stretch', backgroundColor: colors.border },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1, gap: spacing.xxs },
  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  metaText: { flex: 1 },
});
