import { useState } from 'react'
import CountriesList from './components/CountriesList/CountriesList'
import ColumnsModal from './components/ColumnsModal/columnModal'

function App() {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])

  return (
    <div style={{ padding: '10px' }}>
      <h1>🌍 CO2 Emissions App</h1>

      <ColumnsModal
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />

      <CountriesList selectedColumns={selectedColumns} />
    </div>
  )
}

export default App
