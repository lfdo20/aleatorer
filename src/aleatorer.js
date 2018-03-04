import fs from 'fs';
/* eslint require-jsdoc: 0 */

export default class Aleatorer {
  constructor(options) {
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
      totalq4: 0,
    };
  }

  loader() {
    try {
        const data = JSON.parse(
          fs.readFileSync(`./aldata_${this.id}.json`, 'utf8'));
        this.log = data[5];
        data.pop();
        this.data = data;
        this.updater();
    } catch (e) {
      console.log('No config file located, creating file from data.');
      this.creator();
    }
  }

  creator() {
    const initialValue = 1;
    let quarterValue = 1;
    this.baseData.forEach((el, ind, arr) => {
        if (quarterValue >= 5) {
          quarterValue = 1;
        }
      this.data[quarterValue].push([ind, initialValue, 0]);
      quarterValue++;
    });
    const jsonData = JSON.stringify(this.data);
    fs.writeFileSync(`./aldata_${this.id}.json`, jsonData, 'utf8', (err) => {
      if (err) {
        return console.log(err);
      }
    });
    this.updater();
  }

  adder(newData) {
    this.newData = newData;
    let quarter;
    let totalData;

    do {
    quarter = [this.data[1].length, this.data[2].length,
      this.data[3].length, this.data[4].length];
    totalData = quarter.reduce((a, b) => a + b);
    const min = Math.min(...quarter);
    const id = quarter.findIndex((el, id, arr) => el === min)+1;

    if (newData.length > totalData) {
      const addeq = Math.floor((this.data[0][id - 1] / quarter[3]) + 10);
      this.data[id].push([newData.indexOf(newData[newData.length -
        (newData.length - totalData)]),
        addeq, this.log.leveling + Number(((addeq * 0.1) * 0.1).toFixed(2)),
      ]);
    }
    } while (newData.length > totalData);
    this.updater();
  }

  random() {
    let quarterValues = Array.from(this.data[0])
      .sort((a, b) => a - b).slice(0, 2);
    let randValue;
    const quarter = quarterValues.map((el) => {
      return this.data[0].indexOf(el);
    });
    const q1Values = this.data[quarter[0] + 1].slice(0, 3);
    const q2Values = this.data[quarter[1] + 1].slice(0, 3);
    const rand = Math.round(
      Math.random() * ((q1Values.length + (q2Values.length-1)) - 0)) + 0;

    if (rand < q1Values.length) {
      randValue = this.data[quarter[0] + 1][rand];
      this.data[quarter[0] + 1][rand][1]++;
    } else {
      const vals2rand = rand === q1Values.length ?
        0 : ((rand - q1Values.length) - 1);
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
      data: this.baseData[randValue[0]],
    };
  }

  updater() {
    const quarterCheck = [0, 0, 0, 0, 0];
    this.data.map((quarter) => {
      if (quarter !== this.data[0] && quarter !== this.data[5]) {
        quarterCheck[0] += 1;
        quarter.sort((a, b) => {
          if (a[1] > 60 && b[1] > 60) {
            quarterCheck[quarterCheck[0]] = 1;
          }
          return a[1] - b[1];
        });
      }
    });

    if (JSON.stringify(quarterCheck) === JSON.stringify([4, 1, 1, 1, 1])) {
      this.data.map((quarter) => {
        if (quarter !== this.data[0]) {
          quarter.map((dataValue) => {
            dataValue[1] -= 50;
            dataValue[2] += 1;
          });
        }
      });
      this.log.leveling += 1;
    }

    const totalLog = {
      name: 'Total Log: ',
      leveling: this.log.leveling,
      totalq1: this.data[0][0] * this.log.leveling,
      totalq2: this.data[0][1] * this.log.leveling,
      totalq3: this.data[0][2] * this.log.leveling,
      totalq4: this.data[0][3] * this.log.leveling,
    };

    this.data[0][0] = this.data[1].reduce((acc, val) => {
      return acc + val[1];
    }, 0);
    this.data[0][1] = this.data[2].reduce((acc, val) => {
      return acc + val[1];
    }, 0);
    this.data[0][2] = this.data[3].reduce((acc, val) => {
      return acc + val[1];
    }, 0);
    this.data[0][3] = this.data[4].reduce((acc, val) => {
      return acc + val[1];
    }, 0);
    this.log = totalLog;

    const dataLog = this.data.slice(0, this.data.length);
    dataLog.push(this.log);

    const jsonData = JSON.stringify(dataLog, null, 2);
    fs.writeFileSync(`./aldata_${this.id}.json`, jsonData, 'utf8', (err) => {
      if (err) {
        return console.log(err);
      }
    });
  }

  deleter(delData) {
    this.delData = delData;
    const delDataIdx = this.baseData.findIndex((el) => el === this.delData);
    for (let i = 1; i <= 4; i++) {
      const delElem = this.data[i].findIndex((el) => el[0] === delDataIdx);
      if (delElem !== -1) {
        this.data[i].splice(delElem, 1);
        console.log('Value deleted!');
        i = 5;
      }
    }
    this.baseData.splice(delDataIdx, 1);
    this.updater();
  }

  logger() {
    let loger = [];
    this.data.map((quarter) => {
      if (quarter !== this.data[0] && quarter !== this.data[5]) {
        quarter.map((el) => {
          const decym = (el[2] - Math.trunc(el[2])).toFixed(2).toString();
          const lvl = this.log.leveling === Math.trunc(el[2]) ?
            this.log.leveling : this.log.leveling - Math.trunc(el[2]);
          loger.push([
            this.baseData[el[0]],
            (lvl * 50) +
            (el[1] - Number(decym[2] + decym[3])),
            el[0],
          ]);
        });
      }
    });
    loger.sort((a, b) => a[2] - b[2]);

    const log = loger.reduce((acc, el) => {
      return acc +=
`
${el[0]} : ${el[1]}`;
    }, `Total data log`);
    return log;
  }
}
