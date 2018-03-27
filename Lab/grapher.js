const DataCleaner = require('./DataCleaner');
const GraphStrategy = require('./strategies/graphcleaner');

let cc = new DataCleaner();
cc.setStrategy(new GraphStrategy);

console.log(cc.query());
