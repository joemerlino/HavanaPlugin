/*

* File : routes.js
* Versione : 1.0
* Tipo : Javascript
* Data : 2018-03-20
* Autore : SWEefty Team 
* E-mail : sweeftyteam@gmail.com 
*
* Licenza :				
*				
* Descrizione: 
*
* Registro modifiche :
* Paolo Eccher || 2018-03-20 || Scrittura funzione default
* Paolo Eccher || 2018-03-20 || Creazione file
*
*/

var elasticsearch = require('elasticsearch');

export default function (server) {

    server.route({
        path: '/api/havana/allIndices',
        method: 'GET',
        handler(req, reply) {
            var client = new elasticsearch.Client({
                host: 'localhost:9200',
                // host: '34.245.86.64:9200',
            });
            client.cat.indices({
                format : 'json'
            }).then(function (resp) {
                reply(resp);
            }, function (err) {
                console.trace(err.message);
            });
        }
    })

    // const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');

    // // funzione per la lettura di tutti gli indici presenti nella lista degli indici
    // function forwardFetchIndices(indicesList, elasticClient, pastResults, reply) {
    //     // TODO: sistemare, se indiceList è vuoto si rompe!

    //     if (indicesList.length == 1) {
    //         // 1 solo indice => puoi completare immediatamente la ricerca erestituire
    //         const currentIndex = indicesList.pop();
    //         elasticClient.search({
    //             index: currentIndex
    //         }).then(function (resp) {

    //             pastResults.push(resp.hits.hits);
    //             reply(pastResults);

    //         }, function (err) {
    //             console.trace(err.message);
    //         });

    //     } else {
    //         // più di 1 indice => devi eseguire la ricerca sul corrente e far restituire la risposta in seguito
    //         const currentIndex = indicesList.pop();
    //         elasticClient.search({
    //             index: currentIndex
    //         }).then(function (resp) {

    //             pastResults.push(resp.hits.hits);
    //             forwardFetchIndices(indicesList, elasticClient, pastResults, reply);

    //         }, function (err) {
    //             console.trace(err.message);
    //         });
    //     }
    // }

    server.route({
        path: '/api/havana/index',
        method: 'GET',
        handler(req, reply) {
            // console.log(req['query']['index']); // da testare
            const requiredIndex= req['query']['index'];

            var client = new elasticsearch.Client({
                // host: '34.245.86.64:9200',
                host: 'localhost:9200',
            });

            client.search({
                index: requiredIndex
            }).then(function (resp) {
                reply(resp);
            }, function (err) {
                console.trace(err.message);
            });
        }
    })

    // server.route({
    //     path: '/api/havana/indices',
    //     method: 'GET',
    //     handler(req, reply) {

    //         var client = new elasticsearch.Client({
    //             host: '34.245.86.64:9200',
    //         });

    //         forwardFetchIndices(getIndices(), client, new Array(), reply);
    //     }
    // });

}
