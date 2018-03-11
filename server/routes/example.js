export default function (server) {

  server.route({
    path: '/api/stabHavana/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });
  server.route({
    path: '/api/stabHavana/logs',
    method: 'GET',
    handler(req, reply) {
        // reply({time: "data text with sense"});
        const { callWithRequest } = server.plugins.elasticsearch.getCluster('data')

        let options = {
            body : {
                query : {
                    bool : {
                        must :{
                            query_string : {
                                query : "SYS_CALL"
                            }
                        }
                    }
                }
            }
        }
        console.log("\n\n\n\n");
        callWithRequest(req, 'search', options).then(res => console.log(JSON.stringify(res.hits)));
        callWithRequest(req, 'search', options).then(res => reply({logs: res.hits}));
    }
  });

}
