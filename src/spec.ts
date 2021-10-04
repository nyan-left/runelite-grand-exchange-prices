/**
 * @property high - The high price.
 * @property highTime - The Unix timestamp when that transaction took place.
 * @property low - The low price.
 * @property lowTime - The Unix timestamp when that transaction took place.
 */
export type TransactionData = {
  high: number;
  highTime: number;
  low: number;
  lowTime: number;
};

/**
 * An item description.
 * @property examine - The examine text.
 * @property id - The id.
 * @property members - States if it's members-only.
 * @property lowalch - The low alch value.
 * @property limit - The Grand Exchange limit.
 * @property value - The value.
 * @property highalch - The high alch price.
 * @property icon - The icon location.
 * @property name - The name.
 */
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

/**
 * A full map data list.
 */
export type FullMap = {
  [key: string]: MapData;
};

/**
 * A list of properties of a timeseries data point.
 * @property avgHighPrice - The average high price.
 * @property highPriceVolume - The high price volume.
 * @property avgLowPrice - The average low price.
 * @property lowPriceVolume - The low price volume.
 * @property timestamp - The timestamp of the data.
 */
export interface TimeSeriesData {
  avgHighPrice: number | null;
  highPriceVolume: number;
  avgLowPrice: number | null;
  lowPriceVolume: number;
  timestamp: number;
}
