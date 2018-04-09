
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

    tracesIndices(){
        // TODO estrarre la salse
        return this.es.tracesIndices(); 
    }

    readData() {
        // Esempio: passo dei dati al nostro getData dove verranno gestiti
        let customIndices = [
            'stagemonitor-spans-2018.03.25',
            'stagemonitor-spans-2018.03.28',
            'stagemonitor-spans-2018.03.29',
            'stagemonitor-spans-2018.04.01'
        ]
        return this.es.getData(customIndices);
    }
}

module.exports = DataReader;
