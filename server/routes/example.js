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

    server.route({
        path: '/api/stabHavana/indices',
        method: 'GET',
        handler(req, reply) {

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

            var client = new elasticsearch.Client({
                host: '34.245.86.64:9200',
            });

            // var client = new elasticsearch.Client( {  
            //     hosts: [
            //       'https://34.245.86.64:9200/'
            //     ]
            //   });

            // client.cluster.health({}, function (err, resp, status) {
            //     console.log("-- Client Health --", resp);
            // });
            client.search({
                index: 'stagemonitor-spans-2018.03.25',
                // type: 'spans',
                // body: {
                //     query: { 
                //         match: {
                //               body: ''
                //             // body: 'elasticsearch'
                //         }
                //     }
                // }
            }).then(function (resp) {
                var hits1 = resp.hits.hits;
                var secondResponse=client.search({
                    index: 'stagemonitor-spans-2018.03.29',
                }).then( function(resp2){
                    var hits2 = resp2.hits.hits;
                    console.trace(hits2);
                    reply([hits1,hits2]);
                },function (err1){});
                // var hits2 = secondResponse['hits'];
                // var obj = Object.assign({},hits,hits1);
                // var hits2 = hits1.hits.hits;
                // reply(hits2);
            }, function (err) {
                console.trace(err.message);
            });
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