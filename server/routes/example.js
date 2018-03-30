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
        callWithRequest(req, 'search', {
            index: 'stagemonitor-metrics-2018.03.30'
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