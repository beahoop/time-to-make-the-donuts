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
    preview: '',
    author: (JSON.parse(localStorage.getItem('user')).username),
  }
  this.handleInput = this.handleInput.bind(this);
    this.handleImage = this.handleImage.bind(this);
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
async handleSubmit(e){
  e.preventDefault();
  let formData = new FormData();

  let obj = { ...this.state }
  obj.ingredients = JSON.stringify(obj.ingredients);
  for (const prop in obj){
    formData.append(prop, obj[prop]);
  };

  const options = {
    method: 'POST',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    body: formData,
  };
  const handleError = (err) => console.warn(err);
  const response = await fetch('/api/v1/', options);
  await response.json().catch(handleError);
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
}

// handleSubmit(event){
// event.preventDefault();
// const recipe = {
//   title: this.state.title,
//   prep_time: this.state.prep_time,
//   cook_temp: this.state.cook_temp,
//   cook_time: this.state.cook_time,
//   yields: this.state.yields,
//   food_type: this.state.food_type,
//   ingredients: this.state.ingredients,
//   directions: this.state.directions,
//   notes: this.state.notes,
//   image: this.state.image,
//   }
//   fetch('/api/v1/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-CSRFToken' : Cookies.get('csrftoken'),
//     },
//     body: JSON.stringify(recipe),
//   })
//     .then(response => {
//       if(!response.ok){
//         throw new Error ('Bad Post request');
//       }
//       return response.json()
//     })
//     .then(data => {//here is where I got back my DJANGO object and
//       this.props.addRecipe(data);//here is where I added it to state for react
//       //because django gave me the ID and the username to show it on react
//
//       console.log('Success. Message created!', data)})
//       .catch(error => console.log('Error:', error))
//       .finally('I am always going to fire!');
    //   this.setState({
    //     title: '',
    //     prep_time: '',
    //     cook_temp: '',
    //     cook_time: '',
    //     yields: '',
    //     food_type: '',
    //     ingredients: [],
    //     directions: '',
    //     notes: '',
    //     image: '',
    //     preview: '',
    //   })
    // };

handleImage(event) {
  console.log("I FIRED");
    let file = event.target.files[0];
    this.setState({image: file});

    let reader = new FileReader()
    //FileReader is a built in method async-ness
    reader.onloadend = () => {
    this.setState({preview: reader.result})
    }
    reader.readAsDataURL(file);
    //this is where we tell the filereader to actually read the file
}

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
    <div className="recipeForm row ">
          <form className="formRep col-12 col-md-9 mx-auto">
          <div className="row">
            <div className="preimg col-5 col-md-4">
              {!this.state.image &&
                <span>
                <label for="file-upload" className="custom-file-upload">
              <p className="imagePlus"> + </p>
              <p className="imageText"> Add photo</p>
              </label> <input id="file-upload" type="file" name='image'  onChange={this.handleImage}/>
              </span>}
              {this.state.image &&
              <img className="pre-img" src={this.state.preview} alt="preview"/>}
            </div>

            <div className="col-8">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Title</span>
                </div>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="recipe-title" name="title" value={this.state.title} onChange={this.handleInput} placeholder="Title" required/><br/>
              </div>
            <p className="repice-author">By: {this.state.author}</p>
              <select className=" col-3 custom-select custom-select-sm" id="published" name="Published" required>
                 <option value="Private">Private</option>
                 <option value="Public">Public</option>
                 <option value="Popular">Popular</option>
                 <option value="Draft">Draft</option>
               </select>
               </div>


          </div>


           <div className="row sp mx-auto">
             <select className=" col-3 custom-select custom-select-sm"  id="meal_type" name="meal_type" required>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
              </select>


              <div className="input-group col-3 input-group-sm mb-3">
              <input className="form-control"  type="prep_time" id="recipe-prep-time" name="prep_time" value={this.state.prep_time} onChange={this.handleInput} placeholder="Prep time" required/>
              </div>

              <div className="input-group col-3 input-group-sm mb-3">
              <input className="form-control" type="cook_time" id="recipe-cook-time" name="cook_time" value={this.state.cook_time} onChange={this.handleInput} placeholder="Cook time" required/>
              </div>

              <div className="input-group col-2 input-group-sm mb-3">
              <input className="form-control" type="cook_temp" id="recipe-cook-temp" name="cook_temp" value={this.state.cook_temp} onChange={this.handleInput} placeholder="Cook temp" required/>
              </div>
              <select className="col-1  custom-select custom-select-sm" id="Degree" name="Degree" required>
                   <option value="F">F</option>
                   <option value="C">C</option>
                 </select>
           </div>
           <div className="row ingul">
          <ul className="">{ ingredientsInput }</ul>
            <div className="input-group col-2 input-group-sm mb-3">
            <input className="form-control" type="qty" id="recipe-qty" name="qty"
                value={this.state.qty} onChange={this.handleInput} placeholder="qty" required/>
              </div>

              <div className="input-group col-4 input-group-sm mb-3"> <input  className="form-control" type="unit" id="recipe-unit" name="unit"
                  value={this.state.unit} onChange={this.handleInput} placeholder="unit" />
                  </div>
                   of
            <div className="input-group col-4 input-group-sm mb-3">
            <input className="form-control" type="type" id="recipe-type" name="type"
            value={this.state.type} onChange={this.handleInput} placeholder="type" required/>
          </div>

          <button className="btnAdd btn btn-outline-info col-1" style={{height: "30px"}} onClick={()=>this.addIngredient(this.state.qty, this.state.unit, this.state.type )}>  + </button>

          </div>
           <div className="row sp mx-auto">
             This recipe makes
             <div className="input-group col-4 input-group-sm mb-3">
             <input className="form-control" type="yields" id="recipe-yields" name="yields" value={this.state.yields} onChange={this.handleInput} placeholder="yields" required/>
           </div>
           <div className="input-group col-4 input-group-sm mb-3">
           <input className="form-control"  type="food_type" id="recipe-food_type" name="food_type" value={this.state.food_type} onChange={this.handleInput} placeholder="Muffins, donuts, etc..." required/>
         </div>


           </div>

           <div className="row sp mx-auto">
             <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" name="directions" value={this.state.directions} onChange={this.handleInput} placeholder="Directions"
                rows="3">
              </textarea>
            </div>
            <div class="mb-3">
             <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
             <textarea class="form-control" id="exampleFormControlTextarea1" name="notes" value={this.state.notes} onChange={this.handleInput} placeholder="Notes"
             rows="3">
             </textarea>
           </div>
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-outline-info" type="button" onClick={this.handleSubmit}>Submit</button>
            </div>
          </form>


       </div>
    </>
  )
}

}


export default RecipeForm;
