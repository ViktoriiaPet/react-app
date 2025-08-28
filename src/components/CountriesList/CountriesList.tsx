import CountryRow from './CountryRow'
import { useCo2Data } from '../../hooks/useCo2Data'
import type { Co2Dataset } from '../../types/types'

type Props = {
  selectedColumns: string[]
}

function CountriesList({ selectedColumns }: Props) {
  const data: Co2Dataset | null = useCo2Data()

  if (!data) return <p>Loading CO2 data...</p>

  const countries = Object.keys(data)

  return (
    <div>
      {countries.map((name) => (
        <CountryRow
          key={name}
          name={name}
          country={data[name]}
          selectedColumns={selectedColumns}
        />
      ))}
    </div>
  )
}

export default CountriesList
