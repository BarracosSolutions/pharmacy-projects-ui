import React, { Component } from 'react';
import { localhost } from '../../connections/connections';
import ReactChartkick, { PieChart} from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

class ProjectsStatusChart extends Component {
    constructor(props){
      super(props);
  
      this.state = {
        data: []
      }
  
    }
  
    componentDidMount(){
        this.setState({data:[]})
        this.getProjects();
    }

    getProjects(){
        const APIurl =  localhost + "DBHandler.php/Project/";
        console.log(localhost);
        fetch(APIurl).then(response => response.json())
                     .then(json => this.parseResponse(json))
                     .catch(error => console.log(error));
    }

    parseResponse(jsonData){
        let pendingStatus = 0;
        let inProgressStatus = 0;
        let finishedStatus = 0;
        jsonData.forEach((element)=>{
            if(element.ProjectStatusId === "1"){
                pendingStatus++;
            }
            else if(element.ProjectsStatusChart === "2"){
                inProgressStatus++;
            }
            else{
                finishedStatus++;
            }
        });

        this.setState({data: [ ["Pending",pendingStatus],["In Progress",inProgressStatus],["Finished",finishedStatus]]});

    }


    render() {
      return (
        <div>
          <h2 className="title">Project Status Overview</h2>
          <PieChart data={this.state.data} donut={true} colors={["#D1DBBD", "#91AA9D",'#193441']} download="PieChartProjectsByDrugs"/>
        </div>
      );
    }
  }
  
  export default ProjectsStatusChart;