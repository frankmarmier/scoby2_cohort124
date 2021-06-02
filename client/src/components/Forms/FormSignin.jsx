import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import withUser from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class FormSignin extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.props.context.setUser(data); // update the context
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.props.context.isLoggedIn) {
      // This logic is the same as in the <ProtectedRoute /> component
      // Here this is handled within the component, if there are some views
      // that are not meant to be rendered to a logged in user,
      // you could make a generic component out of it, just like <ProtectedRoute />
      // and instead of checking if the user is not logged in, check if the user is logged in
      // and redirect him to whatever page you want, in the case below: the home page.

      return <Redirect to="/" />;
    }

    return (
      <section className="form-section">
        <header className="header">
          <h1>
            Welcome back
            <span role="img" aria-label="hand">
              👋
            </span>
          </h1>
        </header>

        <form autoComplete="off" className="form" onSubmit={this.handleSubmit}>
          <h2>Login</h2>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.email}
              className="input"
              id="email"
              type="email"
              name="email"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.password}
              className="input"
              id="password"
              type="password"
              name="password"
            />
          </div>

          <button className="btn-submit">Let's go!</button>
        </form>

        <div className="form-section link">
          <p>Already have an account? </p>
          <Link to="/signup">Register</Link>
        </div>
      </section>
    );
  }
}

export default withUser(FormSignin);
