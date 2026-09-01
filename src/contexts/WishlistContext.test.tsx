import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import userReducer from '@/features/user/userSlice';
import type { AccountUser } from '@/types/account';
import apiClient from '@/lib/api-client';

vi.mock('@/lib/api-client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

const { WishlistProvider, useWishlist } = await import('./WishlistContext');

const loggedInUser: AccountUser = { id: 'user-1', email: 'user@example.com' };

function makeStore(user: AccountUser | null) {
  return configureStore({
    reducer: { user: userReducer },
    preloadedState: {
      user: {
        user,
        session: user ? { user, access_token: 'fake-token' } : null,
        loading: false,
      },
    },
  });
}

function wrapperFor(user: AccountUser | null) {
  const store = makeStore(user);
  return ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <WishlistProvider>{children}</WishlistProvider>
    </Provider>
  );
}

describe('WishlistContext', () => {
  beforeEach(() => {
    vi.mocked(apiClient.get).mockReset();
  });

  // Regression test: this used to read `user` from a disconnected, unmounted
  // AuthContext (default value `user: null` forever), so wishlist items were
  // never fetched even for a logged-in user. It must now read the real
  // Redux auth state (the same one the rest of the app uses).
  it('fetches wishlist items from the API when a user is authenticated in Redux', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: [{ id: 'w1', product_id: 'prod-1', added_at: '2026-01-01T00:00:00.000Z' }],
    });

    const { result } = renderHook(() => useWishlist(), { wrapper: wrapperFor(loggedInUser) });

    await waitFor(() => {
      expect(result.current.wishlistItems).toHaveLength(1);
    });

    expect(apiClient.get).toHaveBeenCalledWith('/wishlist');
  });

  it('does not call the API and keeps the wishlist empty when there is no authenticated user', async () => {
    const { result } = renderHook(() => useWishlist(), { wrapper: wrapperFor(null) });

    await waitFor(() => {
      expect(result.current.wishlistItems).toEqual([]);
    });

    expect(apiClient.get).not.toHaveBeenCalled();
  });
});
