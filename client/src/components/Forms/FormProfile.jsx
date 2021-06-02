import React, { Component } from "react";
import Button from "../Button";
import UploadWidget from "../UploadWidget";
import FeedBack from "../FeedBack";
import apiHandler from "../../api/apiHandler";
import withUser from "../Auth/withUser";

import "../../styles/form.css";

class FormProfile extends Component {
  state = {
    user: null,
    tmpUrl: "",
    httpResponse: null,
    isLoading: true,
  };

  imageRef = React.createRef();

  componentDidMount() {
    apiHandler
      .getUserInfos()
      .then((data) => {
        this.setState({ user: data, isLoading: false });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          httpResponse: {
            status: "failure",
            message: "Something bad happened, please try again later",
          },
        });
      });
  }

  handleChange = (event) => {
    const key = event.target.name; // This function requires that you have the "name" attribute on your form fields.
    const value = event.target.value;
    this.setState({ user: { ...this.state.user, [key]: value } });
  };

  isValidInput = (key) => {
    if (this.state.user[key] === "") {
      return false;
    } else return true;
  };

  checkError = () => {
    for (const key in this.state.user) {
      if (this.state[key] === "") {
        return true;
      }
    }
    return false;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();

    for (const key in this.state.user) {
      if (key === "profileImg") continue;
      fd.append(key, this.state.user[key]);
    }

    if (this.imageRef.current.files[0]) {
      fd.append("profileImg", this.imageRef.current.files[0]);
    }

    apiHandler
      .updateUser(fd)
      .then((data) => {
        this.props.context.setUser(data);
        this.setState({
          httpResponse: {
            status: "success",
            message: "Profile successfully updated.",
          },
        });

        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message:
              "Something bad happened while updating your profile, try again later",
          },
        });

        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);
      });
  };

  handleFileSelect = (temporaryURL) => {
    // Get the temporaryURL from the UploadWidget component and
    // set the state so we can have a visual feedback on what the image will look like :)
    this.setState({ tmpUrl: temporaryURL });
  };

  render() {
    // const { user } = this.state;
    const { httpResponse } = this.state;

    if (this.state.isLoading) return <div>Loading...</div>;

    return (
      <section className="form-section">
        <form autoComplete="off" className="form" onSubmit={this.handleSubmit}>
          <h1 className="header">Edit profile</h1>

          <div className="round-image user-image">
            <img
              src={this.state.tmpUrl || this.state.user.profileImg}
              alt={this.state.user.firstName}
            />
          </div>
          <div className="form-group">
            <UploadWidget
              ref={this.imageRef}
              onFileSelect={this.handleFileSelect}
              name="profileImg"
            >
              Change profile image
            </UploadWidget>
          </div>

          {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )}

          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
              onChange={this.handleChange}
              value={this.state.user.firstName}
            />
            {!this.isValidInput("firstName") && (
              <p className="input-error">Invalid input</p>
            )}
          </div>

          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              name="lastName"
              onChange={this.handleChange}
              value={this.state.user.lastName}
            />
            {!this.isValidInput("lastName") && (
              <p className="input-error">Invalid input</p>
            )}
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              id="email"
              type="email"
              name="email"
              value={this.state.user.email}
              disabled
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="phoneNumber">
              Phone number
            </label>
            <input
              className="input"
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              onChange={this.handleChange}
              value={this.state.user.phoneNumber}
            />
            {!this.isValidInput("phoneNumber") && (
              <p className="input-error">Invalid input</p>
            )}
          </div>
          <Button primary disabled={this.checkError()}>
            Save
          </Button>
        </form>
      </section>
    );
  }
}

export default withUser(FormProfile);
