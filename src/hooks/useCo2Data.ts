import type { Co2Dataset } from "../types/types";

let co2Promise: Promise<Co2Dataset> | null = null;
let co2Cache: Co2Dataset | null = null;

export function fetchCo2Data(): Co2Dataset {
  if (co2Cache) return co2Cache;

  if (!co2Promise) {
    co2Promise = fetch("/owid-co2-data-trimmed.json")
      .then((res) => res.json())
      .then((json: Co2Dataset) => {
        co2Cache = json;
        return json;
      });
  }

  throw co2Promise;
}

export function useCo2Data(): Co2Dataset {
  return fetchCo2Data();
}
