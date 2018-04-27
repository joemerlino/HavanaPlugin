/*

* File : stackcleaner.js
* Versione : 1.0.0
* Tipo : Javascript
* Data : 2018-03-30
* Autore : SWEefty Team
* E-mail : sweeftyteam@gmail.com
*
* Licenza : GPLv3
*
* Descrizione: classe per la pulizia dei dati per una stack: non deve creare la
*						 stack ma solamente pulire i dati da metadati ed informazioni
*						 inutili
*
* Registro modifiche :
* Davide Zago || 2018-04-05 || Realizzazione funzione "clean"
* Lisa Parma  || 2018-03-31 || Realizzazione classe StackCleaner
* Lisa Parma  || 2018-03-30 || Creazione file
*
*/


//  STRATEGY
class StackCleaner {
	clean(data) {

		var countPL = 0;
		var countHT = 0;
		var countQR = 0;
	  var cleanedStackData = [];
	  // cleanedStackData['pageload'] = [];
	  // cleanedStackData['http'] = [];
	  // cleanedStackData['query'] = [];

		// console.log("Dati in stackclenaer");
		// console.log(data);

		data.forEach((el) => {
			// console.log(el);
			if("type" in el) {
        switch(el.type) {
          case "pageload": cleanedStackData.push(el);
          break;

          case "http": cleanedStackData.push(el);
          break;

          case "jdbc": cleanedStackData.push(el);
          break;
        }
      }
		});

	  // for ( var i = 0 ; i < data.length ; i++ ) {
	  //   if ( "type" in data[i] && data[i]["type"] == "pageload") {
	  //     	cleanedStackData['pageload'][countPL++] = data[i];
	  //   }
		//
	  //   if("type" in data[i] && data[i]["type"] == "http"){
	  //   	cleanedStackData['http'][countHT++] = data[i];
	  //   }
		//
	  //   if("type" in data[i] && data[i]["type"] == "jdbc"){
	  //   	cleanedStackData['query'][countQR++] = data[i];
	  //   }
		//
		// }
	  return cleanedStackData;
  }
}

module.exports = StackCleaner;
