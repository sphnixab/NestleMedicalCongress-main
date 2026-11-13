import React, { forwardRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { AppIcon as Icon } from './AppIcon';
import { colors } from '../../constants/colors';
import { hitSlop, radius, sizes } from '../../constants/dimensions';
import { fontFamily, fontSize } from '../../constants/fonts';
import { spacing } from '../../constants/spacing';
import { AppText } from './AppText';

interface AppInputProps extends TextInputProps {
  icon?: string;
  error?: string;
  secure?: boolean;
}

export const AppInput = forwardRef<TextInput, AppInputProps>(
  ({ icon, error, secure = false, style, ...rest }, ref) => {
    const [hidden, setHidden] = useState(secure);

    return (
      <View>
        <View style={[styles.field, error ? styles.fieldError : null]}>
          {icon ? <Icon name={icon} size={sizes.iconSm} color={colors.blue500} style={styles.icon} /> : null}
          <TextInput
            ref={ref}
            placeholderTextColor={colors.textMuted}
            secureTextEntry={hidden}
            autoCapitalize="none"
            style={[styles.input, style]}
            {...rest}
          />
          {secure ? (
            <Pressable
              hitSlop={hitSlop}
              accessibilityRole="button"
              accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
              onPress={() => setHidden(value => !value)}>
              <Icon name={hidden ? 'eye-off-outline' : 'eye-outline'} size={sizes.iconMd} color={colors.textMuted} />
            </Pressable>
          ) : null}
        </View>
        {error ? (
          <AppText variant="caption" color={colors.danger} style={styles.error}>
            {error}
          </AppText>
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  field: {
    height: sizes.inputHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fieldError: { borderColor: colors.danger },
  icon: { marginRight: spacing.md },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    padding: 0,
  },
  error: { marginTop: spacing.xs, marginLeft: spacing.sm },
});
