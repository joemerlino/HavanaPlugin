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

            callWithRequest(req, 'search', {
                index: 'stagemonitor-spans-2018.03.28'
            }).then(function (response) {
                reply(response);
            });
        }
        /*
        handler(req, reply) {
            callWithRequest(req, 'cluster.state').then(function (response) {
                reply(Object.keys(response.metadata.indices));
            });
        }*/
    });

}