# runelite-ge-prices

This is a typed wrapper of real-time grand exchange prices, brought to you by a partnership between [RuneLite](https://runelite.net/) and the [RuneScape wiki](https://oldschool.runescape.wiki/) team. Please be aware that this is a fairly new project, and the endpoints may have downtime, and the prices may not be 100% accurate. Read more [here](https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices).

[![Build](https://github.com/nyan-left/runelite-grand-exchange-prices/actions/workflows/test.yml/badge.svg)](https://github.com/nyan-left/runelite-grand-exchange-prices/actions/workflows/test.yml)

## Acceptable use policy

The wiki team reserve the right to limit access to anyone, if their usage is so frequent that it threatens the stability of the entire API. Please read the acceptable use policy [acceptable use policy](https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices#Acceptable_use_policy) on the wiki.

To ensure this package complies with the use policy, all requests must specify a meaningful user agent.

## Installing

```bash
$ npm install runelite-ge-prices
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

  ```


 returns An unsorted array (if no id is provided) or a single object (if an id is provided).

 * @param useragent - (required) a User-Agent that describes what you're using it for,
 * and if you're willing, some sort of contact info (like an email or Discord).
 * @param id - (optional) Item ID. If provided, will only display the latest price for this item.
 * @


```ts


```

### Mapping

```ts


```

### 5 Minute Prices

```ts


```


### 1 Hour Prices
```ts


```


### Time-series

```ts


```




## license


MIT
