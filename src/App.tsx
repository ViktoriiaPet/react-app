import { useState } from 'react'
import CountriesList from './components/CountriesList/CountriesList'
import ColumnsModal from './components/ColumnsModal/columnModal'
import YearSelector from './components/Selectors/YearSelector'

function App() {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
const [selectedYear, setSelectedYear] = useState<number>(2000)

  return (
    <div style={{ padding: '10px' }}>
      <h1>🌍 CO2 Emissions App</h1>

      <ColumnsModal
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />
      <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
      <CountriesList selectedColumns={selectedColumns} selectedYear={selectedYear} />
    </div>
  )
}

export default App
