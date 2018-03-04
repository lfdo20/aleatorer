# Aleatorer
[![Build Status](https://www.travis-ci.org/lfdo20/aleatorer.svg?branch=master)](https://www.travis-ci.org/lfdo20/aleatorer)
[![Coverage Status](https://coveralls.io/repos/github/lfdo20/aleatorer/badge.svg?branch=master)](https://coveralls.io/github/lfdo20/aleatorer?branch=master)
[![npm version](https://badge.fury.io/js/aleatorer.svg)](https://badge.fury.io/js/aleatorer)

[![NPM](https://nodei.co/npm/aleatorer.png?compact=true)](https://nodei.co/npm/aleatorer/)

Aleatorer is an leveled randomization algorithm where all values are used and randomically choosen. This is done by dividing and monitoring data in 4 groups where only the last positions are avaliable for random selection. It works without changes in the original database (except the deleter method), creating a reference file to constantly monitor the randomization process.

### Prerequisites

This library is a server application based on [node.js](https://nodejs.org/en/), and use the FileSystem module (fs) to deal with data files.

### Installing

```sh
$ npm install aleatorer --save
```

## How to use

### ES6

```js
import { Aleatorer } from 'aleatorer';

const aleatorer = new Aleatorer({
  id: 'ID_OF_DATA',
  baseData: 'DATA_VARIABLE',
});

```

### CommonJS

```js
var Aleatorer = require('aleatorer').default;

var rand = new Aleatorer({
  id: 'ID_OF_DATA',
  baseData: 'DATA_VARIABLE',
});

```

After that the library will be available to the Global as `Aleatorer`.

## Methods

Follow the methods that the library provides.

### aleatorer.loader();

> Loads the original data in the library. If its the first time, `loader` will create a file like `aldata_ID_OF_DATA.json`. Make sure this file is saved anywhere else in case of using a non-persistent server as Heroku. If its not the first load of data, `loader` just load the file information. Must be used just after initial configuration.

**Example**

```js
aleatorer.loader();
```

### aleatorer.random();

> Returns an object with original value and index position of value in the original array

**Example**

```js
var random = aleatorer.random();

console.log(random.data); // random value from the original data
console.log(random.idx); // random index position in the original data array
```

### aleatorer.adder();

> Detects when new data is added to the basedata and adds it to aleatorer references. You dont pass the new value, it detects de difference in the length of the original array and add the last values to aleatorer data.


**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|variable   |*array* | 'original data'   |


**Example**

```js
aleatorer.adder(variable);
```

### aleatorer.deleter();

> Receive the value passed as argument and delete its references on aleatorer data. Actually this is the only method that changes the original data. It deletes the reference and the value from original data.

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`query`   |*string* | 'value to be deleted'|


**Example**

```js
aleatorer.deleter('query');
```

### aleatorer.logger();

> This method return all data random information logged in aleatorer in template literals format. It presents every data value followed by how many times it was used. If you have 3000 data, this will log 3000 lines. But to be true, as a leveled randomization the the differences between each value uses hardly is more that 2 or 3.

**Example**

```js
var log = aleatorer.logger();
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

| ![Leandro Fernandes](https://avatars0.githubusercontent.com/u/10685099?s=200&v=4)|
|:---------------------:|
|  [Leandro Fernandes](https://github.com/lfdo20/)   |

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
