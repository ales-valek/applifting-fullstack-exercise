import { createContext, useContext, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import useLocalStorage from 'use-local-storage';

import { BlogApi } from 'services/api/applifting-blog';

import { AuthContextProviderProps, AuthContextValue } from './index.types';

export const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [auth, setAuth] = useLocalStorage<
    { token: string; validUntil: number } | undefined
  >('auth', undefined);
  const isLoggedIn = !!auth?.token && auth?.validUntil > Date.now();

  const logout = () => {
    setAuth(undefined);
  };

  const { mutate: login } = useMutation(BlogApi.authentication.login, {
    onSuccess: ({ access_token, expires_in }) => {
      setAuth({
        token: `${access_token}`,
        validUntil: Date.now() + (expires_in ?? 0) * 1000,
      });
    },
  });

  useEffect(() => {
    if (!auth) return;

    if (auth?.validUntil < Date.now()) {
      logout();
      return;
    }

    const tokenInvalidationTime = auth?.validUntil - Date.now();
    const timeout = setTimeout(logout, tokenInvalidationTime);

    return () => clearTimeout(timeout);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthService = () => useContext(AuthContext);

export default AuthContextProvider;
