/*

* File : routes.js
* Versione : 1.0.0
* Tipo : Javascript
* Data : 2018-03-20
* Autore : SWEefty Team
* E-mail : sweeftyteam@gmail.com
*
* Licenza : GPLv3
*
* Descrizione: server api, qui vengolo implementate gli endopoint API che si
*              occupano di effettuare chiamate ad elasticsearch
*
* Registro modifiche :
* Francesco Parolini || 2018-04-20 || Implementato lettura host elasticsearch dalle configurazioni
* Francesco Parolini || 2018-04-14 || Implementato il limite di documenti ritornati
* Paolo Eccher || 2018-03-20 || Scrittura funzione default
* Paolo Eccher || 2018-03-20 || Creazione file
*
*/

var elasticsearch = require('elasticsearch');
let ConfigOptions = require('./config');

export default function(server) {

  server.route({
    // ROUTE per la lettura degli indici del database Elasticsearch
    path: '/api/havana/allIndices',
    method: 'GET',
    handler(req, reply) {
      var client = new elasticsearch.Client({
        //host: ConfigOptions.getElasticsearchHost(),
        host: '54.154.152.204:9200',
      });
      client.cat.indices({
        format: 'json'
      }).then(function(resp) {
        reply(resp);
      }, function(err) {
        console.trace(err.message);
      });
    }
  })

  server.route({
    //ROUTE per la lettura dei documenti di un indice del database Elasticsearch
    path: '/api/havana/index',
    method: 'GET',
    handler(req, reply) {
      const requiredIndex = req['query']['index'];
      const documentsQueryLimit = req['query']['limit']; // limite di risposte richiesto dall'utente
      // TODO : ricerca per tipo di trace
      const documentsQuery = req['query']['type'];
      var documentsLimit;

      if (documentsQueryLimit == null) {
        // non è stato richiesto un limite -> il limite è quello della configurazione di default
        documentsLimit = ConfigOptions.getMaxDocumentsNumber();
      } else {
        if (documentsQueryLimit > ConfigOptions.getMaxDocumentsNumber()) {
          // richiesti più documenti di quelli configurati -> richiesta limitata a quelli configurati
          documentsLimit = ConfigOptions.getMaxDocumentsNumber();
        } else {
          // richiesto un numero ragionevole di documenti -> può essere utilizzato
          documentsLimit = parseInt(documentsQueryLimit);
        }
      }

      var client = new elasticsearch.Client({
        host: '54.154.152.204:9200',
        //host: ConfigOptions.getElasticsearchHost(),
      });

      client.search({
        index: requiredIndex,
        size: documentsLimit
      }).then(function(resp) {
        reply(resp);
      }, function(err) {
        console.trace(err.message);
      });
    }
  })
}
