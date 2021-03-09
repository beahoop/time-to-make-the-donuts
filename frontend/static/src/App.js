import {Component} from 'react';
import Cookies from 'js-cookie';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import './App.css';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    recipes: [],
  }

this.addRecipe = this.addRecipe.bind(this);
this.removeRecipe = this.removeRecipe.bind(this);
this.editRecipe = this.editRecipe.bind(this);

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
  }
addRecipe(recipe){
  const recipes = [...this.state.recipes]
  recipes.push(recipe);
  this.setState({ recipes })
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
      .finally('I am always going to fire!');
};
editRecipe(recipe, updatedText){
  const recipes = [...this.state.recipes];
  // const index = recipes.indexOf(recipe);
  recipe.notes = updatedText;
  this.setState({ recipes });
    fetch(`/api/v1/edit/${recipe.id}`, {
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

  render(){
    return (
      <div className="App">

        HEY!
        <RecipeList
          recipes={this.state.recipes}
          removeRecipe = {this.removeRecipe}
          editRecipe={this.editRecipe}
          />
        <RecipeForm
          addRecipe={this.addRecipe}/>

      </div>
    );
  }

}

export default App;
