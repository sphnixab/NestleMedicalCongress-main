import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SessionCard } from '../../../components/cards/SessionCard';
import { SpeakerCard } from '../../../components/cards/SpeakerCard';
import { QuickAccessTile } from '../../../components/cards/QuickAccessCard';
import { AppIcon } from '../../../components/common/AppIcon';
import { AppText } from '../../../components/common/AppText';
import { CustomModal } from '../../../components/common/CustomModal';
import { EmptyState } from '../../../components/common/EmptyState';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { SearchBar } from '../../../components/common/SearchBar';
import { eventInfo } from '../../../constants/appConfig';
import { colors } from '../../../constants/colors';
import { hitSlop, radius, sizes } from '../../../constants/dimensions';
import { quickAccessItems } from '../../../constants/quickAccess';
import { screenPadding, spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { useAppData } from '../../../context/AppDataContext';
import { useAuth } from '../../../context/AuthContext';
import { mockNotices } from '../../../data/mockEvent';
import { mockSessions } from '../../../data/mockSessions';
import { mockSpeakers } from '../../../data/mockSpeakers';
import { HomeStackParamList } from '../../../navigation/navigationTypes';
import { QuickAccessItem } from '../../../types/models.types';
import { filterSessions, filterSpeakers, getUpcomingSessions } from '../../../utils/filterUtils';
import { firstName } from '../../../utils/formatUtils';

type Navigation = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const HOME_TILE_COUNT = 8;

export const HomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { user: profile } = useAuth();
  const { sessionIds, speakerIds, toggleSession, toggleSpeaker } = useAppData();

  const [query, setQuery] = useState('');
  const [noticesOpen, setNoticesOpen] = useState(false);

  const upcoming = useMemo(() => getUpcomingSessions(mockSessions, Date.now(), 3), []);

  const results = useMemo(() => {
    if (query.trim().length === 0) {
      return null;
    }
    const sessionMatches = [1, 2].flatMap(day =>
      filterSessions(mockSessions, { day: day as 1 | 2, category: 'All', query }),
    );
    const speakerMatches = filterSpeakers(mockSpeakers, { category: 'All', query });
    return { sessions: sessionMatches, speakers: speakerMatches };
  }, [query]);

  const openQuickAccess = useCallback(
    (item: QuickAccessItem) => navigation.navigate(item.route),
    [navigation],
  );

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <AppText variant="label" color={colors.white} style={styles.brand}>
            {strings.common.appNameUpper}
          </AppText>
          <Pressable
            hitSlop={hitSlop}
            accessibilityRole="button"
            accessibilityLabel={strings.home.notifications}
            onPress={() => setNoticesOpen(true)}
            style={styles.bell}>
            <AppIcon name="notifications-outline" size={sizes.iconSm} color={colors.white} />
            <View style={styles.badge} />
          </Pressable>
        </View>

        <View style={styles.welcome}>
          <AppText variant="h1" color={colors.white} style={styles.welcomeText}>
            {strings.home.welcomeBack}
          </AppText>
          <View style={styles.nameRow}>
            <AppText variant="h1" color={colors.white}>
              {profile ? `Dr. ${firstName(profile.fullName)}` : ''}
            </AppText>
            <AppIcon name="hand-left" size={sizes.iconLg} color={colors.gold400} />
          </View>
        </View>

        <SearchBar
          variant="dark"
          value={query}
          onChangeText={setQuery}
          placeholder={strings.home.searchPlaceholder}
          showFilterButton
        />

        {results ? (
          <SearchResults
            results={results}
            bookmarkedSessions={sessionIds}
            favouriteSpeakers={speakerIds}
            onSessionPress={session => navigation.navigate('SessionDetail', { sessionId: session.id })}
            onSpeakerPress={speaker => navigation.navigate('SpeakerDetail', { speakerId: speaker.id })}
            onToggleSession={toggleSession}
            onToggleSpeaker={toggleSpeaker}
          />
        ) : (
          <>
            <Animated.View entering={FadeInDown.duration(400)} style={styles.featured}>
              <View style={styles.featuredPill}>
                <AppText variant="overline" color={colors.gold400}>
                  {strings.home.featuredEvent}
                </AppText>
              </View>
              <View style={styles.featuredRow}>
                <AppText variant="h2" color={colors.white} style={styles.featuredTitle}>
                  {eventInfo.theme}
                </AppText>
                <AppIcon name="leaf" size={44} color={colors.white} />
              </View>
              <AppText variant="caption" color={colors.textOnDarkMuted}>
                {eventInfo.dateRangeShort}  ·  {eventInfo.city}
              </AppText>
            </Animated.View>

            <SectionTitle
              title={strings.home.quickAccess}
              onViewAll={() => navigation.navigate('QuickAccess')}
            />
            <View style={styles.grid}>
              {quickAccessItems.slice(0, HOME_TILE_COUNT).map(item => (
                <View key={item.id} style={styles.gridCell}>
                  <QuickAccessTile item={item} onPress={openQuickAccess} />
                </View>
              ))}
            </View>

            <SectionTitle
              title={strings.home.upcomingSessions}
              onViewAll={() => navigation.navigate('Agenda')}
            />
            {upcoming.length === 0 ? (
              <EmptyState title={strings.home.noUpcoming} message={strings.home.noUpcomingBody} />
            ) : (
              <View style={styles.list}>
                {upcoming.map(session => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    bookmarked={sessionIds.includes(session.id)}
                    onPress={item => navigation.navigate('SessionDetail', { sessionId: item.id })}
                    onToggleBookmark={toggleSession}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      <CustomModal visible={noticesOpen} title={strings.home.notifications} onClose={() => setNoticesOpen(false)}>
        {mockNotices.length === 0 ? (
          <AppText variant="body" color={colors.textSecondary}>
            {strings.home.noNotices}
          </AppText>
        ) : (
          mockNotices.map(notice => (
            <View key={notice.id} style={styles.notice}>
              <AppText variant="bodyStrong">{notice.title}</AppText>
              <AppText variant="caption" color={colors.textSecondary}>
                {notice.body}
              </AppText>
              <AppText variant="overline" color={colors.textMuted}>
                {notice.time}
              </AppText>
            </View>
          ))
        )}
      </CustomModal>
    </ScreenContainer>
  );
};

const SectionTitle = ({ title, onViewAll }: { title: string; onViewAll: () => void }) => (
  <View style={styles.sectionRow}>
    <AppText variant="title" color={colors.white}>
      {title}
    </AppText>
    <Pressable hitSlop={hitSlop} accessibilityRole="button" onPress={onViewAll} style={styles.viewAll}>
      <AppText variant="label" color={colors.cyan300}>
        {strings.common.viewAll}
      </AppText>
      <AppIcon name="chevron-forward" size={14} color={colors.cyan300} />
    </Pressable>
  </View>
);

interface SearchResultsProps {
  results: { sessions: ReturnType<typeof filterSessions>; speakers: ReturnType<typeof filterSpeakers> };
  bookmarkedSessions: string[];
  favouriteSpeakers: string[];
  onSessionPress: Parameters<typeof SessionCard>[0]['onPress'];
  onSpeakerPress: Parameters<typeof SpeakerCard>[0]['onPress'];
  onToggleSession: (id: string) => void;
  onToggleSpeaker: (id: string) => void;
}

const SearchResults = ({
  results,
  bookmarkedSessions,
  favouriteSpeakers,
  onSessionPress,
  onSpeakerPress,
  onToggleSession,
  onToggleSpeaker,
}: SearchResultsProps) => {
  if (results.sessions.length === 0 && results.speakers.length === 0) {
    return (
      <View style={styles.empty}>
        <AppIcon name="search-outline" size={40} color={colors.textOnDarkMuted} />
        <AppText variant="title" color={colors.white}>
          {strings.home.noResults}
        </AppText>
        <AppText variant="caption" color={colors.textOnDarkMuted}>
          {strings.home.noResultsBody}
        </AppText>
      </View>
    );
  }
  return (
    <View style={styles.list}>
      {results.sessions.length > 0 ? (
        <AppText variant="title" color={colors.white}>
          {strings.agenda.title}
        </AppText>
      ) : null}
      {results.sessions.map(session => (
        <SessionCard
          key={session.id}
          session={session}
          bookmarked={bookmarkedSessions.includes(session.id)}
          onPress={onSessionPress}
          onToggleBookmark={onToggleSession}
        />
      ))}
      {results.speakers.length > 0 ? (
        <AppText variant="title" color={colors.white}>
          {strings.speakers.title}
        </AppText>
      ) : null}
      {results.speakers.map(speaker => (
        <SpeakerCard
          key={speaker.id}
          speaker={speaker}
          favourite={favouriteSpeakers.includes(speaker.id)}
          onPress={onSpeakerPress}
          onToggleFavourite={onToggleSpeaker}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  content: { padding: screenPadding, paddingBottom: spacing.xxxl, gap: spacing.lg },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { letterSpacing: 1.2 },
  bell: {
    width: sizes.headerButton,
    height: sizes.headerButton,
    borderRadius: radius.pill,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  welcome: { marginTop: spacing.xxs },
  welcomeText: { lineHeight: 28 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  featured: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    gap: spacing.md,
  },
  featuredPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(246,199,94,0.5)',
  },
  featuredRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  featuredTitle: { flex: 1 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  viewAll: { flexDirection: 'row', alignItems: 'center', gap: spacing.xxs },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -spacing.xs },
  gridCell: { width: '25%', padding: spacing.xs },
  list: { gap: spacing.md },
  empty: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.huge },
  notice: { gap: spacing.xxs, paddingVertical: spacing.sm },
});
