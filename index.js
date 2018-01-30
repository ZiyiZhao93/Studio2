var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;

var width2 = document.getElementById('svg2').clientWidth;
var height2 = document.getElementById('svg2').clientHeight;

var marginLeft = 0;
var marginTop = 0;

var clicked = true;

var svg = d3.select('#svg1')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var svg2 = d3.select('#svg2')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var albersProjection = d3.geoAlbers()
    .scale(450000)
    .rotate( [71.057,0] )
    .center( [0, 42.313] )
    .translate([(width/3.7), (height/0.9)]);

var albersProjection2 = d3.geoAlbers()
    .scale(450000)
    .rotate( [71.057,0] )
    .center( [0, 42.313] )
    .translate([(width2/3.7), (height2/0.75)]);

path = d3.geoPath()
    .projection(albersProjection);

path2 = d3.geoPath()
    .projection(albersProjection2);

queue()
    .defer(d3.json, "eastboston.json")
    .defer(d3.csv, "circle.csv")
    .await(function (err, mapData, circleData) {

        svg.selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "feature")
            .attr('fill',"white");

        svg2.selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", path2)
            .attr("class", "feature")
            .attr('fill',"white");

        svg2.selectAll("circle")
            .data(circleData)
            .enter()
            .append("circle")
            .attr('cx', function (d) {return d.cx})
            .attr('cy',function (d) {return d.cy})
            .attr('r', function(d) {return d.r})
            .attr('fill', function(d) {return d.fill});


    });