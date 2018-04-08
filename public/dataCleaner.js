

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
    // data = data['data'];
    // console.log("Remove metadata:");
    // console.log(data);
    var flatData = new Array();

    data.forEach(el => {
        flatData.push(el['_source']);
    });

    // i dati vengono passati come un array di risultati legati ad un indice, quindi...
    // for (var i = 0; i < data.length; i++) {
    //   // per ogni indice...
    //   for(var j = 0; j<data[i].length;j++){
    //     //per ogni trace....
    //
    //     //aggiungi il contenuto della trace alla lista completa dei dati, essa è contenuta nel campo source
    //     console.log("sauce: ");
    //     console.log(data[i][j]['_source']);
    //     flatData.push(data[i][j]['_source']);
    //   }
    // }
    console.log("FlatData");
    console.log(flatData);

    return flatData;
  }

  ignorantCaller(data) {
      var flatData = [];
      data.forEach(el => {
          let tmp = this.removeMetaData(el.data.hits.hits);
          flatData.push(tmp);
      });

      console.log("Flatdata:");
      console.log(flatData);
      return flatData;
  }

  cleanData(data) {
    return this.strategy.clean(
      this.ignorantCaller(data)
    );
  }

  cleanDataStack(data) {
    return this.strategy.clean(
      this.removeMetaData(data.data.hits.hits)
    );
  }


}

module.exports = DataCleaner;
