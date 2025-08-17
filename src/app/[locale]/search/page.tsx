'use client';
import { useState, useEffect } from 'react';
import { SearchingBlock } from '../../../components/SearchBlock';
import { ShowScreen } from '../../../components/ShowBlock';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {
  useGetAllPokemonListQuery,
  useGetPokemonListQuery,
} from '../../../servicios/getDetailPokemon';
import { useTranslations } from 'next-intl';
import { getPokemons } from '../../lib/getData';
import { pokemonApi } from '../../../servicios/getDetailPokemon';

export type ResultType = PokemonData | PokeListResponse | null;

export interface PokemonData {
  name: string;
  id: number;
  weight: number;
  sprites: { front_default: string };
}

export interface PokemonShort {
  name: string;
  url: string;
}

export interface PokeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonShort[];
}
export default function Page() {
  const t = useTranslations();
  const [result, setResult] = useState<ResultType>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchInitial() {
      const serverData = await getPokemons(0, 20);
      setResult(serverData);

      pokemonApi.util.updateQueryData(
        'getPokemonList',
        { offset: 0, limit: 20 },
        (draft) => {
          Object.assign(draft, serverData);
        }
      );
    }

    fetchInitial();
  }, []);

  const page = Number(searchParams?.get('page') ?? '1');

  const limit = 20;
  const offset = (page - 1) * limit;
  const searchWord =
    (typeof window !== 'undefined'
      ? localStorage.getItem('words')
      : ''
    )?.toLowerCase() || '';

  const {
    data: pageData,
    isLoading: isPageLoading,
    error: pageError,
  } = useGetPokemonListQuery({ offset, limit }, { skip: !!searchWord });

  const {
    data: allData,
    isLoading: isAllLoading,
    error: allError,
  } = useGetAllPokemonListQuery(undefined, { skip: !searchWord });

  useEffect(() => {
    if (searchWord && allData) {
      const filtered = allData.results.filter((p) =>
        p.name.toLowerCase().includes(searchWord)
      );
      const paginated = filtered.slice(offset, offset + limit);
      setResult({
        count: filtered.length,
        next: null,
        previous: null,
        results: paginated,
      });
    } else if (!searchWord && pageData) {
      setResult(pageData);
    }
  }, [searchWord, allData, pageData, offset, limit]);

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleResult = (data: ResultType) => {
    const params = new URLSearchParams();
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
    setResult(data);
  };

  const handlePokemonClick = (pokemonName: string) => {
    const pathnameParts = pathname?.split('/');
    let locale;
    if (pathnameParts) {
      locale = pathnameParts[1] || 'en';
    }

    const params = new URLSearchParams(searchParams?.toString());
    const href = `/${locale}/search/${encodeURIComponent(pokemonName)}?${params.toString()}`;
    console.log('pokemonName type:', typeof pokemonName, pokemonName);
    console.log(href);
    router.push(href);
  };

  const isLoading = searchWord ? isAllLoading : isPageLoading;

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          flex: 1,
          paddingRight: '1rem',
          borderRight: '1px solid #ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1> {t('searchTitle')} </h1>
        <h3>{t('helpMessage')}</h3>

        {isLoading && <div className="load"> {t('load')}</div>}

        <SearchingBlock onResult={handleResult} />

        <ShowScreen
          result={result}
          onPokemonClick={handlePokemonClick}
          initialDetails={pageData?.results || []}
        />

        {result && 'count' in result && result.count > limit && (
          <div>
            <button
              className="button"
              disabled={page <= 1}
              onClick={() => goToPage(page - 1)}
            >
              {t('previous')}
            </button>
            <span style={{ margin: '0 10px' }}>
              {t('page')} {page}
            </span>
            <button
              className="button"
              disabled={page >= Math.ceil(result.count / limit)}
              onClick={() => goToPage(page + 1)}
            >
              {t('next')}
            </button>
          </div>
        )}
      </div>

      {allError && <div className="error-message">{t('ErrorAllPok')}</div>}
      {pageError && <div className="error-message">{t('ErrorGettPage')}</div>}
    </div>
  );
}
