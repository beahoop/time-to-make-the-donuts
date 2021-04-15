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
      <tr>
        <th scope="row">{ing.qty * newyields} </th>
        <td>{ing.unit}</td>
        <td> of</td>
        <td> {ing.type}</td>
      </tr>
   ));

  console.log('recipe', recipe);
  return(
    <>

    <div className="row detail">
    <div className="col-10 col-md-12 mx-auto">
    <div className="repice-li col-8 mx-auto">
      <div className="row">
        <p className="repice-title col-12">{recipe.title}</p>
      </div>
        <p className="recipe-author">By: {recipe.author}</p>

          <div className="row">
          <img className="img-fluid" src={recipe.image} alt="preview"/>
          </div>
          <div className="yieldsSec row">
          <span className="col-4 repice-type float-start">Make for: {recipe.type_meal}</span>

            {this.state.isEditing
              ?
              <div class=" col-4 input-group mb-3">
                <div class="input-group-prepend">
                  <input type="number"  min="0" step={`${recipe.yields}`} name="newyields"
                  value={this.state.newyields} onChange={this.handleInputEdit}
                  onKeyUp={(event) => this.handleEdit(event, this.state.newyields)}/>
                </div>
              </div>
              :
            <span className="col-4 repice-yields">yields {this.state.newyields} </span>
            }
          {!this.state.isEditing
            ?
          <button className="btn col-4 btn-outline-info" type="button" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>
              Make More
          </button>
            :
            null
          }
          </div>




          <div className="row">
          <span className="col-4 repice-prepTime">Prep time: {recipe.prep_time} </span>
          <span className="col-4 repice-cookTime">Cook time: {recipe.cook_time} </span>
          <span className="col-4 repiceTemp"> {recipe.cook_temp} {recipe.degree} </span>
          </div>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Amount</th>
                  <th scope="col">Unit</th>
                  <th scope="col"></th>
                  <th scope="col">type</th>
                </tr>
              </thead>
              <tbody>
              { ingredientList }
              </tbody>
            </table>
          <p className="repice-published">Directions: {recipe.directions}</p>
          <p className="repice-published">Notes: {recipe.notes}</p>

        </div>
      </div>
    </div>
    </>
  )
}

}


export default RecipeDetail;
