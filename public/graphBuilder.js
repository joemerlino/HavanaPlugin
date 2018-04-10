let GraphCleaner = require('./strategies/graphcleaner');
let DataCleaner = require('./dataCleaner');

class GraphBuilder {

  constructor(dataReader) {
    this.dr = dataReader;
  }

  setDataReader(dr) {
    this.dr = dr;
  }

  checkIfNodeIsNotPresent(dg, st) {
    //dg contiene tutte i nodi da plottare, st(singletrace) è il candidato ad entrare nell'insieme.
    //funzione che controlla che un candidato ad entrare nel set dei nodi univoci non sia già presente nel set (Array)
    var result = true;
    for (var i = 0; i < dg.length && result == true; i++) {
      if (dg[i].name == st.name) {
        result = false;
      }
    }
    return result;
  }

  // dato un array di span contenente richieste http e a db deve estrapolare una
  // lista di tutti i nodi che faranno parte della mappa senza che vi siano
  // ripetizioni
  getNodes(data) {
    var id_counter = 1;
    var nodes = [];
    for (var i = 0; i < data.length; i++) {

      if (data[i]['type'] == "jdbc") {
        var candidate = {
          "name": data[i]['db.type'],
          "type": "Database",
          "id": id_counter
        }
        if (this.checkIfNodeIsNotPresent(nodes, candidate)) {
          nodes.push(candidate);
          id_counter++;
        }

      }

      if (data[i]['type'] == "http") {
        var candidate = {
          "name": data[i]["application"],
          "type": "Server",
          "id": id_counter
        }
        if (this.checkIfNodeIsNotPresent(nodes, candidate)) {
          nodes.push(candidate);
          id_counter++;
        }
      }
    }
    return nodes;
  }

  //COntrolla se nodo era già presente, per determinarlo controlla sorgente e target
  checkIfLinkIsNotPresent(links, candidate) {
    var result = true;
    for (var i = 0; i < links.length && result == true; i++) {
      if (links[i].source == candidate.source && links[i].target == candidate.target) {
        result = false;
      }
    }
    return result;
  }

  //Dato un nome di un nodo(assunto come chiave... not advisable) ritorna il suo id nella lista dei nodi.
  //TODO: nome non dovrà essere chiave.
  //TODO: gestire caso in cui non vi sia nella lista.
  getIdOfNode(nodes, name) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].name == name) {
        return nodes[i].id;
      }
    }
  }

  getIndexOfSameLink(links, candidate) {
    for (var i = 0; i < links.length; i++) {
      if (links[i].target == candidate.target && links[i].source == candidate.source) {
        return i;
      }
    }
  }

  //data una lista di nodi e di richiesta http, db costruisce un array di collegamenti tra nodi
  //per ora riesce a captare chiamate a DB, senza esempi di server è difficile
  //TODO: implementare chiamate a server
  //TODO: refactorizzare
  getLinks(nodes, data) {

    var links = [];
    for (var i = 0; i < data.length; i++) {
      //analizza chiamate a db
      if ("db.type" in data[i]) {
        //crea un collegamento candidato ad entrare nel set dei links
        var candidate = {
          "source": this.getIdOfNode(nodes, data[i].application),
          "target": this.getIdOfNode(nodes, data[i]['db.type']),
          "type": "Database", //per ora è fisso
          "avg_response_time_ms": data[i].duration_ms,
          "number_of_requests": 1
        }

        //se il link non era presente (controllo su univocità della coppia source/target) nella lista dei links inseriscilo
        if (this.checkIfLinkIsNotPresent(links, candidate)) {
          links.push(candidate);
        } else { //se invece era presente aggiorna il suo tempo medio di risposta
          var index = this.getIndexOfSameLink(links, candidate);
          var total_response_time = links[index]['avg_response_time_ms'] * links[index]['number_of_requests'];
          total_response_time = total_response_time + candidate['avg_response_time_ms'];
          candidate['number_of_requests'] = links[index]['number_of_requests'] + 1;
          candidate['avg_response_time_ms'] = total_response_time / candidate['number_of_requests'];

          //togli il collegamento e inserisci il candidate con tempo medio e numero di richieste aggiornato
          var index = this.getIndexOfSameLink(links, candidate);
          if (index > -1) {
            var x = links.splice(index, 1);
          }
          links.push(candidate);

        }
      }
    }
    return links;
  }

  getGraph() {
    // retieve data
    this.dataCleaner = new DataCleaner(new GraphCleaner());

    return new Promise((resolve, reject) => {
      this.dr.readData().then(res => {

        let d = this.dataCleaner.cleanData(res);
        var dataGraph = {};

        let data = []; //flaterizzo data
        for (var i = 0; i < d.length; i++) {
          for (var j = 0; j < d[i].length; j++) {
            data.push(d[i][j]);
          }
        }

        let nodesArr = this.getNodes(data);
        let linksArr = this.getLinks(nodesArr, data);

        dataGraph['nodes'] = nodesArr;
        dataGraph['links'] = linksArr;

        d = dataGraph; // useless ma la lascio per legacy

        // return this.data;
        resolve(dataGraph);

      }).catch(e => console.log(e));
    });

  }
}

module.exports = GraphBuilder;
