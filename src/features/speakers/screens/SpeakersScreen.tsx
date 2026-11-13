import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SpeakerCard } from '../../../components/cards/SpeakerCard';
import { EmptyState } from '../../../components/common/EmptyState';
import { FilterChips } from '../../../components/common/FilterChips';
import { ModuleScreen } from '../../../components/common/ModuleScreen';
import { SearchBar } from '../../../components/common/SearchBar';
import { screenPadding, spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { useAppData } from '../../../context/AppDataContext';
import { mockSpeakers } from '../../../data/mockSpeakers';
import { HomeStackParamList } from '../../../navigation/navigationTypes';
import { Speaker } from '../../../types/models.types';
import { filterSpeakers } from '../../../utils/filterUtils';

type Navigation = NativeStackNavigationProp<HomeStackParamList, 'Speakers'>;
const CATEGORIES = ['All', 'Nutrition', 'Research', 'Pediatrics'] as const;

export const SpeakersScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { speakerIds: favouriteIds, toggleSpeaker } = useAppData();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [favouritesOnly, setFavouritesOnly] = useState(false);

  const visible = useMemo(
    () => filterSpeakers(mockSpeakers, { category, query, favouritesOnly, favouriteIds }),
    [category, query, favouritesOnly, favouriteIds],
  );

  const open = useCallback(
    (speaker: Speaker) => navigation.navigate('SpeakerDetail', { speakerId: speaker.id }),
    [navigation],
  );

  const body = (
      <FlatList
        data={visible}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={<EmptyState title={strings.speakers.empty} message={strings.speakers.emptyBody} />}
        renderItem={({ item }) => (
          <SpeakerCard
            speaker={item}
            favourite={favouriteIds.includes(item.id)}
            onPress={open}
            onToggleFavourite={toggleSpeaker}
          />
        )}
      />
  );

  return (
    <ModuleScreen
      title={strings.speakers.title}
      onBack={navigation.goBack}
      rightIcon={favouritesOnly ? 'star' : 'star-outline'}
      rightLabel="Show favourites"
      onRightPress={() => setFavouritesOnly(value => !value)}
      hero={{ icon: 'people', title: strings.speakers.heroTitle, subtitle: strings.speakers.heroSubtitle }}>
      <View style={styles.top}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={strings.speakers.searchPlaceholder}
          showFilterButton
        />
        <FilterChips options={CATEGORIES} selected={category} onSelect={setCategory} />
      </View>
      {body}
    </ModuleScreen>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  top: { padding: screenPadding, paddingBottom: spacing.sm, gap: spacing.md },
  list: { paddingHorizontal: screenPadding, paddingBottom: spacing.xxxl, flexGrow: 1 },
  separator: { height: spacing.md },
});
