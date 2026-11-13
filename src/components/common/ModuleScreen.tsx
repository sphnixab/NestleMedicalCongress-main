import React, { PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/dimensions';
import { AppHeader } from './AppHeader';
import { HeroCard } from './HeroCard';
import { ScreenContainer } from './ScreenContainer';

interface ModuleScreenProps extends PropsWithChildren {
  title: string;
  onBack?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  rightLabel?: string;
  hero?: { icon: string; title: string; subtitle: string; tone?: 'blue' | 'gold' };
  /** Rendered on the navy area between the hero card and the white sheet. */
  headerExtra?: ReactNode;
}

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ModuleScreen = ({ children, hero, headerExtra, ...header }: ModuleScreenProps) => {
  const insets = useSafeAreaInsets();
  return (
    <ScreenContainer edges={['top']}>
      <AppHeader {...header} />
      {hero ? <HeroCard {...hero} /> : null}
      {headerExtra}
      <View style={[styles.sheet, { paddingBottom: insets.bottom }]}>{children}</View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    backgroundColor: colors.offWhite,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    overflow: 'hidden',
  },
});
