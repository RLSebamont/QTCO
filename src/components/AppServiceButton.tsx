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
}

const {width: screenW} = Dimensions.get('window');
const OPACITY_WHEN_DISABLED = 0.5;
const OPACITY_WHEN_ENABLED = 1;

const styles = StyleSheet.create({
  button: {
    width: screenW * 0.4,
    marginVertical: 4, // the horizontal gap between the buttons is calculated automatically by the container 'space-evenly' justifyContent property
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
  buttonText: {
    fontFamily: 'RedHatDisplay-Regular',
  },
});

const AppServiceButton: FC<AppServiceButtonProps> = ({
  onPress,
  text,
  disabled = false,
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
      </View>
    </TouchableOpacity>
  );
};

export default AppServiceButton;
