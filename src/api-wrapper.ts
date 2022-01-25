/* eslint-disable no-restricted-syntax */
import axios from "axios";
import * as Types from "./spec";

const UAstart = "npm runelite-grand-exchange-prices | -";

/**
 * Get the latest high and low prices for the items that we have data for,
 * and the Unix timestamp when that transaction took place
 * @param useragent - (required) a User-Agent that describes what you're using it for,
 * and if you're willing, some sort of contact info (like an email or Discord).
 * @param id - (optional) Item ID. If provided, will only display the latest price for this item.
 * @returns An associative array object.
 * @see https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices
 */
export const latest = async (options: { id?: number; useragent: string }): Promise<Types.FullTransactionData> => {
  const { id, useragent } = options || {};
  if (!useragent) throw new Error("useragent is required");

  const url = id ? `https://prices.runescape.wiki/api/v1/osrs/latest?id=${id}` : `https://prices.runescape.wiki/api/v1/osrs/latest`;

  const response = (
    await axios.get<{ data: any }>(url, {
      headers: { "User-Agent": `${UAstart} | ${useragent}` },
    })
  ).data.data;

  return response;
};

// Mapping does not need to be updated often, so we can cache it.
const mappingCache: Types.FullMap = {};

/**
 * Gives a list of objects containing the name,
 * id, examine text, members status, lowalch, highalch,
 * GE buy limit, icon file name (on the wiki).
 *
 * The mapping is not updated often, so it is cached.
 * @param useragent - (required) a User-Agent that describes what you're using it for,
 * and if you're willing, some sort of contact info (like an email or Discord).
 * @returns An associative array object.
 * @see https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices
 */
export const mapping = async (options: { useragent: string }): Promise<Types.FullMap> => {
  const { useragent } = options || {};
  if (!useragent) throw new Error("useragent is required");

  const cached = Object.keys(mappingCache).length > 0;
  const url = "https://prices.runescape.wiki/api/v1/osrs/mapping";

  if (!cached) {
    const response = (
      await axios.get(url, {
        headers: { "User-Agent": `${UAstart} | ${useragent}` },
      })
    ).data as Types.MapData[];
    response.forEach((item) => {
      mappingCache[item.id] = item;
    });
  }

  return mappingCache;
};

/**
 * Gives 5 or 60 minute average of item high and low prices as well as the number traded
 * for the items that we have data on. Comes with a Unix timestamp indicating the 5 or 60 minute
 * block the data is from.
 * @param interval - (optional) Either "5m" or "60m". Defaults to "5m".
 * @param useragent - (required) a User-Agent that describes what you're using it for,
 * and if you're willing, some sort of contact info (like an email or Discord).
 * @param timestamp - (optional) Timestep to return prices for.
 * If provided, will display 5-minute averages for all items we have data on for this time.
 * The timestamp field represents the beginning of the 5-minute period being averaged
 * @returns An associative array object.
 * @see https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices
 */
export const prices = async (options: {
  interval?: "5m" | "1h";
  timestamp?: number | string;
  useragent: string;
}): Promise<Types.TimeSeriesData> => {
  const { timestamp, useragent } = options || {};
  let { interval } = options || {};
  if (!useragent) throw new Error("useragent is required");
  if (interval) interval.toLowerCase();

  if (interval !== "5m" && interval !== "1h")
    console.error("interval must be '5m' or '1h'. Falling back to 5min, in future, this will be an error.");
  interval = interval ?? "5m";

  const url = timestamp
    ? `https://prices.runescape.wiki/api/v1/osrs/${interval}?timestamp=${timestamp}`
    : `https://prices.runescape.wiki/api/v1/osrs/${interval}`;

  const response = (
    await axios.get<{ data: any } & { timestamp: number }>(url, {
      headers: { "User-Agent": `${UAstart} | ${useragent}` },
    })
  ).data;
  Object.keys(response.data).forEach((key) => {
    (response as any).data[key].timestamp = response.timestamp;
  });

  return response.data;
};

/**
 * This method has been deprecated. Use prices(), specifying a `interval` of `5m` or `1h` instead.
 */
export const prices5Min = async (options: { timestamp?: number | string; useragent: string }): Promise<Types.TimeSeriesData> => {
  throw new Error("prices5Min is deprecated. Use prices({timestamp: '5m'}) instead.");
};

/**
 * This method has been deprecated. Use prices(), specifying a `interval` of `5m` or `1h` instead.
 */
export const prices1Hour = async (options: { timestamp?: number | string; useragent: string }): Promise<Types.TimeSeriesData> => {
  throw new Error("prices1Hour is deprecated. Use prices({timestamp: '1h'}) instead.");
};

/**
 * Gives a list of the high and low prices of item with the given id at the given interval, up to 300 maximum.
 * @param useragent - (required) a User-Agent that describes what you're using it for,
 * and if you're willing, some sort of contact info (like an email or Discord).
 * @param id - (required) Item id to return a time-series for.
 * @param timestep - (required) Timestep of the time-series. Valid options are "5m", "1h" and "6h".
 * @returns A timeseries array.
 * @see https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices
 */
export const timeseries = async (options: {
  timestep: "5m" | "1h" | "6h";
  id: number | string;
  useragent: string;
}): Promise<Types.TimeSeriesDataPoint[]> => {
  const { timestep, id, useragent } = options || {};
  if (!useragent) throw new Error("useragent is required");

  const url = `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${timestep}&id=${id}`;

  const response = (
    await axios.get<{ data: any }>(url, {
      headers: { "User-Agent": `${UAstart} | ${useragent}` },
    })
  ).data;

  return response.data[id] ?? response.data;
};
