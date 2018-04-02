import moment from 'moment';
import chrome from 'ui/chrome';
import { uiModules } from 'ui/modules';
import uiRoutes from 'ui/routes';


// new imports
let DataCleaner = require('./dataCleaner');
let DataReader = require('./dataReader');
let GraphBuilder = require('./graphBuilder');
let StackBuilder = require('./stackBuilder');
let GraphStrategy = require('./strategies/graphcleaner');
let StackStrategy = require('./strategies/stackcleaner');


import serverSvg from 'plugins/stab-havana/res/img/server.svg';
import databaseSvg from 'plugins/stab-havana/res/img/database.svg';

var d3 = Object.assign(
  require("d3-selection"),
  require("d3-scale"),
  require("d3-force"),
  require("d3-timer"),
  require("d3-zoom"),
  require("d3-fetch"),
  require("d3-drag")
);

import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';

uiRoutes.enable();
uiRoutes
  .when('/', {
    template,
    resolve: {
      getData($http) {
        return $http.get('../api/stabHavana/indices').then(function (resp) {
          // console.log(resp); // la risposta della query
          return resp;
        })
      },
      getMsh() {
        return "returning some data";
      }
    }
  });

uiModules
  .get('app/stabHavana', [])
  .controller('stabHavanaHelloWorld', function ($scope, $route, $interval) {
    $scope.title = 'Stub Havana';
    $scope.description = 'PoC SWEefty';

    // const dati = $route.current.locals.getData;
    // console.log(elastic); //undefined
    // const ddd = elastic.hits[0]._source;
    // $scope.data = $route.current.locals.getData.hits[0]._source;
    // console.log($route.current.locals.getMsh);

    // link ai dati su elasticsearch
    const elasticInstance = $route.current.locals;

    // dati grezzi
    console.log(elasticInstance.getData);

    // lettori di dati
    let dr = new DataReader(elasticInstance);
    // strategia con cui pulire i dati
    let strategy = new GraphStrategy();
    // pulitore di dati
    let dc = new DataCleaner(strategy);

    // check dei dati grezzi
    // console.log(dr.readData());
    // check dei dati puliti secondo la strategia ma ancora senza una forma particolare
    console.log(dc.cleanData(dr.readData()));

    // componente dal quale ottenere il grafo
    let g = new GraphBuilder(dr,dc);

    // check dei dati sottoforma di grafo
    console.log(g.getGraph());

    // impostazione dei nodi del grafo
    const ddd = g.getGraph();












    $scope.getTotalTime = function () {
      let tt = 0;
      $scope.data.nodes.forEach(function (el) {
        el.stack_trace.forEach(function (e) {
          tt += e.duration;
        });
      });
      return tt;
    }

    $scope.totalNodeTime = function (node) {
      let tt = 0;
      node.stack_trace.forEach(function (e) {
        tt += e.duration;
      });
      return tt;
    }

    // commentato la roba che segue perchè fa rompere il plugin
    // console.log($scope.getTotalTime());
    // $scope.currentTime = currentTime.format('HH:mm:ss');
    // const unsubscribe = $interval(function () {
    //   $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
    // }, 1000);
    // $scope.$watch('$destroy', unsubscribe);

    var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height"),
      transform = d3.zoomIdentity;

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().distance(150).id(function (d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(ddd.links)
      .enter().append("line")
      .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(ddd.nodes)
      .enter().append("image")
      .attr("xlink:href", function (d) {
        if (d.type == "Database")
          return databaseSvg;
        else
          return serverSvg;
      })
      .attr("width", 30)
      .attr("height", 30)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("title")
      .text(function (d) { return d.name; });

    var nodelabels = svg.append("g")
      .attr("class", "nodelabel")
      .selectAll("text")
      .data(ddd.nodes)
      .enter().append("text")
      .text(function (d) { return d.name; });

    simulation
      .nodes(ddd.nodes)
      .on("tick", ticked);

    simulation.force("link")
      .links(ddd.links);

    svg.call(d3.zoom()
      .scaleExtent([1 / 2, 8])
      .on("zoom", zoomed));

    function zoomed() {
      node.attr("transform", d3.event.transform);
      link.attr("transform", d3.event.transform);
      nodelabels.attr("transform", d3.event.transform);
    }

    function ticked() {
      link
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

      node
        .attr("x", function (d) { return d.x - 8; })
        .attr("y", function (d) { return d.y - 8; });

      nodelabels
        .attr("x", function (d) { return d.x + 30; })
        .attr("y", function (d) { return d.y + 12; });
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      d3.select(this).classed("active", false);
    }

  });
