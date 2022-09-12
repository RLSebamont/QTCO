import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import {AuthContext} from '../utils/AuthContext';
import {useTheme} from '@react-navigation/native';
import SvgQuantacoLogo from '../components/QuantacoLogo';
import {COLORS} from '../utils/theme';
import LoginButton from '../components/LoginButton';
import Divider from '../components/Divider';

const AUTO_LOGIN_AFTER_SIGNUP = true;

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
  signInTextSection: {
    width: 240,
    marginTop: 4,
  },
  signInText: {
    fontFamily: 'RedHatDisplay-Regular',
    fontSize: 12,
  },
  signInLink: {
    fontFamily: 'RedHatDisplay-Bold',
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
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {colors} = useTheme();
  const passwordInputRef = useRef<TextInput | null>(null);

  const handleLoginOrRegister = async () => {
    try {
      if (authContext?.auth0) {
        if (!isSigningUp) {
          const credentials = await authContext.auth0.auth.passwordRealm({
            username: email,
            password,
            realm: 'Username-Password-Authentication',
            scope: 'openid profile email',
            audience: 'https://sebamont.au.auth0.com/userinfo',
          });
          authContext.setCredentials(credentials);
        } else {
          const createUserResult = await authContext.auth0.auth.createUser({
            email,
            password,
            connection: 'Username-Password-Authentication',
          });
          if (createUserResult) {
            if (AUTO_LOGIN_AFTER_SIGNUP) {
              const credentials = await authContext.auth0.auth.passwordRealm({
                username: email,
                password,
                realm: 'Username-Password-Authentication',
                scope: 'openid profile email',
                audience: 'https://sebamont.au.auth0.com/userinfo',
              });
              authContext.setCredentials(credentials);
            } else {
              setIsSigningUp(false);
              Alert.alert(
                'User successfully registered',
                'Please Log in with your new credentials',
              );
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  const handleLoginWebauth = async () => {
    try {
      if (authContext?.auth0 && authContext?.setCredentials) {
        const credentials = await authContext.auth0.webAuth.authorize({
          scope: 'openid profile email',
        });
        authContext.setCredentials(credentials);
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handlePressSubmitEmailInput = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
          onChangeText={setEmail}
          placeholder={'Email address'}
          autoCapitalize={'none'}
          value={email}
          keyboardType="email-address"
          style={[styles.textInput, themedStyles(colors).loginInputs]}
          returnKeyType="next"
          onSubmitEditing={handlePressSubmitEmailInput}
        />
        <TextInput
          onChangeText={setPassword}
          secureTextEntry
          value={password}
          placeholder={'Password'}
          ref={passwordInputRef}
          autoCapitalize="none"
          returnKeyType="send"
          style={[styles.textInput, themedStyles(colors).loginInputs]}
          onSubmitEditing={handleLoginOrRegister}
        />
        <LoginButton
          onPress={handleLoginOrRegister}
          text={isSigningUp ? 'Sign Up' : 'Log In'}
        />
        <View style={styles.signInTextSection}>
          <Text style={[styles.signInText, {color: colors.text}]}>
            {isSigningUp
              ? 'Already have an account?'
              : "Don't have an account?"}
            <Text
              style={[styles.signInLink, {color: colors.primary}]}
              onPress={() => setIsSigningUp(prev => !prev)}>
              {isSigningUp ? ' Log In' : ' Sign Up'}
            </Text>
          </Text>
        </View>
        <Divider width={240} text="or" lineColor="#BBB" />
        <LoginButton
          onPress={handleLoginWebauth}
          variant="outlined"
          text="Continue with webauth"
        />
        <LoginButton
          text="Continue with Facebook"
          onPress={() => handleSocialLogin('facebook')}
          backgroundColor={COLORS.facebook}
        />
        <LoginButton
          onPress={() => handleSocialLogin('google-oauth2')}
          text="Continue with google"
          backgroundColor={COLORS.google}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
