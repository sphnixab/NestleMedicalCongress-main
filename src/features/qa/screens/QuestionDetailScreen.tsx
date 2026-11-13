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
import { HomeScreenProps } from '../../../navigation/navigationTypes';
import { timeAgo } from '../../../utils/dateUtils';

export const QuestionDetailScreen = ({ navigation, route }: HomeScreenProps<'QuestionDetail'>) => {
  const { questions, upvotedIds, toggleUpvote } = useAppData();
  const { questionId } = route.params;
  const question = questions.find(item => item.id === questionId);
  const upvoted = upvotedIds.includes(questionId);

  if (!question) {
    return (
      <ModuleScreen title={strings.qa.detailTitle} onBack={navigation.goBack}>
        <EmptyState title={strings.errors.notFound} icon="alert-circle-outline" />
      </ModuleScreen>
    );
  }

  return (
    <ModuleScreen title={strings.qa.detailTitle} onBack={navigation.goBack}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
        <AppText variant="h3">{question.text}</AppText>
        <View style={styles.author}>
          <Avatar name={question.author} size={32} />
          <AppText variant="caption" color={colors.textSecondary} style={styles.flex}>
            {strings.qa.askedBy} {question.author} · {timeAgo(question.createdAt)}
          </AppText>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: upvoted }}
            onPress={() => toggleUpvote(question.id)}
            style={[styles.vote, upvoted && styles.voteActive]}>
            <AppIcon name="chevron-up" size={sizes.iconMd} color={upvoted ? colors.blue500 : colors.textSecondary} />
            <AppText variant="bodyStrong" color={upvoted ? colors.blue500 : colors.textSecondary}>
              {question.upvotes}
            </AppText>
          </Pressable>
        </View>

        <View style={styles.answer}>
          <AppText variant="overline" color={colors.blue500}>
            {strings.qa.speakerResponse.toUpperCase()}
          </AppText>
          {question.answered ? (
            <>
              <AppText variant="body" style={styles.answerText}>
                {question.answer}
              </AppText>
              <AppText variant="caption" color={colors.textMuted}>
                {question.answeredBy}
              </AppText>
            </>
          ) : (
            <AppText variant="body" color={colors.textSecondary}>
              {strings.qa.awaiting}
            </AppText>
          )}
        </View>
      </ScrollView>
    </ModuleScreen>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: screenPadding, paddingBottom: spacing.xxxl, gap: spacing.lg },
  tags: { flexDirection: 'row', gap: spacing.sm },
  tag: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radius.pill },
  author: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  vote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
  },
  voteActive: { backgroundColor: colors.infoSoft },
  answer: {
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  answerText: { lineHeight: 22 },
});
