import { Component } from "react";
import *  as d3 from 'd3';

export default class d3_rect2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                values: []
            },
            niza: []
        }
    }

    handleChange = e => this.setState({
        ...this.state.data,
        [e.target.name]: e.target.value

    });


    mouseMove() {

    }
    mouseOut() {

    }

    changeValue = e => {
        var newData = [];
        for (let i = 0; i < this.state.data.values.length; i++) {
            if (e.target.value == this.state.data.values[i].value || e.target.value == 0) {
                newData.push(this.state.data.values[i]);
            }
        }
        console.log(e.target.value);
        var svg = d3.select("svg"),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin;

        var xScale = d3.scaleBand().range([0, width]).padding(0.5),
            yScale = d3.scaleLinear().range([height, 0]);

        xScale.domain(newData.map(function (d) { return d.year; }));
        svg.select(".xAxis").call(d3.axisBottom(xScale));

        yScale.domain([0, d3.max(newData, function (d) { return d.dateCreated; })]);
        svg.select(".yAxis").transition().duration(700).call(d3.axisLeft(yScale));


        var rect = svg.select("g").selectAll(".bar").data(newData);

        rect
            .enter()
            .append("rect")
            .merge(rect)
            .transition()
            .duration(700)
            .attr("class","bar")
            .attr("value", function (d) { return d.dateCreated })
            .attr("x", function (d) { return xScale(d.year); })
            .attr("y", function (d) { return yScale(d.dateCreated); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return height - yScale(d.dateCreated); })
            .attr("fill", "blue");
            
            svg.select("g").selectAll("rect")
            .on("mouseover", mouseOver)
            .on("mousemove", mouseMove)
            .on("mouseout", mouseOut);
            

        rect.exit().remove()
    }

    async componentDidMount() {

        var podatoci = await d3.json('http://localhost:8080/api/get');
        var newNiza = [];
        for (let i = 0; i < podatoci.length; i++) {
            if (!newNiza.includes(podatoci[i].value)) {
                newNiza.push(podatoci[i].value);
            }
        }
        console.log(newNiza);

        this.setState({
            data: {
                values: podatoci
            },
            niza: newNiza
        })

        console.log(podatoci);
        for (let i = 0; i < this.state.data.values.length; i++) {
            var datum1 = new Date(podatoci[i]['dateCreated']);
            var datum2 = new Date(podatoci[i]['dateEnded']);
            var min1 = datum1.getTime() / 60000;
            var min2 = datum2.getTime() / 60000;
            podatoci[i]['dateCreated'] = (Math.abs(min1 - min2));
        }

        var svg = d3.select("svg"),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin;

        var xScale = d3.scaleBand().range([0, width]).padding(0.5),
            yScale = d3.scaleLinear().range([height, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");
        xScale.domain(podatoci.map(function (d) { return d.year; }));
        yScale.domain([0, d3.max(podatoci, function (d) { return d.dateCreated; })]);
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .attr("stroke-width", "2")
            .attr("stroke-opacity", ".7")
            .attr("class", "xAxis");

        g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function (d) {
                return d;
            }).ticks(10))
            .attr("class", "yAxis");
        ;

        g.selectAll(".bar")
            .data(podatoci)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("value", function (d) { return d.dateCreated })
            .attr("x", function (d) { return xScale(d.year); })
            .attr("y", function (d) { return yScale(d.dateCreated); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return height - yScale(d.dateCreated); })
            .attr("fill", "blue")
            .on("mouseover", mouseOver)
            .on("mousemove", mouseMove)
            .on("mouseout", mouseOut);

        var tooltip = d3.select("#chart").append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style("position", "absolute")
            .style("z-index", 10);

    }
    render() {
        return (
            <div id="chart">
                <select id="valueSelector" placeholder="Odberi vrednost" onChange={this.changeValue}>
                    <option value="0">Odberi vrednost</option>
                    {this.state.niza.map((item) => (<option value={item}>{item}</option>))}

                </select>
                <svg width="800" height="600"></svg>
            </div>
        )
    }

}

function mouseOver(event, d) {
    d3.select(this).transition().duration(300).style("fill", "red");
    d3.select(".tooltip").style("opacity", 1)
        .html("Vreme potrebno za zadacha:<br>" + Math.floor(d.dateCreated));;
}

function mouseMove(event) {
    d3.select(
        ".tooltip")
        .style("left", event.pageX + 20 + "px")
        .style("top", event.pageY - 40 + "px");
}

function mouseOut() {
    d3.select(this).transition().duration(300).style("fill", "blue");
    d3.select(".tooltip").style("opacity", 0);

}

