import React, { Component } from 'react';
import Cookies from 'js-cookie';


class RecipeEdit extends Component{
  constructor(props){
  super(props);
  this.state = {
    isEditing: false,
    recipe: [],
    recipes: [],
    title: '',
    qty: '',
    unit: '',
    type: '',
    prep_time: '',
    cook_temp: '',
    cook_time: '',
    type_meal: '',
    yields: '',
    food_type: '',
    ingredients: [],
    directions: '',
    notes: '',
    image: this.props.recipeImage,
    preview: this.props.preview,
    newyields: null,
  }
  this.handleInputEdit = this.handleInputEdit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleEdit = this.handleEdit.bind(this);
  this.removeRecipe = this.removeRecipe.bind(this);
  this.handleInput = this.handleInput.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.addIngredient = this.addIngredient.bind(this);

}


componentDidMount() {
  fetch("/api/v1/")
    .then(res => res.json())
    .then(
      (result) => {
        console.log('response', result)
        this.setState({
          recipes: result
        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
  fetch(`/api/v1/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(
      (result) => {
        console.log('response', result)
        this.setState({
          recipe: result,
          type_meal: result.type_meal,
          yields: result.yields,
          newyields: result.yields,
          title: result.title,
          ingredients: result.ingredients,
          prep_time: result.prep_time,
          cook_temp: result.cook_temp,
          cook_time: result.cook_time,
          food_type: result.food_type,
          directions: result.directions,
          notes: result.notes,
          image: result.image,

        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
}

removeRecipe(recipe){
    const recipes = [...this.state.recipes];
    const index = recipes.indexOf(recipe);
    recipes.splice(index, 1);
    this.setState({ recipes });
    fetch(`/api/v1/edit/${recipe.id}`,
   {//type these out line by line some need more than others
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken' : Cookies.get('csrftoken'),
        },
      })
        .then(response => {
        if(!response.ok){
          throw new Error ('Bad Post request');
        }

        })
      .catch(error => console.log('Error:', error))
      .finally(() => this.props.history.push("/recipes"));


};

handleEdit(event, recipe){
  if(event.keyCode === 13) {
    // this.props.editRecipe(recipe, this.state.note);
    this.setState({ isEditing: false });
  }
}

handleInputEdit(event) {
  this.setState({ [event.target.name]: event.target.value })
}

// filterRecipes(event){
//   console.log("I'm firing");
//   const recipeType = event.target.dataset.type;
//   this.setState({recipeSelection: recipeType})
// }


addIngredient(qtyEntered, unitEntered, typeEntered){
  const ingredients = [...this.state.ingredients]
  const ingredient = {qty: qtyEntered, unit: unitEntered, type: typeEntered}
  //some how add to the list
  ingredients.push(ingredient)
  this.setState({ ingredients })
  this.setState({
    qty: '',
    unit: '',
    type: '',
  })
}

removeIngredient(ingredient){
  const ingredients = [...this.state.ingredients];
  const index = ingredients.indexOf(ingredient);
  ingredients.splice(index, 1);
  this.setState({ ingredients });
}
//deletedIngredient

//isEditing

//write a fun that will add more inputs if clicked

handleInput(event){
  this.setState({ [event.target.name]: event.target.value });
}



handleSubmit(event){
const recipe = {
  type_meal: this.state.type_meal,
  image: this.props.recipeImage,
  title: this.state.title,
  prep_time: this.state.prep_time,
  cook_temp: this.state.cook_temp,
  cook_time: this.state.cook_time,
  yields: this.state.yields,
  food_type: this.state.food_type,
  ingredients: this.state.ingredients,
  directions: this.state.directions,
  notes: this.state.notes,
  }

  fetch(`/api/v1/${this.props.match.params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken' : Cookies.get('csrftoken'),
    },
    body: JSON.stringify(recipe),
  })
    .then(response => {
    if(!response.ok){
      throw new Error ('Bad Post request');
    }
    return response.json()
    })
  .then(data => console.log('Success. ChatApp created!'))
  .catch(error => console.log('Error:', error))
  .finally('I am always going to fire!');
};

handleChange(event) {
  console.log(event.target.name, event.target.value);
  this.setState({ [event.target.name]: event.target.value });

}


render(){
  const recipe = this.state.recipe;
  const newyields = (this.state.newyields / this.state.yields)
  const ingredientList = this.state.recipe.ingredients?.map((ing, index) => (
    <li key={index}>
      <h2>{ing.qty * newyields } {ing.unit} of {ing.type}  </h2>
    </li>
   ));


const ingredientsInput = this.state.ingredients.map((ingredient, index) => (
  <li key={index}>
    <input type="qty" id="recipe-qty" name="qty"
        value={ingredient.qty} onChange={this.handleInput} placeholder={ingredient.qty} required/>
    <input type="unit" id="recipe-unit" name="unit"
          value={ingredient.unit} onChange={this.handleInput} placeholder={ingredient.unit}required/> of
    <input type="type" id="recipe-type" name="type"
    value={ingredient.type} onChange={this.handleInput} placeholder={ingredient.type} required/>
  <button onClick={()=>this.removeIngredient(ingredient)}> -</button>
  </li>
));

  return(
    <>


    {!this.state.isEditing
      ?
      <li key={recipe.id} className="repice-li">
            <div className="img-container">
            <img className="recipe-img" src={recipe.image} alt="preview"/>
            </div>
            <h4 className="repice-title">{recipe.title}</h4>
            <p className="repice-type">{recipe.type_meal}</p>

              <span className="repice-yields">yields {this.state.yields} </span>

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
          </li>
      :

        <div className="RecipeForm row">
          <form className="form">
            <div className="img-container">
            <img className="recipe-img" src={recipe.image} alt="preview"/>
            </div>
            <span>
            <label for="file-upload" className="edit-file-upload">
          <p className="imageEdit"> Edit Photo </p>
          </label> <input id="file-upload" type="file" name='recipeImage'  onChange={this.props.handleImage}/>
          </span>

          {this.props.recipeImage && <img className="pre-img" src={this.props.preview} alt="preview"/>}
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Title</span>
            </div>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="recipe-title" name="title" value={this.state.title} onChange={this.handleInput} placeholder="Title" required/><br/>
          </div>




          <select id="type_meal" name="type_meal" value={this.state.type_meal} onChange={this.handleChange} defaultValue={this.state.type_meal} required>
             <option value="Breakfast">Breakfast</option>
             <option value="Lunch">Lunch</option>
             <option value="Dinner">Dinner</option>
             <option value="Dessert">Dessert</option>
           </select>

           <select id="published" name="Published" required>
              <option value="PRI">Private</option>
              <option value="PUB">Public</option>
              <option value="DFT">Draft</option>
            </select>


            <input type="prep_time" id="recipe-prep-time" name="prep_time" value={this.state.prep_time} onChange={this.handleInput} placeholder="Prep time" required/><br/>

            <input type="cook_time" id="recipe-cook-time" name="cook_time" value={this.state.cook_time} onChange={this.handleInput} placeholder="Cook time" required/><br/>

            <input type="cook_temp" id="recipe-cook-temp" name="cook_temp" value={this.state.cook_temp} onChange={this.handleInput} placeholder="Cook temp" required/>
              <select id="Degree" name="Degree" required>
                   <option value="F">F</option>
                   <option value="C">C</option>
                 </select>


            <input type="yields" id="recipe-yields" name="yields" value={this.state.yields} onChange={this.handleInput} placeholder="yieldss" required/><br/>

            <input type="food_type" id="recipe-food_type" name="food_type" value={this.state.food_type} onChange={this.handleInput} placeholder="Muffins, donuts, etc..." required/><br/>

            <textarea rows="4" cols="50" type="directions" id="recipe-directions" name="directions" value={this.state.directions} onChange={this.handleInput} placeholder="Directions" required></textarea><br/>

            <textarea rows="4" cols="50" type="notes" id="recipe-notes" name="notes" value={this.state.notes} onChange={this.handleInput} placeholder="Notes" required></textarea><br/>

          <ul>{ ingredientsInput }</ul>

            <div className="example">
            <input type="qty" id="recipe-qty" name="qty"
                value={this.state.qty} onChange={this.handleInput} placeholder="qty" required/>
            <input type="unit" id="recipe-unit" name="unit"
                  value={this.state.unit} onChange={this.handleInput} placeholder="unit" /> of
            <input type="type" id="recipe-type" name="type"
            value={this.state.type} onChange={this.handleInput} placeholder="type" required/>


          <button onClick={()=>this.addIngredient(this.state.qty, this.state.unit, this.state.type )}> + </button>
            </div>
            <button type="button" onClick={this.handleSubmit}>Submit</button>
          </form>

       </div>
     }
     <button className="btn btn-danger btn-lg btn-block" type="button " onClick={()=> this.removeRecipe(recipe)}>
     Delete
     </button>
     <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>Edit</button>
    </>
  )
}

}


export default RecipeEdit;
