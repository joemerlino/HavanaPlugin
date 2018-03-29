const DataCleaner = require('./DataCleaner');
const GraphStrategy = require('./strategies/graphcleaner');
const StackStrategy = require('./strategy/stackcleaner');


class Grapher {

  constructor() {
    this.cc = null;
  }

  setDataCleaner(dc) {
    this.cc = dc;
  }

  getData() {
    return "getting data from datcleaner";
  }

}
