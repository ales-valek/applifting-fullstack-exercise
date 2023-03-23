export const getMarkdownFile = (path: string) =>
  fetch(path)
    .then((res) => res.text())
    .then((markdownText) => {
      if (markdownText?.split('\n')?.[0] === '<!DOCTYPE html>') {
        throw new Error('File does not exist.');
      }
      return markdownText;
    });
