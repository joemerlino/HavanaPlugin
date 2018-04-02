//  STRATEGY

// classe per la pulizia dei dati per un grafo: non deve creare il grafo ma solamente pulire i dati da metadati ed informazioni inutil
class GraphCleaner {
  clean(data) {
    // deve pulire per grafo
    return data['data']['hits']['hits'];
  }
}

module.exports = GraphCleaner;
