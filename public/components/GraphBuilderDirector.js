const DataCleaner = require('./DataCleaner');
const StackStrategy = require('./strategies/stackcleaner');

class GraphBuilderDirector {
  constructor() {

  }

  setDataReader(dr) {
    this.dr = dr;
  }

  construct() {
    this.dr = new dataReader(new GraphStrategy());
  }

}
