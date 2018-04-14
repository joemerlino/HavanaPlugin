/*

* File : stackBuilder.js
* Versione : 1.0
* Tipo : Javascript
* Data : 2018-04-05
* Autore : SWEefty Team
* E-mail : sweeftyteam@gmail.com
*
* Licenza :
*
* Descrizione: classe che contiene la logica della stack, qui i dati puliti vengo-
*              no elaborati logicamente stabilendo le relazioni tra loro e
*             restitutiti in forma corretta per essere renderizzati 
*
* Registro modifiche :

* Lisa Parma        || 2018-04-14 || Conclusa funzione "getStack"
* Lisa Parma        || 2018-04-13 || Apportate alcune correzioni alla funzione "getStack"
* Alberto Zago      || 2018-04-11 || Prima implementazione funzione "getStack"
* Lisa Parma        || 2018-04-10 || Realizzazione funzione "build_tree"
* Alberto Gallinaro || 2018-04-10 || Prima implementazione funzione "build_tree"
* Paolo Eccher      || 2018-04-08 || Realizzazione funzione "space"
* Paolo Eccher      || 2018-04-07 || Realizzazione funzione "more_data"
* Paolo Eccher      || 2018-04-06 || Realizzazione funzione "tableToTree"
* Lisa Parma        || 2018-04-05 || Realizzazione funzione StackBuilder
* Lisa Parma        || 2018-04-05 || Creazione file
*
*/



let StackCleaner = require('./strategies/stackcleaner');
let DataCleaner = require('./dataCleaner');

class StackBuilder {

  constructor(dataReader) {
    this.dr = dataReader;
  }

  setDataReader(dr) {
    this.dr = dr;
  }

  /* --- Dati belli in build --- */

  tableToTree(table, rowP) {
    var tree = [];
    var salto = 0;
    var row;
    if (rowP == 0) {
      var branch = {};
      branch['name'] = table[rowP]['name'];
      branch['selftime'] = table[rowP]['selftime'];
      branch['totaltime'] = table[rowP]['totaltime'];
      branch['call_tree'] = this.tableToTree(table, rowP + 1);
      tree[0] = branch;
    } else {
      for (var x = 0; x < table[rowP - 1]['figli'] && rowP + salto < table.length; x++) {
        row = rowP + salto;
        if (table[row]['prole'] == 0) {
          var branch = {};
          branch['name'] = table[row]['name'];
          branch['selftime'] = table[row]['selftime'];
          branch['totaltime'] = table[row]['totaltime'];
          tree[x] = branch;
          return tree;
        } else if (table[row]['indent'] < table[row + 1]['indent']) {
          var branch = {};
          branch['name'] = table[row]['name'];
          branch['selftime'] = table[row]['selftime'];
          branch['totaltime'] = table[row]['totaltime'];
          branch['call_tree'] = this.tableToTree(table, row + 1);
          tree[x] = branch;
        }
        salto = table[row]['prole'] + 1;
      }
    }
    return tree;
  }

  more_data(table) {
    for (var i = 0; i < table.length; i++) {
      var prole = 0;
      var figli = 0;
      for (var j = i + 1; j < table.length && table[i]['indent'] < table[j]['indent']; j++) {
        prole++;
        if (table[j]['indent'] == table[i + 1]['indent'])
          figli++;
      }
      table[i]['prole'] = prole;
      table[i]['figli'] = figli;
    }
    return table;
  }


  space(str, rel, point) {
    if (str[point] == " " || str[point] == "│") {
      rel++;
      return this.space(str, rel, point + 4);
    }
    if (str[point] == "├" || str[point] == "└") {
      return rel + 1;
    }

    return rel;
  }

  build_tree(ascii) {
    var table = [];
    table = ascii.split("\n");

    var treeTAB = [];
    var count = 0;
    for (var i = 3; i < table.length - 1; i++) {
      var method = {};
      method['selftime'] = table[i].slice(0, 9);
      method['totaltime'] = table[i].slice(27, 36);
      var relaz = table[i].slice(54);
      method['indent'] = this.space(relaz, 0, 0);
      method['name'] = table[i].slice(54 + (method['indent'] * 4));
      treeTAB[count++] = method;
    }

    var tabPLUS = this.more_data(treeTAB);
    return this.tableToTree(tabPLUS, 0);

  }


