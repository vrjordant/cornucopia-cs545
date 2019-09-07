
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

import './recipes.css';
import 'bootstrap/dist/css/bootstrap.css';
import FileBase64 from 'react-file-base64';


import pic_data from './pic.js'
const axios = require('axios');
const fs = require("fs");



class Recipes extends Component {
    constructor() {
        super();
        this.state = {
            recipes: [],
            shareGroup: false,
            createRecipe: false,
            copied: false,
            file: null,
            newRecipeData: {
                title: "test",
                description: "",
                ingredients: ["1", "2"],
                instructions: "",
                image: "",
            },
        }
    }

    async componentDidMount() {
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.selectedGroup != nextProps.selectedGroup) {

            let data = await axios.get("/api/groups/" + nextProps.selectedGroup._id)

            let recipes = data.data.recipes

            this.setState({
                recipes: recipes
            })
        }
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

    toggleCreate = () => {
        this.setState({
            createRecipe: !this.state.createRecipe,
        })
    }

    toggleShare = () => {

        this.setState({
            shareGroup: !this.state.shareGroup,
            copied: false,
        })
    }

    copyLink = (groupInv) => {

        navigator.clipboard.writeText(groupInv)

        this.setState({
            copied: true
        })

    }

    addIngredient = (e) => {
        e.preventDefault()

        let recipe = { ...this.state.newRecipeData }
        recipe.ingredients.push(e.target[0].value)
        e.target[0].value = ""

        this.setState({
            newRecipeData: recipe
        })
    }

    updateValues = (e, field) => {
        let recipe = { ...this.state.newRecipeData }

        switch (field) {
            case "title":
                recipe.title = e.target.value
                break
            case "description":
                recipe.description = e.target.value
                break
            case "instructions":
                recipe.instructions = e.target.value
                break;

        }

        this.setState({
            newRecipeData: recipe
        })

    }

    uploadPicture = (e) => {
        console.log(e)

        let recipe = { ...this.state.newRecipeData }
        recipe.image = e[0].base64
        this.setState({
            newRecipeData: recipe
        })

    }

    addRecipe = async() => {
        console.log(this.state)
        let result = await axios.post("/api/recipes/" + this.props.selectedGroup._id, this.state.createRecipe)
    }

    render() {
        let groupInv = "http://localhost:3000/join/" + this.props.selectedGroup._id
        return (
            <React.Fragment>
                <Modal isOpen={this.state.createRecipe} toggle={this.toggleCreate}>
                    <ModalHeader toggle={this.toggleCreate}>Add A Recipe!</ModalHeader>
                    <ModalBody>

                        Enter A recipe URL to AutoFill

                        <div style={{ display: "flex" }}>
                            URL
                            <input type="text" className="recipeUrl"></input>
                            <button className="getUrl"></button>
                        </div>

                        <br>
                        </br>

                        <div style={{ display: "flex" }}>
                            Title
                            <input type="text" className="title" onChange={(e) => this.updateValues(e, "title")}
                                value={this.state.newRecipeData.title}></input>

                        </div>

                        <FileBase64
                            multiple={true}
                            onDone={this.uploadPicture} />
                        {
                        /* <input type="file" name="myImage" onChange={this.uploadPicture} accept="image/x-png,image/gif,image/jpeg" /> */}



                        <br>
                        </br>

                        <div style={{ display: "flex" }}>
                            Description
                            <input type="text" className="description" onChange={(e) => this.updateValues(e, "description")}
                                value={this.state.newRecipeData.description}></input>

                        </div>
                        <br></br>

                        Ingredients
                        {this.state.newRecipeData.ingredients.map((ingredient, index) => (

                            <div key={index} style={{ display: "flex" }}>

                                {ingredient}
                                <button className="delete">X</button>

                            </div>

                        ))}


                        <br>
                        </br>
                        <div style={{ display: "flex" }}>
                            Add ingredient

                            <form onSubmit={this.addIngredient}>
                                <input type="text" className="ingredient"></input>
                                <button></button>

                            </form>

                        </div>




                        Instructions

                        <input type="text" className="instructions" onChange={(e) => this.updateValues(e, "instructions")}
                            value={this.state.newRecipeData.instructions}></input>



                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addRecipe}>Add Recipe</Button>
                        <Button color="secondary" onClick={this.toggleCreate}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.shareGroup} toggle={this.toggleShare}>
                    <ModalHeader toggle={this.toggle}>Copy this Link and Send to your Friends!</ModalHeader>
                    <ModalBody>

                        <div style={{ display: "flex" }}>

                            <p>{groupInv}</p>
                            <button className="copyButton" onClick={() => this.copyLink(groupInv)}> Copy </button>

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
                <div style={{ display: "flex" }}>
                    <div className="inviteFriends">
                        <button onClick={this.toggleShare}>Share This Group!</button>
                    </div>

                    <div className="addRecipe">
                        <button onClick={this.toggleCreate}>Create Recipe</button>
                    </div>

                </div>




                <ListGroup>
                    {this.state.recipes.map((recipe, index) => (
                        <ListGroupItem className={"recipe"}
                            key={index} onClick={() => this.clickRecipe(recipe._id)}>
                            <div style={{ overflow: "auto" }}>
                                <img src={`data:image/png;base64,${recipe.image}`} alt="Picc" />
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
                                        {recipe.instructions}
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
