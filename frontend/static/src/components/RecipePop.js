import React, { Component } from 'react';

class RecipePop extends Component{



render(){

const PopRecipe = this.props.recipes.filter(recipe => {
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


  return(
    <>


      <div className="row">
        <div className="divider  col-4 col-md-6 col-lg-8 col-xl-9">
          Popular Repices
        </div>
        </div>


      <ul className="row"> { PopRecipe  }  </ul>


    </>
  )
}

}


export default RecipePop;
