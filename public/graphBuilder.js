// const DataCleaner = require('./DataCleaner');
// const GraphStrategy = require('./strategies/graphcleaner');
// const StackStrategy = require('./strategy/stackcleaner');


class GraphBuilder {

  constructor(dataReader, dataCleaner) {
    this.dr = dataReader;
    this.dc = dataCleaner;
  }

  setDataCleaner(dc) {
    this.dc = dc;
  }

  setDataReader(dr){
    this.dr = dr;
  }

  getGraph() {
    
    // retieve data
    this.data = this.dc.cleanData(this.dr.readData());
    
    // parse data
    // magia da implementare
    this.data = this.data;

    // stubberini
    return this.data = {
      nodes: [
        {
          name: 'AWS Server',
          type: 'Server',
          id: 1,
          stack_trace: [
            {
              nome: 'SQL QUERY',
              error: false,
              duration: 3
            },
            {
              nome: 'SYS_CALL',
              error: true,
              duration: 711
            }
          ]
        },
        {
          name: 'DB_STORE',
          type: 'Database',
          id: 2,
          stack_trace: [
            {
              nome: 'SQL QUERY',
              error: false,
              duration: 340
            },
            {
              nome: 'trigger execution',
              error: true,
              duration: 1200
            }
          ]
        },
        {
          name: 'Neo4j',
          type: 'Database',
          id: 3,
          stack_trace: [
            {
              nome: 'executing query',
              error: false,
              duration: 21
            },
            {
              nome: 'com.graph.reflect.distr',
              error: true,
              duration: 11
            }
          ]
        },
        {
          name: 'Graph Database',
          type: 'Database',
          id: 4,
          stack_trace: [
            {
              nome: 'computing query',
              error: false,
              duration: 800
            },
            {
              nome: 'SYS_CALL',
              error: true,
              duration: 12
            }
          ]
        }
      ],
      links: [
        {
          source: 1,
          target: 2,
          type: '40'
        },
        {
          source: 1,
          target: 3,
          type: '20'
        },
        {
          source: 2,
          target: 4,
          type: '40'
        },
        {
          source: 1,
          target: 4,
          type: '10'
        }
      ]
    };

    // return data
    return this.data;
  }

}

module.exports = GraphBuilder;
