import { useQuery } from '@tanstack/react-query';

export const useMarkdownFile = (path: string) => {
  const {
    data: value,
    isLoading,
    isError,
  } = useQuery(
    ['markdown-file', path],
    () =>
      fetch(path)
        .then((res) => res.text())
        .then((markdownText) => {
          if (markdownText?.split('\n')?.[0] === '<!DOCTYPE html>') {
            throw new Error('File does not exist.');
          }
          return markdownText;
        }),
    {
      cacheTime: 300_000,
      staleTime: 300_000,
    }
  );

  return { value: value ?? '', isLoading, isError };
};
