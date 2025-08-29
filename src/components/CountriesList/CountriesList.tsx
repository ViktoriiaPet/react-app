import CountryRow from './CountryRow'
import { useCo2Data } from '../../hooks/useCo2Data'
import type { Co2Dataset } from '../../types/types'

type Props = {
  selectedColumns: string[]
  selectedYear: number
}

function CountriesList({ selectedColumns, selectedYear }: Props) {
  const data: Co2Dataset | null = useCo2Data()

  if (!data) return <p>Loading CO2 data...</p>

  const countries = Object.keys(data)

  return (
    <div>
      {countries.map((name) => {
        const country = data[name]

        const yearData = country.data.find((d) => d.year === selectedYear)

        return (
          <CountryRow
            key={name}
            name={name}
            country={country}
            yearData={yearData}
            selectedColumns={selectedColumns}
          />
        )
      })}
    </div>
  )
}

export default CountriesList
