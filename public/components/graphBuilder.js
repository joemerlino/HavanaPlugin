/*

* File : graphBuilder.js
* Versione : 1.0.0
* Tipo : Javascript
* Data : 2018-03-27
* Autore : SWEefty Team
* E-mail : sweeftyteam@gmail.com
*
* Licenza : GPLv3
*
* Descrizione: classe che contiene la logica del grafo, qui i dati puliti vengo-
*              no elaborati logicamente e restitutiti in forma corretta per
*              essere renderizzati
*
* Registro modifiche :
* Alberto Gallinaro  || 2018-04-10 || Rivista logica funzione "getGraph"
* Davide Zago        || 2018-04-10 || Implementazione funzione "getGraph"
* Giuseppe Merlino   || 2018-04-08 || Corretto BUG sulla variabile id_counter della funzione "buildNodes"
* Alberto Gallinaro  || 2018-04-07 || Costruita array di collegamenti tra nodi funzione "buildLinks"
* Elia Montecchio    || 2018-04-06 || Implementate chiamate server funzione "buildLinks"
* Elia Montecchio    || 2018-04-05 || Scrittura funzione "buildLinks"
* Paolo Eccher       || 2018-04-04 || Rivista funzione funzioni "checkIfNodeIsNotPresent"
* Francesco Parolini || 2018-04-03 || Implementazione funzioni "buildLinks"
* Alberto Gallinaro  || 2018-03-30 || Implementazione funzioni "getIdOfNode","getIndexOfSameLink"
* Davide Zago        || 2018-03-28 || Implementazione funzioni "checkIfNodeIsNotPresent","buildNodes"
* Alberto Gallinaro  || 2018-03-27 || Realizzazione classe GraphBuilder
* Davide Zago        || 2018-03-27 || Creazione file
*
*/

let GraphCleaner = require('./strategies/graphcleaner');
let DataCleaner = require('./dataCleaner');
let Graph = require('./Graph');

class GraphBuilder {

  constructor(dataReader) {
    this.dr = dataReader;
    this.graph = new Graph();
  }

  setDataReader(dr) {
    this.dr = dr;
  }

  checkIfNodeIsNotPresent(dg, st) {
    // dg contiene tutte i nodi da plottare, st(singletrace) è il candidato ad
    // entrare nell'insieme. Funzione che controlla che un candidato ad entrare
    // nel set dei nodi univoci non sia già presente nel set (Array)
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
  buildNodes(data) {
    var id_counter = 1;
    var nodes = [];

    for (var i = 0; i < data.length; i++) {
    //by paulio: qui chiamerei una funzia che genera un candidato, tipo buildCandidate(data[i]), che costruisce un candidato e poi chiama checkIfNodeIsNotPresent su nodes e il candidato, perchè cosi fa abba cagare
      if (data[i]['type'] == "jdbc") {
        var candidate = {
          "name": data[i]['db.type'],
          "type": "Database",
          "id": id_counter
        }
        if (this.checkIfNodeIsNotPresent(this.graph.getNodes(), candidate)) {
          // nodes.push(candidate);
          this.graph.addNode(candidate);
          id_counter++;
        }

      }

      if (data[i]['type'] == "http") {
        var candidate = {
          "name": data[i]["application"],
          "type": "Server",
          "id": id_counter
        }
        if (this.checkIfNodeIsNotPresent(this.graph.getNodes(), candidate)) {
          this.graph.addNode(candidate);
          id_counter++;
        }
      }
    }
    return this.graph.getNodes();

  }

  //Controlla se nodo era già presente, per determinarlo controlla sorgente e target
  checkIfLinkIsNotPresent(links, candidate) {
    var result = true;
    for (var i = 0; i < links.length && result == true; i++) {
      if (links[i].source == candidate.source && links[i].target == candidate.target) {
        result = false;
      }
    }
    return result;
  }

  //Dato un nome di un nodo ritorna il suo id nella lista dei nodi.

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
  //TODO: refactorizzare, in particolare l'aggiornamento sull'average time che è oscieno
  //TODO: creare una funzione buildCandidate(data[i]) che crea un candidato, speculare a quella in buildNodes()
  buildLinks(nodes, data) {
    // var links = [];
    for (var i = 0; i < data.length; i++) {
      //analizza chiamate a db
      if ("db.type" in data[i]) {
        //crea un collegamento candidato ad entrare nel set dei links
        var candidate = {
          "source": this.getIdOfNode(this.graph.getNodes(), data[i].application),
          "target": this.getIdOfNode(this.graph.getNodes(), data[i]['db.type']),
          "type": "Database", //per ora è fisso
          "avg_response_time_ms": data[i].duration_ms,
          "number_of_requests": 1
        }

        //se il link non era presente (controllo su univocità della coppia source/target) nella lista dei links inseriscilo
        if (this.checkIfLinkIsNotPresent(this.graph.getLinks(), candidate)) {
          // links.push(candidate);
          this.graph.addLink(candidate)
        } else { //se invece era presente aggiorna il suo tempo medio di risposta
          var index = this.getIndexOfSameLink(this.graph.getLinks(), candidate);
          var total_response_time =
            this.graph.links[index]['avg_response_time_ms'] *
            this.graph.links[index]['number_of_requests'];
          total_response_time =
            total_response_time + candidate['avg_response_time_ms'];
          candidate['number_of_requests'] =
            this.graph.links[index]['number_of_requests'] + 1;
          candidate['avg_response_time_ms'] =
            total_response_time / candidate['number_of_requests'];

          //togli il collegamento e inserisci il candidate con tempo medio e numero di richieste aggiornato
          var index = this.getIndexOfSameLink(this.graph.getLinks(), candidate);
          if (index > -1) {
            var x = this.graph.getLinks().splice(index, 1);
          }
          // links.push(candidate);
          this.graph.addLink(candidate);

        }
      }
    }
    return this.graph.getLinks();
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

        let nodesArr = this.buildNodes(data);
        let linksArr = this.buildLinks(nodesArr, data);

        dataGraph['nodes'] = nodesArr;
        dataGraph['links'] = linksArr;

        resolve(dataGraph);

      }).catch(e => console.log(e));
    });

  }
}

module.exports = GraphBuilder;
