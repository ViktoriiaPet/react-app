import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';
import { vi } from 'vitest';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('sets and gets item from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key'));

    act(() => {
      result.current.setItem('hello');
    });

    const value = result.current.getItem();
    expect(value).toBe('hello');
  });

  it('handles localStorage errors gracefully', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const setItemSpy = vi
      .spyOn(window.localStorage.__proto__, 'setItem')
      .mockImplementation(() => {
        throw new Error('Fake localStorage error');
      });

    const { result } = renderHook(() => useLocalStorage('error-key'));

    act(() => {
      result.current.setItem('fail');
    });

    expect(errorSpy).toHaveBeenCalledWith(new Error('Fake localStorage error'));
    setItemSpy.mockRestore();
  });
});
