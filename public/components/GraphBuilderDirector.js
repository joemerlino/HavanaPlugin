const DataCleaner = require('./dataCleaner');
const GraphStrategy = require('./strategies/graphcleaner');

class GraphBuilderDirector {
  constructor(dr, gb) {
    this.dr = dr;
    this.graphBuilder = gb;
  }

  setDataReader(dr) {
    this.dr = dr;
  }

  constructGraph() {
    this.dataCleaner = new DataCleaner(new GraphStrategy());

    return new Promise((resolve, reject) => {
      this.dr.readData().then(res => {

        let d = this.dataCleaner.cleanDataStack(res)
        var dataGraph = {};

        let nodesArr = this.graphBuilder.buildNodes(d);
        let linksArr = this.graphBuilder.buildLinks(nodesArr, d);

        console.log("nodesArr");
        console.log(nodesArr);

        dataGraph['nodes'] = nodesArr;
        dataGraph['links'] = linksArr;

        resolve(dataGraph);

      }).catch(e => console.log(e));
    });


  }

}

module.exports = GraphBuilderDirector;
