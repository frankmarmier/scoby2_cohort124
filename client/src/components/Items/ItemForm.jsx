import React, { Component } from "react";
import AutoComplete from "../AutoComplete";
import UploadWidget from "../UploadWidget";
import Button from "../Button";
import Message from "../Message";
import withUser from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import FeedBack from "../FeedBack";
import "../../styles/ItemForm.css";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  location: {
    coordinates: [],
  },
  contact: "email",
  address: "",
  description: "",
  httpResponse: null,
  error: null,
};

class ItemForm extends Component {
  state = initialState;

  imageRef = React.createRef();

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Handle some validation here.

    // eg:
    if (!this.state.category) {
      this.setState({ error: "No category selected !" }, () => {
        this.timeoutId = setTimeout(() => {
          this.setState({ error: null });
        }, 1000);
      });
      return;
    }

    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data); // You can find this function in ./src/utils.js
    // Function implemented by user "Vladi Vlad" @stackoverflow : ) => https://stackoverflow.com/a/42241875/13374041

    fd.append("image", this.imageRef.current.files[0]);

    apiHandler
      .addItem(fd)
      .then((data) => {
        this.props.addItem(data);
        // this.setState({
        //   name: "",
        //   category: "",
        //   quantity: "",
        //   location: {
        //     coordinates: [],
        //   },
        //   address: "",
        //   description: "",
        //   httpResponse: {
        //     status: "success",
        //     message: "Item successfully added.",
        //   },
        // });

        this.setState({
          ...initialState,
          httpResponse: {
            status: "success",
            message: "Item successfully added.",
          },
        });

        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message: "An error occured, try again later.",
          },
        });

        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      });
  };

  handlePlace = (place) => {
    const location = place.geometry;
    this.setState({ location, formattedAddress: place.place_name });
  };

  render() {
    const { httpResponse, error } = this.state;

    return (
      <div className="ItemForm-container">
        <form className="ItemForm" onSubmit={this.handleSubmit}>
          <p onClick={this.props.handleClose} className="close-link">
            X
          </p>
          <h2>Add Item</h2>
          {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )}
          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              className="input"
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="What are you giving away ?"
              name="name"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              id="category"
              onChange={this.handleChange}
              value={this.state.category}
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label" htmlFor="name">
              Quantity
            </label>
            <input
              value={this.state.quantity}
              onChange={this.handleChange}
              className="input"
              type="number"
              name="quantity"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <AutoComplete onSelect={this.handlePlace} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              value={this.state.description}
              onChange={this.handleChange}
              name="description"
              id="description"
              className="text-area"
              placeholder="Tell us something about this item"
            ></textarea>
          </div>

          <div className="form-group">
            <UploadWidget ref={this.imageRef} name="image">
              Upload image
            </UploadWidget>
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input
                type="radio"
                name="contact"
                onChange={this.handleChange}
                checked={this.state.contact === "email"}
                value="email"
              />
              <label>{this.props.context.user.email}</label>
            </div>
            {this.props.context.user.phoneNumber && (
              <div>
                <input
                  type="radio"
                  name="contact"
                  checked={this.state.contact === "phone"}
                  onChange={this.handleChange}
                  value="phone"
                />
                <label>{this.props.context.user.phoneNumber}</label>
              </div>
            )}
          </div>

          {!this.props.context.user.phoneNumber && (
            <Message info icon="info">
              Want to be contacted by phone? Add your phone number in your
              personal page.
            </Message>
          )}
          {error && <FeedBack message={error} status="failure" />}
          <Button primary>Add Item</Button>
        </form>
      </div>
    );
  }
}

export default withUser(ItemForm);
