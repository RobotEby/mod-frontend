import { describe, it, expect } from 'vitest';
import { AxiosError } from 'axios';
import { getErrorMessage } from './errors';

describe('getErrorMessage', () => {
  it('extracts the backend message from an Axios error response', () => {
    const error = new AxiosError('Request failed with status code 400');
    error.response = {
      data: { message: 'E-mail já registrado' },
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      // @ts-expect-error minimal fake config for this test
      config: {},
    };

    expect(getErrorMessage(error)).toBe('E-mail já registrado');
  });

  it('falls back to the Axios error message when there is no response body message', () => {
    const error = new AxiosError('Network Error');
    expect(getErrorMessage(error)).toBe('Network Error');
  });

  it('extracts the message from a plain Error', () => {
    expect(getErrorMessage(new Error('boom'))).toBe('boom');
  });

  it('returns the fallback for unknown error shapes', () => {
    expect(getErrorMessage('a raw string', 'fallback message')).toBe('fallback message');
    expect(getErrorMessage(null, 'fallback message')).toBe('fallback message');
    expect(getErrorMessage(undefined)).toBe('Ocorreu um erro inesperado');
  });
});
