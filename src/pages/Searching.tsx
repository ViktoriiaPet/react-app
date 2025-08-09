import { useState, useEffect } from 'react';
import { SearchingBlock } from '../components/SearchBlock';
import { ShowScreen } from '../components/ShowBlock';
import {
  useSearchParams,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useGetAllPokemonListQuery } from '../servicios/getDetailPokemon';
import { useGetPokemonListQuery } from '../servicios/getDetailPokemon';

export type ResultType = PokemonData | PokeListResponse | null;

export interface PokemonData {
  name: string;
  id: number;
  weight: number;
  sprites: {
    front_default: string;
  };
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

export default function SearchPage() {
  const [result, setResult] = useState<ResultType>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const { name } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const limit = 20;
  const offset = (page - 1) * limit;
  const searchWord = localStorage.getItem('words')?.toLowerCase() || '';

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
    setSearchParams({ page: newPage.toString() });
  };

  const handleResult = (data: ResultType) => {
    setSearchParams({ page: '1' });
    setResult(data);
  };

  const handlePokemonClick = (name: string) => {
    const currentSearch = searchParams.toString();
    navigate(`${name}?${currentSearch}`);
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
        <h1>Welcome to the Main &apos;Pokemon&apos; page!</h1>
        <h3>
          You can try to enter names of pokemons (for example &quot;ditto&quot;,
          &quot;raichu&quot;, &quot;pikachu&quot;)
        </h3>
        {isLoading && <div className="load">Loading...</div>}
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
              Previous
            </button>
            <span style={{ margin: '0 10px' }}>Page {page}</span>
            <button
              className="button"
              disabled={page >= Math.ceil(result.count / limit)}
              onClick={() => goToPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {name && (
        <div>
          <button
            className="button"
            onClick={() =>
              navigate({ pathname: '/react-app/', search: location.search })
            }
            style={{
              marginLeft: '50%',
            }}
          >
            Close Detail Page
          </button>
          <div
            style={{
              flex: 1,
              borderLeft: '1px solid #ccc',
              padding: '1rem',
              marginLeft: '1rem',
            }}
          >
            <Outlet />
          </div>
        </div>
      )}
      {allError && (
        <div className="error-message">Error loading all pokemons</div>
      )}
      {pageError && (
        <div className="error-message">Error with getting page</div>
      )}
    </div>
  );
}
