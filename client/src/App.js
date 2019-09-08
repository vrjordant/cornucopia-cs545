import React, { Component } from 'react';
import './App.css';
import Groups from './components/groups';
import Recipes from './components/recipes';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'universal-cookie';



import { Navbar } from 'react-bootstrap';
const axios = require('axios');

// let userId = "5d731e8f8ff90c0198122b81"
let userId = "5d7454d04e79e955f8fe31b2"

class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedGroup: {_id: ""},
      toggleRecipe: false,
      loggedIn: false,

    }
    const cookies = new Cookies();
    cookies.set('id', userId, { path: '/' });
    console.log(cookies.get('id')); // Pacman

  }

  async componentDidMount(){
    var re = /.*\/api\/groups\/join\/.*/
    if(re.test(window.location.href)){
      await axios.get(window.location.href + "/" + userId)
      this.forceUpdate()
    }
  }

  selectGroup = (group) => {
    this.setState({
      selectedGroup: group,
    })
  }

  addRecipe = () => {
    this.setState({ toggleRecipe: !this.state.toggleRecipe })
  }


  render() {
    console.log()
    return (
      <React.Fragment>
        <Navbar  variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/cornucopia.png"
              width="50"
              height="34"
              className="d-inline-block align-top"
            />
            {' Cornucopia '}
          </Navbar.Brand>
        </Navbar> 
        <div style={{ display: "flex" }}>
          <div className="Groups">
            <Groups userId={userId} toggleRecipe={this.state.toggleRecipe} selectGroup={this.selectGroup} />
          </div>
          <div className="Recipes" >
            <Recipes addRecipe={this.addRecipe} selectedGroup={this.state.selectedGroup} />
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default App;
