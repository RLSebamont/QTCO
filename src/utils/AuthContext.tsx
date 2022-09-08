import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import Auth0 from 'react-native-auth0';

interface AuthContextValues {
  auth0: Auth0;
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextValues | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

const auth0 = new Auth0({
  domain: 'sebamont.au.auth0.com',
  clientId: '0tkH6dKAotW1pUTWCKikCtrG5SVegKac',
});

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  return (
    <AuthContext.Provider
      value={{
        auth0,
        accessToken,
        setAccessToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
