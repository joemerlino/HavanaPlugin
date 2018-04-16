/*

* File : app.js
* Versione : 1.0.0
* Tipo : Javascript
* Data : 2018-03-15
* Autore : SWEefty Team
* E-mail : sweeftyteam@gmail.com
*
* Licenza : GPLv3
*
* Descrizione: entry point dell'applicazione, qui sono presenti le componenti
*              principali dell'app, il controller che gestisce il rendeing delle
*              funzionalitá, i service, le direttive e le chiamate ai metodi che
*              renderizzano grafo / stack
*
* Registro modifiche :
* Lisa Parma         || 2018-03-26 || Realizzazione modulo Stack Trace
* Giuseppe Merlino   || 2018-03-19 || Realizzazione servizio per chiamate API con iniezione nel controller
* Giuseppe Merlino   || 2018-03-18 || Stesura funzione "dragended","dragged"
* Alberto Gallinaro  || 2018-03-17 || Stesura funzione "ticked","dragstarted"
* Alberto Gallinaro  || 2018-03-16 || Inserimento componente per visualizzare il grafo e impostazioni
* Francesco Parolini || 2018-03-15 || Inserimento import e link ad elasticsearch
* Francesco Parolini || 2018-03-15 || Creazione file
*
*/


import moment from 'moment';
import chrome from 'ui/chrome';
import { uiModules } from 'ui/modules';
import uiRoutes from 'ui/routes';

// Imports for strategies and classes
let DataCleaner = require('./components/dataCleaner');
let DataReader = require('./components/dataReader');
let GraphBuilder = require('./components/graphBuilder');
let StackBuilder = require('./components/stackBuilder');
let GraphCleaner = require('./components/strategies/graphcleaner');
let StackCleaner = require('./components/strategies/stackcleaner');
let D3Helper = require('./d3utilities/d3functions');
// import serverSvg from 'plugins/stab-havana/res/img/server.svg';
// import databaseSvg from 'plugins/stab-havana/res/img/database.svg';
//
// var d3 = Object.assign(
//   require("d3-selection"),
//   require("d3-scale"),
//   require("d3-force"),
//   require("d3-timer"),
//   require("d3-zoom"),
//   require("d3-fetch"),
//   require("d3-drag")
// );

import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';

uiRoutes.enable();

uiRoutes
  .when('/', {
    // serve? no
    template,
    resolve: {
      getData($http) {

      }
    }
  });