  /* ---- structure functionss ------ */

  build_pageload_request(traceHTTP, tracePL) {
    var traceHP = {}
    traceHP['type'] = "loadpage";
    traceHP['trace_id'] = traceHTTP['id'];
    traceHP['error'] = traceHTTP['error'];
    traceHP['call_tree'] = this.build_tree(traceHTTP['call_tree_ascii']);
    traceHP['status_code'] = traceHTTP['http.status_code'];
    traceHP['duration'] = traceHTTP['duration_ms'] + tracePL['duration_ms'];
    traceHP['timestamp'] = traceHTTP['@timestamp'];
    traceHP['name'] = traceHTTP['name'];

    return traceHP;
  }

  build_request(traceHTTP, tracePL) {
    var traceH = {}
    traceH['type'] = "http";
    traceH['trace_id'] = traceHTTP['id'];
    traceH['error'] = traceHTTP['error'];
    traceH['call_tree'] = this.build_tree(traceHTTP['call_tree_ascii']);
    traceH['status_code'] = traceHTTP['http.status_code'];
    traceH['duration'] = traceHTTP['duration_ms'];
    traceH['timestamp'] = traceHTTP['@timestamp'];
    traceH['name'] = traceHTTP['name'];

    return traceH;
  }

  build_querylist(list) {
    var aux = [];
    var count = 0
    for (var i = 0; i < list.length; i++) {
      var x = {};
      x['duration'] = list[i]['duration_ms'];
      x['timestamp'] = list[i]['@timestamp'];
      x['text'] = list[i]['db.statement'];
      x['database'] = list[i]['db.type'];
      aux[count++] = x;
    }
    return aux;
  }

  checkPageload(id) {
    for (var i = 0; i < this.data['pageload'].length; i++) {
      if (id == this.data['pageload'][i].trace_id)
        return this.data['pageload'][i];
    }
    return null;
  }

  checkQueries(id) {
    var qrs = [];
    var count = 0;

    for (var i = 0; i < this.data['query'].length; i++) {
      if (id == this.data['query'][i]['parent_id']) {
        qrs[count++] = this.data['query'][i];
      }
    }
    if (count != 0) {
      var ret = this.build_querylist(qrs);
      return ret;
    } else
      return null;
  }

  changeDuration(listQR) {
    var time = 0;
    for (var i = 0; i < listQR.length; i++) {
      time += listQR[i]['duration'];
    }
    return time;
  }

  /*---------------------------- */

