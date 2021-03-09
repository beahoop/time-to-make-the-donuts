import { NavLink } from 'react-router-dom';


function Header(props) {
  // const isAuth = props.isLoggedIn;
  // const isAdmin = JSON.parse(localStorage.getItem('user'))?.is_staff;

  return (

    <div className="navbar sticky-top navbar-light bg-light">
      <span className="navbar-brand"><NavLink to="/">Freshly Baked</NavLink></span>
      <span className="navbar-brand"><NavLink to="/recipes">Recipes</NavLink></span>
      <span className="navbar-brand"><NavLink to="/recipeform">Recipe Forms</NavLink></span>
      <span className="navbar-brand">< NavLink to="/login/">Login</NavLink></span>
      <span className="navbar-brand"><NavLink to="/register/">Register</NavLink> </span>
      <span className="navbar-brand"><NavLink to="/login/">
        <span  className="navbar-brand" onClick={(e) => props.handleLogOut(e)} type="submit">
        LogOut</span>
      </NavLink></span>


    </div>
  )
}

export default Header
