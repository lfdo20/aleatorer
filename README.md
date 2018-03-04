# Aleatorer
[![Build Status](https://www.travis-ci.org/lfdo20/aleatorer.svg?branch=master)](https://www.travis-ci.org/lfdo20/aleatorer)
[![Coverage Status](https://coveralls.io/repos/github/lfdo20/aleatorer/badge.svg?branch=master)](https://coveralls.io/github/lfdo20/aleatorer?branch=master)

Aleatorer is an leveled randomization algorithm where all data are used and randomically choosen. This is done by dividing and monitoring data in 4 groups where only the last positions are avaliable for random selection. It works without change the original database, creating a reference file to constantly monitor the randomization process.

### Prerequisites

This library is a server application based on [node.js](https://nodejs.org/en/), and use the FileSystem module (fs) to deal with data files.
Make sure you have node installed.

### Installing

Just :

```sh
$ npm install aleatorer --save
```

## How to use

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### ES6

```js
// to import a specific method
import { Aleatorer } from 'aleatorer';

const aleatorer = new Aleatorer({
  id: 'ID_OF_DATA',
  baseData: 'DATA_VARIABLE',
});

// loading method
aleatorer.loader();
```

### CommonJS

```js
var aleatorer = require('aleatorer').default;

var aleatorer = new Aleatorer({
  id: 'ID_OF_DATA',
  baseData: 'DATA_VARIABLE',
});

```

After that the library will be available to the Global as `Aleatorer`. Follow an example:

## Methods

> Follow the methods that the library provides.

### aleatorer.loader();

> Loads the original data in the library. If its the first time, `loader` will create a file like `aldata_ID_OF_DATA.json`. Make sure this file is saved anywhere else in case of using a non-persistent server as Heroku. If its not the first load of data, `loader` just load the file information.

**Example**

```js
aleatorer.loader();
```

### aleatorer.adder();

> Loads the original data in the library. If its the first time, `loader` will create a file like `aldata_ID_OF_DATA.json`. Make sure this file is saved anywhere else in case of using a non-persistent server as Heroku. If its not the first load of data, `loader` just load the file information.

**Arguments**

| Argument | Type    | Options           |
|----------|---------|-------------------|
|`query`   |*string* | 'Any search query'|


**Example**

```js
spotify.search.album('Incubus')
  .then(data => {
    // do what you want with the data
  })
```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
