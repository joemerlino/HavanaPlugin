const DataCleaner = require('./DataCleaner');
const GraphStrategy = require('./strategies/graphcleaner');


const Grapher = function() {
    this.cc = new DataCleaner(new GraphStrategy);

    this.getData = function() {
        return "getting data";
    }
}

let g = new Grapher();
console.log(g.getData());
