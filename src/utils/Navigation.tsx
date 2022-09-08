import {Text, useColorScheme} from 'react-native';
import React, {useContext} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Login,
  Benchmark,
  Cashup,
  Comply,
  Finpack,
  Home,
  Learning,
  Salesline,
} from '../pages';
import {RootStackParamList} from '../../types';
import {AuthContext} from './AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

const config = {
  initialRouteName: 'Home' as keyof RootStackParamList, // workaround to fix Ts error
  screens: {
    Login: 'login',
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

const Navigation = () => {
  const colorScheme = useColorScheme();
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName={authContext?.accessToken ? 'Home' : 'Login'}>
        {authContext?.accessToken ? (
          <>
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
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
