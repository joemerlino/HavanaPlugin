let StackCleaner = require('./strategies/graphcleaner');
let DataCleaner = require('./dataCleaner');

class StackBuilder {

    constructor(dataReader) {
      this.dr = dataReader;
    }
  
    setDataReader(dr){
      this.dr = dr;
    }
  
    getStack() {
      
      // retieve data
      this.dataCleaner = new DataCleaner(new StackCleaner());
      this.data = this.dataCleaner.cleanData(this.dr.readData());
      
      // parse data
      // magia da implementare
      this.data = this.data; 
  
      // stubberini
      return this.data = {
        // QUI ALBERTO METTICI I TUOI DATI FASULLI
      };
    }
  
  }
  
  module.exports = StackBuilder;
  