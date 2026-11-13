import React from 'react';
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppIcon as Icon } from './AppIcon';
import { colors, gradients } from '../../constants/colors';
import { radius, sizes } from '../../constants/dimensions';
import { spacing } from '../../constants/spacing';
import { AppText } from './AppText';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'gold' | 'outline';
  leftIcon?: string;
  rightIcon?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const AppButton = ({
  title,
  onPress,
  variant = 'primary',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  style,
  testID,
}: AppButtonProps) => {
  const inactive = disabled || loading;
  const textColor = variant === 'gold' ? colors.navy800 : variant === 'outline' ? colors.blue500 : colors.white;
  const gradient = variant === 'gold' ? gradients.gold : gradients.primary;

  const content = (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {leftIcon ? <Icon name={leftIcon} size={sizes.iconSm} color={textColor} /> : null}
          <AppText variant="title" color={textColor} >
            {title}
          </AppText>
          {rightIcon ? <Icon name={rightIcon} size={sizes.iconSm} color={textColor} /> : null}
        </>
      )}
    </View>
  );

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      onPress={onPress}
      style={({ pressed }) => [styles.base, style, inactive && styles.inactive, pressed && styles.pressed]}>
      {variant === 'outline' ? (
        <View style={[styles.fill, styles.outline]}>{content}</View>
      ) : (
        <LinearGradient
          colors={[...gradient]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.fill}>
          {content}
        </LinearGradient>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: { height: sizes.buttonHeight, borderRadius: radius.lg, overflow: 'hidden' },
  fill: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  outline: { borderWidth: 1.5, borderColor: colors.blue500, borderRadius: radius.lg },
  content: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm  },
  inactive: { opacity: 0.6 },
  pressed: { opacity: 0.88 },
});
