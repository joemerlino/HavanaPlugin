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
import {
  uiModules
} from 'ui/modules';
import uiRoutes from 'ui/routes';

// Imports for strategies and classes
let DataCleaner = require('./components/dataCleaner');
let DataReader = require('./components/dataReader');
let GraphBuilder = require('./components/graphBuilder');
let StackBuilder = require('./components/stackBuilder');
let GraphCleaner = require('./components/strategies/graphcleaner');
let StackCleaner = require('./components/strategies/stackcleaner');
let D3Helper = require('./d3utilities/d3functions');

let StackBuilderDirector = require('./components/StackBuilderDirector');
let GraphBuilderDirector = require('./components/GraphBuilderDirector');

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
    //
    // // lettori di dati
    let dr = new DataReader(servomuto);
    let gb = new GraphBuilder(dr);

    let gdirector = new GraphBuilderDirector(dr, gb);

    gdirector.constructGraph().then(res => {
      console.log("Dati ricevuti per graph");
      console.log(res);
      const d3h = new D3Helper(res);
      d3h.render();
    })


    // console.log('Indici delle traces:');
    // dr.readData().then(res => {
    //   console.log("App js: ");
    //   console.log(res);
    // });
    //
    // // strategia con cui pulire i dati
    // let strategy = new GraphCleaner();
    // // pulitore di dati
    // let dc = new DataCleaner(strategy);
    //
    // // // componente dal quale ottenere il grafo
    // let g = new GraphBuilder(dr);
    //
    // // check dei dati sottoforma di grafo
    // g.getGraph().then(function(res) {
    //   console.log('Dati finali del grafo');
    //   console.log(res);
    //
    //   // impostazione dei nodi del grafo
    //   const d3h = new D3Helper(res);
    //   d3h.render();
    //
    // }).catch(e => console.log(e));
    //
    // // // strategia con cui pulire i dati
    // let stack_strategy = new StackCleaner();
    // let s = new StackBuilder(dr);
    //
    // dc.setStrategy(stack_strategy);
    //
    // s.getStack().then(res => {
    //   $scope.nodes = res;
    //   $scope.$apply();
    // }).catch(e => console.log(e));


    // ----------------------------------------------
    const stackBuilder = new StackBuilder();
    const drrrr = new DataReader(servomuto);
    const StackDirector = new StackBuilderDirector(drrrr, stackBuilder);

    // It might do the trick
    StackDirector.constructStack().then(res => {
      console.log("dati ricevuti: ");
      console.log(res);
      $scope.nodes = res;
      console.log("$scope");
      console.log($scope.nodes);
      $scope.$apply();
    })

    $scope.sortBy = "";
    $scope.sortReverse = false;

    $scope.sortQueryBy = "";
    $scope.sortQueryReverse = false;


    $scope.orderByName = function() {
        console.log("ordino per nome uajo");
    }



  })

  // Service che esegue le chiamate alle api, viene iniettato sul controller
  .service('servomuto', ['$http', '$q', function($http, $q) {

    // ritorna un array composto da tutti e soli gli indici che contengono nel nome spans
    this.tracesIndices = function() {
      return $http.get('../api/havana/allIndices').then(function(resp) {
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
