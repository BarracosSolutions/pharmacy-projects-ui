import React, { Component } from 'react';
import { localhost } from '../../connections/connections';
import ReactChartkick, { BarChart  } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

class ProjectsBudgetChart extends Component {
    constructor(props){
      super(props);
  
      this.state = {
        data: []
      }
  
    }
  
    componentDidMount(){
        this.setState({data:[]});
        this.getProjects();
    }

    getProjects(){
        const APIurl = localhost + "DBHandler.php/Project/";
        fetch(APIurl).then(response => response.json())
                     .then(json => this.parseResponse(json))
                     .catch(error => console.log(error));
    }

    parseResponse(jsonData){
        jsonData.forEach((element)=>{
            this.setState({data: [...this.state.data,[element.ProjectNm,element.Funds]]});
        });
    }


    render() {
      return (
        <div>
            <h2 className="title">Projects Budget Overview</h2>
            <BarChart   prefix="$" data={this.state.data} xtitle="Budget" ytitle="Projects" download="BarChartProjectsByBudget"/>
        </div>
      );
    }
  }
  
  export default ProjectsBudgetChart;