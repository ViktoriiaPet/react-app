import { useState } from 'react'
import ColumnsModal from './components/ColumnsModal/columnModal'
import YearSelector from './components/Selectors/YearSelector'
import CountriesTable from './components/CountriesList/CountryTable'
import { Suspense } from 'react'

function App() {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<number>(2000)
  const [search, setSearch] = useState<string>('')

  return (
    <div style={{ padding: '10px' }}>
      <h1>CO2 Emissions App</h1>

      <ColumnsModal
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />

      <YearSelector
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />

      <div style={{ margin: '10px 0' }}>
        <input
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '5px', width: '200px' }}
        />
      </div>
      <Suspense fallback={<div>Loading CO2 data…Sus</div>}>
      <CountriesTable
        selectedColumns={selectedColumns}
        selectedYear={selectedYear}
        search={search}
      />
      </Suspense>
    </div>
  )
}

export default App
