import {Component} from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Header2 from "./components/Header2";
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeEdit from './components/RecipeEdit';
import RecipePublic from './components/RecipePublic';

import RecipeDetail from './components/RecipeDetail';
import Register from './components/Register';
import RecipeHomepage from './components/RecipeHomepage';
import Login from './components/Login';
import './App.css';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    clickedId: null,
    recipes: [],
    recipeImage: null,
    preview: "",
    isLoggedIn: !!Cookies.get('Authorization'),
  }

this.addRecipe = this.addRecipe.bind(this);
this.removeRecipe = this.removeRecipe.bind(this);
this.editRecipe = this.editRecipe.bind(this);
this.handleImage = this.handleImage.bind(this);
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
  this.setState({
    recipeImage: null,
    preview: "",
  })
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
        .then(data => console.log('Success. Recipe created!'))
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
  console.log("data",data);

  if(data.key){
    Cookies.set('Authorization', `Token ${data.key}`);
    const user = {username: data.username}
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
    const user = {username: data.username}
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({isLoggedIn: true})
  }
}


handleImage(event) {
    let file = event.target.files[0];
    this.setState({recipeImage: file});

    let reader = new FileReader()
    //FileReader is a built in method async-ness
    reader.onloadend = () => {
    this.setState({preview: reader.result})
    }
    reader.readAsDataURL(file);
    //this is where we tell the filereader to actually read the file
}

  // async handleImageEdit(event) {
  //   event.preventDefault();
  //   let formData = new FormData();
  //   formData.append('profile_picture', this.state.profile_picture);
  //   //this is append method speically for FormData
  //
  //   const options = {
  //     method: 'PUT',
  //     headers: {
  //       'X-CSRFToken': Cookies.get('csrftoken')
  //     },
  //     body: formData
  //   }
  //   const response = await fetch('/profiles/detail', options);
  //   console.log(response);
  //   this.setState({preview: null})
  // }
  render(){
    return (
      <div className="container">
        <div className="row flex-nowrap">
          <div className="nav-bar">
        <BrowserRouter>
          <Header   handleLogOut={this.handleLogOut}
            isLoggedIn={this.state.isLoggedIn}/>
        <Switch>

          <div className="row flex-nowrap">
            <div className="sidenav col-6 col-md-4 col-lg-3 col-xl-2">
              <Header2
                  isLoggedIn={this.state.isLoggedIn}/>
            </div>
            <div className="col-6 col-md">
              <Route path="/login" children={
                  <Login
                    isLoggedIn={this.state.isLoggedIn}
                    handleLogin={this.handleLogin}
                  />
                }></Route>
              <Route path="/register" children={
                    <Register
                      isLoggedIn={this.state.isLoggedIn}
                      handleRegistration ={this.handleRegistration}
                    />
                  }></Route>
                <Route exact path="/recipes" children={
                      <RecipeHomepage
                        recipes={this.state.recipes}
                        editRecipe={this.editRecipe}
                        preview={this.state.preview}
                        recipeImage={this.state.recipeImage}
                        handleImage = {this.handleImage}
                        addRecipe={this.addRecipe}/>
                    }/>

                  <Route path="/user/recipes" children={
                  <RecipeList
                    recipes={this.state.recipes}
                    removeRecipe = {this.removeRecipe}
                    editRecipe={this.editRecipe}
                    />
                }/>
              <Route path="/recipeform" children={
                <RecipeForm
                  preview={this.state.preview}
                  recipeImage={this.state.recipeImage}
                  handleImage = {this.handleImage}
                  addRecipe={this.addRecipe}/>
              }/>

            <Route exact path="/recipe/:id" component={RecipeDetail}/>
            <Route exact path="/recipe/edit/:id" component={RecipeEdit}/>

              <Route excat path="/public/recipes" children={
              <RecipePublic
                recipes={this.state.recipes}

                />
            }/>

              <Route exact path="/" children={
                      <RecipeHomepage
                        recipes={this.state.recipes}
                        removeRecipe = {this.removeRecipe}
                        editRecipe={this.editRecipe}
                        preview={this.state.preview}
                        recipeImage={this.state.recipeImage}
                        handleImage = {this.handleImage}
                        addRecipe={this.addRecipe}/>
                    }/>

            </div>

          </div>


      </Switch>
      </BrowserRouter>


      </div>



       </div>
      </div>
    );
  }

}

      // <Route path="/recipe/:id" children={<RecipeDetail
      //       setClickedId={this.setClickedId}/>}

export default App;
