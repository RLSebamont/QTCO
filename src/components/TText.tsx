import {Text} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '@react-navigation/native';

interface TTextProps {
  children: string;
}

const TText: FC<TTextProps> = ({children}) => {
  const {colors} = useTheme();
  return <Text style={{color: colors.text}}>{children}</Text>;
};

export default TText;
