

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
  removeMetaDataFromIndex(data) {
    var flatData = new Array();

    data.forEach(el => {
        flatData.push(el['_source']);
    });

    return flatData;
  }

  removeMetaDataFromIndeces(data) {
      var flatData = [];
      data.forEach(el => {
          let tmp = this.removeMetaDataFromIndex(el.data.hits.hits);
          flatData.push(tmp);
      });

      return flatData;
  }

  cleanData(data) {
    return this.strategy.clean(
      this.removeMetaDataFromIndeces(data)
    );
  }

  cleanDataStack(data) {
    return this.strategy.clean(
      this.removeMetaDataFromIndex(data.data.hits.hits)
    );
  }

}

module.exports = DataCleaner;
