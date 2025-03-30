export interface Bond {
    region: string;
    country: string;
    maturity: string;

    yield_rate: number;
    price_change_day: number;

    percentage_week: number;
    percentage_month: number;
    percentage_year: number;

    date: string; // ISO format (e.g., "2024-03-28")
    last_updated: string;
  }
