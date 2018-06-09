import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isUserAuthenticaded: false
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Content/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
