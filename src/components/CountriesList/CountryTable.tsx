import { useCo2Data } from '../../hooks/useCo2Data'
import type { Co2Dataset, YearlyData } from '../../types/types'
import { useState } from 'react'
import { useEffect,useRef  } from 'react'

type Props = {
  selectedColumns: string[]
  selectedYear: number
  search: string
}

export default function CountriesTable({ selectedColumns, selectedYear, search }: Props) {
  const data: Co2Dataset = useCo2Data()
  
  const [sortBy, setSortBy] = useState<'name' | 'population'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const [highlightRows, setHighlightRows] = useState<string[]>([])

   const prevYearDataRef = useRef<Record<string, YearlyData | null>>({})


 const countries = data ? Object.keys(data).filter(name => name.toLowerCase().includes(search.toLowerCase())) : []


  useEffect(() => {
    const updatedRows: string[] = []

    countries.forEach(name => {
      const country = data[name]
      const yearData = country.data.find(d => d.year === selectedYear)
      if (!yearData) return

      const prevData = prevYearDataRef.current[name]
      const fieldsToCheck = [...baseColumns.slice(3), ...selectedColumns]
      const changed = fieldsToCheck.some(field => yearData[field as keyof YearlyData] !== prevData?.[field as keyof YearlyData])
      if (changed) updatedRows.push(name)

      prevYearDataRef.current[name] = yearData
    })

    setHighlightRows(updatedRows)
    const timer = setTimeout(() => setHighlightRows([]), 1000)
    return () => clearTimeout(timer)
  }, [selectedYear, data, selectedColumns])

    function handleSort(column: 'name' | 'population') {
  if (sortBy === column) {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  } else {
    setSortBy(column)
    setSortOrder('asc')
  }
}


const sortedCountries = [...countries].sort((aName, bName) => {
  const a = data[aName]?.data.find(d => d.year === selectedYear)
  const b = data[bName]?.data.find(d => d.year === selectedYear)
  if (!a || !b) return 0

  if (sortBy === 'name') {
    return sortOrder === 'asc'
      ? aName.localeCompare(bName)
      : bName.localeCompare(aName)
  } else if (sortBy === 'population') {
    const aPop = a.population ?? 0
    const bPop = b.population ?? 0
    return sortOrder === 'asc' ? aPop - bPop : bPop - aPop
  }
  return 0
})




  const baseColumns = ['country', 'iso_code', 'year', 'population', 'co2', 'co2_per_capita']
  const columns = [...baseColumns, ...selectedColumns]

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
      <thead>
        <tr>
        <th onClick={() => handleSort('name')}><button>Sort by country name</button></th>
        
       <th onClick={() => handleSort('population')}><button>Sort by population</button></th>
       </tr>
        <tr>
          {columns.map(col => (
            <th key={col} style={{ border: '1px solid #ccc', padding: '5px' }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedCountries.map(name => {
          const country = data[name]
          const yearData = country.data.find(d => d.year === selectedYear)
          if (!yearData) return null
          const highlightClass = highlightRows.includes(name) ? 'highlight' : ''
          return (
            <tr key={name} className={highlightClass}>
              <td>{name}</td>
              <td>{country.iso_code ?? 'N/A'}</td>
              <td>{yearData.year}</td>
              <td>{yearData.population?.toLocaleString() ?? 'N/A'}</td>
              <td>{yearData.co2 ?? 'N/A'}</td>
              <td>{yearData.co2_per_capita ?? 'N/A'}</td>
              {selectedColumns.map(col => (
                <td key={col}>{yearData[col as keyof typeof yearData] ?? 'N/A'}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
