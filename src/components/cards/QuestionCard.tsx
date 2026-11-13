import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { hitSlop, radius, sizes } from '../../constants/dimensions';
import { spacing } from '../../constants/spacing';
import { strings } from '../../constants/strings';
import { Question } from '../../types/models.types';
import { AppIcon } from '../common/AppIcon';
import { AppText } from '../common/AppText';
import { Avatar } from '../common/Avatar';

interface QuestionCardProps {
  question: Question;
  upvoted: boolean;
  onPress: (question: Question) => void;
  onToggleUpvote: (question: Question) => void;
}

export const QuestionCard = memo(({ question, upvoted, onPress, onToggleUpvote }: QuestionCardProps) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={question.text}
    onPress={() => onPress(question)}
    style={[styles.card, question.answered && styles.answered]}>
    <Pressable
      hitSlop={hitSlop}
      accessibilityRole="button"
      accessibilityState={{ selected: upvoted }}
      accessibilityLabel={`Upvote, ${question.upvotes} upvotes`}
      onPress={() => onToggleUpvote(question)}
      style={[styles.votes, upvoted && styles.votesActive]}>
      <AppIcon name="chevron-up" size={sizes.iconMd} color={upvoted ? colors.blue500 : colors.textMuted} />
      <AppText variant="bodyStrong" color={upvoted ? colors.blue500 : colors.textSecondary}>
        {question.upvotes}
      </AppText>
    </Pressable>
    <View style={styles.copy}>
      <View style={styles.tags}>
        <View style={[styles.tag, { backgroundColor: colors.infoSoft }]}>
          <AppText variant="overline" color={colors.blue500}>
            {question.category}
          </AppText>
        </View>
        {question.answered ? (
          <View style={[styles.tag, { backgroundColor: colors.gold100 }]}>
            <AppText variant="overline" color={colors.gold500}>
              {strings.qa.answered}
            </AppText>
          </View>
        ) : null}
      </View>
      <AppText variant="bodyStrong" numberOfLines={3}>
        {question.text}
      </AppText>
      <View style={styles.footer}>
        <Avatar name={question.author} size={22} />
        <AppText variant="caption" color={colors.textSecondary} style={styles.author} numberOfLines={1}>
          {question.author}
        </AppText>
        {question.answered ? (
          <View style={styles.reply}>
            <AppIcon name="arrow-undo" size={13} color={colors.textMuted} />
            <AppText variant="caption" color={colors.textMuted}>
              {strings.qa.reply}
            </AppText>
          </View>
        ) : null}
      </View>
    </View>
  </Pressable>
));

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  answered: { borderColor: colors.gold400 },
  votes: {
    width: 44,
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  votesActive: { backgroundColor: colors.infoSoft },
  copy: { flex: 1, gap: spacing.sm },
  tags: { flexDirection: 'row', gap: spacing.sm },
  tag: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xxs + 1, borderRadius: radius.pill },
  footer: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  author: { flex: 1 },
  reply: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
});
