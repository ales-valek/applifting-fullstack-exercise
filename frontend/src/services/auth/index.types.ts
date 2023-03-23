import { UseMutateFunction } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { BlogApi } from 'services/api/applifting-blog';

export type AuthContextValue = {
  isLoggedIn: boolean;
  login: UseMutateFunction<
    Awaited<ReturnType<typeof BlogApi['authentication']['login']>>,
    unknown,
    Parameters<typeof BlogApi['authentication']['login']>[0]
  >;
  logout: () => void;
};

export type AuthContextProviderProps = { children: ReactNode };
