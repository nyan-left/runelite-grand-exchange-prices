/* eslint-disable no-restricted-syntax */
import axios from "axios";
import { TransactionData, FullMap, MapData } from "./spec";

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
