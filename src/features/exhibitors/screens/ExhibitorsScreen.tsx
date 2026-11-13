import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AppIcon } from '../../../components/common/AppIcon';
import { AppText } from '../../../components/common/AppText';
import { EmptyState } from '../../../components/common/EmptyState';
import { ModuleScreen } from '../../../components/common/ModuleScreen';
import { SearchBar } from '../../../components/common/SearchBar';
import { colors } from '../../../constants/colors';
import { radius, sizes } from '../../../constants/dimensions';
import { screenPadding, spacing } from '../../../constants/spacing';
import { strings } from '../../../constants/strings';
import { HomeScreenProps } from '../../../navigation/navigationTypes';
import { mockExhibitors } from '../../../data/mockEvent';
import { matchesQuery } from '../../../utils/formatUtils';

export const ExhibitorsScreen = ({ navigation }: HomeScreenProps<'Exhibitors'>) => {
  const [query, setQuery] = useState('');

  const visible = useMemo(
    () => mockExhibitors.filter(item => matchesQuery(query, item.name, item.category, item.description)),
    [query],
  );

  return (
    <ModuleScreen
      title={strings.exhibitors.title}
      onBack={navigation.goBack}
      rightIcon="briefcase"
      hero={{ icon: 'business', title: strings.exhibitors.heroTitle, subtitle: strings.exhibitors.heroSubtitle }}>
      <View style={styles.top}>
        <SearchBar value={query} onChangeText={setQuery} placeholder={strings.exhibitors.searchPlaceholder} />
      </View>
      <FlatList
          data={visible}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={<EmptyState title={strings.exhibitors.empty} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.icon}>
                <AppIcon name="storefront-outline" size={sizes.iconLg} color={colors.blue500} />
              </View>
              <View style={styles.copy}>
                <AppText variant="overline" color={colors.gold500}>
                  {item.category.toUpperCase()} · {strings.exhibitors.booth} {item.booth}
                </AppText>
                <AppText variant="bodyStrong">{item.name}</AppText>
                <AppText variant="caption" color={colors.textSecondary}>
                  {item.description}
                </AppText>
              </View>
            </View>
          )}
      />
    </ModuleScreen>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  top: { padding: screenPadding, paddingBottom: spacing.sm },
  list: { padding: screenPadding, paddingTop: spacing.sm, flexGrow: 1 },
  separator: { height: spacing.md },
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.infoSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1, gap: spacing.xxs },
});
