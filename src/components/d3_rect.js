import { Component } from "react";
import *  as d3 from 'd3';

export default class d3_rect extends Component {

    constructor(props) {
        super(props);
    }


    async componentDidMount() {

        const data = await d3.json('http://localhost:8080/api/get');
        var width = 500;

        var svg = d3.select("svg"),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin;


        var xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 50 + ")");
        xScale.domain(data.map(function (d) { return d.year; }));
        yScale.domain([0, d3.max(data, function (d) { return d.value; })]);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .attr("stroke-width", "2")
            .attr("stroke-opacity", ".7");

        g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function (d) {
                return d;
            }).ticks(10))
            ;

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("value",function(d){return d.value})
            .attr("x", function (d) { return xScale(d.year); })
            .attr("y", function (d) { return yScale(d.value); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return height - yScale(d.value); })
            .attr("fill", "blue")
            .on("mouseover", mouseOver)
            .on("mouseout", mouseOut);
                 
            function mouseOver(d, i) {
                d3.select(this).transition().duration(400).style("fill", "orange");
                g.append("text")
                .attr("class","val")
                .attr('x',d3.select(this).attr("x"))
                .attr('y',d3.select(this).attr("y")-20)
                .text(d3.select(this).attr("value"));
                
            }

            function mouseOut(d, i) {
                d3.select(this).transition().duration(400).style("fill", "blue");
                d3.selectAll('.val').remove();
               
            }
    }
    render() {
        return (
            <svg width="800" height="600"></svg>
        )
    }

}




