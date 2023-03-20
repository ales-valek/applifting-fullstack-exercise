export const getFormatteDateTimeFromTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);

  return `${date.toLocaleDateString(undefined, {
    dateStyle: 'short',
  })} ${date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};
