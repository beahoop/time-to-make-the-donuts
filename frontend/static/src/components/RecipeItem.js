import React, { Component } from 'react';




class RecipeItem extends Component{
  constructor(props) {
  super(props);
  this.state = {
    isEditing: false,
    recipeSelection: "All",
    title: '',
    prep_time: '',
    cook_time: '',
    cook_temp: '',
    yeild: '',
    food_type: '',
    ingredients: [],
    directions: '',
    notes: '',
  }
  this.handleEdit = this.handleEdit.bind(this);
  this.handleInputEdit = this.handleInputEdit.bind(this);
  this.filterRecipes = this.filterRecipes.bind(this);
}

handleEdit(event, recipe){
  if(event.keyCode === 13) {
    this.props.editRecipe(recipe, this.state.note);
    this.setState({ isEditing: false });
  }
}

handleInputEdit(event) {
  this.setState({ [event.target.name]: event.target.value })
}

filterRecipes(event){
  console.log("I'm firing");
  const recipeType = event.target.dataset.type;
  this.setState({recipeSelection: recipeType})
}

render(){
  const recipe = this.props.recipe;
  return(
    <>
    <li key={recipe.id} className="repice-li">
          <h4 className="repice-title">{recipe.title}</h4>
          <p className="repice-type">{recipe.type_meal} Yeilds {recipe.yeild}</p>
          <span className="repice-type">Prep time: {recipe.prep_time} |</span>
          <span className="repice-type">Cook time: {recipe.cook_time} |</span>
          <span className="repice-type"> {recipe.cook_temp} {recipe.degree} |</span>

          <p className = "repice-list-text" >
            {recipe.directions}
            </p>

          <p className="repice-author">Writen by: {recipe.author}</p>
          <p className="repice-published">This repice is {recipe.published}</p>
          <p className="repice-published">Directions {recipe.directions}</p>
          <p className="repice-published">Notes {recipe.notes}</p>

            {this.state.isEditing
              ?
              <input type="note" name="note"
              value={this.state.note} onChange={this.handleInputEdit}
              onKeyUp={(event) => this.handleEdit(event, recipe)}/>
              :
              <p className = "recipe-list-text-profile" > {recipe.body} </p>
            }

          {!this.state.isEditing

            ?
            <button className="btn" type="button" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>
            Edit
            </button>
            :
            null
          }

              <button className="btn" type="button" onClick={()=> this.props.removeRecipe(recipe)}>
              Delete
              </button>

        </li>
    </>
  )
}

}


export default RecipeItem;
