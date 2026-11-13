import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { hitSlop, radius, sizes } from '../../constants/dimensions';
import { spacing } from '../../constants/spacing';
import { strings } from '../../constants/strings';
import { Speaker } from '../../types/models.types';
import { AppIcon } from '../common/AppIcon';
import { AppText } from '../common/AppText';
import { Avatar } from '../common/Avatar';

interface SpeakerCardProps {
  speaker: Speaker;
  favourite: boolean;
  onPress: (speaker: Speaker) => void;
  onToggleFavourite: (speakerId: string) => void;
}

export const SpeakerCard = memo(({ speaker, favourite, onPress, onToggleFavourite }: SpeakerCardProps) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={speaker.name}
    onPress={() => onPress(speaker)}
    style={[styles.card, speaker.featured && styles.featured]}>
    <Avatar name={speaker.name} size={sizes.avatarMd} />
    <View style={styles.copy}>
      <AppText variant="overline" color={speaker.featured ? colors.gold500 : colors.blue500}>
        {speaker.featured ? strings.speakers.featured : strings.speakers.speaker}
      </AppText>
      <AppText variant="bodyStrong" numberOfLines={1}>
        {speaker.name}
      </AppText>
      <AppText variant="caption" color={colors.textSecondary} numberOfLines={1}>
        {speaker.designation}
      </AppText>
      <View style={styles.country}>
        <AppIcon name="location-outline" size={13} color={colors.textMuted} />
        <AppText variant="caption" color={colors.textMuted}>
          {speaker.country}
        </AppText>
      </View>
      <View style={styles.tag}>
        <AppText variant="overline" color={colors.blue500} numberOfLines={1}>
          {speaker.specialization}
        </AppText>
      </View>
    </View>
    <View style={styles.actions}>
      <Pressable
        hitSlop={hitSlop}
        accessibilityRole="button"
        accessibilityLabel={favourite ? 'Remove favourite' : 'Add favourite'}
        onPress={() => onToggleFavourite(speaker.id)}>
        <AppIcon
          name={favourite ? 'star' : 'star-outline'}
          size={sizes.iconMd}
          color={favourite ? colors.gold500 : colors.textMuted}
        />
      </Pressable>
      <AppIcon name="chevron-forward" size={sizes.iconMd} color={colors.textMuted} />
    </View>
  </Pressable>
));

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
  featured: { borderColor: colors.gold400, backgroundColor: '#FFFCF3' },
  copy: { flex: 1, gap: spacing.xxs },
  country: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  tag: {
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs + 1,
    borderRadius: radius.sm,
    backgroundColor: colors.infoSoft,
  },
  actions: { alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' },
});
