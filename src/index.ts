import axios from "axios";

export const latest = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://prices.runescape.wiki/api/v1/osrs/latest")
      .then((res) => resolve(res.data.data))
      .catch((err) => reject(err));
  });
};

export const id = async (id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://prices.runescape.wiki/api/v1/osrs/latest?id=${id}`)
      .then((res) => resolve(res.data.data))
      .catch((err) => reject(err));
  });
};
