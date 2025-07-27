import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchingBlock } from './SearchBlock';
import { vi } from 'vitest';

import * as service from '../servicios/getPokeList';

vi.mock('../servicios/useLocalStorage', () => ({
  useLocalStorage: () => ({
    setItem: vi.fn(),
    getItem: vi.fn(() => ''),
  }),
}));

describe('SearchingBlock', () => {
  it('calls onResult with data after search submit', async () => {
    const mockData = {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: 'pikachu', url: 'url' }],
    };
    vi.spyOn(service, 'getData').mockResolvedValue(mockData);

    const onResult = vi.fn();
    render(<SearchingBlock onResult={onResult} />);

    const input = screen.getByPlaceholderText(/please, enter/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '   pikachu   ' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onResult).toHaveBeenCalledWith(mockData);
    });
  });

  it('handles errors from getData', async () => {
    const error = new Error('fetch failed');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(service, 'getData').mockRejectedValue(error);

    const onResult = vi.fn();
    render(<SearchingBlock onResult={onResult} />);

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(error);
    });

    expect(onResult).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});