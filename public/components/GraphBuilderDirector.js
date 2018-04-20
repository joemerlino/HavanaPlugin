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

        console.log("Dati puliti> ");
        console.log(d);
        // let data = []; //flaterizzo data
        // for (var i = 0; i < d.length; i++) {
        //   for (var j = 0; j < d[i].length; j++) {
        //     data.push(d[i][j]);
        //   }
        // }

        // console.log("Datadatadata>");
        // console.log(data);
        let nodesArr = this.graphBuilder.getNodes(d);
        let linksArr = this.graphBuilder.getLinks(nodesArr, d);

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
