import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  Linking,
  Alert,
  Modal,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {FC, useContext, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppService, RootStackParamList} from '../../types';
import {useTheme} from '@react-navigation/native';
import TText from '../components/TText';
import {AuthContext} from '../utils/AuthContext';
import {UserInfo} from 'react-native-auth0';
import SvgQuantacoLogo from '../components/QuantacoLogo';
import {COLORS} from '../utils/theme';
import AppServiceButton from '../components/AppServiceButton';

const HardcodedAppServices: AppService[] = [
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
    notifications: 1,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    marginTop: 32,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSection: {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    backgroundColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const Home: FC<NativeStackScreenProps<RootStackParamList, 'Home'>> = ({
  navigation,
}) => {
  const {colors} = useTheme();
  const [showAccessTokenModal, setShowAccessTokenModal] = useState(false);
  const authContext = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [appServices, setAppServices] = useState<AppService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (authContext?.auth0 && authContext.credentials?.accessToken) {
          console.log('triggered getUserInfo');
          const profile = await authContext.auth0.auth.userInfo({
            token: authContext.credentials.accessToken,
          });
          console.log(profile);
          setUserInfo(profile);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (authContext) {
      getUserInfo();
    }
  }, [authContext]);

  useEffect(() => {
    const fetchAppServices = async () => {
      try {
        const apiRes = await fetch(
          'https://virtserver.swaggerhub.com/Quantaco/Mobile/1.0.0/appservices/',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          },
        );
        const parsedRes = (await apiRes.json()) as AppService[];
        console.log(parsedRes);
        const servicesList = [...parsedRes, ...HardcodedAppServices];
        setAppServices(servicesList);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppServices();
  }, []);

  const handleClearNotifications = async (serviceId: number) => {
    console.log('send api call to clear notification'); // TODO
    setAppServices(prev =>
      prev.map(serv => {
        if (serv.serviceId === serviceId) {
          return {
            ...serv,
            notifications: 0,
          };
        }
        return serv;
      }),
    );
  };

  const handlePressAppService = async (serv: AppService) => {
    if (serv.notifications && serv.notifications > 0) {
      handleClearNotifications(serv.serviceId);
    }
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
      // @ts-ignore
      return navigation.navigate(serv.serviceName, {
        serviceUrl: serv.serviceUrl,
      });
    }
  };

  const handleLogout = () => {
    if (authContext) {
      // console.log(
      //   authContext.auth0.auth.logoutUrl({federated: true, returnTo: 'Home'}),
      // );
      authContext.auth0.webAuth
        .clearSession()
        .then(() => {
          Alert.alert('Logged out!');
          authContext.setCredentials(null);
        })
        .catch(() => {
          Alert.alert('There was a problem logging out!');
          authContext.setCredentials(null);
          console.log('Log out cancelled');
        });
    }
  };

  const handleShowAccessToken = () => {
    setShowAccessTokenModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <SvgQuantacoLogo
          height={60}
          width={'100%'}
          viewBox="0 0 500 140"
          letterColor={colors.text}
          dotColor={COLORS.quantacoOrange}
        />
      </View>
      <TText>{`Good morning ${userInfo?.nickname}`}</TText>
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <ScrollView
            contentContainerStyle={styles.buttonSection}
            bounces={false}>
            {appServices.map(serv => (
              <AppServiceButton
                key={serv.serviceId}
                onPress={() => handlePressAppService(serv)}
                disabled={!serv.enabled}
                text={serv.serviceName}
                notifications={serv.notifications}
              />
            ))}
            <AppServiceButton
              onPress={handleShowAccessToken}
              text="Show access token"
            />
            <AppServiceButton onPress={handleLogout} text="Logout" />
          </ScrollView>
        )}
      </View>
      {authContext?.credentials?.accessToken && (
        <Modal
          animationType="slide"
          transparent
          visible={showAccessTokenModal}
          onRequestClose={() => setShowAccessTokenModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text>{authContext.credentials.accessToken}</Text>
              <AppServiceButton
                onPress={() => setShowAccessTokenModal(false)}
                text="Close Modal"
              />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default Home;
