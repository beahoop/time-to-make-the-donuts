import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Example from "./Example";


class RecipeEdit extends Component{
  constructor(props){
  super(props);
  this.state = {
    isEditing: false,
    recipe: [],
    title: '',
    qty: '',
    unit: '',
    type: '',
    prep_time: '',
    cook_temp: '',
    cook_time: '',
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
  this.handleEdit = this.handleEdit.bind(this);
  this.handleInput = this.handleInput.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.addIngredient = this.addIngredient.bind(this);

}

componentDidMount() {
  fetch(`/api/v1/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(
      (result) => {
        console.log('response', result)
        this.setState({
          recipe: result,
          meal_type: result.meal_type,
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
event.preventDefault();
const article = {
  title: this.state.title,
  prep_time: this.state.prep_time,
  cook_temp: this.state.cook_temp,
  cook_time: this.state.cook_time,
  yields: this.state.yields,
  food_type: this.state.food_type,
  ingredients: this.state.ingredients,
  directions: this.state.directions,
  notes: this.state.notes,
  image: this.state.recipeImage,
  }

  fetch('/api/v1/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken' : Cookies.get('csrftoken'),
    },
    body: JSON.stringify(article),
  })
    .then(response => {
      if(!response.ok){
        throw new Error ('Bad Post request');
      }
      return response.json()
    })
    .then(data => {//here is where I got back my DJANGO object and
      this.props.addRecipe(data);//here is where I added it to state for react
      //because django gave me the ID and the username to show it on react
      console.log('Success. Message created!', data)})
      .catch(error => console.log('Error:', error))
      .finally('I am always going to fire!');
      this.setState({
        title: '',
        prep_time: '',
        cook_temp: '',
        cook_time: '',
        yields: '',
        food_type: '',
        ingredients: [],
        directions: '',
        notes: '',
        image: '',
        preview: '',
      })
    };




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
    <Example/>
    <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>Edit</button>
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

            <span>
            <label for="file-upload" class="custom-file-upload">
          <p className="imagePlus"> + </p>
          <p className="imageText"> Add photo</p>
          </label> <input id="file-upload" type="file" name='recipeImage'  onChange={this.props.handleImage}/>
          </span>
          <div className="editImgForm">
          <img className="homepage-img" src={recipe.image} alt="preview"/>
          </div>
          {this.props.recipeImage && <img className="pre-img" src={this.props.preview} alt="preview"/>}

          <input type="title" id="recipe-title" name="title" value={this.state.title} onChange={this.handleInput} placeholder="Title" required/><br/>

          <select id="meal_type" name="meal_type" defaultValue="LNH" required>
             <option value="BR8">Breakfast</option>
             <option value="LNH">Lunch</option>
             <option value="DIN">Dinner</option>
             <option value="DES">Dessert</option>
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
    </>
  )
}

}


export default RecipeEdit;
