import RecipeItem from './RecipeItem';
//
// LOOK AT ID
function RecipeList(props) {
  console.log(props);
  const recipe = props.recipes.filter(recipe => {
    if(JSON.parse(localStorage.getItem('user')).username === recipe.author){
      return recipe
    }
    return console.log('nope');
  }).map((recipe) => (
      <RecipeItem key={recipe.id} recipe={recipe} articles={props.aRecipe}
      editRecipe={props.editRecipe}
      isLoggedIn={props.isLoggedIn}
      removeRecipe = {props.removeRecipe} />
));

  return(
    <>
    <ul className="row"> { recipe }  </ul>
    </>
  )
}


export default RecipeList;
