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
    <tr>
      <th scope="row">{ing.qty * newyields} </th>
      <td>{ing.unit}</td>
      <td> of</td>
      <td> {ing.type}</td>
    </tr>
   ));


const ingredientsInput = this.state.ingredients.map((ingredient, index) => (
  <tr key={index}>
    <th scope="row"> <input type="qty" id="recipe-qty" name="qty"
        value={ingredient.qty} onChange={this.handleInput} placeholder={ingredient.qty} required/>
      </th>
  <td><input type="unit" id="recipe-unit" name="unit"
          value={ingredient.unit} onChange={this.handleInput} placeholder={ingredient.unit}required/> of
          </td>
    <td><input type="type" id="recipe-type" name="type"
    value={ingredient.type} onChange={this.handleInput} placeholder={ingredient.type} required/>
</td>
<button onClick={()=>this.removeIngredient(ingredient)}> -</button>
    </tr>
));

  return(
    <>

    <div className="row mx-auto">
      <div className="col-10">

    {!this.state.isEditing
      ?
      <div key={recipe.id} className="repice-li">
        <p className="repice-title">{recipe.title}</p>
        <p className="recipe-author">Writen by: {recipe.author}</p>
            <div className="row">
            <img className="col-12 img-fluid" src={recipe.image} alt="preview"/>
            </div>

            <div className="yieldsSec row mx-auto">
            <span className="col-4 repice-type">Make for: {recipe.type_meal}</span>
            <span className="col-4 repice-yields">Yields: {this.state.newyields} </span>
            <p className="col-4 repice-published">This repice is: {recipe.published}</p>
            </div>

            <div className="row mx-auto timeSec">
            <span className="col-4 repice-prepTime">Prep time: {recipe.prep_time} </span>
            <span className="col-4 repice-cookTime">Cook time: {recipe.cook_time} </span>
            <span className="col-4 repiceTemp"> Temp: {recipe.cook_temp} {recipe.degree} </span>
            </div>
            <div className="row mx-auto">
              <table className="table col-12 mx-auto">
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
              </div>
            <div className="row mx-auto">
            <p className="repice-published">Directions {recipe.directions}</p>
            <p className="repice-published">Notes {recipe.notes}</p>
            </div>

      </div>
      :

        <div className="RecipeForm row">
          <form className="form">
            <div className=" row">
            <img className="img-fluid" src={recipe.image} alt="preview"/>
            </div>

          {this.props.recipeImage && <img className="pre-img" src={this.props.preview} alt="preview"/>}

          <label for="file-upload" className="edit-file-upload">
        <p className="imageEdit"> Edit Photo </p>
        </label> <input id="file-upload" type="file" name='recipeImage'  onChange={this.props.handleImage}/>

          <div className="col-8">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Title</span>
              </div>
              <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="recipe-title" name="title" value={this.state.title} onChange={this.handleInput} placeholder="Title" required/><br/>
            </div>
             </div>
            <div className="col-4">
                <p className="repice-author">By: {recipe.author}</p>
              </div>

            <select className=" col-3 custom-select custom-select-sm" id="published" name="Published" required>
               <option value="Private">Private</option>
               <option value="Public">Public</option>
               <option value="Popular">Popular</option>
               <option value="Draft">Draft</option>
             </select>




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


           <select id="published" name="Published" required>
              <option value="PRI">Private</option>
              <option value="PUB">Public</option>
              <option value="DFT">Draft</option>
            </select>



            <input type="yields" id="recipe-yields" name="yields" value={this.state.yields} onChange={this.handleInput} placeholder="yieldss" required/><br/>

            <input type="food_type" id="recipe-food_type" name="food_type" value={this.state.food_type} onChange={this.handleInput} placeholder="Muffins, donuts, etc..." required/><br/>



              <table className="table col-12 mx-auto">
                <thead>
                  <tr>
                    <th scope="col">Amount</th>
                    <th scope="col">Unit</th>
                    <th scope="col"></th>
                    <th scope="col">type</th>
                  </tr>
                </thead>
                <tbody>
                  { ingredientsInput  }
                  </tbody>
                </table>

                <div className="example">
                <input type="qty" id="recipe-qty" name="qty"
                    value={this.state.qty} onChange={this.handleInput} placeholder="qty" required/>
                <input type="unit" id="recipe-unit" name="unit"
                      value={this.state.unit} onChange={this.handleInput} placeholder="unit" /> of
                <input type="type" id="recipe-type" name="type"
                value={this.state.type} onChange={this.handleInput} placeholder="type" required/>


              <button onClick={()=>this.addIngredient(this.state.qty, this.state.unit, this.state.type )}> + </button>
                </div>
                <div className="row sp mx-auto">
                  <div class="mb-3">
                   <label for="exampleFormControlTextarea1" class="form-label"></label>
                   <textarea class="form-control" id="exampleFormControlTextarea1" name="directions" value={this.state.directions} onChange={this.handleInput} placeholder="Directions"
                     rows="3">
                   </textarea>
                 </div>
                 <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label"></label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" name="notes" value={this.state.notes} onChange={this.handleInput} placeholder="Notes"
                  rows="3">
                  </textarea>
                </div>
                 </div>
      <button className="submit-btn btn btn-outline-info btn-lg btn-block" type="button" onClick={this.handleSubmit}>Submit</button>
    </form>

       </div>
     }
     <button className="btn btn-danger btn-lg btn-block" type="button " onClick={()=> this.removeRecipe(recipe)}>
     Delete
     </button>
     {!this.state.isEditing
       ?
       <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>Edit</button>
       :
       null

     }

     </div>
     </div>
  </>
  )
}

}


export default RecipeEdit;
