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
import { getData } from '../servicios/getPokeList';

type ResultType = PokemonData | PokeListResponse | null;

interface PokemonData {
  name: string;
  id: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

interface PokemonShort {
  name: string;
  url: string;
}

interface PokeListResponse {
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

  useEffect(() => {
    const load = async () => {
      const data = await getData(offset, limit);
      setResult(data);
    };
    load();
  }, [offset]);

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

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{ flex: 1, paddingRight: '1rem', borderRight: '1px solid #ccc' }}
      >
        <h1>Welcome to the Main &apos;Pokemon&apos; page!</h1>
        <h3>
          You can try to enter names of pokemons (for example &quot;ditto&quot;,
          &quot;raichu&quot;, &quot;pikachu&quot;)
        </h3>

        <SearchingBlock onResult={handleResult} />

        <ShowScreen result={result} onPokemonClick={handlePokemonClick} />

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
    </div>
  );
}
