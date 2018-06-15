import React, { Component } from 'react';
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { localhost } from '../../connections/connections';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

class Charts extends Component {
  constructor(props){
    super(props);

    this.state = {

    }

  }

  componentDidMount(){

  }


  render() {
    return (
      <div>
        <h2>Charts</h2>
        <PieChart data={[["Blueberry", 44], ["Strawberry", 23]]} />
      </div>
    );
  }
}

export default Charts;