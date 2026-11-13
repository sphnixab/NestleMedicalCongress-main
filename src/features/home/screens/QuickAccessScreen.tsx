import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { QuickAccessCard } from '../../../components/cards/QuickAccessCard';
import { EmptyState } from '../../../components/common/EmptyState';
import { FilterChips } from '../../../components/common/FilterChips';
import { ModuleScreen } from '../../../components/common/ModuleScreen';
import { SearchBar } from '../../../components/common/SearchBar';
import { quickAccessFilters, quickAccessItems } from '../../../constants/quickAccess';
import { screenPadding, spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { HomeStackParamList } from '../../../navigation/navigationTypes';
import { QuickAccessItem } from '../../../types/models.types';
import { filterQuickAccess } from '../../../utils/filterUtils';

type Navigation = NativeStackNavigationProp<HomeStackParamList, 'QuickAccess'>;

export const QuickAccessScreen = () => {
  const navigation = useNavigation<Navigation>();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof quickAccessFilters)[number]>('All');

  const items = useMemo(() => filterQuickAccess(quickAccessItems, { category, query }), [category, query]);

  const open = useCallback((item: QuickAccessItem) => navigation.navigate(item.route), [navigation]);

  return (
    <ModuleScreen
      title={strings.quickAccess.title}
      onBack={navigation.goBack}
      rightIcon="grid"
      hero={{
        icon: 'sparkles',
        title: strings.quickAccess.heroTitle,
        subtitle: strings.quickAccess.heroSubtitle,
      }}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        numColumns={2}
        keyboardShouldPersistTaps="handled"
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <SearchBar value={query} onChangeText={setQuery} placeholder={strings.quickAccess.search} />
            <FilterChips options={quickAccessFilters} selected={category} onSelect={setCategory} />
          </View>
        }
        ListEmptyComponent={<EmptyState title={strings.quickAccess.empty} />}
        renderItem={({ item }) => (
          <View style={styles.cell}>
            <QuickAccessCard item={item} onPress={open} />
          </View>
        )}
      />
    </ModuleScreen>
  );
};

const styles = StyleSheet.create({
  content: { padding: screenPadding, paddingBottom: spacing.xxxl },
  header: { gap: spacing.md, marginBottom: spacing.lg },
  row: { gap: spacing.md, marginBottom: spacing.md },
  cell: { flex: 1 },
});
