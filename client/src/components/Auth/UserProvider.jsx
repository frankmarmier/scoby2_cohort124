import React from "react";
import UserContext from "./UserContext";
import apiHandler from "../../api/apiHandler";

class UserProvider extends React.Component {
  state = {
    user: null,
    isLoggedIn: false,
    isLoading: true,
  };

  componentDidMount() {
    apiHandler
      .isLoggedIn()
      .then((data) => {
        this.setState({ user: data, isLoggedIn: true, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoggedIn: false, isLoading: false });
      });
  }

  removeUser = () => {
    apiHandler.logout().then(() => {
      this.setState({ user: null, isLoggedIn: false });
    });
  };

  setUser = (userInfo) => {
    this.setState({ user: userInfo, isLoggedIn: true });
  };

  render() {
    const contextValue = {
      user: this.state.user,
      isLoggedIn: this.state.isLoggedIn,
      isLoading: this.state.isLoading,
      removeUser: this.removeUser,
      setUser: this.setUser,
    };

    return (
      <UserContext.Provider value={contextValue}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
