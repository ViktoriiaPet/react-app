import { memo } from 'react'
import type { YearlyData } from '../../types/types'

type Props = {
  yearlyData: YearlyData[]
  selectedColumns: string[]
}

const CountryTable = memo(({ yearlyData, selectedColumns }: Props) => {
  const baseColumns = ['year', 'population', 'co2', 'co2_per_capita']
  const columns = [...baseColumns, ...selectedColumns]

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '5px' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              style={{ border: '1px solid #ccc', padding: '2px 5px', textAlign: 'left' }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {yearlyData.map((row) => (
          <tr key={row.year}>
            {columns.map((col) => (
              <td key={col} style={{ border: '1px solid #eee', padding: '2px 5px' }}>
                {row[col] ?? 'N/A'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
})

export default CountryTable
