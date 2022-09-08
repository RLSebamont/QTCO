import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import React, {FC, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppService, RootStackParamList} from '../../types';
import Auth0 from 'react-native-auth0';
import {useTheme} from '@react-navigation/native';
import TText from '../components/TText';
const auth0 = new Auth0({
  domain: 'sebamont.au.auth0.com',
  clientId: '0tkH6dKAotW1pUTWCKikCtrG5SVegKac',
});

const {width: screenW} = Dimensions.get('window');

const AppServices: AppService[] = [
  {
    serviceId: 1,
    serviceName: 'Salesline',
    serviceUrl: 'http://salesline.quantaco.co',
    enabled: true,
  },
  {
    serviceId: 2,
    serviceName: 'Cashup',
    serviceUrl: 'http://cashup.quantaco.co',
    enabled: true,
  },
  {
    serviceId: 3,
    serviceName: 'Compliance',
    serviceUrl: 'http://compliance.quantaco.co',
    enabled: true,
  },
  {
    serviceId: 4,
    serviceName: 'Hospitality Platform',
    serviceUrl: 'http://compliance.quantaco.co',
    enabled: false,
  },
  {
    serviceId: 5,
    serviceName: 'Slack (Android)',
    serviceUrl: 'https://slack.com',
    enabled: true,
    androidUrl: 'slack://open',
  },
  {
    serviceId: 6,
    serviceName: 'Send Mail (ios)',
    serviceUrl: 'https://gmail.com',
    enabled: true,
    iosUrl: 'mailto:example@quantaco.co',
  },
];

const Home: FC<NativeStackScreenProps<RootStackParamList, 'Home'>> = ({
  navigation,
}) => {
  const {colors} = useTheme();
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<null | string>(null);

  const handlePressAppService = async (serv: AppService) => {
    if (Platform.OS === 'android' && serv.androidUrl) {
      try {
        await Linking.openURL(serv.androidUrl);
      } catch (error) {
        console.log(error);
        await Linking.openURL(serv.serviceUrl);
      }
    } else if (Platform.OS === 'ios' && serv.iosUrl) {
      try {
        await Linking.openURL(serv.iosUrl);
      } catch (error) {
        console.log(error);
        await Linking.openURL(serv.serviceUrl);
      }
    } else {
      return navigation.navigate(serv.serviceName);
    }
  };

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
      <TText>Quantaco</TText>
      <TText>Good morning Jane</TText>
      <TouchableOpacity onPress={handlePressLogIn}>
        <TText>{loggedIn ? 'Log out' : 'Log In'}</TText>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <ScrollView
          contentContainerStyle={styles.buttonSection}
          bounces={false}>
          {AppServices.map(serv => (
            <TouchableOpacity
              key={serv.serviceId}
              disabled={!serv.enabled}
              onPress={() => handlePressAppService(serv)}>
              <View
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.card,
                    shadowColor: colors.border,
                    opacity: !serv.enabled ? 0.5 : 1,
                  },
                ]}>
                <TText>{serv.serviceName}</TText>
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
