/*

* File : graphcleaner.js
* Versione : 1.0.0
* Tipo : Javascript
* Data : 2018-04-05
* Autore : SWEefty Team
* E-mail : sweeftyteam@gmail.com
*
* Licenza : GPLv3
*
* Descrizione: classe per la pulizia dei dati per un grafo: non crea il grafo ma
*             pulisce solamente i dati dai metadati ed informazioni inutili
*
* Registro modifiche :
* Paolo Eccher           || 2018-04-10 || Apportate modifiche funzione "wipe"
* Giuseppe Merlino       || 2018-04-06 || Realizzazione funzione "wipe"
* Elia Montecchio        || 2018-04-05 || Realizzazione classe GraphCleaner
* Elia Montecchio        || 2018-04-05 || Creazione file
*
*/


//  STRATEGY
class GraphCleaner {

  // clean(data) {
  //   var cleanedGraphData = [];
  //   data.forEach(el => {
  //     cleanedGraphData.push(this.wipe(el));
  //   })
  //
  //   return cleanedGraphData;
  // }

  clean(data) {
    var cleanedGraphData = [];
    var counter = 0;
    var sec_counter = 0;

    for (var i = 0; i < data.length; i++) {
      // queste richieste di span.kind=="server" sono richieste http che
      // l'applicazione fa a se stessa, anche se comunque sono scatenate da un
      // utente "finale"
      if ("span.kind" in data[i] && data[i]["span.kind"] == "server") {
        cleanedGraphData[counter++] = data[i];
      }
      // queste sono richieste effettuate al database.
      if ('db.type' in data[i]) {
        cleanedGraphData[counter++] = data[i];
      }
    }
    return cleanedGraphData;
  }

}

module.exports = GraphCleaner;
