import { useState, useEffect } from 'react'
import type { Co2Dataset } from '../types/types'

export function useCo2Data() {
  const [data, setData] = useState<Co2Dataset | null>(null)

  useEffect(() => {
    fetch('/owid-co2-data-trimmed.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Failed to load CO2 data', err))
  }, [])

  return data
}
