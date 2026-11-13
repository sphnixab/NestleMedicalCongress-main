import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { CustomTabBar } from '../components/common/CustomTabBar';
import { HomeStackNavigator } from './HomeStackNavigator';
import { MainTabParamList } from './navigationTypes';
import { ProfileStackNavigator } from './ProfileStackNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

export const MainTabNavigator = () => (
  <Tab.Navigator
    backBehavior="initialRoute"
    tabBar={renderTabBar}
    screenOptions={{ headerShown: false }}>
    <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
    <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} />
  </Tab.Navigator>
);
