import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Projects from '../Projects/Projects';
import Project from '../Project/Project';
import Patient from '../Patient/Patient';
import Employee from '../Employee/Employee';
import Drug from '../Drug/Drug';

class Content extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Projects}/>
          <Route exact path='/project/:id' component={Project}/>
          <Route exact path='/patient' component={Patient}/>
          <Route exact path='/drug' component={Drug}/>
          <Route exact path='/employee' component={Employee}/>
        </Switch>
      </div>
    );
  }
}

export default Content;