import { MasterPage } from './MasterScreen';

export default async function PokemonDetail({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  return <MasterPage name={name} />;
}
