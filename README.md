# runelite-ge-prices

This is a typed wrapper of real-time grand exchange prices, brought to you by a partnership between [RuneLite](https://runelite.net/) and the [RuneScape wiki](https://oldschool.runescape.wiki/) team. Please be aware that this is a fairly new project, and the endpoints may have downtime, and the prices may not be 100% accurate. Read more [here](https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices).

[![Build](https://github.com/nyan-left/runelite-grand-exchange-prices/actions/workflows/test.yml/badge.svg)](https://github.com/nyan-left/runelite-grand-exchange-prices/actions/workflows/test.yml)

## Acceptable use policy

The wiki team reserve the right to limit access to anyone, if their usage is so frequent that it threatens the stability of the entire runeliteAPI. Please read the acceptable use policy [acceptable use policy](https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices#Acceptable_use_policy) on the wiki.

To ensure this package complies with the use policy, all requests must specify a meaningful user agent.

## Table of contents

<!--ts-->
   * [runelite-ge-prices](#runelite-ge-prices)
      * [Acceptable use policy](#acceptable-use-policy)
      * [Table of contents](#table-of-contents)
      * [Installing](#installing)
      * [Importing the package](#importing-the-package)
         * [Using import](#using-import)
         * [Using require](#using-require)
      * [Usage](#usage)
         * [Latest Price](#latest-price)
         * [Mapping](#mapping)
         * [5 Minute Prices](#5-minute-prices)
         * [1 Hour Prices](#1-hour-prices)
         * [Time-series](#time-series)
      * [license](#license)

<!-- Added by: deim, at: Wed 20 Oct 2021 01:45:37 BST -->

<!--te-->

## Installing

```bash
npm install runelite-ge-prices
```

## Importing the package

### Using import

```ts
import * as runeliteAPI from 'runelite-ge-prices';
```

### Using require

```js
const runeliteAPI = require('runelite-ge-prices');
```

## Usage

### Latest Price

Get the latest high and low prices for the items that we have data for, and the Unix timestamp when that transaction took place.

```ts

const useragent = "https://www.npmjs.com/package/runelite-ge-prices useragent/example";
// Ensure you're using a meaningful useragent to represent your use-case.

const latest = await runeliteAPI.latest({
    useragent,
});

console.log(latest)

/* output
{
  ...,
  '25833': { high: 800, highTime: 1633541890, low: 400, lowTime: 1633564731 },
  '25849': { high: 330, highTime: 1633570020, low: 320, lowTime: 1633569964 },
  '25855': { high: 483, highTime: 1633549599, low: 45300, lowTime: 1633549707 },
  '25857': { high: 1800, highTime: 1633548698, low: 642, lowTime: 1633545181 },
  ...
}
*/

console.log(latest["25849"]);

/* output
{
  high: 330, highTime: 1633570020, low: 320, lowTime: 1633569964
}
*/

```

You may also request specific items:

```ts
const latest = await runeliteAPI.latest({ id: 4151, useragent });
const transaction = request["4151"];

console.log(transaction);

/* output
{
  high: 1761642,
  highTime: 1633570221,
  low: 1760000,
  lowTime: 1633570184
}
*/

```

### Mapping

Gives a list of objects containing the name, id, examine text, members status, lowalch, highalch, GE buy limit, icon file name (on the wiki).


```ts
const mapping = await runeliteAPI.mapping({ useragent });
console.log(mapping);

/* output
{
  ...,
  '25034': {
      examine: 'The trousers of a trailblazer relic hunter.',
      id: 25034,
      members: true,
      lowalch: 6000,
      limit: 5,
      value: 15000,
      highalch: 9000,
      icon: 'Trailblazer trousers (t1).png',
      name: 'Trailblazer trousers (t1)'
    },
  '25037': {
      examine: 'The boots of a trailblazer relic hunter.',
      id: 25037,
      members: true,
      lowalch: 6000,
      limit: 5,
      value: 15000,
      highalch: 9000,
      icon: 'Trailblazer boots (t1).png',
      name: 'Trailblazer boots (t1)'
    }, ...
}
*/

console.log(mapping["4151"]);

/** output
{
  examine: 'A weapon from the abyss.',
  id: 4151,
  members: true,
  lowalch: 48000,
  limit: 70,
  value: 120001,
  highalch: 72000,
  icon: 'Abyssal whip.png',
  name: 'Abyssal whip'
}
*/


```

### 5 Minute Prices

Gives 5-minute average of item high and low prices as well as the number traded for the items that we have data on. Comes with a Unix timestamp indicating the 5 minute block the data is from.

```ts
const data = await runeliteAPI.prices5Min({ useragent });
console.log(data);

/* output
  ...,
  '25775': {
    avgHighPrice: null,
    highPriceVolume: 0,
    avgLowPrice: 1400,
    lowPriceVolume: 15,
    timestamp: 1634688300
  },
  '25778': {
    avgHighPrice: null,
    highPriceVolume: 0,
    avgLowPrice: 2001,
    lowPriceVolume: 9,
    timestamp: 1634688300
  },
  '25849': {
    avgHighPrice: 313,
    highPriceVolume: 14486,
    avgLowPrice: 312,
    lowPriceVolume: 7320,
    timestamp: 1634688300
  },
  '25853': {
    avgHighPrice: 466,
    highPriceVolume: 30,
    avgLowPrice: null,
    lowPriceVolume: 0,
    timestamp: 1634688300
  }, ...
}
*/

console.log(data["25849"]);

/* output
{
  avgHighPrice: 466,
  highPriceVolume: 30,
  avgLowPrice: null,
  lowPriceVolume: 0,
  timestamp: 1634688300
}
*/

```

You may optionally provide a timestamp to return prices for. If provided, will display 5-minute averages for all items we have data on for this time. The timestamp field represents the beginning of the 5-minute period being averaged

```ts
const data = await runeliteAPI.prices5Min({ useragent, timestamp: 1634688300 });
```

### 1 Hour Prices

Gives hourly average of item high and low prices, and the number traded.

```ts
const data = await runeliteAPI.prices1Hour({ useragent });
console.log(data);
```

You may optionally provide a timestamp to return prices for.

```ts
const data = await runeliteAPI.prices1Hour({ useragent, timestamp: 1634688300 });
```

### Time-series

Gives a list of the high and low prices of item with the given id at the given interval, up to 300 maximum.

Available intervals are `5m`, `1h` and `6h`

```ts
const timeseries = await runeliteAPI.timeseries({ id: 4151, timestep: "5m", useragent });

console.log(timeseries);

/* output
[
  { timestamp: 1634629200,
    avgHighPrice: 1641363,
    avgLowPrice: 1639652,
    highPriceVolume: 7,
    lowPriceVolume: 6
  },
  {
    timestamp: 1634629500,
    avgHighPrice: 1641436,
    avgLowPrice: 1639579,
    highPriceVolume: 3,
    lowPriceVolume: 6
    },
  ...
]
*/

console.log(timeseries[0]);

/* output
{
  timestamp: 1634599800,
  avgHighPrice: 1631217,
  avgLowPrice: 1628786,
  highPriceVolume: 9,
  lowPriceVolume: 8
}
*/
```

## license

MIT
