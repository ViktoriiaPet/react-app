import fs from "fs";
const inputFile = "../public/owid-co2-data.json";
const outputFile = "owid-co2-data-trimmed.json";

const BASE_FIELDS = ["year", "population", "co2", "co2_per_capita"];
const EXTRA_FIELDS = [
  "methane",
  "oil_co2",
  "temperature_change_from_co2",
  "cement_co2",
  "flaring_co2",
];

const keepFields = [...BASE_FIELDS, ...EXTRA_FIELDS];

const raw = fs.readFileSync(inputFile, "utf-8");
const data = JSON.parse(raw);

const trimmedData = {};

for (const countryName in data) {
  const country = data[countryName];
  trimmedData[countryName] = {
    iso_code: country.iso_code,
    data: country.data.map((yearObj) => {
      const newObj = {};
      keepFields.forEach((field) => {
        if (field in yearObj) {
          newObj[field] = yearObj[field];
        }
      });
      return newObj;
    }),
  };
}

fs.writeFileSync(outputFile, JSON.stringify(trimmedData));
console.log("Trimmed JSON saved as", outputFile);
