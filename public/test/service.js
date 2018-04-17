/*

* File : gbuilder.js
* Versione : 1.0.0
* Tipo : Javascript
* Data : 2018-04-18
* Autore : SWEefty Team
* E-mail : sweeftyteam@gmail.com
*
* Licenza : GPLv3
*
* Descrizione: unit test per le chiamate Rest
*
* Registro modifiche :
* Alberto Gallinaro  || 2018-04-18 || RestAPI test
* Lisa Parma         || 2018-04-18 || funzione extrapolateIndex e import dati mock
* Alberto Gallinaro  || 2018-04-18 || Creazione file
*
*/
let chai = require('chai');
let should = chai.should();
let chaiHttp = require('chai-http');
var fetchUrl = require("fetch").fetchUrl;

chai.use(chaiHttp)

let devPrefix = process.argv[3];
console.log("Parametro rilevato: " + process.argv[3]);


function extrapolateIndex(body) {
  let tmp = []
  body.forEach((el) => {
    tmp.push(el.index);
  })

  return tmp;
}

// Mortus Docent Vivus
// res.should.have.status(200);
// res.body.should.be.a('array');
// res.body.length.should.be.eql(0);

describe('Rest API test', () => {
  it('it should GET all the indices', (done) => {
    fetchUrl(`http://localhost:5601/${devPrefix}/api/havana/allIndices`, function(err, meta, body) {
      let tmp = extrapolateIndex(JSON.parse(body.toString()))
      tmp.should.be.an('array');
      done()
    })
  });

  it('it should GET one index', (done) => {
    fetchUrl(`http://localhost:5601/${devPrefix}/api/havana/allIndices`, function(err, meta, body) {
      let res = JSON.parse(body.toString());
      let tmp = extrapolateIndex(res);

      fetchUrl(`http://localhost:5601/${devPrefix}/api/havana/index?index=` + tmp[0], function(err, meta, body) {
        let response = JSON.parse(body.toString());
        response.should.be.an('object');
        done()
      })
    })

  });

  it('it should only return data containing traces', (done) => {
    fetchUrl(`http://localhost:5601/${devPrefix}/api/havana/allIndices`, function(err, meta, body) {
      let res = JSON.parse(body.toString());
      let tmp = extrapolateIndex(res);

      let data = []
      tmp.forEach((el) => {
        fetchUrl(`http://localhost:5601/${devPrefix}/api/havana/index?index=` + tmp[0], function(err, meta, body) {
          let d = JSON.parse(body.toString());
          d.hits.hits.forEach((el) => {
            el.should.have.deep.property('trace_id')
          })
          data.push(JSON.parse(body.toString()))
        })
      });
      done();
    })
  })

});
