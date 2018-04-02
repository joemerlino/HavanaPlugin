//  STRATEGY

// classe per la pulizia dei dati per un grafo: non deve creare il grafo ma solamente pulire i dati da metadati ed informazioni inutil
class GraphCleaner {

  clean(data) {
    // deve pulire per grafo: per esempio probabilmente dovrai ignorare le chiamate di tipo http...

    var cleanedGraphData = [];
    var counter=0;
    for ( var i = 0 ; i < data.length ; i++ ) {
      //ci saranno da mettere altre condizioni per stabilire se il tal json deve essere mantenuto o scartato xD
      //TODO: ovviamente sistemare
      if ( 'db.type' in data[i]) {
        cleanedGraphData[counter++]=data[i];
      }
    }
    return cleanedGraphData;
  }
 
}

module.exports = GraphCleaner;
