import {View, StyleSheet, TextInput} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../utils/AuthContext';
import {useTheme} from '@react-navigation/native';
import SvgQuantacoLogo from '../components/QuantacoLogo';
import TText from '../components/TText';
import {COLORS} from '../utils/theme';
import LoginButton from '../components/LoginButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: '100%',
  },
  button: {
    width: 240,
    marginVertical: 8,
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
  textInput: {
    height: 40,
    marginVertical: 4,
    width: 240,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  darkButtonText: {
    color: 'white',
  },
});

const themedStyles = (themeColors: any) =>
  StyleSheet.create({
    loginInputs: {
      borderColor: themeColors.border,
      backgroundColor: themeColors.card,
      color: themeColors.text,
    },
  });

const Login = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {colors} = useTheme();

  const handleLogin = async () => {
    try {
      if (authContext?.auth0) {
        const credentials = await authContext.auth0.auth.passwordRealm({
          username: username,
          password: password,
          realm: 'Username-Password-Authentication',
          scope: 'openid profile email',
          audience: 'https://sebamont.au.auth0.com/userinfo',
        });
        authContext.setCredentials(credentials);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginWebauth = async () => {
    try {
      if (authContext?.auth0 && authContext?.setCredentials) {
        const credentials = await authContext.auth0.webAuth.authorize({
          scope: 'openid profile email',
        });
        authContext.setCredentials(credentials);
        const userinfo = await authContext.auth0.auth.userInfo({
          token: credentials.idToken,
        });
        console.log(userinfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSocialLogin = async (connection: string) => {
    try {
      if (authContext?.auth0 && authContext?.setCredentials) {
        const credentials = await authContext.auth0.webAuth.authorize({
          scope: 'openid profile email',
          connection,
          audience: 'https://sebamont.au.auth0.com/userinfo',
        });
        authContext.setCredentials(credentials);
        const userinfo = await authContext.auth0.auth.userInfo({
          token: credentials.idToken,
        });
        console.log(userinfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <SvgQuantacoLogo
          height={60}
          width={'100%'}
          viewBox="0 0 500 140"
          letterColor={colors.text}
          dotColor={COLORS.quantacoOrange}
        />
      </View>
      <TextInput
        onChangeText={setUsername}
        placeholder={'Username'}
        autoCapitalize={'none'}
        keyboardType="email-address"
        style={[styles.textInput, themedStyles(colors).loginInputs]}
      />
      <TextInput
        onChangeText={setPassword}
        secureTextEntry
        placeholder={'Password'}
        autoCapitalize="none"
        style={[styles.textInput, themedStyles(colors).loginInputs]}
      />
      <LoginButton onPress={handleLogin} text="Login" />
      <TText>or</TText>
      <LoginButton
        onPress={handleLoginWebauth}
        variant="outlined"
        text="Login with webauth"
      />
      <LoginButton
        text="Login with Facebook"
        onPress={() => handleSocialLogin('facebook')}
        backgroundColor={COLORS.facebook}
      />
      <LoginButton
        onPress={() => handleSocialLogin('google-oauth2')}
        text="Login with google"
        backgroundColor={COLORS.google}
      />
    </View>
  );
};

export default Login;
