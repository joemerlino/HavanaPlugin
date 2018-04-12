
// classe che si deve occupare della lettura di dati da elasticsearch
// ritorna dati grezzi
class DataReader {

    constructor(elasticInstance) {
        this.es = elasticInstance;
    }

    // imposta la sorgente dei dati
    // TODO: questa diventerà elasticsearchClient  !!!!!!!
    setElasticsearchInstance(elastic) {
        this.es = elastic;
    }

    tracesIndices(){
        const indices = this.es.tracesIndices();
        return indices; 
    }
    
    readIndex(indexName){
        return this.es.getIndex(indexName);
    }

    readData() {
        // Esempio: passo dei dati al nostro getData dove verranno gestiti
        this.tracesIndices().then(res => {
            console.log("Trace ricevuti: ");
            console.log(res);


            this.es.getData(res).then(r => {
                console.log(r);
            })
        });
        // let customIndices = [
        //     'stagemonitor-spans-2018.03.25',
        //     'stagemonitor-spans-2018.03.28',
        //     'stagemonitor-spans-2018.03.29',
        //     'stagemonitor-spans-2018.04.01'
        // ]
        // return this.es.getData(customIndices);
    }
}

module.exports = DataReader;
