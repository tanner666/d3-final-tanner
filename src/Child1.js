import React,{Component} from "react";
import * as d3 from "d3";
import "./App.css"

class Child1 extends Component{
  constructor(props){
    super(props);
    this.state={};
  }

  //only called initially when component mounts
  componentDidMount(){
    console.log(this.props.data1)
  }

  //called each time component is updated
  componentDidUpdate(){
    //numerical value, sex
    var data=this.props.data1

     console.log("Props: ", this.props.data1);

    //set the dimensions and margins of graph
    var margin = {top:10, right:10, bottom:30,left:20},
    w = 500 - margin.left - margin.right,
    h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child1_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_1")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //group data
    const grouped = data.reduce((acc, item) => {
        //initialize the group if it doesn't already exist
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        //push the current items selected_numerical value to the group
        acc[item.category].push(parseFloat(item.x));
        return acc;
      }, {});
  
      //calculate the average for each group and return as dict with averages
      const sums = Object.keys(grouped).map(key => {
        const sum = grouped[key].reduce((sum, current) => sum + 1, 0);
        return { category: key, sum };
      });

      console.log("sums: ", sums)

    // X axis
    var x_data = sums.map((item) => item.category);
    var x_scale = d3
      .scaleBand()
      .domain(x_data)
      .range([margin.left, w])
      .padding(0.2);

    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    // Add X axis label
    container.selectAll("text")
    .data([0])
    .join('text')
    .attr('class','x-axis-label')
    .attr('fill', 'black')
    .attr("x", w / 4 )
    .attr("y", 20)
    .text("Categories")

    // Add Y axis
    var y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(sums, d => d.sum)])
      .range([h, 0]);

    container
      .selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "y_axis_g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y_scale));

    container.selectAll("rect")
    .data(sums)
    .join("rect")
    .attr("x", d => x_scale(d.category))
    .attr("y", d => y_scale(d.sum))
    .attr("width", x_scale.bandwidth())
    .attr("height", d =>  h - y_scale(d.sum)) 
    .attr("fill", "#69b3a2");

    container.selectAll("text.rect")
        .data(sums)
        .join("text")
        .attr("class", "rect")
        .attr("text-anchor", "middle")     // centers the text horizontally
        .attr("x", d => x_scale(d.category) + x_scale.bandwidth() / 2)    // center text
        .attr("y", d => y_scale(d.sum) + 20)    // adjust y position to be inside the bar
        .text(d => d.sum)

    console.log("Component did update", this.props.data1)
    }

    //called when component is mounted, called before componentDidMount
    render(){
    return(
    <svg className="child1_svg">
    <g className="g_1"></g>
    </svg>
    )
    }
    }

    export default Child1;