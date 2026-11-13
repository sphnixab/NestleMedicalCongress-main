import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { QuestionCard } from '../../../components/cards/QuestionCard';
import { AppButton } from '../../../components/common/AppButton';
import { AppText } from '../../../components/common/AppText';
import { EmptyState } from '../../../components/common/EmptyState';
import { FilterChips } from '../../../components/common/FilterChips';
import { ModuleScreen } from '../../../components/common/ModuleScreen';
import { colors } from '../../../constants/colors';
import { radius } from '../../../constants/dimensions';
import { fontFamily, fontSize } from '../../../constants/fonts';
import { screenPadding, spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { useAppData } from '../../../context/AppDataContext';
import { useAuth } from '../../../context/AuthContext';
import { HomeScreenProps } from '../../../navigation/navigationTypes';
import { Question, QuestionCategory } from '../../../types/models.types';
import { sortQuestions } from '../../../utils/filterUtils';
import { QuestionForm, questionSchema } from '../../../utils/validationUtils';

const CATEGORIES: readonly QuestionCategory[] = ['General', 'Nutrition', 'Research', 'Clinical'];
const TABS = ['Popular', 'Recent', 'Answered'] as const;

export const QAScreen = ({ navigation }: HomeScreenProps<'QA'>) => {
  const { user } = useAuth();
  const { questions, upvotedIds, addQuestion, toggleUpvote } = useAppData();

  const [category, setCategory] = useState<QuestionCategory>('General');
  const [tab, setTab] = useState<(typeof TABS)[number]>('Recent');

  const { control, handleSubmit, reset } = useForm<QuestionForm>({
    resolver: yupResolver(questionSchema),
    defaultValues: { text: '' },
  });

  const visible = useMemo(() => sortQuestions(questions, tab), [questions, tab]);

  const onSubmit = handleSubmit(({ text }) => {
    addQuestion(text.trim(), category, user?.fullName ?? 'Attendee');
    reset({ text: '' });
    setTab('Recent');
  });

  const open = useCallback(
    (question: Question) => navigation.navigate('QuestionDetail', { questionId: question.id }),
    [navigation],
  );

  const form = (
    <View style={styles.form}>
      <AppText variant="h3">{strings.qa.writeQuestion}</AppText>
      <Controller
        control={control}
        name="text"
        render={({ field, fieldState }) => (
          <View>
            <TextInput
              accessibilityLabel={strings.qa.writeQuestion}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder={strings.qa.placeholder}
              placeholderTextColor={colors.textMuted}
              multiline
              maxLength={280}
              textAlignVertical="top"
              style={styles.textarea}
            />
            {fieldState.error ? (
              <AppText variant="caption" color={colors.danger} style={styles.error}>
                {fieldState.error.message}
              </AppText>
            ) : null}
          </View>
        )}
      />
      <FilterChips options={CATEGORIES} selected={category} onSelect={setCategory} />
      <AppButton
        title={strings.qa.submit}
        leftIcon="send"
        onPress={onSubmit}
        testID="qa-submit"
      />
      <View style={styles.tabs}>
        {TABS.map(item => {
          const active = item === tab;
          return (
            <Pressable
              key={item}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => setTab(item)}
              style={[styles.tab, active && styles.tabActive]}>
              <AppText variant="label" color={active ? colors.navy900 : colors.textSecondary}>
                {item === 'Popular' ? strings.qa.popular : item === 'Recent' ? strings.qa.recent : strings.qa.answered}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  return (
    <ModuleScreen
      title={strings.qa.title}
      onBack={navigation.goBack}
      rightIcon="chatbubbles"
      hero={{ icon: 'chatbox-ellipses', title: strings.qa.heroTitle, subtitle: strings.qa.heroSubtitle }}>
      <FlatList
          data={visible}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={form}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={<EmptyState title={strings.qa.empty} message={strings.qa.emptyBody} icon="chatbox-outline" />}
          renderItem={({ item }) => (
            <QuestionCard
              question={item}
              upvoted={upvotedIds.includes(item.id)}
              onPress={open}
              onToggleUpvote={question => toggleUpvote(question.id)}
            />
          )}
      />
    </ModuleScreen>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  list: { padding: screenPadding, paddingBottom: spacing.xxxl, flexGrow: 1 },
  form: {
    gap: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textarea: {
    minHeight: 92,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  error: { marginTop: spacing.xs },
  tabs: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  tab: {
    flex: 1,
    height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  tabActive: { backgroundColor: colors.gold400 },
  separator: { height: spacing.md },
});
