import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchingBlock } from './SearchBlock';
import { vi } from 'vitest';

import * as service from '../servicios/getPokeList';

describe('SearchingPoke', ()=> {
    it('should call onResult with valid data', async() => {
        const mockData = {
                  name: 'pikachu',
      id: 25,
      weight: 60,
      sprites: { front_default: 'url_to_sprite' },
        }
        vi.spyOn(service, 'getData').mockResolvedValue(mockData);
        const onResult = vi.fn();
        render(<SearchingBlock onResult={onResult} />)

        const input = screen.getByPlaceholderText(/please, enter/i)
        const button = screen.getByRole('button', { name: /search/i })

        fireEvent.change(input, {target: {value: 'pikachu'}})
        fireEvent.click(button);

      await waitFor(() => {
      expect(onResult).toHaveBeenCalledWith(mockData);
    });
    })

    it('should handle error if getData throws', async () => {
    const error = new Error('Network fail');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(service, 'getData').mockRejectedValue(error);

    const onResult = vi.fn();

    render(<SearchingBlock onResult={onResult} />);

    const input = screen.getByPlaceholderText(/please, enter/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'missingno' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(error);
      expect(onResult).not.toHaveBeenCalled();
    });
    expect(localStorage.getItem('words')).toBe('missingno');
    consoleSpy.mockRestore();
  });
})