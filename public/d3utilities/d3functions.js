/*
* File : d3functions.js
* Versione : 1.0.0
* Tipo : Javascript
* Data : 2018-04-12
* Autore : SWEefty Team
* E-mail : sweeftyteam@gmail.com
*
* Licenza : GPLv3
*
* Descrizione: classe che riunisce tutte le funzionalita' di d3js che vengono
*              utilizzate per renderizzare il grafo
*
*
*
* Registro modifiche :
* Davide Zago         || 2018-04-14 || Apportate correzioni alla funzione "render"
* Davide Zago         || 2018-04-13 || Realizzazione funzione "render"
* Francesco Parolini  || 2018-04-12 || Realizzazione classe D3Helper
* Francesco Parolini  || 2018-04-12 || Creazione file
*
*/

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


class D3Helper {

  constructor(res) {
    this.ddd = res;
    this.timeLimit = 3000;
  }

  render() {
    var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height"),
      transform = d3.zoomIdentity;

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().distance(150).id(function(d) {
        return d.id;
      }))
      .force("center", d3.forceCenter(width / 2, height / 2));

    var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(this.ddd.links)
      .enter().append("line")
      .style("stroke", function(d) {
        if (d.avg_response_time_ms > this.timeLimit)
          return "red";
      });

    var linkLabel = svg.append("g")
      .attr("class", "linksLabel")
      .selectAll("text")
      .data(this.ddd.links)
      .enter().append("text")
      .attr("font-size", "10pt")
      .text(function(d) {
        return Math.round(d.avg_response_time_ms * 100) / 100 + ' ms';
      });

    var connectionLabel = svg.append("g")
      .attr("class", "connectionLabel")
      .selectAll("text")
      .data(this.ddd.links)
      .enter().append("text")
      .attr("font-size", "10pt")
      .text(function(d) {
        return d.type;
      });

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(this.ddd.nodes)
      .enter().append("image")
      .attr("xlink:href", function(d) {
        if (d.type == "Database")
          return databaseSvg;
        else
          return serverSvg;
      })
      .attr("width", 30)
      .attr("height", 30)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged));

    node.append("title")
      .text(function(d) {
        return d.name;
      });

    var nodelabels = svg.append("g")
      .attr("class", "nodelabel")
      .selectAll("text")
      .data(this.ddd.nodes)
      .enter().append("text")
      .text(function(d) {
        return d.name;
      });

    simulation
      .nodes(this.ddd.nodes)
      .on("tick", ticked);

    simulation.force("link")
      .links(this.ddd.links);

    svg.call(d3.zoom()
      .scaleExtent([1 / 2, 8])
      .on("zoom", zoomed));

    d3.select('#reset').on('click', function() {
      svg.call(zoomed, d3.zoomIdentity);
    });

    function zoomed() {
      node.attr("transform", d3.event.transform);
      link.attr("transform", d3.event.transform);
      linkLabel.attr("transform", d3.event.transform);
      connectionLabel.attr("transform", d3.event.transform);
      nodelabels.attr("transform", d3.event.transform);
    }

    function ticked() {
      link
        .attr("x1", function(d) {
          return d.source.x;
        })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });

      node
        .attr("x", function(d) {
          return d.x - 8;
        })
        .attr("y", function(d) {
          return d.y - 8;
        });

      nodelabels
        .attr("x", function(d) {
          return d.x + 30;
        })
        .attr("y", function(d) {
          return d.y + 12;
        });

      linkLabel
        .attr("x", function(d) {
          return (d.source.x + d.target.x) / 2;
        })
        .attr("y", function(d) {
          return (d.source.y + d.target.y) / 2;
        });
      connectionLabel
        .attr("x", function(d) {
          return (d.source.x + d.target.x) / 2;
        })
        .attr("y", function(d) {
          return (d.source.y + d.target.y) / 2 - 15;
        });
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(1).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    
  }
}


module.exports = D3Helper;