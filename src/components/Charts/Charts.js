import React, { Component } from 'react';
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { localhost } from '../../connections/connections';
import ReactChartkick, { LineChart, PieChart, ScatterChart, ColumnChart, BarChart } from 'react-chartkick'
import Chart from 'chart.js'
import {GoogleCharts} from 'google-charts';

 

ReactChartkick.addAdapter(Chart)

class Charts extends Component {
  constructor(props){
    super(props);

    this.state = {
      status_of_projects : [["Defined", 5], ["In process",8] ,["Finished",3] ], // {"Defined": 5,"In process":8 ,"Finished":3 },
      projects_by_drugs : {"Cocaina": 44, "Nicotina": 23,"Extasis":23},
      projects_by_budget : [
        {"name":"Proyecto Uno", "data": {"Proyecto uno": 3000}},
        {"name":"Proyecto Dos", "data": {"Proyecto Dos": 5000}}
      ]
    }

  }

  componentDidMount(){

  }


  render() {
    return (
      <div>
        <h2>Charts</h2>
        <h3>Projects by Status</h3>
        <PieChart data={this.state.status_of_projects} donut={true}/>


         <h3>Projects by Bugde</h3>
        <BarChart  prefix="$" data={this.state.projects_by_budget} xtitle="Budget" ytitle="Projects"/>


         <h3>Projects by Droug</h3>
        <ColumnChart data={this.state.projects_by_drugs} xtitle="Drug" ytitle="Projects"/>

      </div>
    );
  }
}

export default Charts;