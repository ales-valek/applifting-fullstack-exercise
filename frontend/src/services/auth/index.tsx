import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useMutation, UseMutateFunction } from '@tanstack/react-query';
import useLocalStorage from 'use-local-storage';

import { BlogApi } from 'services/api/applifting-blog';

type AuthContextValue = {
  isLoggedIn: boolean;
  login: UseMutateFunction<
    Awaited<ReturnType<typeof BlogApi['authentication']['login']>>,
    unknown,
    Parameters<typeof BlogApi['authentication']['login']>[0]
  >;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
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

    const tokenInvalidationTime = Date.now() - auth?.validUntil;
    const timeout = setTimeout(() => {}, tokenInvalidationTime);

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
