/*

* File : gbuilder.js
* Versione : 1.0.0
* Tipo : Javascript
* Data : 2018-04-14
* Autore : SWEefty Team
* E-mail : sweeftyteam@gmail.com
*
* Licenza : GPLv3
*
* Descrizione: unit tests per stackbuilder
*
* Registro modifiche :
* Alberto Gallinaro  || 2018-04-17 || Testing build_request
* Lisa Parma         || 2018-04-17 || StackBuilder test
* Alberto Gallinaro  || 2018-04-16 || Import dati mock
* Lisa Parma         || 2018-04-14 || Creazione file
*
*/

const SBuilder = require('../components/stackbuilder');
const chai = require('chai')
const should = chai.should();

let table = [{
    "selftime": "000039.01",
    "totaltime": "000134.82",
    "indent": 0,
    "name": "Error",
    "prole": 2,
    "figli": 2
  },
  {
    "selftime": "000004.85",
    "totaltime": "000004.85",
    "indent": 1,
    "name": "FrameworkServlet#service",
    "prole": 0,
    "figli": 0
  },
  {
    "selftime": "000090.96",
    "totaltime": "000090.96",
    "indent": 1,
    "name": "FrameworkServlet#service",
    "prole": 0,
    "figli": 0
  }
];
let rowP = 0;
let traceHTTP = {
  "duration_cpu_ms": 537.38167,
  "instance": "dev",
  "http.headers.accept-language": "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
  "tracking.unique_visitor_id": "2a5a943dc195052d486d6dbd1feb3923686d669b",
  "http.url": "/spring-petclinic/",
  "type": "http",
  "http.headers.accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "error": false,
  "user_agent.type": "Browser",
  "http.headers.connection": "close",
  "http.headers.host": "localhost:8080",
  "span.kind": "server",
  "host": "ip-172-31-22-53",
  "user_agent.os_version": "10.0",
  "id": "ec76860dfe81268f",
  "user_agent.browser": "Chrome",
  "call_tree_ascii": "----------------------------------------------------------------------\nSelftime (ms)              Total (ms)                 Method signature\n----------------------------------------------------------------------\n000137.18  008% ▓░░░░░░░░░ 001622.01  100% ██████████ Welcome\n000092.12  006% ▓░░░░░░░░░ 001484.83  092% █████████░ └── FrameworkServlet#service\n001392.71  086% ████████▓░ 001392.71  086% ████████▓░     └── DispatcherServlet#render\n",
  "trace_id": "ec76860dfe81268f",
  "method": "GET",
  "ip": "127.0.0.0",
  "user_agent.os_family": "Windows",
  "http.headers.user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
  "peer.port": 42884,
  "duration_ms": 1614.6859,
  "http.status_code": 200,
  "http.headers.accept-encoding": "gzip, deflate",
  "@timestamp": "2018-03-29T13:02:35.530+0000",
  "application": "Spring-Petclinic",
  "user_agent.os": "Windows",
  "parent_id": "904df5f1ce20d3d5",
  "stagemonitor.version": "0.87.5",
  "user_agent.device": "Personal computer",
  "gc_time_ms": 97,
  "user_agent.browser_version": "65.0.3325.181",
  "name": "Welcome",
  "http.headers.upgrade-insecure-requests": "1",
  "peer.ipv4_string": "127.0.0.0"
}
let tracePL = {
  "timing.time_to_first_paint": 2374,
  "instance": "dev",
  "timing.app_cache_lookup": 1,
  "http.url": "http://34.245.47.230/spring-petclinic/",
  "type": "pageload",
  "error": false,
  "timing.processing": 320,
  "user_agent.type": "Browser",
  "span.kind": "client",
  "host": "ip-172-31-22-53",
  "sampling.priority": 1,
  "user_agent.os_version": "10.0",
  "id": "904df5f1ce20d3d5",
  "timing.load": 4,
  "timing.request": 2102,
  "timing.unload": 0,
  "timing.resource": 2264,
  "user_agent.browser": "Chrome",
  "trace_id": "ec76860dfe81268f",
  "timing.tcp": 42,
  "timing.redirect": 0,
  "user_agent.header": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
  "ip": "127.0.0.0",
  "user_agent.os_family": "Windows",
  "timing.dns_lookup": 0,
  "duration_ms": 2468,
  "@timestamp": "2018-03-29T13:02:35.357+0000",
  "application": "Spring-Petclinic",
  "user_agent.os": "Windows",
  "timing.ssl": 0,
  "stagemonitor.version": "0.87.5",
  "user_agent.device": "Personal computer",
  "user_agent.browser_version": "65.0.3325.181",
  "name": "/spring-petclinic/",
  "timing.response": 119,
  "peer.ipv4_string": "127.0.0.0"
}

const sb = new SBuilder();

describe('StackBuilder tester', () => {
  describe('Testing tableToTree function', () => {
    let tree = sb.tableToTree(table, rowP);
    it('it should return an array ', () => {
      tree.should.be.an('array');
    })
    it('it should be well structured by having name, selftime and totaltime props', () => {
      tree[0].should.have.deep.property('name')
      tree[0].should.have.deep.property('selftime')
      tree[0].should.have.deep.property('totaltime')
    })
  }) // describe

  describe('Testing build_tree function', () => {
    let tree = sb.build_pageload_request(traceHTTP, tracePL);
    it('it should return an array', () => {
      tree.should.be.an('object');
    })
    it('it should have type, call_tree, status_code and timestamp properties', () => {
      tree.should.have.deep.property('type')
      tree.should.have.deep.property('call_tree')
      tree.should.have.deep.property('status_code')
      tree.should.have.deep.property('timestamp')
    })
    it('it should correctly identify type property', () => {
      tree.type.should.not.be.null
    })

  }) // describe

  describe('Testing build_request function', () => {
    let tree = sb.build_request(traceHTTP, tracePL);
    it('it should return an array', () => {
      tree.should.be.an('object');
    })
    it('it should be well structured by having type, call_tree, status_code and timestamp props', () => {
      tree.should.have.deep.property('type')
      tree.should.have.deep.property('call_tree')
      tree.should.have.deep.property('status_code')
      tree.should.have.deep.property('timestamp')
    })
  }) // describe
})
