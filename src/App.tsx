import { useState } from "react";
import ColumnsModal from "./components/ColumnsModal/columnModal";
import YearSelector from "./components/Selectors/YearSelector";
import CountriesTable from "./components/CountriesList/CountryTable";
import { Suspense } from "react";
import { useCallback } from "react";

function App() {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2000);
  const [search, setSearch] = useState<string>("");

  const handleColumnsChange = useCallback((cols: string[]) => {
    setSelectedColumns(cols);
  }, []);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [],
  );

  return (
    <div style={{ padding: "10px" }}>
      <h1>CO2 Emissions App</h1>

      <ColumnsModal
        selectedColumns={selectedColumns}
        setSelectedColumns={handleColumnsChange}
      />

      <YearSelector
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />

      <div style={{ margin: "10px 0" }}>
        <input
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={handleSearchChange}
          style={{ padding: "5px", width: "200px" }}
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
  );
}

export default App;
