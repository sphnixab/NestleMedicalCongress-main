import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { EditProfileScreen } from '../features/profile/screens/EditProfileScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { SettingsScreen } from '../features/settings/screens/SettingsScreen';
import { ProfileStackParamList } from './navigationTypes';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Profile"
    screenOptions={{ headerShown: false, animation: 'slide_from_right', contentStyle: { backgroundColor: '#071352' } }}>
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ animation: 'fade' }} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);
