import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {AuthContextProvider} from './src/utils/AuthContext';
import Navigation from './src/utils/Navigation';

export const App = () => {
  const colorScheme = useColorScheme();
  return (
    <AuthContextProvider>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Navigation />
    </AuthContextProvider>
  );
};

export default App;
