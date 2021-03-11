import { NavLink } from 'react-router-dom';


function Header2(props) {
  const isAuth = props.isLoggedIn;

  return (
    <>
    <div className="sidebar navbar-dark bg-light">
    {isAuth
    ?
    <span className="navbar-brand"><NavLink to="/user/recipes">My Recipes</NavLink></span>
    :
    null}

    <span className="navbar-brand"><NavLink to="/public/recipes">Public Recipes</NavLink></span>
    <span className="navbar-brand"><NavLink to="/Popular/recipes">Popular Recipes</NavLink></span>
</div>
    </>
  )
}

// <div className="navbar sticky-top navbar-light bg-light">
//   <span className="navbar-brand"><NavLink to="/recipes">Freshly Baked</NavLink></span>
// </div>

export default Header2
