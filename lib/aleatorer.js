'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint require-jsdoc: 0 */

var Aleatorer = function () {
  function Aleatorer(options) {
    _classCallCheck(this, Aleatorer);

    this.id = options.id;
    this.baseData = options.baseData;
    this.newData;
    this.delData;
    this.data = [[1, 1, 1, 1], [], [], [], []];
    this.log = {
      name: 'Total Log: ',
      leveling: 0,
      totalq1: 0,
      totalq2: 0,
      totalq3: 0,
      totalq4: 0
    };
  }

  _createClass(Aleatorer, [{
    key: 'loader',
    value: function loader() {
      try {
        var data = JSON.parse(_fs2.default.readFileSync('./aldata_' + this.id + '.json', 'utf8'));
        this.log = data[5];
        data.pop();
        this.data = data;
        this.updater();
      } catch (e) {
        console.log('No config file located, creating file from data.');
        this.creator();
      }
    }
  }, {
    key: 'creator',
    value: function creator() {
      var _this = this;

      var initialValue = 1;
      var quarterValue = 1;
      this.baseData.forEach(function (el, ind, arr) {
        if (quarterValue >= 5) {
          quarterValue = 1;
        }
        _this.data[quarterValue].push([ind, initialValue, 0]);
        quarterValue++;
      });
      var jsonData = JSON.stringify(this.data);
      _fs2.default.writeFileSync('./aldata_' + this.id + '.json', jsonData, 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }
      });
      this.updater();
    }
  }, {
    key: 'adder',
    value: function adder(newData) {
      var _this2 = this;

      this.newData = newData;
      var quarter = void 0;
      var totalData = void 0;

      var _loop = function _loop() {
        quarter = [_this2.data[1].length, _this2.data[2].length, _this2.data[3].length, _this2.data[4].length];
        totalData = quarter.reduce(function (a, b) {
          return a + b;
        });
        var min = Math.min.apply(Math, _toConsumableArray(quarter));
        var id = quarter.findIndex(function (el, id, arr) {
          return el === min;
        }) + 1;

        if (newData.length > totalData) {
          var addeq = Math.floor(_this2.data[0][id - 1] / quarter[3] + 10);
          _this2.data[id].push([newData.indexOf(newData[newData.length - (newData.length - totalData)]), addeq, _this2.log.leveling + Number((addeq * 0.1 * 0.1).toFixed(2))]);
        }
      };

      do {
        _loop();
      } while (newData.length > totalData);
      this.updater();
    }
  }, {
    key: 'random',
    value: function random() {
      var _this3 = this;

      var quarterValues = Array.from(this.data[0]).sort(function (a, b) {
        return a - b;
      }).slice(0, 2);
      var randValue = void 0;
      var quarter = quarterValues.map(function (el) {
        return _this3.data[0].indexOf(el);
      });
      var q1Values = this.data[quarter[0] + 1].slice(0, 3);
      var q2Values = this.data[quarter[1] + 1].slice(0, 3);
      var rand = Math.round(Math.random() * (q1Values.length + (q2Values.length - 1) - 0)) + 0;

      if (rand < q1Values.length) {
        randValue = this.data[quarter[0] + 1][rand];
        this.data[quarter[0] + 1][rand][1]++;
      } else {
        var vals2rand = rand === q1Values.length ? 0 : rand - q1Values.length - 1;
        randValue = this.data[quarter[1] + 1][vals2rand];
        this.data[quarter[1] + 1][vals2rand][1]++;
      }
      this.updater();

      return {
        quarter: quarter,
        dataset: q1Values.concat(q2Values),
        rand: rand,
        selected: randValue,
        idx: randValue[0],
        data: this.baseData[randValue[0]]
      };
    }
  }, {
    key: 'updater',
    value: function updater() {
      var _this4 = this;

      var quarterCheck = [0, 0, 0, 0, 0];
      this.data.map(function (quarter) {
        if (quarter !== _this4.data[0] && quarter !== _this4.data[5]) {
          quarterCheck[0] += 1;
          quarter.sort(function (a, b) {
            if (a[1] > 60 && b[1] > 60) {
              quarterCheck[quarterCheck[0]] = 1;
            }
            return a[1] - b[1];
          });
        }
      });

      if (JSON.stringify(quarterCheck) === JSON.stringify([4, 1, 1, 1, 1])) {
        this.data.map(function (quarter) {
          if (quarter !== _this4.data[0]) {
            quarter.map(function (dataValue) {
              dataValue[1] -= 50;
              dataValue[2] += 1;
            });
          }
        });
        this.log.leveling += 1;
      }

      var totalLog = {
        name: 'Total Log: ',
        leveling: this.log.leveling,
        totalq1: this.data[0][0] * this.log.leveling,
        totalq2: this.data[0][1] * this.log.leveling,
        totalq3: this.data[0][2] * this.log.leveling,
        totalq4: this.data[0][3] * this.log.leveling
      };

      this.data[0][0] = this.data[1].reduce(function (acc, val) {
        return acc + val[1];
      }, 0);
      this.data[0][1] = this.data[2].reduce(function (acc, val) {
        return acc + val[1];
      }, 0);
      this.data[0][2] = this.data[3].reduce(function (acc, val) {
        return acc + val[1];
      }, 0);
      this.data[0][3] = this.data[4].reduce(function (acc, val) {
        return acc + val[1];
      }, 0);
      this.log = totalLog;

      var dataLog = this.data.slice(0, this.data.length);
      dataLog.push(this.log);

      var jsonData = JSON.stringify(dataLog, null, 2);
      _fs2.default.writeFileSync('./aldata_' + this.id + '.json', jsonData, 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }
      });
    }
  }, {
    key: 'deleter',
    value: function deleter(delData) {
      var _this5 = this;

      this.delData = delData;
      var delDataIdx = this.baseData.findIndex(function (el) {
        return el === _this5.delData;
      });
      for (var i = 1; i <= 4; i++) {
        var delElem = this.data[i].findIndex(function (el) {
          return el[0] === delDataIdx;
        });
        if (delElem !== -1) {
          this.data[i].splice(delElem, 1);
          console.log('Value deleted!');
          i = 5;
        }
      }
      this.baseData.splice(delDataIdx, 1);
      this.updater();
    }
  }, {
    key: 'logger',
    value: function logger() {
      var _this6 = this;

      var loger = [];
      this.data.map(function (quarter) {
        if (quarter !== _this6.data[0] && quarter !== _this6.data[5]) {
          quarter.map(function (el) {
            var decym = (el[2] - Math.trunc(el[2])).toFixed(2).toString();
            var lvl = _this6.log.leveling === Math.trunc(el[2]) ? _this6.log.leveling : _this6.log.leveling - Math.trunc(el[2]);
            loger.push([_this6.baseData[el[0]], lvl * 50 + (el[1] - Number(decym[2] + decym[3])), el[0]]);
          });
        }
      });
      loger.sort(function (a, b) {
        return a[2] - b[2];
      });

      var log = loger.reduce(function (acc, el) {
        return acc += '\n' + el[0] + ' : ' + el[1];
      }, 'Total data log');
      return log;
    }
  }]);

  return Aleatorer;
}();

exports.default = Aleatorer;