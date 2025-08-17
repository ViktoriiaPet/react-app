import { NextResponse } from 'next/server';
import { PokemonData } from '../../../components/ShowBlock';

type CsvRequestBody = {
  pokemons: PokemonData[];
};

export async function POST(req: Request) {
  const body = (await req.json()) as CsvRequestBody;
  const pokemons = body.pokemons;

  if (pokemons.length === 0) {
    return new Response('No data', { status: 400 });
  }

  const headers = ['id', 'name', 'weight', 'sprite'];
  const rows = pokemons.map((p) =>
    [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      p.weight,
      `"${p.sprites?.front_default || ''}"`,
    ].join(',')
  );

  const csv = [headers.join(','), ...rows].join('\r\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="pokemons_${pokemons.length}.csv"`,
    },
  });
}
