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
    <div className="row">
      <div className="divider  col-4 col-md-6 col-lg-8 col-xl-9">
        My Repices
      </div>
      </div>
    <ul className="row"> { recipe }  </ul>
    </>
  )
}


export default RecipeList;
