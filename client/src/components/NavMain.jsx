import React from "react";
import { NavLink } from "react-router-dom";
import withUser from "../components/Auth/withUser";
import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context, toggleFormDisplay } = props;

  const handleLogout = () => {
    context.removeUser();
  };

  return (
    <nav className="NavMain">
      <NavLink exact to="/">
        <h3 className="logo">Scoby 2oo</h3>
      </NavLink>
      <ul>
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <p onClick={toggleFormDisplay}>Add Item</p>
            </li>
            <li>
              <NavLink to="/profile">
                {context.user && context.user.firstName}
              </NavLink>
            </li>
            <li>
              <p onClick={handleLogout}>Logout</p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signin">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Create account</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
