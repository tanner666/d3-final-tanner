import React,{Component} from "react";
import * as d3 from "d3";
import "./App.css"

class Child2 extends Component{
  constructor(props){
    super(props);
    this.state={
        selected_category:"A",
    };
  }

  //only called initially when component mounts
  componentDidMount(){
  }

  //called each time component is updated
  componentDidUpdate(){
    //numerical value, sex
    const selected_category = this.state.selected_category
    console.log("Props graph 2: ", this.props.data2);
    var data = this.props.data2
    var data_sorted = []
    var data2=this.props.data2.map(item=>{
        if (item.category === selected_category){
            data_sorted.push(item)
        }
        
    })

    console.log("DAta graph 2: ", data_sorted);


    var x_data=data_sorted.map(item=>item.x)
    var y_data=data_sorted.map(item=>item.y)
    console.log("X_data", x_data)

    //set the dimensions and margins of graph
    var margin = {top:10, right:10, bottom:30,left:20},
        w = 500 - margin.left - margin.right,
        h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child2_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_2")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    const x_scale = d3.scaleLinear().domain([0,d3.max(x_data)]).range([margin.left,w]);
    container.selectAll(".x_axis_g").data([0]).join('g').attr("class",'x_axis_g')
    .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

    // Add X axis label
    container.selectAll("text")
      .data([0])
      .join('text')
      .attr('class','x-axis-label')
      .attr('fill', 'black')
      .attr("x", w /2 )
      .attr("y", 20)
      .text("X")

     // Add Y axis
     const y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h,0]);
     container.selectAll(".y_axis_g").data([0]).join('g').attr("class",'x_axis_g')
     .attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y_scale));

     // Add Y axis label
    container.selectAll("y-axis-label")
    .data([0])
    .join('text')
    .attr('class','y-axis-label')
    .attr('fill', 'black')
    .attr("x", -10 )
    .attr("y", h/2)
    .text("Y")

     var tooltip = d3.select("body")
      .selectAll(".tooltip_div")
      .data([0])  // binds a single element to the tooltip
      .join("div")  // joins the data to a div element
      .attr("class", "tooltip_div")  // adds a CSS class for styling
      .style("position", "absolute")  // uses absolute positioning
      .style("visibility", "hidden");  // starts as hidden

     container.selectAll("circle")
        .data(data_sorted)
        .join("circle")
        .attr("cx",function (d){
            return x_scale(d.x);
        })
        .attr("cy",function(d){
            return y_scale(d.y);
        })
        .attr("r",3)
        .style("fill","#69b3a2")

        .on("mouseover", (event, d) => {
            tooltip.html(d.x)  // sets the tooltip text to the node's size property
            tooltip.style("visibility", "visible");  // makes the tooltip visible
          })
          .on("mousemove", (event) =>
            tooltip
              .style("top", event.pageY - 10 + "px")  // positions the tooltip slightly above the cursor
              .style("left", event.pageX + 10 + "px")  // positions the tooltip to the right of the cursor
          )
          .on("mouseout", () => tooltip.style("visibility", "hidden"));  // hides the tooltip on mouseout

      console.log("")
  }

  //called when component is mounted, called before componentDidMount
  render(){
    return(
        <div>
            <div className="dropdown-container">
                <div className="dropdown">
                    <span className="dropdown-label">Select Target:</span>
                    <select className="dropdown-select" onChange={(event)=>this.setState({selected_category:event.target.value})} value={this.state.selected_category}>
                    {this.props.categoricalColumns.map(column => (
                        <option key={column} value={column}>{column}</option>
                    ))}
                    </select>
                </div>
            </div>
            <svg className="child2_svg">
                <g className="g_2"></g>
            </svg>
        </div>
    )
  }
}

export default Child2;