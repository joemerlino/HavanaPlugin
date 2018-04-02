

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
  removeMetaData(data){
    data = data['data']['hits']['hits'];
    var newData = Array();
    for(var key in data){
      newData.push(data[key]['_source']);
    }
    return newData;
  }

  cleanData(data){
    return this.strategy.clean(
      this.removeMetaData(data)
    );
  }
}

module.exports = DataCleaner;
