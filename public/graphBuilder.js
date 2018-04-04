// const DataCleaner = require('./DataCleaner');
// const GraphStrategy = require('./strategies/graphcleaner');
// const StackStrategy = require('./strategy/stackcleaner');

let GraphCleaner = require('./strategies/graphcleaner');
let DataCleaner = require('./dataCleaner');

class GraphBuilder {

  constructor(dataReader) {
    this.dr = dataReader;
  }

  setDataReader(dr){
    this.dr = dr;
  }


  checkIfPresent(dg, st) {
  //dg contiene tutte i nodi da plottare, st(singletrace) è il candidato ad entrare nell'insieme.
  //controllo stupido sul nome del nodo per stabilire se esso debba entrare
  //TODO: ovviamente da cambiare
    var result=true;
    for ( var i = 0 ; i < dg['nodes'].length && result==true ; i++ ) {
      if ( dg['nodes'][i].name == st.name ) {
        result=false;
      }
    }
    return result; 
  }

  getGraph() {
    
    // retieve data
    this.dataCleaner = new DataCleaner(new GraphCleaner());
    this.data = this.dataCleaner.cleanData(this.dr.readData());
    
    // parse data
    var dataGraph = {};
    var nodes = [];
    var id_counter=1;
    for ( var i = 0; i < this.data.length; i++ ) {
      //TODO: mock
      if ( this.data[i]['type'] == "jdbc") {
        var name=this.data[i]['db.type'];
        var type="Database";
        var id=id_counter++;
        //TODO: stack trace mock, da sistemare anche qui
        var stack_trace = [ {
          "nome": "SQL QUERY",
          "error" : false,
          "duration" : 4
        } ]

        nodes.push( {
          "name":name,
          "type":type,
          "id":id,
          "stack_trace":stack_trace
        })
      }
    }
    
    dataGraph['nodes']=[];
    for ( var i = 0 ; i < nodes.length ; i++ ) {
      //controllo stupido sul nome per stabilire se è già presente oppure no
      var check = this.checkIfPresent(dataGraph, nodes[i]);
      if ( check ) {
        dataGraph.nodes[i]=nodes[i];
      }
    }

    dataGraph['links']=[];
    //TODO: implementare links
    //collegamento stub per non far crashare tutto

    //da aggiungere all 'interfaccia: medium rensponde time e modificare il type invece che in numerico in db/server

    var link = {
      "source": 1,
      "target": 2,
      "type": "40"
    }
    this.data=dataGraph;
    return this.data;
    }
}

module.exports = GraphBuilder;
