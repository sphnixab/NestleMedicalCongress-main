import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { VoteCard } from '../../../components/cards/VoteCard';
import { AppButton } from '../../../components/common/AppButton';
import { AppIcon } from '../../../components/common/AppIcon';
import { EmptyState } from '../../../components/common/EmptyState';
import { ModuleScreen } from '../../../components/common/ModuleScreen';
import { colors } from '../../../constants/colors';
import { radius, sizes } from '../../../constants/dimensions';
import { screenPadding, spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { useAppData } from '../../../context/AppDataContext';
import { HomeScreenProps } from '../../../navigation/navigationTypes';

export const VotingScreen = ({ navigation }: HomeScreenProps<'Voting'>) => {
  const { polls, selections, vote } = useAppData();

  const [index, setIndex] = useState(0);
  const [pending, setPending] = useState<Record<string, string>>({});

  const poll = polls[index];
  const votedOption = poll ? selections[poll.id] : undefined;
  const voted = votedOption !== undefined;
  const selected = voted ? votedOption : poll ? pending[poll.id] : undefined;

  const go = useCallback(
    (step: number) => setIndex(current => Math.min(Math.max(current + step, 0), polls.length - 1)),
    [polls.length],
  );

  const handlePrimary = useCallback(() => {
    if (!poll) {
      return;
    }
    if (!voted && selected) {
      vote(poll.id, selected);
      return;
    }
    go(index < polls.length - 1 ? 1 : -(polls.length - 1));
  }, [vote, go, index, poll, polls.length, selected, voted]);

  const primaryLabel = !voted && selected ? strings.voting.submit : strings.voting.nextPoll;

  let body: React.ReactNode;
  if (!poll) {
    body = <EmptyState title={strings.voting.empty} message={strings.voting.emptyBody} icon="bar-chart-outline" />;
  } else {
    body = (
      <>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.dots}>
            {polls.map((item, position) => (
              <View key={item.id} style={[styles.dot, position === index && styles.dotActive]} />
            ))}
          </View>
          <VoteCard
            poll={poll}
            voted={voted}
            selectedOptionId={selected}
            onSelect={optionId => setPending(current => ({ ...current, [poll.id]: optionId }))}
          />
        </ScrollView>
        <View style={styles.footer}>
          <NavButton icon="arrow-back" label="Previous poll" disabled={index === 0} onPress={() => go(-1)} />
          <AppButton
            title={primaryLabel}
            onPress={handlePrimary}
            style={styles.primary}
            testID="vote-primary"
          />
          <NavButton icon="arrow-forward" label="Next poll" disabled={index >= polls.length - 1} onPress={() => go(1)} />
        </View>
      </>
    );
  }

  return (
    <ModuleScreen
      title={strings.voting.title}
      onBack={navigation.goBack}
      rightIcon="stats-chart"
      hero={{ icon: 'bar-chart', tone: 'gold', title: strings.voting.heroTitle, subtitle: strings.voting.heroSubtitle }}>
      {body}
    </ModuleScreen>
  );
};

const NavButton = ({
  icon,
  label,
  disabled,
  onPress,
}: {
  icon: string;
  label: string;
  disabled: boolean;
  onPress: () => void;
}) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={label}
    disabled={disabled}
    onPress={onPress}
    style={[styles.nav, disabled && styles.navDisabled]}>
    <AppIcon name={icon} size={sizes.iconMd} color={colors.blue500} />
  </Pressable>
);

const styles = StyleSheet.create({
  content: { padding: screenPadding, gap: spacing.md },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.xs },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border },
  dotActive: { width: 22, backgroundColor: colors.blue500 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: screenPadding,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  primary: { flex: 1 },
  nav: {
    width: sizes.buttonHeight,
    height: sizes.buttonHeight,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  navDisabled: { opacity: 0.4 },
});
