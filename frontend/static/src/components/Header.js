import { NavLink } from 'react-router-dom';


function Header(props) {
  const isAuth = props.isLoggedIn;

  return (
    <>
    <div className="navbar sticky-top main-nav">
      <span className="navbar-1 navbar-brand"><NavLink to="/recipes">THE PIE CHART</NavLink></span>
      <span className="navbar-1 navbar-brand"><NavLink to="/recipes">Batch Maker</NavLink></span>

      <div className="main-side">
      <span className="navbar-1 navbar-brand plus"><NavLink to="/recipeform">+</NavLink></span>

      {!isAuth
      ?
      <span>
      <span className="navbar-1 navbar-brand">< NavLink to="/login/">Login</NavLink></span>
      <span className="navbar-1 navbar-brand"><NavLink to="/register/">Register</NavLink> </span>
      </span>
      :
      null}


      {isAuth
      ?
      <span className="navbar-brand">
        <span  className="navbar-1 navbar-brand" onClick={(e) => props.handleLogOut(e)} type="submit">LogOut</span>
          </span>
        :
        null
      }
    </div>
    </div>


    </>
  )
}

// <div className="navbar sticky-top navbar-light bg-light">
//   <span className="navbar-brand"><NavLink to="/recipes">Freshly Baked</NavLink></span>
// </div>

export default Header
