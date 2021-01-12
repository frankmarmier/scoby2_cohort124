import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./views/Home";
import Profile from "./views/Profile";
import About from "./views/About";
import Signup from "./views/Signup";
import Signin from "./views/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import FormProfile from "./components/Forms/FormProfile";
import NotFound from "./views/NotFound";

class App extends React.Component {
  state = {
    displayForm: false,
  };

  toggleFormDisplay = () => {
    this.setState({ displayForm: !this.state.displayForm });
  };

  handleClose = () => {
    this.setState({ displayForm: false });
  };

  render() {
    return (
      <div className="App">
        <NavMain toggleFormDisplay={this.toggleFormDisplay} />

        <Switch>
          <Route
            exact
            path="/"
            render={(historyProps) => (
              <Home
                {...historyProps}
                displayForm={this.state.displayForm}
                handleFormClose={this.handleClose}
              />
            )}
          />

          <ProtectedRoute
            exact
            path="/profile"
            render={(historyProps) => (
              <Profile
                {...historyProps}
                displayForm={this.state.displayForm}
                handleFormClose={this.handleClose}
              />
            )}
          />

          <ProtectedRoute
            exact
            path="/profile/settings"
            component={FormProfile}
          />

          <Route exact path="/about" component={About} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
