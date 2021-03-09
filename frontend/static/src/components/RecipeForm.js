import React, { Component } from 'react';
import Cookies from 'js-cookie';

class RecipeForm extends Component{
  constructor(props){
  super(props);
  this.state = {
    title: '',
    prep_time: '',
    cook_temp: '',
    cook_time: '',
    yeild: '',
    food_type: '',
    ingredients: [],
    directions: '',
    notes: '',
  }
  this.handleInput = this.handleInput.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);

}
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
  yeild: this.state.yeild,
  food_type: this.state.food_type,
  ingredients: this.state.ingredients,
  directions: this.state.directions,
  notes: this.state.notes,
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
        yeild: '',
        food_type: '',
        ingredients: [],
        directions: '',
        notes: '',})
    };


render(){
  return(
    <>
    <div className="RecipeForm">
          <form className="form">

          <input type="title" id="recipe-title" name="title" value={this.state.title} onChange={this.handleInput} placeholder="Title" required/><br/>


          <select id="meal_type" name="meal_type" required>
             <option value="Breakfast">Breakfast</option>
             <option value="Lunch">Lunch</option>
             <option value="Dinner">Dinner</option>
             <option value="Dessert">Dessert</option>
           </select>

           <select id="published" name="Published" required>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
              <option value="Draft">Draft</option>
            </select>

              <input type="prep_time" id="recipe-prep-time" name="prep_time" value={this.state.prep_time} onChange={this.handleInput} placeholder="Prep time" required/>

              <input type="cook_time" id="recipe-cook-time" name="cook_time" value={this.state.cook_time} onChange={this.handleInput} placeholder="Cook time" required/>

              <input type="cook_temp" id="recipe-cook-temp" name="cook_temp" value={this.state.cook_temp} onChange={this.handleInput} placeholder="Cook temp" required/>

              <input type="yeild" id="recipe-yeild" name="yeild" value={this.state.yeild} onChange={this.handleInput} placeholder="Yeilds" required/>

              <input type="food_type" id="recipe-food_type" name="food_type" value={this.state.food_type} onChange={this.handleInput} placeholder="Muffins, donuts, etc..." required/>

              <input type="directions" id="recipe-directions" name="directions" value={this.state.directions} onChange={this.handleInput} placeholder="Directions" required/>

              <input type="notes" id="recipe-notes" name="notes" value={this.state.notes} onChange={this.handleInput} placeholder="Notes" required/>
            <select id="Degree" name="Degree" required>
               <option value="F">F</option>
               <option value="C">C</option>
             </select>




            <button type="button" onClick={this.handleSubmit}>Submit</button>
          </form>


       </div>
    </>
  )
}

}


export default RecipeForm;
