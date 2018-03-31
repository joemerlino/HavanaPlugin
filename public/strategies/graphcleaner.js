// const GraphCleaner = function() {
//     this.query = function() {
//         return "GraphCleaner query eseguita";
//     }
// }


// const GraphCleaner = {
//     "query" : function() {
//       return "GraphCleaner query eseguita";
//     }
// }

//  STRATEGY

class GraphCleaner {

  constructor(elasticInstance) {
    this.data = null;
    this.es = elasticInstance;
  }

  query() {
    // return "ho bisogno di un testo a parte perché c'é confusione";
    
    // OUTPUT DI PROVA QUI PAOLO
    return this.es.getData;
    // this.data = "ho bisogno di un testo a parte perché c'é confusione";
  }

  clean() {

  }

  getdata() {
    // query
    // return clean della precedente
  }

}

module.exports = GraphCleaner;
