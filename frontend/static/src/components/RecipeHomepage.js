import React, { Component } from 'react';

class RecipeHomepage extends Component{
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
    viewAll: '',
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

  const myrecipe = this.props.recipes.filter(recipe => {
    if(JSON.parse(localStorage.getItem('user'))?.username === recipe.author){
      return recipe
    }
    return console.log('nope');
  }).map((recipe) => (
    <div key={recipe.id} className="listImg">
      <a href={`/recipe/${recipe.id}`}>
          <img className="homepage-img" src={recipe.image} alt="preview"/>
        </a>
</div>
));
const popRecipe = this.props.recipes.filter(recipe => {
  if(recipe.published === "Popular"){
    return recipe
  }
  return console.log('nope');
}).map((recipe) => (
  <div key={recipe.id} className="listImg">
    <a href={`/recipe/${recipe.id}`}>
        <img className="homepage-img" src={recipe.image} alt="preview"/>
      </a>
</div>
));

const draftRecipe = this.props.recipes.filter(recipe => {
  if(recipe.published === "Draft"){
    return recipe
  }
  return console.log('nope');
}).map((recipe) => (
  <div key={recipe.id} className="listImg">
    <a href={`/recipe/${recipe.id}`}>
        <img className="homepage-img" src={recipe.image} alt="preview"/>
      </a>
</div>
));

const PublicRecipe = this.props.recipes.filter(recipe => {
  if(recipe.published === "Public"){
    return recipe
  }
  return console.log('nope');
}).map((recipe) => (
  <div key={recipe.id} className="listImg">
    <a href={`/recipe/${recipe.id}`}>
        <img className="homepage-img" src={recipe.image} alt="preview"/>
      </a>
</div>
));


  return(
    <>
    {this.props.isLoggedIn
      ?
      <div className="row">
        <div className="divider  col-4 col-md-6 col-lg-8 col-xl-9">
          My Repices <span className="float-right" onClick={() => this.setState({ viewAll: "My" })}>Veiw Alls</span>
        </div>
        </div>

      :
      null
    }

      {this.state.viewAll === "My"
        ?
        <ul className="row"> { myrecipe }  </ul>
      :
    <ul className="row flex-nowrap"> { myrecipe }  </ul>
  }

      <div className="row">
        <div className="divider  col-4 col-md-6 col-lg-8 col-xl-9">
          Public Repices <span className="float-right" onClick={() => this.setState({ viewAll: "Public" })}>Veiw Alls</span>
        </div>
        </div>
        {this.state.viewAll === "Public"
          ?
          <ul className="row public"> { PublicRecipe }  </ul>
          :
          <ul className="row flex-nowrap public"> { PublicRecipe }  </ul>
          }


        <div className="row">
          <div className="divider  col-4 col-md-6 col-lg-8 col-xl-9">
            Popular Repices <span className="float-right" onClick={() => this.setState({ viewAll: "Popular" })}>Veiw Alls</span>
          </div>
          </div>
          {this.state.viewAll === "Popular"
            ?
            <ul className="row public"> { popRecipe }  </ul>
            :
            <ul className="row flex-nowrap public"> { popRecipe }  </ul>
            }
            <div className="row">
              <div className="divider  col-4 col-md-6 col-lg-8 col-xl-9">
                My Pantry <span className="float-right" onClick={() => this.setState({ viewAll: "Draft" })}>Veiw Alls</span>
              </div>
              </div>
              {this.state.viewAll === "Draft"
                ?
                <ul className="row public"> { draftRecipe }  </ul>
                :
                <ul className="row flex-nowrap public"> { draftRecipe }  </ul>
                }

    </>
  )
}

}


export default RecipeHomepage;
