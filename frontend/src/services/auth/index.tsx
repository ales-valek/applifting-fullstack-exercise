import { useLayoutEffect, createContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, UseMutateFunction } from '@tanstack/react-query';
import useLocalStorage from 'use-local-storage';

import { BlogApi } from '../api/applifting-blog';

type AuthContextValue = {
  isLoggedIn: boolean;
  login: UseMutateFunction<
    Awaited<ReturnType<typeof BlogApi['authentication']['login']>>,
    unknown,
    Parameters<typeof BlogApi['authentication']['login']>[0]
  >;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useLocalStorage<
    { token: string; createdAt: number } | undefined
  >('auth', undefined);
  const isLoggedIn =
    !!auth?.token && Date.now() - auth?.createdAt < 1000 * 60 * 60;

  const logout = () => {
    setAuth(undefined);
    navigate('/');
  };

  const { mutate: login } = useMutation(BlogApi.authentication.login, {
    onSuccess: () => {
      setAuth({
        token: '',
        createdAt: Date.now(),
      });
    },
  });

  useLayoutEffect(() => {
    if (!auth) return;

    if (Date.now() - auth?.createdAt < 1000 * 60 * 60) {
      logout();
      return;
    }

    const tokenInvalidationTime = Date.now() - auth?.createdAt;
    const timeout = setTimeout(() => {}, tokenInvalidationTime);

    return () => clearTimeout(timeout);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
