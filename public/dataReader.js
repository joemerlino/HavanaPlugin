
// classe che si deve occupare della lettura di dati da elasticsearch
// ritorna dati grezzi
class DataReader {

    constructor(elasticInstance) {
        this.es = elasticInstance;
    }

    setElasticsearchInstance(elastic) {
        this.es = elastic;
    }

    readData() {
        return this.es.getData;
    }
}

module.exports = DataReader;
