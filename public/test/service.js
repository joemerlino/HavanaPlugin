
let chai = require('chai');
let should = chai.should();
let chaiHttp = require('chai-http');
var fetchUrl = require("fetch").fetchUrl;

chai.use(chaiHttp)

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
    fetchUrl('http://localhost:5601/eyf/api/havana/allIndices', function(err, meta, body) {
      let tmp = extrapolateIndex(JSON.parse(body.toString()))
      tmp.should.be.an('array');

      done()
    })
  });

  it('it should GET one index', (done) => {
    fetchUrl('http://localhost:5601/eyf/api/havana/allIndices', function(err, meta, body) {
      let res = JSON.parse(body.toString());
      let tmp = extrapolateIndex(res);

      fetchUrl('http://localhost:5601/eyf/api/havana/index?index=' + tmp[0], function(err, meta, body) {
        let response = JSON.parse(body.toString());

        response.should.be.an('object');
        done()
      })
    })

  });

  it('it should GET all the data from indexes', (done) => {
    fetchUrl('http://localhost:5601/eyf/api/havana/allIndices', function(err, meta, body) {
      let res = JSON.parse(body.toString());
      let tmp = extrapolateIndex(res);

      let data = []
      tmp.forEach((el) => {
        fetchUrl('http://localhost:5601/eyf/api/havana/index?index=' + tmp[0], function(err, meta, body) {
          data.push(JSON.parse(res.toString()))
        })
      })

      data.should.be.an('array');
      done();
    })
  })

});
