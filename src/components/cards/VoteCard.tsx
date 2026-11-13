import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, gradients } from '../../constants/colors';
import { radius } from '../../constants/dimensions';
import { spacing } from '../../constants/spacing';
import { format, strings } from '../../constants/strings';
import { Poll } from '../../types/models.types';
import { getPercentage } from '../../utils/formatUtils';
import { AppIcon } from '../common/AppIcon';
import { AppText } from '../common/AppText';
import LinearGradient from 'react-native-linear-gradient';

interface VoteCardProps {
  poll: Poll;
  /** Option the attendee has picked (submitted or pending). */
  selectedOptionId?: string;
  /** True once the vote was submitted; options are then locked. */
  voted: boolean;
  onSelect: (optionId: string) => void;
}

export const VoteCard = ({ poll, selectedOptionId, voted, onSelect }: VoteCardProps) => {
  const total = poll.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <View style={styles.card}>
      <View style={styles.tagRow}>
        <View style={[styles.tag, voted ? styles.tagVoted : styles.tagOpen]}>
          <View style={[styles.dot, { backgroundColor: voted ? colors.gold500 : colors.success }]} />
          <AppText variant="overline" color={voted ? colors.gold500 : colors.success}>
            {voted ? strings.voting.voted : strings.voting.open}
          </AppText>
        </View>
        <AppText variant="caption" color={colors.textSecondary}>
          {poll.category}
        </AppText>
      </View>
      <AppText variant="h3" style={styles.question}>
        {poll.question}
      </AppText>
      <AppText variant="caption" color={colors.textMuted} style={styles.total}>
        {format(strings.voting.totalVotes, { count: total })}
      </AppText>

      {poll.options.map(option => {
        const selected = option.id === selectedOptionId;
        const percent = getPercentage(option.votes, total);
        return (
          <Pressable
            key={option.id}
            disabled={voted}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled: voted }}
            accessibilityLabel={`${option.label}, ${percent} percent`}
            onPress={() => onSelect(option.id)}
            style={[styles.option, selected && styles.optionSelected]}>
            <View style={styles.optionTop}>
              {selected ? (
                <AppIcon name="checkmark-circle" size={22} color={colors.blue500} />
              ) : (
                <View style={styles.radio} />
              )}
              <AppText variant="bodyStrong" style={styles.optionLabel}>
                {option.label}
              </AppText>
              <AppText variant="bodyStrong" color={colors.blue500}>
                {percent}%
              </AppText>
            </View>
            <View style={styles.track}>
              <LinearGradient
                colors={[...(selected ? gradients.gold : gradients.primaryReverse)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.fill, { width: `${percent}%` }]}
              />
            </View>
            <AppText variant="caption" color={colors.textMuted} style={styles.count}>
              {format(strings.voting.votesCount, { count: option.votes })}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { gap: spacing.md },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  tagVoted: { backgroundColor: colors.gold100 },
  tagOpen: { backgroundColor: colors.successSoft },
  dot: { width: 6, height: 6, borderRadius: 3 },
  question: { marginTop: spacing.xs },
  total: { marginTop: -spacing.sm },
  option: {
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  optionSelected: { borderColor: colors.blue500, borderWidth: 2, backgroundColor: '#F4F8FF' },
  optionTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  optionLabel: { flex: 1 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border },
  track: { height: 6, borderRadius: 3, backgroundColor: colors.surfaceMuted, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
  count: { alignSelf: 'flex-end' },
});
