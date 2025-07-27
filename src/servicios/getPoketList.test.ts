import { vi } from 'vitest';
import { getData, setCachedPokemonList } from './getPokeList';

const mockList = [
  { name: 'bulbasaur', url: 'url1' },
  { name: 'ivysaur', url: 'url2' },
  { name: 'venusaur', url: 'url3' },
];

describe('getData', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

it('returns filtered cached results based on localStorage search word', async () => {
  localStorage.setItem('words', 'saur');
  setCachedPokemonList(mockList);

  const result = await getData(0, 2);

  expect(result?.results.length).toBe(2);
  expect(result?.results[0].name).toBe('bulbasaur');
  expect(result?.results[1].name).toBe('ivysaur');
  expect(result?.count).toBe(3);
});

  it('falls back to fetch when no cache or search word', async () => {
    const mockJson = { count: 1, results: [{ name: 'pikachu', url: 'url' }] };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockJson),
    }) as any;

    const result = await getData();

    expect(fetch).toHaveBeenCalled();
    expect(result).toEqual(mockJson);
  });

  it('logs error on fetch failure', async () => {
    const error = new Error('fail');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    global.fetch = vi.fn().mockRejectedValue(error) as any;

    await getData();
    expect(consoleSpy).toHaveBeenCalledWith('fail');
  });
});