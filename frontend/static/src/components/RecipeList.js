import RecipeItem from './RecipeItem';
// 
// LOOK AT ID
function RecipeList(props) {
  console.log(props);
  const recipe = props.recipes.map((recipe) => (
      <RecipeItem key={recipe.id} recipe={recipe} articles={props.aRecipe}
      editRecipe={props.editRecipe}
      isLoggedIn={props.isLoggedIn}
      removeRecipe = {props.removeRecipe} />
));

  return(
    <>
    <ul className="recipeList"> { recipe }  </ul>
    </>
  )
}


export default RecipeList;
