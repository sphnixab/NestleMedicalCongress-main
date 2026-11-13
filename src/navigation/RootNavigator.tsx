import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { LoadingIndicator } from '../components/common/LoadingIndicator';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { colors } from '../constants/colors';
import { appConfig } from '../constants/appConfig';
import { useAuth } from '../context/AuthContext';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { RootStackParamList } from './navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [appConfig.deepLinkPrefix],
  config: {
    screens: {
      Auth: { screens: { Login: 'login', Register: 'register', ForgotPassword: 'forgot-password' } },
      Main: {
        screens: {
          HomeTab: {
            screens: {
              Home: 'home',
              Agenda: 'agenda',
              SessionDetail: 'session/:sessionId',
              Speakers: 'speakers',
              SpeakerDetail: 'speaker/:speakerId',
              NameTag: 'name-tag',
              Venue: 'venue',
              Voting: 'voting',
              QA: 'qa',
              Resources: 'resources',
              Exhibitors: 'exhibitors',
            },
          },
          ProfileTab: { screens: { Profile: 'profile', Settings: 'settings' } },
        },
      },
    },
  },
};

export const RootNavigator = () => {
  const { user, isRestoring } = useAuth();
  const isAuthenticated = user !== null;

  if (isRestoring) {
    return (
      <ScreenContainer style={styles.splash}>
        <LoadingIndicator color={colors.gold400} />
      </ScreenContainer>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splash: { justifyContent: 'center' },
});
