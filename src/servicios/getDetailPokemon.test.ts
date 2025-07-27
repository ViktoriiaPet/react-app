import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDetailPokemon } from '../servicios/getDetailPokemon';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('getDetailPokemon', () => {
  it('returns pokemon data when fetch succeeds', async () => {
    const mockData = {
      name: 'pikachu',
      id: 25,
      height: 4,
      weight: 60,
      sprites: {
        front_default: 'https://example.com/pikachu.png',
      },
    };

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await getDetailPokemon('pikachu');

    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(result).toEqual(mockData);
  });

  it('logs error when response is not ok', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    const result = await getDetailPokemon('unknown');
    expect(result).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Response status: 404');
  });

  it('logs unknown error if fetch throws non-Error', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi.fn().mockRejectedValueOnce('boom');

    const result = await getDetailPokemon('crashmon');
    expect(result).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Unknown error', 'boom');
  });
});
