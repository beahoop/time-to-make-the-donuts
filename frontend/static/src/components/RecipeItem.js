import React, { Component } from 'react';




class RecipeItem extends Component{



render(){
  const recipe = this.props.recipe;
  console.log('recipe', recipe);
  return(
    <>
    <div className="listImg">
        <a href={`/recipe/edit/${recipe.id}`}>
          <img className="homepage-img" src={recipe.image} alt="preview"/>
        </a>
</div>

    </>
  )
}

}


export default RecipeItem;
