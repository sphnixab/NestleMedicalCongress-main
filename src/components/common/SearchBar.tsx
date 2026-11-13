import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { AppIcon as Icon } from './AppIcon';
import { colors, gradients } from '../../constants/colors';
import { hitSlop, radius, sizes } from '../../constants/dimensions';
import { fontFamily, fontSize } from '../../constants/fonts';
import { spacing } from '../../constants/spacing';
import LinearGradient from 'react-native-linear-gradient';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  variant?: 'light' | 'dark';
  showFilterButton?: boolean;
  onSubmit?: () => void;
}

export const SearchBar = ({
  value,
  onChangeText,
  placeholder,
  variant = 'light',
  showFilterButton = false,
  onSubmit,
}: SearchBarProps) => {
  const dark = variant === 'dark';
  return (
    <View style={[styles.container, dark ? styles.dark : styles.light]}>
      <Icon name="search" size={sizes.iconMd} color={dark ? colors.textOnDarkMuted : colors.blue500} />
      <TextInput
        accessibilityLabel={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        numberOfLines={1}
        placeholder={placeholder}
        placeholderTextColor={dark ? colors.textOnDarkMuted : colors.textMuted}
        returnKeyType="search"
        autoCorrect={false}
        style={[styles.input, { color: dark ? colors.white : colors.textPrimary }]}
      />
      {value.length > 0 ? (
        <Pressable hitSlop={hitSlop} accessibilityLabel="Clear search" onPress={() => onChangeText('')}>
          <Icon name="close-circle" size={sizes.iconMd} color={dark ? colors.textOnDarkMuted : colors.textMuted} />
        </Pressable>
      ) : null}
      {showFilterButton ? (
        <LinearGradient colors={[...gradients.icon]} style={styles.filter}>
          <Icon name="options-outline" size={sizes.iconSm} color={colors.white} />
        </LinearGradient>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: sizes.inputHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
  },
  light: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  dark: { backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBorder },
  input: { flex: 1, height: '100%', padding: 0, fontFamily: fontFamily.regular, fontSize: fontSize.xs },
  filter: { width: 32, height: 32, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
});
