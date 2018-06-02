import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <Content/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
