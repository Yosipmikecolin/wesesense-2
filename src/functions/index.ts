import { v4 as uuidv4 } from "uuid";

export const getDate = (date?: Date): string => {
  const hoy = date ?? new Date();

  const year = hoy.getFullYear();
  const month = String(hoy.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0
  const day = String(hoy.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
};

export const generateUUID = (): string => {
  return uuidv4();
};

type CountryCodeMap = Record<string, string>;

const countryCodeMap: CountryCodeMap = {
  // América
  argentina: "AR",
  bolivia: "BO",
  brasil: "BR",
  canadá: "CA",
  canada: "CA",
  chile: "CL",
  colombia: "CO",
  "costa rica": "CR",
  cuba: "CU",
  dominicana: "DO",
  ecuador: "EC",
  "el salvador": "SV",
  "estados unidos": "US",
  guatemala: "GT",
  haití: "HT",
  honduras: "HN",
  jamaica: "JM",
  méxico: "MX",
  mexico: "MX",
  nicaragua: "NI",
  panamá: "PA",
  paraguay: "PY",
  perú: "PE",
  peru: "PE",
  "puerto rico": "PR",
  uruguay: "UY",
  venezuela: "VE",

  // Europa
  alemania: "DE",
  austria: "AT",
  bélgica: "BE",
  belgica: "BE",
  croacia: "HR",
  dinamarca: "DK",
  españa: "ES",
  espana: "ES",
  finlandia: "FI",
  francia: "FR",
  grecia: "GR",
  hungría: "HU",
  hungria: "HU",
  irlanda: "IE",
  italia: "IT",
  noruega: "NO",
  "países bajos": "NL",
  "paises bajos": "NL",
  polonia: "PL",
  portugal: "PT",
  "reino unido": "GB",
  "república checa": "CZ",
  "republica checa": "CZ",
  rumanía: "RO",
  rumania: "RO",
  rusia: "RU",
  serbia: "RS",
  suecia: "SE",
  suiza: "CH",
  ucrania: "UA",
};

export function getCountryCode(countryName: string): string {
  const normalized = countryName.trim().toLowerCase();
  return countryCodeMap[normalized] ?? "";
}
