import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon as Icon } from './AppIcon';
import { colors } from '../../constants/colors';
import { radius, sizes } from '../../constants/dimensions';
import { screenPadding, spacing } from '../../constants/spacing';
import { strings } from '../../constants/strings';
import { AppText } from './AppText';

const tabConfig: Record<string, { label: string; icon: string; activeIcon: string; rootRoute: string }> = {
  HomeTab: { label: strings.tabs.home, icon: 'home-outline', activeIcon: 'home', rootRoute: 'Home' },
  ProfileTab: { label: strings.tabs.profile, icon: 'person-outline', activeIcon: 'person', rootRoute: 'Profile' },
};

export const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const activeRoute = state.routes[state.index];
  const nestedName = getFocusedRouteNameFromRoute(activeRoute) ?? tabConfig[activeRoute.name]?.rootRoute;

  // The bar belongs to root screens only; detail screens use the full height.
  if (nestedName !== tabConfig[activeRoute.name]?.rootRoute) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      {state.routes.map((route, index) => {
        const config = tabConfig[route.name];
        const focused = state.index === index;
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={config.label}
            onPress={() => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            style={[styles.tab, focused && styles.tabActive]}>
            <Icon
              name={focused ? config.activeIcon : config.icon}
              size={sizes.iconMd}
              color={focused ? colors.cyan300 : colors.textOnDarkMuted}
            />
            <AppText variant="label" color={focused ? colors.white : colors.textOnDarkMuted}>
              {config.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.navy900,
    paddingHorizontal: screenPadding,
    paddingTop: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
  },
  tab: {
    flex: 1,
    height: sizes.tabBarHeight - 8,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxs,
  },
  tabActive: { backgroundColor: colors.glassStrong, borderWidth: 1, borderColor: colors.glassBorder },
});
