# runelite-ge-prices

This is a typed wrapper of real-time grand exchange prices, brought to you by a partnership between [RuneLite](https://runelite.net/) and the [RuneScape wiki](https://oldschool.runescape.wiki/) team. Please be aware that this is a fairly new project, and the endpoints may have downtime, and the prices may not be 100% accurate. Read more [here](https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices).

[![Build](https://github.com/nyan-left/runelite-grand-exchange-prices/actions/workflows/test.yml/badge.svg)](https://github.com/nyan-left/runelite-grand-exchange-prices/actions/workflows/test.yml)

## Acceptable use policy

The wiki team reserve the right to limit access to anyone, if their usage is so frequent that it threatens the stability of the entire API. Please read the acceptable use policy [acceptable use policy](https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices#Acceptable_use_policy) on the wiki.

To ensure this package complies with the use policy, all requests must specify a meaningful user agent.

## Installing

```bash
npm install runelite-ge-prices
```

## Importing the package

#### Using import

```ts
import * as runeliteAPI from 'runelite-ge-prices';
```

#### Using require

```js
const runeliteAPI = require('runelite-ge-prices');
```

## Usage

### Latest Price

Get the latest high and low prices for the items that we have data for, and the Unix timestamp when that transaction took place.

```ts
const latest = await API.latest({
    useragent,
});

console.log(latest)

/* output
'25833': { high: 800, highTime: 1633541890, low: 400, lowTime: 1633564731 },
'25849': { high: 330, highTime: 1633570020, low: 320, lowTime: 1633569964 },
'25855': { high: 483, highTime: 1633549599, low: 45300, lowTime: 1633549707 },
'25857': { high: 1800, highTime: 1633548698, low: 642, lowTime: 1633545181 },
*/

```

You may also request specific items:

```ts
const latest = await API.latest({ id: 4151, useragent });
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
const mapping = await API.mapping({ useragent });
console.log(mapping);

/* output
...
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
  },
  ...
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

The mapping data is not updated often, therefore it is cached internally.

### 5 Minute Prices

```ts
// Coming soon...

```

### 1 Hour Prices

```ts
// Coming soon...
```

### Time-series

```ts
// Coming soon...

```

## license

MIT
