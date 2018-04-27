/*

* File : dataCleaner.js
* Versione : 1.0.0
* Tipo : Javascript
* Data : 2018-03-22
* Autore : SWEefty Team
* E-mail : sweeftyteam@gmail.com
*
* Licenza : GPLv3
*
* Descrizione: classe che si deve occupare di pulire i dati che arrivano grezzi
*              da elasticsearch. Per modularità essa deve poter pulire i dati in
*              modi diversi: per questo si avvale di classi strategy che
*              determinano il vero comportamento di questa classe
*
* Registro modifiche :
* Elia Montecchio || 2018-03-24 || Implementazione funzione "cleanDataStack"
* Elia Montecchio || 2018-03-23 || Implementazione funzioni "removeMetaDataFromIndex" e "CleanData"
* Lisa Parma      || 2018-03-22 || Realizzazione classe DataCleaner
* Lisa Parma      || 2018-03-22 || Creazione file
*
*/

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

    data.forEach((el) => {
      el.data.hits.hits.forEach((l) => {
        flatData.push(l['_source']);
      });
    })

    console.log("flat");
    console.log(flatData);

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
    console.log("Dati ricevuti>");
    console.log(data);
    return this.strategy.clean(
      this.removeMetaDataFromIndeces(data)
    );
  }

  cleanDataStack(data) {
    console.log("Dati ricevuti>");
    console.log(data);
    return this.strategy.clean(
      this.removeMetaDataFromIndex(data)
    );
  }

}

module.exports = DataCleaner;