uiModules
  .get('app/stabHavana', [])
  .controller('stabHavanaHelloWorld', function($scope, $route, $interval, servomuto) {
    $scope.title = 'Havana';
    $scope.description = 'Havana plugin implementation';

    // link ai dati su elasticsearch
    const elasticInstance = $route.current.locals;

    // lettori di dati
    let dr = new DataReader(servomuto);
    console.log('Indici delle traces:');
    // console.log(dr.readData());
    dr.readData().then(res => {
      console.log("App js: ");
      console.log(res);
    });



    // strategia con cui pulire i dati
    let strategy = new GraphCleaner();
    // pulitore di dati
    let dc = new DataCleaner(strategy);


    // function getLimit() {
    //   return 3000;
    // }

    // // componente dal quale ottenere il grafo QUESTO NON COMMENTARLO
    let g = new GraphBuilder(dr);

    // // check dei dati sottoforma di grafo

    g.getGraph().then(function(res) {
      console.log('Dati finali del grafo');
      console.log(res);

      // impostazione dei nodi del grafo QUESTO NON COMMENTARLO
      const ddd = res;

      const d3h = new D3Helper(res);

      d3h.render();

      // var svg = d3.select("svg"),
      //   width = +svg.attr("width"),
      //   height = +svg.attr("height"),
      //   transform = d3.zoomIdentity;
      //
      // var color = d3.scaleOrdinal(d3.schemeCategory20);
      //
      // var simulation = d3.forceSimulation()
      //   .force("link", d3.forceLink().distance(150).id(function(d) {
      //     return d.id;
      //   }))
      //   .force("charge", d3.forceManyBody())
      //   .force("center", d3.forceCenter(width / 2, height / 2));
      //
      // var link = svg.append("g")
      //   .attr("class", "links")
      //   .selectAll("line")
      //   .data(ddd.links)
      //   .enter().append("line")
      //   .style("stroke", function(d) {
      //     if (d.avg_response_time_ms > getLimit())
      //       return "red";
      //   });
      //
      // var linkLabel = svg.append("g")
      //   .attr("class", "linksLabel")
      //   .selectAll("text")
      //   .data(ddd.links)
      //   .enter().append("text")
      //   .attr("font-size", "10pt")
      //   .text(function(d) {
      //     return Math.round(d.avg_response_time_ms * 100) / 100 + ' ms';
      //   });
      //
      // var connectionLabel = svg.append("g")
      //   .attr("class", "connectionLabel")
      //   .selectAll("text")
      //   .data(ddd.links)
      //   .enter().append("text")
      //   .attr("font-size", "10pt")
      //   .text(function(d) {
      //     return d.type
      //   });
      //
      // var node = svg.append("g")
      //   .attr("class", "nodes")
      //   .selectAll("circle")
      //   .data(ddd.nodes)
      //   .enter().append("image")
      //   .attr("xlink:href", function(d) {
      //     if (d.type == "Database")
      //       return databaseSvg;
      //     else
      //       return serverSvg;
      //   })
      //   .attr("width", 30)
      //   .attr("height", 30)
      //   .call(d3.drag()
      //     .on("start", dragstarted)
      //     .on("drag", dragged)
      //     .on("end", dragended));
      //
      // node.append("title")
      //   .text(function(d) {
      //     return d.name;
      //   });
      //
      // var nodelabels = svg.append("g")
      //   .attr("class", "nodelabel")
      //   .selectAll("text")
      //   .data(ddd.nodes)
      //   .enter().append("text")
      //   .text(function(d) {
      //     return d.name;
      //   });
      //
      // simulation
      //   .nodes(ddd.nodes)
      //   .on("tick", ticked);
      //
      // simulation.force("link")
      //   .links(ddd.links);
      //
      // svg.call(d3.zoom()
      //   .scaleExtent([1 / 2, 8])
      //   .on("zoom", zoomed));
      //
      // function zoomed() {
      //   node.attr("transform", d3.event.transform);
      //   link.attr("transform", d3.event.transform);
      //   linkLabel.attr("transform", d3.event.transform);
      //   connectionLabel.attr("transform", d3.event.transform);
      //   nodelabels.attr("transform", d3.event.transform);
      // }
      //
      // function ticked() {
      //   link
      //     .attr("x1", function(d) {
      //       return d.source.x;
      //     })
      //     .attr("y1", function(d) {
      //       return d.source.y;
      //     })
      //     .attr("x2", function(d) {
      //       return d.target.x;
      //     })
      //     .attr("y2", function(d) {
      //       return d.target.y;
      //     });
      //
      //   node
      //     .attr("x", function(d) {
      //       return d.x - 8;
      //     })
      //     .attr("y", function(d) {
      //       return d.y - 8;
      //     });
      //
      //   nodelabels
      //     .attr("x", function(d) {
      //       return d.x + 30;
      //     })
      //     .attr("y", function(d) {
      //       return d.y + 12;
      //     });
      //
      //   linkLabel
      //     .attr("x", function(d) {
      //       return (d.source.x + d.target.x) / 2;
      //     })
      //     .attr("y", function(d) {
      //       return (d.source.y + d.target.y) / 2;
      //     });
      //   connectionLabel
      //     .attr("x", function(d) {
      //       return (d.source.x + d.target.x) / 2;
      //     })
      //     .attr("y", function(d) {
      //       return (d.source.y + d.target.y) / 2 - 15;
      //     });
      // }
      //
      // function dragstarted(d) {
      //   if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      //   d.fx = d.x;
      //   d.fy = d.y;
      // }
      //
      // function dragged(d) {
      //   d.fx = d3.event.x;
      //   d.fy = d3.event.y;
      // }
      //
      // function dragended(d) {
      //   d3.select(this).classed("active", false);
      // }

    }).catch(e => console.log(e));;

    // // strategia con cui pulire i dati
    let stack_strategy = new StackCleaner();

    dc.setStrategy(stack_strategy);

    let s = new StackBuilder(dr);

    s.getStack().then(res => {
      $scope.nodes = res;
      $scope.$apply();
    }).catch(e => console.log(e));

  })

  // Service che esegue le chiamate alle api, viene iniettato sul controller
  .service('servomuto', ['$http', '$q', function($http, $q) {

    // ritorna un array composto da tutti e soli gli indici che contengono nel nome spans
    this.tracesIndices = function() {
      return $http.get('../api/havana/allIndices').then(function(resp) {
        // console.log(resp);
        var tracesIndices = new Array();
        for (var k in resp['data']) {
          if (resp['data'][k]['index'].includes('span')) {
            tracesIndices.push(resp['data'][k]['index']);
          }
        }
        return tracesIndices;
      })
    };

    // ritorna un indice, per ora fisso, ma un bel giorno variabile
    this.getIndex = function(index) {
      return $http.get('../api/havana/index?index=' + index).then(function(resp) { // da testare
        return resp;
      });
    };

    this.getData = function(multipleIndices) {
      return this.tracesIndices().then(res => {
        let arr = [];

        res.forEach(el => {
          let pro = this.getIndex(el);
          arr.push(pro);
        })

        return $q.all(arr);
      });

    } // end of method

  }]);


// Angular per stack trace
uiModules.get('app/stabHavana', [])
  .directive('tree', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        t: '=src'
      },
      template: '<ul><branch ng-repeat="c in t.call_tree" src="c"></branch></ul>'
    };
  })

  .directive('branch', function($compile) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        b: '=src'
      },
      template: '<li>\
                  <span class="toggle">{{ b.name | limitTo:50}}\
                    <div class="spacetree">{{b.totaltime | number}} ms</div>\
                    <div class="spacetree">{{b.selftime | number}} ms</div>\
                  </span>\
                </li>',
      link: function(scope, element, attrs) {
        if (angular.isArray(scope.b.call_tree)) {
          element.append('<tree src="b"></tree>');
          $compile(element.contents())(scope);
        }
      }
    };
  })
