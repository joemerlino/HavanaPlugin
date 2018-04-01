

class DataCleaner {

  constructor() {
    console.log("costruito DataCleaner");
    this.strategy = null;
  }

  setStrategy(str) {
    this.strategy = str;
  }

  query() {
    console.log("fatta una query con datacleaner");
    return this.strategy.query();
  }

  clean() {
    console.log("richiesta una clean con datacleaner");
      return this.strategy.clean();
      // return "cleaned data";
  }

  getData() {

    console.log("datacleaner::getData eseguito");
      return this.strategy.getData();
      // return "getting some data";
  }
}

let instance = new DataCleaner();

module.exports = instance;
