import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../utils/AuthContext';
import {useTheme} from '@react-navigation/native';
import TText from '../components/TText';

const {width: screenW} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

const Login = () => {
  const authContext = useContext(AuthContext);
  const {colors} = useTheme();

  const handleLogin = () => {
    if (authContext?.auth0 && authContext?.setAccessToken) {
      authContext.auth0.webAuth
        .authorize({scope: 'openid profile email'})
        .then(credentials => {
          // Successfully authenticated
          // Store the accessToken
          authContext.setAccessToken(credentials.accessToken);
        })
        .catch(error => console.log(error));
    }
  };
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity onPress={handleLogin}>
        <View
          style={[
            styles.button,
            {
              backgroundColor: colors.card,
              shadowColor: colors.border,
            },
          ]}>
          <TText>Login</TText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
