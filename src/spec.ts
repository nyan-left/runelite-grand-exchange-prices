// {"4151":{"high":1847441,"highTime":1633298350,"low":1844570,"lowTime":1633298371}}
export type TransactionData = {
  high: number;
  highTime: number;
  low: number;
  lowTime: number;
};

export type MapData = {
  examine: string;
  id: number;
  members: boolean;
  lowalch?: number;
  limit?: number;
  value: number;
  highalch?: number;
  icon: string;
  name: string;
};

export type FullMap = {
  [key: string]: MapData;
};

export interface TimeSeriesData {
  avgHighPrice: number | null;
  highPriceVolume: number;
  avgLowPrice: number | null;
  lowPriceVolume: number;
  timestamp: number;
}
