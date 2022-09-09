import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import Auth0, {Credentials} from 'react-native-auth0';

interface AuthContextValues {
  auth0: Auth0;
  credentials: Credentials | null;
  setCredentials: Dispatch<SetStateAction<Credentials | null>>;
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
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  return (
    <AuthContext.Provider
      value={{
        auth0,
        credentials,
        setCredentials,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
