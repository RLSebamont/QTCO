import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Benchmark,
  Cashup,
  Comply,
  Finpack,
  Home,
  Learning,
  Salesline,
} from './src/pages';
import {RootStackParamList} from './types';
import {StatusBar, Text, useColorScheme} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const config = {
  initialRouteName: 'Home' as keyof RootStackParamList, // workaround to fix Ts error
  screens: {
    Home: 'home',
    Salesline: 'salesline',
    Cashup: 'cashup',
    Learning: 'learning',
    Comply: 'comply',
    Benchmark: 'benchmark',
    Finpack: 'finpack',
  },
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['qantaco://'],
  config,
};

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Benchmark" component={Benchmark} />
        <Stack.Screen name="Cashup" component={Cashup} />
        <Stack.Screen name="Comply" component={Comply} />
        <Stack.Screen name="Finpack" component={Finpack} />
        <Stack.Screen name="Learning" component={Learning} />
        <Stack.Screen name="Salesline" component={Salesline} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
