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

  constructStack() {
    this.dataCleaner = new DataCleaner(new StackStrategy());
    console.log("DR: ");
    console.log(this.dr);
    return new Promise((resolve, reject) => {
      // this.dataCleaner = new DataCleaner(new StackCleaner());
      this.dr.readData().then(res => {
        console.log("Dati in getStack: ");
        console.log(res);

        console.log("res: ");
        console.log(res.hits);
        let data = [];
        data.push(this.dataCleaner.cleanDataStack(res));

        console.log("datsss");
        console.log(data);
        // divideRequest(data);

        this.stackBuilder.builTraces(this.http, this.pageload, this.db);

        resolve(this.stackBuilder.traces);
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
