import React from "react";
import UserContext from "./UserContext";

const withUser = (ComponentToExposeContextTo) => (props) => {
  return (
    <UserContext.Consumer>
      {(context) => <ComponentToExposeContextTo {...props} context={context} />}
    </UserContext.Consumer>
  );
};

export default withUser;
