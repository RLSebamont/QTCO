import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '@react-navigation/native';

interface LoginButtonProps {
  onPress: () => void;
  text: string;
  variant?: 'contained' | 'outlined';
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}

const styles = StyleSheet.create({
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
});

const LoginButton: FC<LoginButtonProps> = ({
  onPress,
  text,
  variant = 'contained',
  backgroundColor,
  borderColor,
  textColor,
}) => {
  const {colors} = useTheme();
  const getButtonStyle = () => {
    if (variant === 'contained') {
      return {
        backgroundColor: backgroundColor || colors.primary,
      };
    }
    return {
      backgroundColor: backgroundColor || colors.card,
      borderWidth: 2,
      borderColor: borderColor || colors.primary,
    };
  };
  const getTextColor = () => {
    if (textColor) {
      return textColor;
    }
    if (variant === 'contained') {
      return 'white';
    }
    return colors.text;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, getButtonStyle()]}>
        <Text style={{color: getTextColor()}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LoginButton;
