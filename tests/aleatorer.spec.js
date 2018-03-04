import {expect} from 'chai';
import Aleatorer from '../src/aleatorer';
import fs from 'fs';

const logdata = {
  name: 'Total Log: ',
  leveling: 0,
  totalq1: 0,
  totalq2: 0,
  totalq3: 0,
  totalq4: 0,
};

describe('loading data', () => {
  context('loading from file', () => {
    const data = [[8, 1, 6, 11], [[0, 1, 0], [4, 7, 0]], [[1, 1, 0]],
      [[2, 1, 0], [4, 1, 0], [8, 2, 0], [5, 2, 0]],
      [[3, 1, 0], [10, 4, 0], [15, 6, 0]],
      logdata];
    const returnData = data.slice(0, 5);
    let aleatorer;

    beforeEach(() => {
      const jsonData = JSON.stringify(data);
      fs.writeFileSync(`./aldata_ts.json`, jsonData, 'utf8', (err) => {
      });

      aleatorer = new Aleatorer({id: 'ts'});
    });

    it('should have a method called load', () => {
      expect(aleatorer.loader).to.exist;
    });

    it('should have a method called creator', () => {
      expect(aleatorer.creator).to.exist;
    });

    it('should read the id passed', () => {
      expect(aleatorer.id).to.be.equal('ts');
    });

    it('should import data from file if exists', () => {
      aleatorer.loader();
      expect(aleatorer.data).to.be.eql(returnData);
    });
  });

  context('creating new data', () => {
    const baseData = ['teste1', 'teste2', 'teste3', 'teste4', 'test5'];
    const datatc = [[2, 1, 1, 1], [[0, 1, 0], [4, 1, 0]], [[1, 1, 0]],
      [[2, 1, 0]], [[3, 1, 0]], logdata];
    const returnData = datatc.slice(0, 5);
    let aleatorer;

    before(() => {
      aleatorer = new Aleatorer({
        id: 'tc',
        baseData: baseData,
      });
    });

    afterEach(() => {
      try {
        fs.unlinkSync(`./aldata_tc.json`);
      } catch (error) {
      }
    });

    it('should read data from variable passed', () => {
      expect(aleatorer.baseData).to.be.equal(baseData);
    });

    it('should return an object with the correct data', () => {
      aleatorer.loader();
      expect(aleatorer.data).to.be.eql(returnData);
    });
  });
});

describe('adding new data', () => {
  const newData = ['t1', 't2', 't3', 't4', 't5', 't6',
    't7', 't8', 't9', 't10', 't11', 't12'];
  const data = [[21, 17, 10, 19], [[0, 8], [10, 8], [12, 5]],
    [[1, 5], [8, 10], [8, 2]], [[2, 4], [6, 2], [7, 4]],
    [[3, 7], [5, 12]], logdata];
  let aleatorer;

  beforeEach(() => {
    data[5].leveling = 2;
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(`./aldata_vh.json`, jsonData, 'utf8', (err) => {
      if (err) {
        return console.log(err);
      }
    });

    aleatorer = new Aleatorer({
      id: 'vh',
    });
  });

  it('should have a method called adder', () => {
    const aleatorer = new Aleatorer({id: 'vh'});
    expect(aleatorer.adder).to.exist;
  });

  it('shoud receive new data as parameter', () => {
    aleatorer.loader();
    aleatorer.adder(newData);
    expect(aleatorer.newData).to.be.equal(newData);
  });

   it('should add data to the quarter with less values', () => {
    aleatorer.loader();
    aleatorer.adder(newData);
    expect(aleatorer.data[4].length).to.be.eql(data[4].length+1);
  });

  it('should add the leveling value of the set to added data', () => {
    aleatorer.loader();
    aleatorer.adder(newData);
    expect(aleatorer.data[4][2][2]).to.be.eql(2.19);
  });

  it('shoul add a medium plus 10 value to the data', () => {
    aleatorer.loader();
    aleatorer.adder(newData);
    expect(aleatorer.data[4][2][1]).to.be.eql(19);
  });
});

