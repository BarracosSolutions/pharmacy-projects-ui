import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';

import Projects from '../Projects/Projects';
import Project from '../Project/Project';
import Patient from '../Patient/Patient';
import Employee from '../Employee/Employee';
import Drug from '../Drug/Drug';
import LogIn from '../LogIn/LogIn';
import UnAuthorized from '../UnAuthorized/UnAuthorized';
import ProjectsStatusChart from '../Charts/ProjectsStatusChart';
import ProjectsBudgetChart from '../Charts/ProjectsBudgetChart';

class Content extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/' component={Projects} exact/>
          <Route path='/project/:id' component={Project} exact/>
          <Route path='/patient' component={Patient} exact/>
          <Route path='/drug' component={Drug} exact/>
          <Route path='/employee' component={Employee} exact/>
          <Route path='/project' component={Project} exact/>
          <Route path='/projects-status-chart' component={ProjectsStatusChart} exact/>
          <Route path='/projects-budget-chart' component={ProjectsBudgetChart} exact/>
          <Route exact path='/unauthorized' component={UnAuthorized}/>
          <Route exact path='/login' component={LogIn}/>
        </Switch>
      </div>
    );
  }
}

export default Content;