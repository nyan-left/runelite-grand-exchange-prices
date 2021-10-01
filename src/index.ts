import axios from "axios";

export const latest = async (): Promise<string> =>
  (await axios.get("https://prices.runescape.wiki/api/v1/osrs/latest")).data.data;

export const id = async (id: number): Promise<string> =>
  (await axios.get(`https://prices.runescape.wiki/api/v1/osrs/latest?id=${id}`)).data.data;
