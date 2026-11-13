import React, { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, Linking, StyleSheet, View } from 'react-native';
import { ResourceCard } from '../../../components/cards/ResourceCard';
import { EmptyState } from '../../../components/common/EmptyState';
import { FilterChips } from '../../../components/common/FilterChips';
import { ModuleScreen } from '../../../components/common/ModuleScreen';
import { SearchBar } from '../../../components/common/SearchBar';
import { screenPadding, spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { useAppData } from '../../../context/AppDataContext';
import { mockResources } from '../../../data/mockResources';
import { HomeScreenProps } from '../../../navigation/navigationTypes';
import { Resource } from '../../../types/models.types';
import { filterResources } from '../../../utils/filterUtils';

const FILTERS = ['All', 'PDF', 'Slides', 'Videos', 'Saved'] as const;

export const ResourcesScreen = ({ navigation }: HomeScreenProps<'Resources'>) => {
  const { resourceIds: savedIds, downloadedIds, toggleResource, markDownloaded } = useAppData();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');

  const visible = useMemo(() => filterResources(mockResources, { filter, query, savedIds }), [filter, query, savedIds]);

  const download = useCallback(
    (resource: Resource) => {
      Alert.alert(strings.resources.downloadTitle, strings.resources.downloadBody, [
        { text: 'Cancel', style: 'cancel' },
        {
          text: strings.resources.downloadTitle,
          onPress: async () => {
            try {
              await Linking.openURL(resource.url);
              markDownloaded(resource.id);
            } catch {
              Alert.alert(strings.resources.title, strings.resources.downloadFailed);
            }
          },
        },
      ]);
    },
    [markDownloaded],
  );

  return (
    <ModuleScreen
      title={strings.resources.title}
      onBack={navigation.goBack}
      rightIcon="folder-open"
      hero={{ icon: 'cloud-download', title: strings.resources.heroTitle, subtitle: strings.resources.heroSubtitle }}>
      <View style={styles.top}>
        <SearchBar value={query} onChangeText={setQuery} placeholder={strings.resources.searchPlaceholder} />
        <FilterChips options={FILTERS} selected={filter} onSelect={setFilter} />
      </View>
      <FlatList
          data={visible}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={<EmptyState title={strings.resources.empty} message={strings.resources.emptyBody} icon="folder-open-outline" />}
          renderItem={({ item }) => (
            <ResourceCard
              resource={item}
              saved={savedIds.includes(item.id)}
              downloaded={downloadedIds.includes(item.id)}
              onToggleSave={toggleResource}
              onDownload={download}
            />
          )}
      />
    </ModuleScreen>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  top: { padding: screenPadding, paddingBottom: spacing.sm, gap: spacing.md },
  list: { paddingHorizontal: screenPadding, paddingBottom: spacing.xxxl, flexGrow: 1 },
  separator: { height: spacing.md },
});
