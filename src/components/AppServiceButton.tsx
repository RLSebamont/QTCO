import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '@react-navigation/native';

interface AppServiceButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  notifications?: number;
}

const {width: screenW} = Dimensions.get('window');
const OPACITY_WHEN_DISABLED = 0.5;
const OPACITY_WHEN_ENABLED = 1;
const BUTTON_HEIGHT = 60;

const BUTTON_FONT_SIZE = 16;
const NOTIFICATION_BADGE_HEIGHT = BUTTON_HEIGHT * 0.5;
const NOTIFICATION_BADGE_FONT_SIZE = BUTTON_HEIGHT * 0.25;

const styles = StyleSheet.create({
  button: {
    width: screenW * 0.4,
    marginVertical: 8, // the horizontal gap between the buttons is calculated automatically by the container 'space-evenly' justifyContent property
    height: BUTTON_HEIGHT,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'RedHatDisplay-Regular',
    fontSize: BUTTON_FONT_SIZE,
  },
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    height: NOTIFICATION_BADGE_HEIGHT,
    aspectRatio: 1,
    borderRadius: NOTIFICATION_BADGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontFamily: 'RedHatDisplay-Bold',
    textAlign: 'center',
    fontSize: NOTIFICATION_BADGE_FONT_SIZE,
  },
});

const AppServiceButton: FC<AppServiceButtonProps> = ({
  onPress,
  text,
  disabled = false,
  notifications = 0,
}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: colors.card,
            opacity: disabled ? OPACITY_WHEN_DISABLED : OPACITY_WHEN_ENABLED,
          },
        ]}>
        <Text
          style={[
            styles.buttonText,
            {
              color: colors.text,
            },
          ]}>
          {text}
        </Text>
        {notifications > 0 && (
          <View
            style={[
              styles.notificationBadge,
              {
                backgroundColor: colors.notification,
              },
            ]}>
            <Text style={styles.notificationBadgeText}>{notifications}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AppServiceButton;
