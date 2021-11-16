import { Component } from "react";
import * as d3 from 'd3';
export default class d3_map extends Component {
async componentDidMount(){

    var podatoci = {"children":[{"name":"boss1","children":[{"name":"mister_a","group":"A","value":28,"colname":"level3"},{"name":"mister_b","group":"A","value":19,"colname":"level3"},{"name":"mister_c","group":"C","value":18,"colname":"level3"},{"name":"mister_d","group":"C","value":19,"colname":"level3"}],"colname":"level2"},{"name":"boss2","children":[{"name":"mister_e","group":"C","value":14,"colname":"level3"},{"name":"mister_f","group":"A","value":11,"colname":"level3"},{"name":"mister_g","group":"B","value":15,"colname":"level3"},{"name":"mister_h","group":"B","value":16,"colname":"level3"}],"colname":"level2"},{"name":"boss3","children":[{"name":"mister_i","group":"B","value":10,"colname":"level3"},{"name":"mister_j","group":"A","value":13,"colname":"level3"},{"name":"mister_k","group":"A","value":13,"colname":"level3"},{"name":"mister_l","group":"D","value":25,"colname":"level3"},{"name":"mister_m","group":"D","value":16,"colname":"level3"},{"name":"mister_n","group":"D","value":28,"colname":"level3"}],"colname":"level2"}],"name":"CEO"};
    
    var svg = d3.select("div")
    .append("svg")
    .attr("width",800)
    .attr("height",600);

    var g = svg.append("g").attr("transform","translate("+150+","+80+")");
    
    var root = d3.hierarchy(podatoci).sum(function(d){return d.value});

    d3.treemap()
    .size([800, 600])
    .paddingTop(15)
    .paddingRight(7)
    .paddingInner(5)
    (root);

    var color = d3.scaleOrdinal()
    .domain(["boss1","boss2","boss3"])
    .range(d3.schemeSet1);

    var opacity = d3.scaleLinear()
    .domain([5,30])
    .range([0.5,1]);

    svg.selectAll("rect")
    .data(root.leaves())
    .join("rect")
    .attr("x",function(d){return d.x0;})
    .attr("y",function(d){return d.y0;})
    .attr("width",function(d){return d.x1-d.x0;})
    .attr("height",function(d){return d.y1-d.y0;})
    .style("stroke","black")
    .style("fill",function(d){return color(d.parent.data.name)})
    .style("opacity",function(d){return opacity(d.data.value)});

    svg.selectAll("names")
    .data(root.leaves())
    .enter()
    .append("text")
        .attr("x",function(d){return d.x0+10})
        .attr("y",function(d){return d.y0+15})
        .text(function(d){return d.data.name})
        .attr("fill","white");
    
    svg.selectAll("values")
    .data(root.leaves())
    .enter()
    .append("text")
        .attr("x",function(d){return d.x0+10})
        .attr("y",function(d){return d.y0+40})
        .text(function(d){return d.data.value})
        .attr("fill","white");

    svg.selectAll("bosses")
    .data(root.descendants().filter(function(d){return d.depth==1}))
    .enter()
    .append("text")
        .attr("x", function(d){return d.x0+10})
        .attr("y", function(d){return d.y0+10})
        .text(function(d){return d.data.name})
        .attr("font-size","20px")
        .attr("fill","black")
}
    render() {
        return (
            <div></div>
        )
    }

}