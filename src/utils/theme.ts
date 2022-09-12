import {Theme, DarkTheme} from '@react-navigation/native';

export const QantacoDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    card: '#00222D',
    background: '#121212',
    border: '#000',
  },
};

export const COLORS = {
  google: '#DB4437',
  facebook: '#1778F2',
};