describe('get a random data', () => {
  const data = [[8, 1, 6, 11], [[4, 7, 0], [0, 1, 0]], [[1, 1, 0]],
    [[2, 1, 0], [4, 1, 0], [8, 2, 0], [5, 2, 0]],
    [[3, 1, 0], [10, 4, 0], [15, 6, 0]], logdata];
  const baseData = ['t1', 't2', 't3', 't4', 't5', 't6',
    't7', 't8', 't9', 't10', 't11', 't12'];
  let aleatorer;

  beforeEach(() => {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(`./aldata_ts.json`, jsonData, 'utf8', (err) => {
      if (err) {
        return console.log(err);
      }
    });

    aleatorer = new Aleatorer({
      id: 'ts',
      baseData: baseData,
    });
  });

  afterEach(() => {
    fs.unlinkSync(`./aldata_ts.json`);
  });

  it('should have a method called random', () => {
    aleatorer.loader();
    expect(aleatorer.random).to.exist;
  });

  it('should check the 2 quarter with less qvalues', () => {
    aleatorer.loader();
    const randval = aleatorer.random();
    expect(randval.quarter).to.be.eql([1, 2]);
  });

  it('should check the last 3 values of last 2 quarter', () => {
    const randomOptions = [[1, 1, 0], [2, 1, 0], [4, 1, 0], [8, 2, 0],
      [1, 2, 0], [2, 2, 0], [4, 2, 0], [8, 3, 0]];

    aleatorer.loader();
    const randval = aleatorer.random();
    expect(randomOptions).to.include.deep.members(randval.dataset);
  });

  it('sould return a random value between the expected range', () => {
    const randomIdxValue = [1, 2, 8, 4];

    aleatorer.loader();
    const randval = aleatorer.random();
    expect(randomIdxValue).to.include(randval.idx);
  });

  it('should return the index of a random value in original array', () => {
    aleatorer.loader();
    const randval = aleatorer.random();
    const val = data[randval.idx];
    expect(val).to.be.eql(data[randval.idx]);
  });

  it('should update the uses value of the used data', () => {
    const selectedData = [[], [1, 1, 0], [2, 1, 0], [], [4, 1, 0],
      [5, 2, 0], [], [], [8, 2, 0]];
    aleatorer.loader();
    const randval = aleatorer.random();
    expect(randval.selected).to.be.eql([selectedData[randval.idx][0],
      selectedData[randval.idx][1] + 1, selectedData[randval.idx][2]]);
  });

  it('should return the original data for direct use', () => {
    aleatorer.loader();
    const randval = aleatorer.random();
    expect(randval.data).to.be.eql(baseData[randval.idx]);

    const randval2 = aleatorer.random();
    expect(randval2.data).to.be.eql(baseData[randval2.idx]);

    const randval3 = aleatorer.random();
    expect(randval3.data).to.be.eql(baseData[randval3.idx]);
  });
});

describe('update data values', () => {
  const datav = [[176, 170, 377, 266], [[4, 94], [0, 82]], [[1, 89], [7, 81]],
    [[2, 99], [8, 92], [5, 84], [4, 102]],
    [[3, 87], [10, 97], [15, 82]], logdata];

  beforeEach(() => {
    try {
      const jsonData = JSON.stringify(datav);
      fs.writeFileSync(`./aldata_fd.json`, jsonData, 'utf8', (err) => {
        if (err) {
          return console.log(err);
        }
      });
    } catch (error) {

    }
  });

  afterEach(() => {
    fs.unlinkSync(`./aldata_fd.json`);
  });

  it('should have a method called updater', () => {
    const aleatorer = new Aleatorer({id: 'fd'});
    expect(aleatorer.updater).to.exist;
  });

  it('should restore quarter when all data values after 80', () => {
    const aleatorer = new Aleatorer({id: 'fd', baseData: datav});
    aleatorer.loader();
    expect(aleatorer.data[0]).to.be.eql([76, 70, 177, 116]);
  });
});


describe('deleting data', () => {
  let aleatorer;
  beforeEach(() => {
    const data = [[1, 4, 11, 9], [[0, 1]], [[1, 4]],
      [[2, 1], [4, 3], [5, 7]], [[3, 9]], logdata];
    const baseData = ['teste1', 'teste2', 'teste3',
      'teste4', 'teste5', 'teste6'];
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(`./aldata_vh.json`, jsonData, 'utf8', (err) => {
      if (err) {
        return console.log(err);
      }
    });

    aleatorer = new Aleatorer({
      id: 'vh',
      baseData: baseData,
    });
  });

  afterEach(() => {
    fs.unlinkSync(`./aldata_vh.json`);
  });

  it('should have a method called deleter', () => {
    const aleatorer = new Aleatorer({id: 'vh'});
    expect(aleatorer.deleter).to.exist;
  });

  it('shoud receive value to be deleted as parameter', () => {
    aleatorer.loader();
    aleatorer.deleter('teste5');
    expect(aleatorer.delData).to.be.equal('teste5');
  });

  it('should delete the requested data value', () => {
    aleatorer.loader();
    aleatorer.deleter('teste5');
    expect(aleatorer.data[3]).to.be.eql([[2, 1], [5, 7]]);
  });
});

describe('logging data values', () => {
  const baseData = ['t1', 't2', 't3', 't4', 't5', 't6',
    't7', 't8', 't9', 't10', 't11', 't12'];

  const data = [[21, 17, 10, 23], [[4, 5, 1], [0, 8, 0], [8, 8, 2.12]],
    [[5, 2, 3], [1, 5, 3], [9, 10, 0]], [[6, 2, 1.25], [2, 4, 0],
    [10, 4, 3.10]], [[3, 7, 2], [7, 12, 0], [11, 22, 4.12]], {
      name: 'Total Log: ',
      leveling: 4,
      totalq1: 0,
      totalq2: 0,
      totalq3: 0,
      totalq4: 0,
    }];

  beforeEach(() => {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(`./aldata_dh.json`, jsonData, 'utf8', (err) => {
      if (err) {
        return console.log(err);
      }
    });
  });

  afterEach(() => {
    fs.unlinkSync(`./aldata_dh.json`);
  });

  it('should return a log with all values uses', () => {
    const logexample = `Total data log
t1 : 208
t2 : 55
t3 : 204
t4 : 107
t5 : 155
t6 : 52
t7 : 127
t8 : 212
t9 : 96
t10 : 210
t11 : 44
t12 : 210`;

    const aleatorer = new Aleatorer({
      id: 'dh',
      baseData: baseData,
    });
    aleatorer.loader();
    const log = aleatorer.logger();
    expect(log).to.be.eql(logexample);
  });
});

