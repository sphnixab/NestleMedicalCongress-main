import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SessionCard } from '../../../components/cards/SessionCard';
import { AppIcon } from '../../../components/common/AppIcon';
import { AppText } from '../../../components/common/AppText';
import { EmptyState } from '../../../components/common/EmptyState';
import { FilterChips } from '../../../components/common/FilterChips';
import { ModuleScreen } from '../../../components/common/ModuleScreen';
import { SearchBar } from '../../../components/common/SearchBar';
import { colors } from '../../../constants/colors';
import { hitSlop, radius } from '../../../constants/dimensions';
import { screenPadding, spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { useAppData } from '../../../context/AppDataContext';
import { mockSessions } from '../../../data/mockSessions';
import { HomeStackParamList } from '../../../navigation/navigationTypes';
import { Session } from '../../../types/models.types';
import { formatLongDateFull, formatShortMonthDay } from '../../../utils/dateUtils';
import { filterSessions } from '../../../utils/filterUtils';

type Navigation = NativeStackNavigationProp<HomeStackParamList, 'Agenda'>;

const CATEGORIES = ['All', 'Keynote', 'Nutrition', 'Research'] as const;
const DAY_DATES: Record<1 | 2, string> = { 1: '2026-05-22', 2: '2026-05-23' };

export const AgendaScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { sessionIds: bookmarkedIds, toggleSession } = useAppData();

  const [day, setDay] = useState<1 | 2>(1);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const visible = useMemo(() => filterSessions(mockSessions, { day, category, query }), [day, category, query]);
  const filtersActive = category !== 'All' || query.length > 0;

  const resetFilters = useCallback(() => {
    setCategory('All');
    setQuery('');
    setSearchOpen(false);
  }, []);

  const openSession = useCallback(
    (session: Session) => navigation.navigate('SessionDetail', { sessionId: session.id }),
    [navigation],
  );

  const dayTabs = (
    <View style={styles.dayRow}>
      {([1, 2] as const).map(value => {
        const active = value === day;
        return (
          <Pressable
            key={value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => setDay(value)}
            style={[styles.dayTab, active && styles.dayTabActive]}>
            <AppText variant="bodyStrong" color={active ? colors.navy900 : colors.white}>
              Day {value}
            </AppText>
            <AppText variant="caption" color={active ? colors.navy800 : colors.textOnDarkMuted}>
              {formatShortMonthDay(DAY_DATES[value])}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );

  const body = (
      <FlatList
        data={visible}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          <EmptyState
            title={strings.agenda.empty}
            message={strings.agenda.emptyBody}
            actionLabel={strings.common.reset}
            onAction={resetFilters}
          />
        }
        renderItem={({ item }) => (
          <SessionCard
            session={item}
            bookmarked={bookmarkedIds.includes(item.id)}
            onPress={openSession}
            onToggleBookmark={toggleSession}
          />
        )}
      />
  );

  return (
    <ModuleScreen
      title={strings.agenda.title}
      onBack={navigation.goBack}
      rightIcon="search"
      rightLabel="Search sessions"
      onRightPress={() => setSearchOpen(open => !open)}
      hero={{
        icon: 'calendar',
        tone: 'gold',
        title: `Day ${day} ${strings.agenda.dayScheduleSuffix}`,
        subtitle: formatLongDateFull(DAY_DATES[day]),
      }}
      headerExtra={dayTabs}>
      <View style={styles.top}>
        <View style={styles.titleRow}>
          <AppText variant="h3">{strings.agenda.sessionsTitle}</AppText>
          <Pressable
            hitSlop={hitSlop}
            accessibilityRole="button"
            disabled={!filtersActive}
            onPress={resetFilters}
            style={[styles.reset, !filtersActive && styles.resetDisabled]}>
            <AppIcon name="refresh" size={14} color={colors.blue500} />
            <AppText variant="label" color={colors.blue500}>
              {strings.common.reset}
            </AppText>
          </Pressable>
        </View>
        {searchOpen ? (
          <SearchBar value={query} onChangeText={setQuery} placeholder={strings.agenda.searchPlaceholder} />
        ) : null}
        <FilterChips options={CATEGORIES} selected={category} onSelect={setCategory} />
      </View>
      {body}
    </ModuleScreen>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  dayRow: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: screenPadding, marginBottom: spacing.lg },
  dayTab: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    alignItems: 'center',
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  dayTabActive: { backgroundColor: colors.gold400, borderColor: colors.gold400 },
  top: { padding: screenPadding, paddingBottom: spacing.sm, gap: spacing.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  reset: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.infoSoft,
  },
  resetDisabled: { opacity: 0.5 },
  list: { paddingHorizontal: screenPadding, paddingBottom: spacing.xxxl, flexGrow: 1 },
  separator: { height: spacing.md },
});
