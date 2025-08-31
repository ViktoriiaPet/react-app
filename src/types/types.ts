export type YearlyData = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  [key: string]: number | string | undefined;
};

export type CountryData = {
  iso_code?: string;
  data: YearlyData[];
};

export type Co2Dataset = {
  [countryName: string]: CountryData;
};
