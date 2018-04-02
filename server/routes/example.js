var elasticsearch = require('elasticsearch');

export default function (server) {

    server.route({
        path: '/api/stabHavana/example',
        method: 'GET',
        handler(req, reply) {
            reply({ time: (new Date()).toISOString() });
        }
    });

    const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');

    function getIndices() {
        // TODO: questa funzione dovrà essere resa intelligente ed essere in grado di leggere tutti gli indici automaticamente, per ora inseriti a mani
        var ind = new Array();
        ind.push('stagemonitor-spans-2018.03.25');
        ind.push('stagemonitor-spans-2018.03.28');
        ind.push('stagemonitor-spans-2018.03.29');
        ind.push('stagemonitor-spans-2018.04.01');
        return ind;
    }

    // funzione per la lettura di tutti gli indici presenti nella lista degli indici
    function forwardFetchIndices(indicesList, elasticClient, pastResults, reply) {
        // TODO: sistemare, se indiceList è vuoto si rompe!

        if (indicesList.length == 1) {
            // 1 solo indice => puoi completare immediatamente la ricerca erestituire
            const currentIndex = indicesList.pop();
            elasticClient.search({
                index: currentIndex
            }).then(function (resp) {

                pastResults.push(resp.hits.hits);
                console.log(pastResults);
                reply(pastResults);

            }, function (err) {
                console.trace(err.message);
            });

        } else {
            // più di 1 indice => devi eseguire la ricerca sul corrente e far restituire la risposta in seguito
            const currentIndex = indicesList.pop();
            elasticClient.search({
                index: currentIndex
            }).then(function (resp) {

                pastResults.push(resp.hits.hits);
                console.log(pastResults);
                forwardFetchIndices(indicesList, elasticClient, pastResults, reply);

            }, function (err) {
                console.trace(err.message);
            });
        }

    }

    server.route({
        path: '/api/stabHavana/indices',
        method: 'GET',
        handler(req, reply) {

            var client = new elasticsearch.Client({
                host: '34.245.86.64:9200',
            });

            forwardFetchIndices(getIndices(), client, new Array(), reply);

            // client.cluster.health({}, function (err, resp, status) {
            //     console.log("-- Client Health --", resp);
            // });
            // client.search({
            //     index: 'stagemonitor-spans-2018.03.25',
            //     // type: 'spans',
            //     // body: {
            //     //     query: { 
            //     //         match: {
            //     //               body: ''
            //     //             // body: 'elasticsearch'
            //     //         }
            //     //     }
            //     // }
            // }).then(function (resp) {
            //     var hits1 = resp.hits.hits;
            //     var secondResponse = client.search({
            //         index: 'stagemonitor-spans-2018.03.29',
            //     }).then(function (resp2) {
            //         var hits2 = resp2.hits.hits;
            //         console.trace(hits2);
            //         reply([hits1, hits2]);
            //     }, function (err1) { });
            //     // var hits2 = secondResponse['hits'];
            //     // var obj = Object.assign({},hits,hits1);
            //     // var hits2 = hits1.hits.hits;
            //     // reply(hits2);
            // }, function (err) {
            //     console.trace(err.message);
            // });
            // TODO: implementare la rcerca su più  indici. ora cerca solamente su un indice. gli altri sono: 
            // stagemonitor-spans-2018.03.29
            // stagemonitor-spans-2018.03.28
            // stagemonitor-spans-2018.04.01
            // stagemonitor-spans-2018.03.25

            // callWithRequest(req, 'search', {
            //     // index: 'stagemonitor-spans-2018.03.29'
            //     index: 'stagemonitor-spans-2018.03.25'
            //     // type: 'spans'
            //     // index: 'stagemonitor-spans-2018.03.28, stagemonitor-spans-2018.03.29'
            // }).then(function (response) {
            //     var data = {
            //         we: "ciao"
            //     };
            //     reply(data);
            //     // reply(response);
            // });

            // reply(hits);
            // }
            /*
            handler(req, reply) {
                callWithRequest(req, 'cluster.state').then(function (response) {
                    reply(Object.keys(response.metadata.indices));
                });*/

        }
    });

}