  getStack() {
    return new Promise((resolve, reject) => {
      this.dataCleaner = new DataCleaner(new StackCleaner());
      this.dr.readData().then(res => {
        console.log("Dati in getStack: ");
        console.log(res);

        var tmp = [];

        res.forEach(el => {
          this.data = this.dataCleaner.cleanDataStack(el);

          var dataStack = {};
          var countRQ = 0;

          for (var i = 0; i < this.data['http'].length; i++) {

            var traceID = this.data['http'][i]['trace_id'];
            var trace = {};

            var pageload = this.checkPageload(traceID);

            if (pageload != null) { // se ha un pageload associato

              trace = this.build_pageload_request(this.data['http'][i], pageload);

              var queries = this.checkQueries(traceID);

              if (queries != null) { // se ha anche delle query associate
                trace['DBrequest'] = queries;
                trace['type'] = "JDBC";
                trace['duration'] = trace['duration'] + this.changeDuration(queries);
              }
              dataStack[countRQ++] = trace;
            } else {
              // Singola richiesta HTTP
              trace = this.build_request(this.data['http'][i]);
              dataStack[countRQ++] = trace;
            }
          }

          this.data = dataStack;

          tmp.push(dataStack);

        })

        var def = [];
        tmp.forEach(el => {
          Object.keys(el).forEach(ss => {
            def.push(el[ss]);
          })
        })

        resolve(def);
      });

    })
    // retieve data

    /*
    return this.data = {
      // DATI FALZZZZI
      "children": [
        {
          "name": "Richiesta_1",
          "time": "32",
          "timestamp": "12:23:34",
          "Cod_errore": "NO",
          "children": [
            {
              "name": "Funzione_1",
              "time": "12",
              "timestamp": "12:34:42",
              "query": [
                {
                  "name": "query1",
                  "database": "db111",
                  "time": "23",
                  "timestamp": "12:35:12"
                },
                {
                  "name": "query2",
                  "database": "db222",
                  "time": "55",
                  "timestamp": "12:35:34"
                }
              ],
              "children": [
                {
                  "name": "Funzione_1.1",
                  "time": "56",
                  "timestamp": "12:23:59",
                  "query": [
                    {
                      "name": "query3",
                      "database": "dbCIAO",
                      "time": "47",
                      "timestamp": "15:23:12"
                    },
                    {
                      "name": "query4",
                      "database": "fgngs",
                      "time": "64",
                      "timestamp": "3636"
                    }
                  ],
                  "children": [
                    {
                      "name": "Funzione_1.1.1",
                      "time": "12",
                      "timestamp": "13:23:23",
                      "children": [
                        {
                          "name": "Funzione_1.1.1.1",
                          "time": "56",
                          "timestamp": "12:23:59",
                          "query": [
                            {
                              "name": "query3",
                              "database": "dsvfsbg",
                              "time": "47",
                              "timestamp": "324"
                            },
                            {
                              "name": "query4",
                              "database": "fgngs",
                              "time": "64",
                              "timestamp": "3636"
                            }
                          ]
                        },
                        {
                          "name": "Funzione_1.1.1.2",
                          "time": "22",
                          "timestamp": "13:35:45",
                          "children": [
                            {
                              "name": "Funzione_1.1.1.1.2.1",
                              "time": "15",
                              "timestamp": "14:24:04"
                            },
                            {
                              "name": "Funzione_1.1.1.1.2",
                              "time": "56",
                              "timestamp": "4214:4:03"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "name": "Funzione_1.1.2",
                      "time": "24",
                      "timestamp": "12:23:25"
                    }
                  ]
                },
                {
                  "name": "Funzione_1.2",
                  "time": "12",
                  "timestamp": "42",
                  "children": [
                    {
                      "name": "Funzione_1.2.1",
                      "time": "14",
                      "timestamp": "13:24:53"
                    },
                    {
                      "name": "Funzione_1.2.2",
                      "time": "11",
                      "timestamp": "12:34:24"
                    }
                  ]
                }
              ]
            },
            {
              "name": "Funzione_2",
              "time": "12",
              "timestamp": "14:12:24",
              "query": [
                {
                  "name": "query5",
                  "database": "dbbohh",
                  "time": "65",
                  "timestamp": "13:12:12"
                },
                {
                  "name": "query6",
                  "database": "dbALTRO",
                  "time": "34;",
                  "timestamp": "14:24:23"
                }
              ],
              "children": [
                {
                  "name": "Funzione_2.1",
                  "time": "12",
                  "timestamp": "13:34:42"
                },
                {
                  "name": "Funzione_2.2",
                  "time": "34",
                  "timestamp": "14:23:12"
                },
                {
                  "name": "Funzione_2.3",
                  "time": "65",
                  "timestamp": "13:56:12"
                }
              ]
            }
          ]
        },
        {
          "name": "Richiesta_2",
          "time": "32",
          "timestamp": "12:23:34",
          "Cod_errore": "404",
          "children": [
            {
              "name": "Funzione_1",
              "time": "12",
              "timestamp": "12:34:42",
              "query": [
                {
                  "name": "query1",
                  "database": "db111",
                  "time": "23",
                  "timestamp": "12:35:12"
                },
                {
                  "name": "query2",
                  "database": "db222",
                  "time": "55",
                  "timestamp": "12:35:34"
                }
              ],
              "children": [
                {
                  "name": "Funzione_1.1",
                  "time": "56",
                  "timestamp": "12:23:59",
                  "query": [
                    {
                      "name": "query3",
                      "database": "dbCIAO",
                      "time": "47",
                      "timestamp": "15:23:12"
                    },
                    {
                      "name": "query4",
                      "database": "fgngs",
                      "time": "64",
                      "timestamp": "3636"
                    }
                  ],
                  "children": [
                    {
                      "name": "Funzione_1.1.1",
                      "time": "12",
                      "timestamp": "13:23:23",
                      "children": [
                        {
                          "name": "Funzione_1.1.1.1",
                          "time": "56",
                          "timestamp": "12:23:59",
                          "query": [
                            {
                              "name": "query3",
                              "database": "dsvfsbg",
                              "time": "47",
                              "timestamp": "324"
                            },
                            {
                              "name": "query4",
                              "database": "fgngs",
                              "time": "64",
                              "timestamp": "3636"
                            }
                          ]
                        },
                        {
                          "name": "Funzione_1.1.1.2",
                          "time": "22",
                          "timestamp": "13:35:45",
                          "children": [
                            {
                              "name": "Funzione_1.1.1.1.2.1",
                              "time": "15",
                              "timestamp": "14:24:04"
                            },
                            {
                              "name": "Funzione_1.1.1.1.2",
                              "time": "56",
                              "timestamp": "4214:4:03"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "name": "Funzione_1.1.2",
                      "time": "24",
                      "timestamp": "12:23:25"
                    }
                  ]
                },
                {
                  "name": "Funzione_1.2",
                  "time": "12",
                  "timestamp": "42",
                  "children": [
                    {
                      "name": "Funzione_1.2.1",
                      "time": "14",
                      "timestamp": "13:24:53"
                    },
                    {
                      "name": "Funzione_1.2.2",
                      "time": "11",
                      "timestamp": "12:34:24"
                    }
                  ]
                }
              ]
            },
            {
              "name": "Funzione_2",
              "time": "12",
              "timestamp": "14:12:24",
              "query": [
                {
                  "name": "query5",
                  "database": "dbbohh",
                  "time": "65",
                  "timestamp": "13:12:12"
                },
                {
                  "name": "query6",
                  "database": "dbALTRO",
                  "time": "34;",
                  "timestamp": "14:24:23"
                }
              ],
              "children": [
                {
                  "name": "Funzione_2.1",
                  "time": "12",
                  "timestamp": "13:34:42"
                },
                {
                  "name": "Funzione_2.2",
                  "time": "34",
                  "timestamp": "14:23:12"
                },
                {
                  "name": "Funzione_2.3",
                  "time": "65",
                  "timestamp": "13:56:12"
                }
              ]
            }
          ]
        },
        {
          "name": "Richiesta_3",
          "time": "32",
          "timestamp": "12:23:34",
          "Cod_errore": "NO",
          "children": [
            {
              "name": "Funzione_1",
              "time": "12",
              "timestamp": "12:34:42",
              "query": [
                {
                  "name": "query1",
                  "database": "db111",
                  "time": "23",
                  "timestamp": "12:35:12"
                },
                {
                  "name": "query2",
                  "database": "db222",
                  "time": "55",
                  "timestamp": "12:35:34"
                }
              ],
              "children": [
                {
                  "name": "Funzione_1.1",
                  "time": "56",
                  "timestamp": "12:23:59",
                  "query": [
                    {
                      "name": "query3",
                      "database": "dbCIAO",
                      "time": "47",
                      "timestamp": "15:23:12"
                    },
                    {
                      "name": "query4",
                      "database": "fgngs",
                      "time": "64",
                      "timestamp": "3636"
                    }
                  ],
                  "children": [
                    {
                      "name": "Funzione_1.1.1",
                      "time": "12",
                      "timestamp": "13:23:23",
                      "children": [
                        {
                          "name": "Funzione_1.1.1.1",
                          "time": "56",
                          "timestamp": "12:23:59",
                          "query": [
                            {
                              "name": "query3",
                              "database": "dsvfsbg",
                              "time": "47",
                              "timestamp": "324"
                            },
                            {
                              "name": "query4",
                              "database": "fgngs",
                              "time": "64",
                              "timestamp": "3636"
                            }
                          ]
                        },
                        {
                          "name": "Funzione_1.1.1.2",
                          "time": "22",
                          "timestamp": "13:35:45",
                          "children": [
                            {
                              "name": "Funzione_1.1.1.1.2.1",
                              "time": "15",
                              "timestamp": "14:24:04"
                            },
                            {
                              "name": "Funzione_1.1.1.1.2",
                              "time": "56",
                              "timestamp": "4214:4:03"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "name": "Funzione_1.1.2",
                      "time": "24",
                      "timestamp": "12:23:25"
                    }
                  ]
                },
                {
                  "name": "Funzione_1.2",
                  "time": "12",
                  "timestamp": "42",
                  "children": [
                    {
                      "name": "Funzione_1.2.1",
                      "time": "14",
                      "timestamp": "13:24:53"
                    },
                    {
                      "name": "Funzione_1.2.2",
                      "time": "11",
                      "timestamp": "12:34:24"
                    }
                  ]
                }
              ]
            },
            {
              "name": "Funzione_2",
              "time": "12",
              "timestamp": "14:12:24",
              "query": [
                {
                  "name": "query5",
                  "database": "dbbohh",
                  "time": "65",
                  "timestamp": "13:12:12"
                },
                {
                  "name": "query6",
                  "database": "dbALTRO",
                  "time": "34;",
                  "timestamp": "14:24:23"
                }
              ],
              "children": [
                {
                  "name": "Funzione_2.1",
                  "time": "12",
                  "timestamp": "13:34:42"
                },
                {
                  "name": "Funzione_2.2",
                  "time": "34",
                  "timestamp": "14:23:12"
                },
                {
                  "name": "Funzione_2.3",
                  "time": "65",
                  "timestamp": "13:56:12"
                }
              ]
            }
          ]
        },
        {
          "name": "Richiesta_4",
          "time": "32",
          "timestamp": "12:23:34",
          "Cod_errore": "404",
          "children": [
            {
              "name": "Funzione_1",
              "time": "12",
              "timestamp": "12:34:42",
              "query": [
                {
                  "name": "query1",
                  "database": "db111",
                  "time": "23",
                  "timestamp": "12:35:12"
                },
                {
                  "name": "query2",
                  "database": "db222",
                  "time": "55",
                  "timestamp": "12:35:34"
                }
              ],
              "children": [
                {
                  "name": "Funzione_1.1",
                  "time": "56",
                  "timestamp": "12:23:59",
                  "query": [
                    {
                      "name": "query3",
                      "database": "dbCIAO",
                      "time": "47",
                      "timestamp": "15:23:12"
                    },
                    {
                      "name": "query4",
                      "database": "fgngs",
                      "time": "64",
                      "timestamp": "3636"
                    }
                  ],
                  "children": [
                    {
                      "name": "Funzione_1.1.1",
                      "time": "12",
                      "timestamp": "13:23:23",
                      "children": [
                        {
                          "name": "Funzione_1.1.1.1",
                          "time": "56",
                          "timestamp": "12:23:59",
                          "query": [
                            {
                              "name": "query3",
                              "database": "dsvfsbg",
                              "time": "47",
                              "timestamp": "324"
                            },
                            {
                              "name": "query4",
                              "database": "fgngs",
                              "time": "64",
                              "timestamp": "3636"
                            }
                          ]
                        },
                        {
                          "name": "Funzione_1.1.1.2",
                          "time": "22",
                          "timestamp": "13:35:45",
                          "children": [
                            {
                              "name": "Funzione_1.1.1.1.2.1",
                              "time": "15",
                              "timestamp": "14:24:04"
                            },
                            {
                              "name": "Funzione_1.1.1.1.2",
                              "time": "56",
                              "timestamp": "4214:4:03"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "name": "Funzione_1.1.2",
                      "time": "24",
                      "timestamp": "12:23:25"
                    }
                  ]
                },
                {
                  "name": "Funzione_1.2",
                  "time": "12",
                  "timestamp": "42",
                  "children": [
                    {
                      "name": "Funzione_1.2.1",
                      "time": "14",
                      "timestamp": "13:24:53"
                    },
                    {
                      "name": "Funzione_1.2.2",
                      "time": "11",
                      "timestamp": "12:34:24"
                    }
                  ]
                }
              ]
            },
            {
              "name": "Funzione_2",
              "time": "12",
              "timestamp": "14:12:24",
              "query": [
                {
                  "name": "query5",
                  "database": "dbbohh",
                  "time": "65",
                  "timestamp": "13:12:12"
                },
                {
                  "name": "query6",
                  "database": "dbALTRO",
                  "time": "34;",
                  "timestamp": "14:24:23"
                }
              ],
              "children": [
                {
                  "name": "Funzione_2.1",
                  "time": "12",
                  "timestamp": "13:34:42"
                },
                {
                  "name": "Funzione_2.2",
                  "time": "34",
                  "timestamp": "14:23:12"
                },
                {
                  "name": "Funzione_2.3",
                  "time": "65",
                  "timestamp": "13:56:12"
                }
              ]
            }
          ]
        },
        {
          "name": "Richiesta_5",
          "time": "32",
          "timestamp": "12:23:34",
          "Cod_errore": "NO",
          "children": [
            {
              "name": "Funzione_1",
              "time": "12",
              "timestamp": "12:34:42",
              "query": [
                {
                  "name": "query1",
                  "database": "db111",
                  "time": "23",
                  "timestamp": "12:35:12"
                },
                {
                  "name": "query2",
                  "database": "db222",
                  "time": "55",
                  "timestamp": "12:35:34"
                }
              ],
              "children": [
                {
                  "name": "Funzione_1.1",
                  "time": "56",
                  "timestamp": "12:23:59",
                  "query": [
                    {
                      "name": "query3",
                      "database": "dbCIAO",
                      "time": "47",
                      "timestamp": "15:23:12"
                    },
                    {
                      "name": "query4",
                      "database": "fgngs",
                      "time": "64",
                      "timestamp": "3636"
                    }
                  ],
                  "children": [
                    {
                      "name": "Funzione_1.1.1",
                      "time": "12",
                      "timestamp": "13:23:23",
                      "children": [
                        {
                          "name": "Funzione_1.1.1.1",
                          "time": "56",
                          "timestamp": "12:23:59",
                          "query": [
                            {
                              "name": "query3",
                              "database": "dsvfsbg",
                              "time": "47",
                              "timestamp": "324"
                            },
                            {
                              "name": "query4",
                              "database": "fgngs",
                              "time": "64",
                              "timestamp": "3636"
                            }
                          ]
                        },
                        {
                          "name": "Funzione_1.1.1.2",
                          "time": "22",
                          "timestamp": "13:35:45",
                          "children": [
                            {
                              "name": "Funzione_1.1.1.1.2.1",
                              "time": "15",
                              "timestamp": "14:24:04"
                            },
                            {
                              "name": "Funzione_1.1.1.1.2",
                              "time": "56",
                              "timestamp": "4214:4:03"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "name": "Funzione_1.1.2",
                      "time": "24",
                      "timestamp": "12:23:25"
                    }
                  ]
                },
                {
                  "name": "Funzione_1.2",
                  "time": "12",
                  "timestamp": "42",
                  "children": [
                    {
                      "name": "Funzione_1.2.1",
                      "time": "14",
                      "timestamp": "13:24:53"
                    },
                    {
                      "name": "Funzione_1.2.2",
                      "time": "11",
                      "timestamp": "12:34:24"
                    }
                  ]
                }
              ]
            },
            {
              "name": "Funzione_2",
              "time": "12",
              "timestamp": "14:12:24",
              "query": [
                {
                  "name": "query5",
                  "database": "dbbohh",
                  "time": "65",
                  "timestamp": "13:12:12"
                },
                {
                  "name": "query6",
                  "database": "dbALTRO",
                  "time": "34;",
                  "timestamp": "14:24:23"
                }
              ],
              "children": [
                {
                  "name": "Funzione_2.1",
                  "time": "12",
                  "timestamp": "13:34:42"
                },
                {
                  "name": "Funzione_2.2",
                  "time": "34",
                  "timestamp": "14:23:12"
                },
                {
                  "name": "Funzione_2.3",
                  "time": "65",
                  "timestamp": "13:56:12"
                }
              ]
            }
          ]
        }
      ]
    };*/
  }

}

module.exports = StackBuilder;
