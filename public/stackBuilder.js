class StackBuilder {

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
  
    getStack() {
      
      // retieve data
      this.data = this.dc.cleanData(this.dr.readData());
      
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
  