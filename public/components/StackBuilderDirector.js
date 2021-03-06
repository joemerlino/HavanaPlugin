  const DataCleaner = require('./dataCleaner');
  const StackStrategy = require('./strategies/stackcleaner');


class StackBuilderDirector {
  constructor(dr, stackBuilder) {
    this.dr = dr;
    this.stackBuilder = stackBuilder;
    this.http = [];
    this.pageload = [];
    this.db = [];
  }

  setDataReader(dr) {
    this.dr = dr;
  }

  constructStack() {
    this.dataCleaner = new DataCleaner(new StackStrategy());
    return new Promise((resolve, reject) => {
      // this.dataCleaner = new DataCleaner(new StackCleaner());
      this.dr.readData().then(res => {
        // console.log("Dati in getStack: ");
        // console.log(res);

        let data = this.dataCleaner.cleanDataStack(res);
        this.divideRequest(data);

        this.stackBuilder.buildTraces(this.http, this.pageload, this.db);

        resolve(this.stackBuilder.stacktrace.getTraces());
      });

    })

  }

  divideRequest(requests) {
    requests.forEach((el) => {
      if("type" in el) {
        switch(el.type) {
          case "pageload": this.pageload.push(el);
          break;

          case "http": this.http.push(el);
          break;

          case "jdbc": this.db.push(el);
          break;
        }
      }
    })
  }
}

module.exports = StackBuilderDirector;
