
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

import './groups.css';
import 'bootstrap/dist/css/bootstrap.css';
const axios = require('axios');



class Groups extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      selectedGroup: 0,
      showModal: false,
      createGroupName: "",
      successfulCreation : false,
    }
  }

  async componentDidMount() {

    let data = await axios.get("/api/users/" + this.props.userId)

    let group = {}
    if(data.data[0]._id){
      group = data.data[0]
      this.props.selectGroup(data.data[0])
    }

    this.setState({
      groups: data.data,
      selectedGroup : group
    })

  }

  async componentWillReceiveProps(nextProps){
    //if a recipe is deleted or added call api to update the group so the correct values are there
    if(this.props.toggleRecipe !== nextProps.toggleRecipe){
      console.log("h")
      let data = await axios.get("/api/users/" + this.props.userId)

      if(data.data[0]._id){
        this.props.selectGroup(data.data[0])
      }
  
      this.setState({
        groups: data.data,
      })
    }

  }


  onSelectGroup = (group) => {
    //select group to get recipes
    console.log(group)
    this.setState({
      selectedGroup: group
    })
    this.props.selectGroup(group)

  }

  toggle = () => {
    //api to generate a new group
    this.setState({showModal : !this.state.showModal})
  }

  createGroup = async() => {
    //api to create group given name

    let result = await axios.post("/api/groups", {
      name : this.state.createGroupName,
      owner : this.props.userId
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
            <ListGroupItem className={`group${this.state.selectedGroup._id === group._id ? 'Selected' : ''}`}
              key={index} onClick={() => this.onSelectGroup(group)}>
              {group.name} <Badge pill>{group.recipes.length}</Badge></ListGroupItem>
          ))}

          <ListGroupItem className={"group"} onClick={this.toggle}>Create a new Group <Badge className="addGroup" pill> + </Badge></ListGroupItem>

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
