import { getFormatteDateTimeFromTimestamp } from '.';

describe('Helper: getFormattedDateTimeFromTimestamp', () => {
  const date = new Date('2023-03-18T10:28:01.053092');
  const expectedSuccessResult = `${date.toLocaleDateString(undefined, {
    dateStyle: 'short',
  })} ${date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
  const expectedErrorFallbackResult = null;

  it('Should return correct date & time', () => {
    expect(getFormatteDateTimeFromTimestamp('2023-03-18T10:28:01.053092')).toBe(
      expectedSuccessResult
    );
  });

  it('Should return fallback on error', () => {
    expect(getFormatteDateTimeFromTimestamp('abc123')).toBe(
      expectedErrorFallbackResult
    );
  });
});
