export interface Bond {
  region: string;
  country: string;
  maturity: string;
  yield_rate: number;
  price_change_day: number;
  percentage_week: number;
  percentage_month: number;
  percentage_year: number;
  last_updated: string;
}

export interface RawBond {
  region: string;
  country: string;
  maturity: string;
  yield_rate: string;
  price_change_day: string;
  percentage_week: string;
  percentage_month: string;
  percentage_year: string;
  last_updated: string;
}
