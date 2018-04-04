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
      };
    }
  
  }
  
  module.exports = StackBuilder;
  