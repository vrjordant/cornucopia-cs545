
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

import './recipes.css';
import 'bootstrap/dist/css/bootstrap.css';


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
                name: "test",
                description: "",
                ingredients: [],
                instructions: "",
                image: "",
                totalTime: 0,
                yields: "0"
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
        if (!this.state.createRecipe) {
            this.setState({
                newRecipeData: {
                    name: "test",
                    description: "",
                    ingredients: [],
                    instructions: "",
                    image: "",
                    totalTime: 0,
                    yields: "0"
                }
            })
        }
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
                recipe.name = e.target.value
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
        console.log(e.target.files)

        this.setState({
            file: e.target.files[0]
        })

    }

    addRecipe = async () => {

        var formData = new FormData();
        formData.append("file", this.state.file)
        formData.append("recipe", JSON.stringify(this.state.newRecipeData))

        let result = await axios.post("/api/recipes/" + this.props.selectedGroup._id, formData)
        let recipes = [...this.state.recipes]
        recipes.push(result.data)
        this.setState({
            recipes: recipes,
            createRecipe: false

        })
        this.props.addRecipe()

    }

    deleteIngredient = (ingredient) => {
        var recipe = { ...this.state.newRecipeData }

        var index = recipe.ingredients.indexOf(ingredient)
        if (index !== -1) {
            recipe.ingredients.splice(index, 1);
            this.setState({ newRecipeData: recipe });
        }
    }

    render() {
        let groupInv = "http://localhost:3000/api/groups/join/" + this.props.selectedGroup._id
        return (
            <React.Fragment>
                <Modal isOpen={this.state.createRecipe} toggle={this.toggleCreate}>
                    <ModalHeader toggle={this.toggleCreate}>Add A Recipe!</ModalHeader>
                    <ModalBody>
                        {/* 
                        Enter A recipe URL to AutoFill

                        <div style={{ display: "flex" }}>
                            URL
                            <input type="text" className="recipeUrl"></input>
                            <button className="getUrl"></button>
                        </div>

                        <br>
                        </br> */}

                        <input type="text" className="textInput" onChange={(e) => this.updateValues(e, "title")}
                            value={this.state.newRecipeData.title} placeholder="Title"></input>


                        <input type="file" className="fileInput" name="file" onChange={this.uploadPicture} accept="image/x-png,image/gif,image/jpeg" />

                        <div style={{ display: "flex" }}>
                            <textarea type="text" placeholder="Description" className="textInput" onChange={(e) => this.updateValues(e, "description")}
                                value={this.state.newRecipeData.description}></textarea>

                        </div>

                        Ingredients
                        {this.state.newRecipeData.ingredients.map((ingredient, index) => (

                            <div key={index} style={{ display: "flex" }}>

                                {ingredient}
                                <button onClick={() => this.deleteIngredient(ingredient)} className="delete">X</button>

                            </div>

                        ))}

                        <div style={{ display: "flex" }}>
                            <form onSubmit={this.addIngredient}>
                                <input type="text" placeholder="Enter Another Ingredient" className="ingredient"></input>
                                <Button className="addIngredient">Add</Button>

                            </form>

                        </div>

                        <textarea type="text" placeholder="Instructions" className="textInput" onChange={(e) => this.updateValues(e, "instructions")}
                            value={this.state.newRecipeData.instructions}></textarea>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addRecipe}>Add Recipe</Button>
                        <Button color="secondary" onClick={this.toggleCreate}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.shareGroup} toggle={this.toggleShare}>
                    <ModalHeader toggle={this.toggle}>Copy this Link and Send to your Friends!</ModalHeader>
                    <ModalBody>

                        <p>{groupInv}</p>
                        <button className="copyButton" onClick={() => this.copyLink(groupInv)}> Copy </button>

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
                                <img className="recipePic" src={`data:image/png;base64,${recipe.image}`} alt="Picc" />
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
