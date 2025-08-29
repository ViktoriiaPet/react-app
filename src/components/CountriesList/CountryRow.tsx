import { useState, memo } from 'react'
import type { CountryData } from '../../types/types'
import CountryTable from './CountryTable'
import type { YearlyData } from '../../types/types'
import { useEffect } from 'react'

type Props = {
  name: string
  country: CountryData
  selectedColumns: string[]
  yearData?: YearlyData
}

const CountryRow = memo(({ name, country, selectedColumns, yearData }: Props) => {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(false)

   useEffect(() => {
    if (!yearData) return
    setHighlight(true)
    const timer = setTimeout(() => setHighlight(false), 1000)
    return () => clearTimeout(timer)
  }, [yearData])
 console.log(yearData)

  return (
    <div style={{ borderBottom: '1px solid #ddd', padding: '5px 0' }}>
      <div
        style={{ cursor: 'pointer',
          display: 'flex',
          width:'100%',
          justifyContent:'space-between',
        borderBottom: '1px solid #ddd',
        padding: '5px 0',
        backgroundColor: highlight ? 'yellow' : 'transparent',
        transition: 'background-color 0.5s' }}
        
        onClick={() => setOpen((prev) => !prev)}
      >
        <button><strong>{name}</strong></button>
        {country.iso_code ? 
        <div> {country.iso_code} </div>: '' }
        {yearData?.population ? <div> {yearData?.population.toLocaleString()} </div> : <div>'N/A'</div>}
      </div>
      {open && (
        <CountryTable yearlyData={country.data} selectedColumns={selectedColumns} />
      )}
    </div>
  )
})

export default CountryRow
