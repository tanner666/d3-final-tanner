import React,{Component} from "react";
import * as d3 from "d3";
import "./App.css"

class Child2 extends Component{
  constructor(props){
    super(props);
    this.state={
        
    };
  }

  //only called initially when component mounts
  componentDidMount(){
  }

  //called each time component is updated
  componentDidUpdate(){
    
  }

  //called when component is mounted, called before componentDidMount
  render(){
    return(
        <div>
            <svg className="child2_svg">
                <g className="g_1"></g>
            </svg>
        </div>
    )
  }
}

export default Child2;