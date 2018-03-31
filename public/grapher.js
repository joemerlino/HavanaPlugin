// const DataCleaner = require('./DataCleaner');
// const GraphStrategy = require('./strategies/graphcleaner');
// const StackStrategy = require('./strategy/stackcleaner');


class Grapher {

  constructor(dc) {
    this.dc = dc;
    console.log("costruito grapher");
  }

  setDataCleaner(dc) {
    this.cc = dc;
  }

  setElasticInstance(es) {
    this.elasticInstance = es;
  }

  getData() {

    // retieve data
    this.data = this.cc.query();
    
    // parse data
    this.data = this.data.hits[0]._source;

    // stubberini
    return this.data = {
      nodes : {

      },
      edges : {
        
      }
    }

    // return data
    // return this.data;
  }

}

module.exports = Grapher;
