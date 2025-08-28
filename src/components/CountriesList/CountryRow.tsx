import { useState, memo } from 'react'
import type { CountryData } from '../../types/types'
import CountryTable from './CountryTable'

type Props = {
  name: string
  country: CountryData
  selectedColumns: string[]
}

const CountryRow = memo(({ name, country, selectedColumns }: Props) => {
  const [open, setOpen] = useState(false)

  const latest = country.data[country.data.length - 1]

  return (
    <div style={{ borderBottom: '1px solid #ddd', padding: '5px 0' }}>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <strong>{name}</strong>
        {country.iso_code ? ` (${country.iso_code})` : ''} —{' '}
        {latest?.population ? latest.population.toLocaleString() : 'N/A'}
      </div>
      {open && (
        <CountryTable yearlyData={country.data} selectedColumns={selectedColumns} />
      )}
    </div>
  )
})

export default CountryRow
