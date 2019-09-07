
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

import './recipes.css';
import 'bootstrap/dist/css/bootstrap.css';

import pic_data from './pic.js'
const axios = require('axios');


class Recipes extends Component {
    constructor() {
        super();
        this.state = {
            recipes: [],
            shareGroup: false,
            copied: false,
        }
    }

    async componentDidMount() {
        //api to get recipes
        let recipes = [{
            _id: 1,
            name: "good food",
            description: "Pede sem diam a, maecenas tellus. Vitae venenatis pede integer nulla. In donec dolor elit vivamus perspiciatis. Ipsum faucibus lacus nonummy ipsum id leo, mauris dolor suspendisse sollicitudin augue, quis elit nec tortor sed ultrices risus. Leo felis turpis sit lacinia",
            ingredients: ["1 cup of food ", "2 cups of food", "1 cup of smiles", "2 tsp of happiness"],
            instruction: "Pede sem diam a, maecenas tellus. Vitae venenatis pede integer nulla. In donec dolor elit vivamus perspiciatis. Ipsum faucibus lacus nonummy ipsum id leo, mauris dolor suspendisse sollicitudin augue, quis elit nec tortor sed ultrices risus. Leo felis turpis sit lacinia",
            total_time: 100,
            yields: "1 food",
            clicked: false,
            data: pic_data

        },
        {
            _id: 2,
            name: "good food",
            description: "Pede sem diam a, maecenas tellus. Vitae venenatis pede integer nulla. In donec dolor elit vivamus perspiciatis. Ipsum faucibus lacus nonummy ipsum id leo, mauris dolor suspendisse sollicitudin augue, quis elit nec tortor sed ultrices risus. Leo felis turpis sit lacinia",
            ingredients: ["1 food ", "2 food"],
            instruction: "good food here",
            total_time: 100,
            yields: "1 food",
            clicked: false,
            data: pic_data

        },
        {
            _id: 3,
            name: "good food",
            description: "Pede sem diam a, maecenas tellus. Vitae venenatis pede integer nulla. In donec dolor elit vivamus perspiciatis. Ipsum faucibus lacus nonummy ipsum id leo, mauris dolor suspendisse sollicitudin augue, quis elit nec tortor sed ultrices risus. Leo felis turpis sit lacinia",
            ingredients: ["1 food ", "2 food"],
            instruction: "good food here",
            total_time: 100,
            yields: "1 food",
            clicked: false,
            data: pic_data

        }]
        this.setState({
            recipes: recipes
        })


    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    clickRecipe = (id) => {
        let recipes = [...this.state.recipes]
        for (var i = 0; i < recipes.length; i++) {
            if (id === recipes[i]._id) {
                recipes[i].clicked = !recipes[i].clicked
                this.setState({
                    recipes: recipes
                })
                break;
            }
        }

    }

    toggleShare = () => {

        this.setState({
            shareGroup: !this.state.shareGroup,
            copied: false,
        })
    }

    copyLink = (groupInv) =>{

        navigator.clipboard.writeText(groupInv)

        this.setState({
            copied:true
        })

    }

    render() {
        let groupInv = "http://localhost:3000/join/" + this.props.selectedGroup._id
        return (
            <React.Fragment>
                <Modal isOpen={this.state.shareGroup} toggle={this.toggleShare}>
                    <ModalHeader toggle={this.toggle}>Copy this Link and Send to your Friends!</ModalHeader>
                    <ModalBody>

                        <div style={{ display: "flex" }}>

                            <p>{groupInv}</p>
                            <button className="copyButton" onClick={() => this.copyLink(groupInv) }> Copy </button>

                        </div>
                        <Alert color="info" isOpen={this.state.copied}>
                            Link Copied
                        </Alert>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleShare}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <h2>Recipes</h2>
                <div className="inviteFriends">
                    <h6>Send a group invite to your friend</h6>
                    <button onClick={this.toggleShare}>Share</button>
                </div>



                <ListGroup>
                    {this.state.recipes.map((recipe, index) => (
                        <ListGroupItem className={"recipe"}
                            key={index} onClick={() => this.clickRecipe(recipe._id)}>
                            <div>
                                <img src={`data:image/png;base64${recipe.data}`} alt="Picc" />
                                <h5 className="recipeName">{recipe.name}</h5>
                                <div className="recipeDescription">{recipe.description}</div>
                            </div>

                            <div>
                                {recipe.clicked &&
                                    <div>
                                        <br></br>
                                        <h6>
                                            Ingredients
                                        </h6>
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <div key={index}>
                                                {ingredient}
                                            </div>
                                        ))}
                                        <br></br>
                                        <br></br>
                                        <h6>
                                            Instructions
                                        </h6>
                                        {recipe.instruction}
                                    </div>
                                }

                            </div>


                            {recipe.clicked ? <i className="arrow up"></i> : <i className="arrow down"></i>}

                        </ListGroupItem>
                    ))}

                </ListGroup>

            </React.Fragment>
        );
    }
}

export default Recipes;
