

// classe che si deve occupare di pulire i dati che arrivano grezzi da elasticsearch.
// per la modularità essa deve poter pulire i dati in modi diversi: per questo si avvale di classi strategy
// che determinano il vero comportamento di questa classe
class DataCleaner {

  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(str) {
    this.strategy = str;
  }

  // rimuove i metdati di elasticsearch
  removeMetaData(data) {
    data = data['data'];
    var flatData = new Array();
    for (var i = 0; i < data.length; i++) {
      for(var j = 0; j<data[i].length;j++){
        flatData.push(data[i][j]['_source']);
      }
    }
    return flatData;
  }

  cleanData(data) {
    return this.strategy.clean(
      this.removeMetaData(data)
    );
  }
}

module.exports = DataCleaner;
