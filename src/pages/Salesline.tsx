import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webviewHeader: {
    height: 40,
    backgroundColor: '#CCC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {},
  disabledButtonContainer: {opacity: 0.5},
  headerButtons: {
    fontSize: 24,
  },
  headerTitle: {
    width: '70%',
    fontSize: 14,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  webviewContainer: {
    flex: 1,
  },
  webviewOverlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Salesline: FC<
  NativeStackScreenProps<RootStackParamList, 'Salesline'>
> = ({route}) => {
  const [loadingUrl, setLoadingUrl] = useState(true);
  const [navState, setNavState] = useState<WebViewNavigation | null>(null);
  const navRef = useRef<WebView | null>(null);
  const {serviceUrl} = route.params;

  const getServiceUrl = () => {
    return serviceUrl.replace('http://', 'https://');
  };

  const handleGoBack = () => {
    if (navRef.current) {
      navRef.current.goBack();
    }
  };

  const handleGoForward = () => {
    if (navRef.current) {
      navRef.current.goForward();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navState?.canGoBack && navRef.current) {
          navRef.current.goBack();
          // true means we handle the press back
          return true;
        } else {
          // false means react navigation handles the press back
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navState?.canGoBack]),
  );
  return (
    <View style={styles.container}>
      <View style={styles.webviewHeader}>
        <TouchableOpacity
          style={
            navState?.canGoBack
              ? styles.buttonContainer
              : styles.disabledButtonContainer
          }
          onPress={handleGoBack}
          disabled={!navState?.canGoBack}>
          <Text style={styles.headerButtons}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{navState?.title}</Text>
        <TouchableOpacity
          style={
            navState?.canGoForward
              ? styles.buttonContainer
              : styles.disabledButtonContainer
          }
          onPress={handleGoForward}
          disabled={!navState?.canGoForward}>
          <Text style={styles.headerButtons}>➡️</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.webviewContainer}>
        <WebView
          ref={navRef}
          source={{uri: getServiceUrl()}}
          bounces={false}
          onLoadEnd={() => setLoadingUrl(false)}
          onLoadStart={() => setLoadingUrl(true)}
          onNavigationStateChange={setNavState}
        />
        {loadingUrl && (
          <View style={styles.webviewOverlay}>
            <ActivityIndicator size={'large'} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Salesline;
