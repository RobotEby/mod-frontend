import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => <CartProvider>{children}</CartProvider>;

const product = {
  id: 'prod-1',
  name: 'Sofá 3 Lugares',
  price: 100,
  image: '/sofa.jpg',
};

describe('CartContext', () => {
  it('starts empty', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('adds an item with the default quantity of 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(100);
  });

  // Regression test: the product detail page's quantity selector (+/-) used to
  // be silently ignored because addItem() only accepted an item, never a
  // quantity, and always added exactly 1 unit no matter what the user picked.
  it('respects an explicit quantity passed to addItem', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product, 5);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.totalItems).toBe(5);
    expect(result.current.totalPrice).toBe(500);
  });

  it('increments the quantity of an existing item instead of duplicating it', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product, 2);
    });
    act(() => {
      result.current.addItem(product, 3);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(5);
  });

  it('never adds a quantity below 1, even if given 0 or a negative number', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product, 0);
    });

    expect(result.current.items[0].quantity).toBe(1);
  });

  it('removes an item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product);
    });
    act(() => {
      result.current.removeItem(product.id);
    });

    expect(result.current.items).toEqual([]);
  });

  it('updates the quantity of an item directly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product);
    });
    act(() => {
      result.current.updateQuantity(product.id, 4);
    });

    expect(result.current.items[0].quantity).toBe(4);
    expect(result.current.totalPrice).toBe(400);
  });

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product, 3);
    });
    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalPrice).toBe(0);
  });

  // Regression test: Cart.tsx and Checkout.tsx used to destructure a
  // non-existent `total` property (the context only ever exposed
  // `totalPrice`), which crashed both pages at runtime with
  // "Cannot read properties of undefined (reading 'toFixed')".
  it('exposes totalPrice (not `total`) as the running total', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product, 2);
    });

    expect(result.current.totalPrice).toBe(200);
    expect((result.current as unknown as { total?: number }).total).toBeUndefined();
  });

  it('computes totalPrice correctly across multiple distinct products', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product, 2); // 200
      result.current.addItem({ ...product, id: 'prod-2', price: 50 }, 1); // 50
    });

    expect(result.current.totalPrice).toBe(250);
    expect(result.current.totalItems).toBe(3);
  });
});
