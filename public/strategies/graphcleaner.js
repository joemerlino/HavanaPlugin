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
    console.log("GraphCleaner::query");
    console.log(this.es); // questa mi pare una pagina html
    console.log(this.es.getData); // questo da undefined
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
