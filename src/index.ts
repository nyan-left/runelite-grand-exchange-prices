/* eslint-disable no-restricted-syntax */
import axios from "axios";
import { TransactionData, FullMap, MapData, Min5Data, Min5Datum } from "./spec";

/**
 * Get the latest high and low prices for the items that we have data for,
 * and the Unix timestamp when that transaction took place
 * @param id - (optional) Item ID. If provided, will only display the latest price for this item.
 * @returns An unsorted array (if no id is provided) or a single object (if an id is provided).
 * @see https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices
 */
export const latest = async (id?: number): Promise<TransactionData | TransactionData[]> => {
  const url = id
    ? `https://prices.runescape.wiki/api/v1/osrs/latest?id=${id}`
    : `https://prices.runescape.wiki/api/v1/osrs/latest`;

  const response = (await axios.get(url)).data.data;
  return response[id] ?? response;
};

// Mapping does not need to be updated often, so we can cache it.
const mappingCache: FullMap = {};

/**
 * Gives a list of objects containing the name,
 * id, examine text, members status, lowalch, highalch,
 * GE buy limit, icon file name (on the wiki).
 *
 * The mapping is not updated often, so it is cached.
 * @param id - (optional) Item ID. If provided, will only display the map for this item.
 * @returns An associative array object (if no id is provided) or a single object (if an id is provided).
 * @see https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices
 */
export const mapping = async (id?: number): Promise<FullMap | MapData> => {
  const cached = Object.keys(mappingCache).length > 0;

  if (!cached) {
    const response = (await axios.get("https://prices.runescape.wiki/api/v1/osrs/mapping")).data as MapData[];
    response.forEach((item) => {
      mappingCache[item.id] = item;
    });
  }

  return mappingCache[id] ?? mappingCache;
};

/**
 * Gives 5-minute average of item high and low prices as well as the number traded
 * for the items that we have data on. Comes with a Unix timestamp indicating the 5 minute
 * block the data is from.
 * @returns An associative array object (if no id is provided) or a single object (if an id is provided).
 * @see https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices
 */
export const min5 = async (options?: { timestamp?: number | string; id?: number | string }): Promise<Min5Data> => {
  const { timestamp, id } = options;
  const url = timestamp
    ? `https://prices.runescape.wiki/api/v1/osrs/5m?timestamp=${timestamp}`
    : `https://prices.runescape.wiki/api/v1/osrs/5m`;

  const response = (await axios.get(url)).data as Min5Data;

  (Object.keys(response.data) as (keyof Min5Data)[]).forEach((key) => {
    response.data[key].timestamp = response.timestamp;
  });

  return response.data[id] ?? response.data;
};
