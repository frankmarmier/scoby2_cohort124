import React from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "./Auth/UserContext";

function ProtectedRoute({ component: Component, render, ...rest }) {
  return (
    <UserContext.Consumer>
      {(context) => {
        if (context.isLoading) {
          return <div>Loading ...</div>;
        }
        if (context.isLoggedIn) {
          return (
            <React.Fragment>
              {/* If render prop is used instead of the component prop when calling ProtectedRoute (emulates <Route/> render method.*/}
              {render && <Route {...rest} render={render} />}
              {!render && <Route {...rest} component={Component} />}
            </React.Fragment>
          );
        } else {
          return <Redirect to="/signin" />;
        }
      }}
    </UserContext.Consumer>
  );
}

export default ProtectedRoute;
