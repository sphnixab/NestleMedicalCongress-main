import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppDataProvider } from './context/AppDataContext';
import { AuthProvider } from './context/AuthContext';
import { RootNavigator } from './navigation/RootNavigator';
import { ThemeProvider } from './theme/ThemeProvider';

const App = () => (
  <SafeAreaProvider>
    <ThemeProvider>
      <AuthProvider>
        <AppDataProvider>
          <RootNavigator />
        </AppDataProvider>
      </AuthProvider>
    </ThemeProvider>
  </SafeAreaProvider>
);

export default App;
