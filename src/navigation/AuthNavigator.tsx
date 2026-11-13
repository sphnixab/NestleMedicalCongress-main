import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ForgotPasswordScreen } from '../features/auth/screens/ForgotPasswordScreen';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../features/auth/screens/RegisterScreen';
import { AuthStackParamList } from './navigationTypes';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, animation: 'fade' }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ animation: 'slide_from_right' }} />
  </Stack.Navigator>
);
