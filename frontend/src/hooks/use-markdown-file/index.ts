import { useQuery } from '@tanstack/react-query';

import { getMarkdownFile } from './helpers';

export const useMarkdownFile = (path: string) => {
  const { data: value, ...fileData } = useQuery(
    ['markdown-file', path],
    () => getMarkdownFile(path),
    {
      cacheTime: 300_000,
      staleTime: 300_000,
    }
  );

  return { value: value ?? '', ...fileData };
};
