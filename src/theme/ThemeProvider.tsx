import React, { createContext, PropsWithChildren, useContext } from 'react';
import { StatusBar } from 'react-native';
import { AppTheme, theme } from './theme';

const ThemeContext = createContext<AppTheme>(theme);

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <ThemeContext.Provider value={theme}>
    <StatusBar barStyle="light-content" backgroundColor={theme.colors.navy800} />
    {children}
  </ThemeContext.Provider>
);

export const useTheme = (): AppTheme => useContext(ThemeContext);
