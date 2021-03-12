import React, { Component } from 'react';

class RecipePublic extends Component{



render(){

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


      <div className="row">
        <div className="divider  col-4 col-md-6 col-lg-8 col-xl-9">
          Public Repices
        </div>
        </div>


      <ul className="row"> { PublicRecipe  }  </ul>


    </>
  )
}

}


export default RecipePublic;
