
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'

import './groups.css';
import 'bootstrap/dist/css/bootstrap.css';
const axios = require('axios');

let userId = "5d731e8f8ff90c0198122b81"

class Groups extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      selectedGroupID: 0,
      showModal: false,
      createGroupName: "",
      successfulCreation : false,
    }
  }

  async componentDidMount() {

    //api call
    let data = await axios.get("/api/users/" + userId)
    console.log(data)

    this.setState({
      groups: data.data
    })
  }


  onSelectGroup = (id) => {
    //select group to get recipes
    this.setState({
      selectedGroupID: id
    })
    console.log(id)
  }

  toggle = () => {
    //api to generate a new group
    this.setState({showModal : !this.state.showModal})
  }

  createGroup = async() => {
    //api to create group given name

    let result = await axios.post("/api/groups", {
      name : this.state.createGroupName,
      owner : userId
    })

    this.toggle()
    this.setState({
      successfulCreation : true,
      groups : [...this.state.groups, result.data]
    })

  }


  changeName = (e) => {
    this.setState({createGroupName : e.target.value})
  }



  render() {
    return (
      <React.Fragment>
        <h2>Groups</h2>
        <ListGroup>
          {this.state.groups.map((group, index) => (
            <ListGroupItem className={`${this.state.selectedGroupID === group._id ? 'selected' : ''}`}
              key={index} onClick={() => this.onSelectGroup(group._id)}>
              {group.name} <Badge pill>{group.recipes.length}</Badge></ListGroupItem>
          ))}

          <ListGroupItem onClick={this.toggle}>Create a new Group <Badge className="addGroup" pill> + </Badge></ListGroupItem>

        </ListGroup>

        <Modal isOpen={this.state.showModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create a group</ModalHeader>
          <ModalBody>
            Name: <input type="text" onChange={this.changeName}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.createGroup}>Create Group</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>



      </React.Fragment>



    );
  }
}

export default Groups;
