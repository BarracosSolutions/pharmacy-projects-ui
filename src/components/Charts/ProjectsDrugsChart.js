import React, { Component } from 'react';
import { localhost } from '../../connections/connections';
import ReactChartkick, { ColumnChart  } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

class ProjectsDrugsChart extends Component {
    constructor(props){
      super(props);
  
      this.state = {
        data: []
      }
  
    }
  
    componentDidMount(){
        this.setState({data:[]});
        this.getDrugsData();
    }

    getDrugsData(){
        const APIurl = localhost + "DBHandler.php/Project_Drugs/";
        fetch(APIurl).then(response => response.json())
                     .then( json => this.parseResponse(json))
                     .catch(error => console.log(error));
    }

    parseResponse(jsonData){
        jsonData.forEach((element)=>{
            this.setState({data: [...this.state.data,[element.DrugNm,element['Count(Drug.DrugId)']]]});
        });
    }


    render() {
      return (
        <div>
            <h2 className="title">Projects Drugs Overview</h2>
            <ColumnChart data={this.state.data} xtitle="Drug" ytitle="Projects"/>
        </div>
      );
    }
  }
  
  export default ProjectsDrugsChart;