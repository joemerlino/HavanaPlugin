/*

* File : config.js
* Versione : 1.0.0
* Tipo : Javascript
* Data : 2018-04-14
* Autore : SWEefty Team
* E-mail : sweeftyteam@gmail.com
*
* Licenza : GPLv3
*
* Descrizione: crea un oggetto che contiene tutti i parametri configurabili dall'amministratore del plugin
*
* Registro modifiche :
* Francesco Parolini || 2018-04-20 || Implementato elasticsearch host configurabile
* Francesco Parolini || 2018-04-14 || Creazione e scrittura del file
*
*/

// Imposta il numero massimo di documenti che possono essere letti in una sola
// richiesta dal lato server del plguin per evitare di leggere tutto un indice
class ConfigOptions {

  constructor() {
    this.MAX_DOCUMENTS_NUMBER = 500;
    this.ELASTICSEARCH_HOST_IP = "localhost";
    this.ELASTICSEARCH_HOST_PORT = "9200";
  }

  getMaxDocumentsNumber() {
    return this.MAX_DOCUMENTS_NUMBER;
  }

  getElasticsearchHostIp(){
    return this.ELASTICSEARCH_HOST_IP;
  }

  getElasticsearchHostPort(){
    return this.ELASTICSEARCH_HOST_PORT;
  }

  getElasticsearchHost(){
    return this.ELASTICSEARCH_HOST_IP+':'+this.ELASTICSEARCH_HOST_PORT;
  }
}

module.exports = new ConfigOptions();
