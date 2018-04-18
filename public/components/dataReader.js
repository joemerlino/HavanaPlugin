/*

* File : dataReader.js
* Versione : 1.0.0
* Tipo : Javascript
* Data : 2018-03-23
* Autore : SWEefty Team
* E-mail : sweeftyteam@gmail.com
*
* Licenza : GPLv3
*
* Descrizione: classe che si deve occupare della lettura di dati da elasticsearch
*              ritorna dati grezzi. Si avvale del service dichiarato in app.js
*
* Registro modifiche :
* Giuseppe Merlino  || 2018-03-24 || Implementazione funzioni "tracesIndices","readIndex","readData"
* Alberto Gallinaro || 2018-03-23 || Realizzazione classe DataReader
* Alberto Gallinaro || 2018-03-23 || Creazione file
*
*/


// classe che si deve occupare della lettura di dati da elasticsearch
// ritorna dati grezzi
class DataReader {

  constructor(elasticInstance) {
    this.es = elasticInstance;
  }

  // imposta la sorgente dei dati
  setElasticsearchInstance(elastic) {
    this.es = elastic;
  }

  tracesIndices() {
    const indices = this.es.tracesIndices();
    return indices;
  }

  readIndex(indexName) {
    return this.es.getIndex(indexName);
  }

  readData() {
    return this.tracesIndices().then(res => {
      console.log("Trace ricevuti: ");
      console.log(res);
      return this.es.getData(res);
    });
  }
}

module.exports = DataReader;
