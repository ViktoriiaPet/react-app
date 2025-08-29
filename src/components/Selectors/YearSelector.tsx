type Props = {
  selectedYear: number
  onYearChange: (year: number) => void
}

export default function YearSelector({ selectedYear, onYearChange }: Props) {
  const years = Array.from({ length: 2020 - 1750 + 1 }, (_, i) => 1750 + i)

  return (
    <div className="flex items-center gap-2 mb-4">
      <label className="font-medium">Select year:</label>
      <select
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="border rounded p-1"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}
