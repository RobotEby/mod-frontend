import { isAxiosError } from 'axios';

/**
 * Extracts a user-facing error message from an unknown error value.
 *
 * Centralizing this avoids sprinkling `(error: any) => error.response?.data?.message`
 * across every mutation's onError handler, and keeps the error shape properly typed
 * instead of relying on `any`.
 */
export function getErrorMessage(error: unknown, fallback = 'Ocorreu um erro inesperado'): string {
  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    return data?.message || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  return fallback;
}
