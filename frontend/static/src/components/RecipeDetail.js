import React, { Component } from 'react';




class RecipeDetail extends Component{
  constructor(props) {
  super(props);
  this.state = {
    recipe:[],
    isEditing: false,
    yields: null,
    newyields: null,
  }
  this.handleEdit = this.handleEdit.bind(this);
  this.handleInputEdit = this.handleInputEdit.bind(this);
  this.filterRecipes = this.filterRecipes.bind(this);
}



componentDidMount() {
  fetch(`/api/v1/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(
      (result) => {
        console.log('response', result)
        this.setState({
          recipe: result,
          yields: result.yields,
          newyields: result.yields,
        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
}
handleEdit(event, yields){
  if(event.keyCode === 13) {
    this.setState({ isEditing: false });
    this.setState({ newyields: yields })
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
  const recipe = this.state.recipe;
  const newyields = (this.state.newyields / this.state.yields)
  const ingredientList = this.state.recipe.ingredients?.map((ing, index) => (
    <li key={index}>
      <h2>{ing.qty * newyields } {ing.unit} of {ing.type}  </h2>
    </li>
   ));

  console.log('recipe', recipe);
  return(
    <>

    <li key={recipe.id} className="repice-li">
          <div className="img-container">
          <img className="recipe-img" src={recipe.image} alt="preview"/>
          </div>
          <h4 className="repice-title">{recipe.title}</h4>
          <p className="repice-type">{recipe.type_meal}</p>

            {this.state.isEditing
              ?
              <input type="number"  min="0" step={`${recipe.yields}`} name="newyields"
              value={this.state.newyields} onChange={this.handleInputEdit}
              onKeyUp={(event) => this.handleEdit(event, this.state.newyields)}/>
              :
            <span className="repice-yields">yields {this.state.newyields} </span>
            }

          {!this.state.isEditing

            ?

            <button className="btn btn-outline-success" type="button" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>
          Make More
        </button>
            :
            null
          }
          <br/>
          <span className="repice-type">Prep time: {recipe.prep_time} |</span>
          <span className="repice-type">Cook time: {recipe.cook_time} |</span>
          <span className="repice-type"> {recipe.cook_temp} {recipe.degree} |</span>
          <p className = "repice-list-text" >
            {recipe.directions}
            </p>
            <ul>{ ingredientList }</ul>

          <p className="repice-author">Writen by: {recipe.author}</p>
          <p className="repice-published">This repice is {recipe.published}</p>
          <p className="repice-published">Directions {recipe.directions}</p>
          <p className="repice-published">Notes {recipe.notes}</p>
          <p className = "recipe-list-text-profile" > {recipe.body} </p>



              <button className="btn" type="button" onClick={()=> this.props.removeRecipe(recipe)}>
              Delete
              </button>

        </li>

    </>
  )
}

}


export default RecipeDetail;
