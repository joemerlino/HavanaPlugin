//  STRATEGY

// classe per la pulizia dei dati per un grafo: non deve creare il grafo ma solamente pulire i dati da metadati ed informazioni inutil
class StackCleaner {
	clean(data) {
		
	  var cleanedStackData = {};
	  cleanedStackData['pageload'] = [];
	  cleanedStackData['http'] = [];
	  cleanedStackData['query'] = [];

	  var countPL = 0;
	  var countHT = 0;
	  var countQR = 0;

	  for ( var i = 0 ; i < data.length ; i++ ) {
	    if ( "type" in data[i] && data[i]["type"] == "pageload") {
	      	cleanedStackData['pageload'][countPL++] = data[i];
	    }
	    
	    if("type" in data[i] && data[i]["type"] == "http"){
	    	cleanedStackData['http'][countHT++] = data[i];
	    }

	    if("type" in data[i] && data[i]["type"] == "jdbc"){
	    	cleanedStackData['query'][countQR++] = data[i];
	    }

	  }
	  return cleanedStackData;
		
	  /*return data;*/
  }
}

module.exports = StackCleaner;
