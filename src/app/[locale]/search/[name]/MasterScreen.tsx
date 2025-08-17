'use client';
import { useGetPokemonByNameQuery } from '../../../../servicios/getDetailPokemon';
import { useTranslations } from 'next-intl';

export interface PokemonDetail {
  name: string;
  id: number;
  weight: number;
  height: number;
  sprites: { front_default: string };
}

export function MasterPage({ name }: { name: string }) {
  const t = useTranslations();
  const { data, isError, isLoading } = useGetPokemonByNameQuery(name);

  if (isLoading) return <div className="load">{t('load')}</div>;
  if (isError) return <div className="error-message">{t('ErrorAllPok')}</div>;
  if (!data) return <p>{t('notAvailable')}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{t('detail')}</h2>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>
        {t('name')}: {data.name}
      </p>
      <p>
        {t('height')}: {data.height}
      </p>
      <p>
        {t('weight')}: {data.weight}
      </p>
    </div>
  );
}
