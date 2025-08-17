'use client';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLikedIds } from '../features/LikedSlice';
import { toggleLike, deleteAllLikedPokemons } from '../features/LikedSlice';
import { downloadSelectedPokemons } from '../servicios/downloadedSelected';
import type { AppDispatch } from '../app-hook/store';
import { useGetPokemonBatchQuery } from '../servicios/getDetailPokemon';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export interface PokemonData {
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

interface ShowScreenProps {
  result: ResultType;
  onPokemonClick?: (name: string) => void;
  initialDetails?: PokemonShort[];
}

type ResultType = PokemonData | PokeListResponse | null;

export function ShowScreen({ result, onPokemonClick }: ShowScreenProps) {
  const t = useTranslations();
  const selectPokemons = useSelector(selectLikedIds);
  const dispatch = useDispatch<AppDispatch>();

  const isListResponse = (res: ResultType): res is PokeListResponse => {
    return res !== null && 'results' in res && Array.isArray(res.results);
  };

  const pokemonNames = useMemo(() => {
    if (!isListResponse(result)) return [];
    return result.results.map((p) => p.name);
  }, [result]);

  const {
    data: pokemonDetails,
    isLoading,
    isError,
  } = useGetPokemonBatchQuery(pokemonNames, { skip: !isListResponse(result) });

  const detailedList = useMemo(
    () =>
      pokemonDetails?.map((detail) => ({
        name: detail.name,
        id: detail.id,
        weight: detail.weight,
        sprites: { front_default: detail.sprites.front_default },
      })) || [],
    [pokemonDetails]
  );

  const handleClickToLike = (id: number) => {
    if (selectPokemons.includes(id)) {
      dispatch(toggleLike(id));
      console.log(id);
    } else {
      dispatch(toggleLike(id));
    }
  };
  const handleDownload = () => {
    dispatch(downloadSelectedPokemons(selectPokemons));
  };
  if (!result) {
    return (
      <div className="granPantalla">
        <h2> {t('yourResult')}</h2>
        <div className="showPantalla">
          <p>{t('showHere')}</p>
        </div>
      </div>
    );
  }

  if (isListResponse(result)) {
    return (
      <div className="granPantalla">
        {isError && <div className="error-message">{t('ErrorAllPok')} </div>}
        <div className="showPantalla">
          <h2> {t('pokeList')}</h2>
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2vw',
            }}
          >
            {isLoading && <div className="load">{t('load')}</div>}
            {detailedList.map((pokemon) => (
              <li
                key={pokemon.id}
                style={{
                  cursor: 'pointer',
                  listStyleType: 'none',
                }}
                className="card"
              >
                <div
                  id={pokemon.name}
                  onClick={() => onPokemonClick?.(pokemon.name)}
                  style={{
                    border: 'black, dotted, 1px',
                    borderRadius: '16px',
                    padding: '1vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <strong>{pokemon.name}</strong>{' '}
                  {pokemon.sprites.front_default && (
                    <div
                      style={{
                        position: 'relative',
                        width: '10vw',
                        height: '10vw',
                        borderRadius: '16px',
                        padding: '0.2vw',
                      }}
                    >
                      <Image
                        src={pokemon.sprites.front_default}
                        alt="pokemon"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </div>
                <div onClick={() => handleClickToLike(pokemon.id)}>
                  {selectPokemons.includes(pokemon.id) ? (
                    <div
                      style={{
                        position: 'relative',
                        width: '2vw',
                        height: '2vw',
                        borderRadius: '16px',
                        padding: '0.2vw',
                      }}
                    >
                      <Image
                        src="/vacio.png"
                        alt="empty heart"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        position: 'relative',
                        width: '2vw',
                        height: '2vw',
                        borderRadius: '16px',
                        padding: '0.2vw',
                      }}
                    >
                      <Image
                        src="/lleno.png"
                        alt="lleno heart"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {selectPokemons.length > 0 && (
          <div className="selectedBlock">
            <p>
              {t('selected')}
              {selectPokemons.length}
            </p>
            <div
              style={{
                display: 'flex',
                gap: '1vw',
              }}
            >
              <button
                className="button"
                onClick={() => {
                  dispatch(deleteAllLikedPokemons());
                }}
              >
                {t('reject')}
              </button>
              <button
                className="button"
                onClick={() => {
                  handleDownload();
                }}
              >
                {t('download')}
              </button>
            </div>
            <div></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="granPantalla">
      <h2>{t('yourResult')}</h2>
      <div className="showPantalla">
        <p> {t('notAvailable')}</p>
      </div>
    </div>
  );
}
