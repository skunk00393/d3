import { Component } from "react";
import *  as d3 from 'd3';

export default class d3_pie extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        var data1 = [9, 20, 30, 8, 12]
        var data2 = [6, 16, 20, 14, 19]
        var data3 = [1, 7, 15, 8, 10]

        var width = 800,
            height = 600,
            radius = 200;
        var color = d3.schemeDark2;
        var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("id", "pieChart")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        var pie = d3.pie();

        // Generate the arcs
        var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        var path = svg.selectAll("path")
            .data(pie(data1))
            .enter()
            .append("path")
            .attr("value", function (d, i) { return data1[i] });

        path.transition()
            .duration(500)
            .attr("fill", function (d, i) {
                return color[i];
            })
            .attr("d", arc)
            .each(function (d) {
                this._current = d;
            }); // store the initial angles

        d3.select("#selektor").on("change", change);

        svg.selectAll("slices")
            .data(pie(data1))
            .enter()
            .append("text")
            .text(function (d) { return d.value })
            .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
            .style("text-anchor", "middle")
            .style("font-size", 17)
        function change(e) {
            console.log(e.target.value);
            var newData;
            if (e.target.value == 1) {
                newData = data1;
            }
            else if (e.target.value == 2) {
                newData = data2;
            }
            else {
                newData = data3;
            }
            path.data(pie(newData)).attr("value", function (d, i) { return newData[i] });
            d3.selectAll("text").remove();
            svg.selectAll("slices")
            .data(pie(newData))
            .enter()
            .append("text")
            .text(function (d) { return d.value })
            .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
            .style("text-anchor", "middle")
            .style("font-size", 17);
            path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs

        }


        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function (t) {
                return arc(i(t));
            };
        }
    }
    render() {
        return (
            <div>
                <select id="selektor">
                    <option value="1">Prv set</option>
                    <option value="2">Vtor set</option>
                    <option value="3">Tret set</option>
                </select>
                <svg></svg>

            </div>
        )
    }

}

