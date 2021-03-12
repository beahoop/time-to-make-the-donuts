import { NavLink } from 'react-router-dom';


function Header2(props) {
  const isAuth = props.isLoggedIn;

  return (
    <>
    <div className="sidebar">
    {isAuth
    ?
    <p className="">
    <NavLink to="/user/recipes">Edit My Recipes</NavLink></p>
    :
    null}

    <p className=""><NavLink to="/public/recipes">Public Recipes</NavLink></p>
    <p className=""><NavLink to="/Popular/recipes">Popular Recipes</NavLink></p>
</div>
    </>
  )
}

// <div className="navbar sticky-top navbar-light bg-light">
//   <span className="navbar-brand"><NavLink to="/recipes">Freshly Baked</NavLink></span>
// </div>

export default Header2
