
// classe che si deve occupare della lettura di dati da elasticsearch
// ritorna dati grezzi
class DataReader {

    constructor(elasticInstance) {
        this.es = elasticInstance;
    }

    // imposta la sorgente dei dati
    setElasticsearchInstance(elastic) {
        this.es = elastic;
    }

    readData() {
        return this.es.getData;
    }
}

module.exports = DataReader;
