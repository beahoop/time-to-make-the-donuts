import React, { Component } from 'react';
import Cookies from 'js-cookie';

class RecipeForm extends Component{
  constructor(props){
  super(props);
  this.state = {
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
    author: (JSON.parse(localStorage.getItem('user')).username),
  }
  this.handleInput = this.handleInput.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.addIngredient = this.addIngredient.bind(this);

}

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
const recipe = {
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
  author: (JSON.parse(localStorage.getItem('user')).username),
  }


  fetch('/api/v1/', {
    method: 'POST',
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
        author: (JSON.parse(localStorage.getItem('user')).username),
      })
    };

render(){
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
    <div className="RecipeForm row">
          <form className="form col-8 mx-auto">
          <div className="row">
            <div className="preimg col-4">
              {!this.props.recipeImage &&
                <span>
                <label for="file-upload" className="custom-file-upload">
              <p className="imagePlus"> + </p>
              <p className="imageText"> Add photo</p>
              </label> <input id="file-upload" type="file" name='recipeImage'  onChange={this.props.handleImage}/>
              </span>}
              {this.props.recipeImage &&
              <img className="pre-img" src={this.props.preview} alt="preview"/>}
            </div>
            <div className="col-8">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Title</span>
                </div>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="recipe-title" name="title" value={this.state.title} onChange={this.handleInput} placeholder="Title" required/><br/>
              </div>
            <p>Author: {this.state.author}</p>
            </div>
          </div>


          <select id="meal_type" name="meal_type" required>
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

            <input type="directions" id="recipe-directions" name="directions" value={this.state.directions} onChange={this.handleInput} placeholder="Directions" required/><br/>

            <input type="notes" id="recipe-notes" name="notes" value={this.state.notes} onChange={this.handleInput} placeholder="Notes" required/><br/>

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
    </>
  )
}

}


export default RecipeForm;
