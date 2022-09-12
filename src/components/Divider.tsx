import {View, StyleSheet, Text} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '@react-navigation/native';

const styles = StyleSheet.create({
  dividerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    position: 'absolute',
    top: 8,
    height: 1,
  },
  dividerInnerText: {
    paddingHorizontal: 16,
  },
});
interface DividerProps {
  width?: number | string;
  text?: string;
}
const Divider: FC<DividerProps> = ({width, text}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.dividerContainer}>
      <View
        style={[
          styles.dividerLine,
          {
            width: width || '100%',
            backgroundColor: colors.text,
          },
        ]}
      />
      {text && (
        <Text
          style={[
            styles.dividerInnerText,
            {
              backgroundColor: colors.background,
              color: colors.text,
            },
          ]}>
          {text}
        </Text>
      )}
    </View>
  );
};

export default Divider;
