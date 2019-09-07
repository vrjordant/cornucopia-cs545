import React, { Component } from 'react';
import './App.css';
import Groups from './components/groups';
import Recipes from './components/recipes';
import 'bootstrap/dist/css/bootstrap.css';

import {Navbar } from 'reactstrap';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <div className="Groups">
          <Groups />
        </div>
        <div>
          <Recipes />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
