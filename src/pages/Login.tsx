import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../utils/AuthContext';
import {useTheme} from '@react-navigation/native';
import SvgQuantacoLogo from '../components/QuantacoLogo';
import TText from '../components/TText';
import {COLORS} from '../utils/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
      <View
        style={{
          height: 30,
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: 16,
        }}>
        <SvgQuantacoLogo
          height={60}
          width={'100%'}
          viewBox="0 0 500 140"
          letterColor={colors.text}
          dotColor="#FF6A14"
        />
      </View>
      <TextInput
        onChangeText={setUsername}
        placeholder={'Username'}
        autoCapitalize={'none'}
        keyboardType="email-address"
        style={[
          styles.textInput,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            color: colors.text,
          },
        ]}
      />
      <TextInput
        onChangeText={setPassword}
        secureTextEntry
        placeholder={'Password'}
        autoCapitalize="none"
        style={[
          styles.textInput,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            color: colors.text,
          },
        ]}
      />
      <TouchableOpacity onPress={handleLogin}>
        <View
          style={[
            styles.button,
            {
              backgroundColor: colors.primary,
              shadowColor: colors.border,
            },
          ]}>
          <Text style={{color: 'white'}}>Login</Text>
        </View>
      </TouchableOpacity>
      <TText>or</TText>
      <TouchableOpacity onPress={handleLoginWebauth}>
        <View
          style={[
            styles.button,
            {
              backgroundColor: colors.card,
              shadowColor: colors.border,
              borderWidth: 2,
              borderColor: colors.primary,
            },
          ]}>
          <TText>Login with webauth</TText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSocialLogin('facebook')}>
        <View
          style={[
            styles.button,
            {
              backgroundColor: COLORS.facebook,
              shadowColor: colors.border,
            },
          ]}>
          <Text style={{color: 'white'}}>Login with facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSocialLogin('google-oauth2')}>
        <View
          style={[
            styles.button,
            {
              backgroundColor: COLORS.google,
              shadowColor: colors.border,
            },
          ]}>
          <Text style={{color: 'white'}}>Login with google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
