import RecipeItem from './RecipeItem';


function RecipeList(props) {
  console.log(props);
  const recipe = props.recipes.map((recipe, id) => (
      <RecipeItem key={id} recipe={recipe} articles={props.aRecipe}
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
