

class DataCleaner {

  constructor() {
    console.log("costruito DataCleaner");
    this.strategy = null;
  }

  setStrategy(str) {
    this.strategy = str;
  }

  query() {
    return this.strategy.query();
  }

  clean() {
      return this.strategy.clean();
      // return "cleaned data";
  }

  getData() {
      return this.strategy.getData();
      // return "getting some data";
  }
}

let instance = new DataCleaner();

module.exports = instance;
