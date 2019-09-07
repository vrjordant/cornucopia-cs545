import React, { Component } from 'react';
import './App.css';
import Groups from './components/groups';
import Recipes from './components/recipes';
import 'bootstrap/dist/css/bootstrap.css';

import { Navbar } from 'reactstrap';


class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedGroup: {}
    }
  }

  selectGroup = (group) => {
    this.setState({
      selectedGroup : group
    })
  }

  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <div style={{ display: "flex" }}>
          <div className="Groups">
            <Groups selectGroup={this.selectGroup}/>
          </div>
          <div className="Recipes" >
            <Recipes selectedGroup={this.state.selectedGroup}/>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default App;
