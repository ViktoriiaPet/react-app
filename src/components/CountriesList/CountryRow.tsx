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
        style={{ cursor: 'pointer', display: 'flex', width:'100%', justifyContent:'space-between' }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <button><strong>{name}</strong></button>
        {country.iso_code ? 
        <div> {country.iso_code} </div>: '' }
        {latest?.population ? <div> {latest.population.toLocaleString()} </div> : <div>'N/A'</div>}
      </div>
      {open && (
        <CountryTable yearlyData={country.data} selectedColumns={selectedColumns} />
      )}
    </div>
  )
})

export default CountryRow
