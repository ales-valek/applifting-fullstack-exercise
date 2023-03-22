export const getFormatteDateTimeFromTimestamp = (timestamp: string) => {
  try {
    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    return `${date.toLocaleDateString(undefined, {
      dateStyle: 'short',
    })} ${date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  } catch (err) {
    return null;
  }
};
