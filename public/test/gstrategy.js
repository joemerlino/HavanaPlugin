const dc = require('../dataCleaner');
var assert = require('assert');


class GStrategy {

    constructor(elasticInstance) {
      this.data = null;
      this.es = elasticInstance;
    }

    query() {
      return "query";
    }

    clean() {
      return "clean";
    }

    getData() {
      return "getData";
    }
}


dc.setStrategy(new GStrategy());

describe('DataCleaner unit test', () =>{
  describe('#query()', () => {
    it('should return query when called', () =>{
      assert.equal(dc.query(), "query");
    })
  });

  describe('#clean()', () => {
    it('should return "clean" when called', () =>{
      assert.equal(dc.clean(), "clean");
    })
  });

  describe('#getData()', () => {
    it('should return "getData" when called', () =>{
      assert.equal(dc.getData(), "getData");
    })
  });
})
