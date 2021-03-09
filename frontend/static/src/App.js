import {Component} from 'react';
import Cookies from 'js-cookie';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    recipes: [],
    isLoggedIn: !!Cookies.get('Authorization'),
  }

this.addRecipe = this.addRecipe.bind(this);
this.removeRecipe = this.removeRecipe.bind(this);
this.editRecipe = this.editRecipe.bind(this);
this.handleLogin = this.handleLogin.bind(this);
this.handleLogOut = this.handleLogOut.bind(this);
this.handleRegistration = this.handleRegistration.bind(this);

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

async handleLogin(e, obj){
  e.preventDefault();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken' : Cookies.get('csrftoken'),
    },
    body: JSON.stringify(obj),
  };
  const handleError = (err) => console.warn(err);
  const response = await fetch('/rest-auth/login/', options);
  const data = await response.json().catch(handleError);
  console.log(data);

  if(data.key){
    Cookies.set('Authorization', `Token ${data.key}`);
    const user = {username: data.username, is_staff: data.is_staff}
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({isLoggedIn: true })
    }
}

async handleLogOut(e){
  console.log(this.state.isLoggedIn);
  e.preventDefault();

  alert('logging out');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken' : Cookies.get('csrftoken'),
    },
  };
  const handleError = (err) => console.warn(err);
  const response = await fetch('/rest-auth/logout/', options);
  const data = await response.json().catch(handleError);
  console.log(data);
  Cookies.remove('Authorization');
  this.setState({isLoggedIn: false });
  localStorage.removeItem('user');
}

async handleRegistration(e, obj) {
  e.preventDefault();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    },
    body: JSON.stringify(obj)
  };
  const handleError = (err) => console.warn(err);
  const response = await fetch('/rest-auth/registration/', options);
  const data = await response.json().catch(handleError);
  console.log(data);

  if (data.key) {
    Cookies.set('Authorization', `Token ${data.key}`);
    const user = {username: data.username, is_staff: data.is_staff}
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({isLoggedIn: true})
  }

}
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
        <Login handleLogin={this.handleLogin}/>
        <Register handleRegistration={this.handleRegistration}/>

      </div>
    );
  }

}

export default App;
