import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { radius, sizes } from '../../constants/dimensions';
import { spacing } from '../../constants/spacing';
import { AppText } from './AppText';

interface FilterChipsProps<T extends string> {
  options: readonly T[];
  selected: T;
  onSelect: (option: T) => void;
  activeColor?: string;
  paddingHorizontal?: number;
}

export const FilterChips = <T extends string>({
  options,
  selected,
  onSelect,
  activeColor = colors.blue500,
  paddingHorizontal = 0,
}: FilterChipsProps<T>) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={[styles.row, { paddingHorizontal }]}>
    {options.map(option => {
      const active = option === selected;
      return (
        <Pressable
          key={option}
          accessibilityRole="button"
          accessibilityState={{ selected: active }}
          onPress={() => onSelect(option)}
          style={[styles.chip, active ? { backgroundColor: activeColor, borderColor: activeColor } : null]}>
          <AppText variant="label" color={active ? colors.white : colors.textSecondary}>
            {option}
          </AppText>
        </Pressable>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  row: { gap: spacing.sm, paddingVertical: spacing.xs },
  chip: {
    height: sizes.chipHeight,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
