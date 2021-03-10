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
    yields: '',
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
  console.log('recipe', recipe);
  return(
    <>
    <div className="listImg col-3 gx-5 ">
      <a href={`/recipe/${recipe.id}`}>
          <img className="homepage-img" src={recipe.image} alt="preview"/>
        </a>
</div>

    </>
  )
}

}


export default RecipeItem;
