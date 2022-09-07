import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {FC, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({
  domain: 'sebamont.au.auth0.com',
  clientId: '0tkH6dKAotW1pUTWCKikCtrG5SVegKac',
});

const {width: screenW} = Dimensions.get('window');

const Services = [
  'Salesline',
  'Cashup',
  'Learning',
  'Comply',
  'Benchmark',
  'Finpack',
];

const Home: FC<NativeStackScreenProps<RootStackParamList, 'Home'>> = ({
  navigation,
}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<null | string>(null);

  const handlePressLogIn = () => {
    if (loggedIn) {
      auth0.webAuth
        .clearSession({})
        .then(() => {
          Alert.alert('Logged out!');
          setAccessToken(null);
          setLoggedIn(false);
        })
        .catch(() => {
          console.log('Log out cancelled');
        });
    } else {
      auth0.webAuth
        .authorize({scope: 'openid profile email'})
        .then(credentials => {
          // Successfully authenticated
          // Store the accessToken
          setAccessToken(credentials.accessToken);
          setLoggedIn(true);
        })
        .catch(error => console.log(error));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Quantaco</Text>
      <Text>Good morning Jane</Text>
      <TouchableOpacity onPress={handlePressLogIn}>
        <Text>{loggedIn ? 'Log out' : 'Log In'}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <ScrollView contentContainerStyle={styles.buttonSection}>
          {Services.map(serv => (
            <TouchableOpacity
              key={serv}
              onPress={() => navigation.navigate(serv)}>
              <View style={styles.button}>
                <Text>{serv}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    flex: 1,
  },
  buttonSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  button: {
    width: screenW * 0.4,
    marginVertical: 4,
    height: 40,
    backgroundColor: '#CCC',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
