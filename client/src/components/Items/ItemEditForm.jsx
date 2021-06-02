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

class ItemEditForm extends Component {
  state = {
    httpResponse: null,
  };

  formRef = React.createRef();

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data); // You can find this function in ./src/utils.js
    // Function implemented by user Raj Pawam Gumdal @stackoverflow : ) => https://stackoverflow.com/a/42241875/13374041
    apiHandler
      .updateItem(this.props.item._id, fd)
      .then((data) => {
        //clear form
        this.props.onItemUpdate(data);
        this.setState({
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

  handleFileSelect = ({ tmpUrl, file }) => {
    this.setState({ image: file });
  };

  handlePlace = (place) => {
    const location = place.geometry;
    location.formattedAddress = place.place_name;
    this.setState({ location });
  };

  render() {
    const { httpResponse } = this.state;

    const { name, category, quantity, location, description, contact } =
      this.props.item;

    return (
      <div className="ItemForm-container">
        <form
          ref={this.formRef}
          className="ItemForm"
          onSubmit={this.handleSubmit}
        >
          <p onClick={this.props.handleClose} className="close-link">
            X
          </p>
          <h2>Edit Item</h2>
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
              placeholder="What are you giving away ?"
              name="name"
              onChange={this.handleChange}
              value={name || ""}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={category[0] || ""}
              onChange={this.handleChange}
            >
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
              className="input"
              type="number"
              name="quantity"
              onChange={this.handleChange}
              value={quantity || ""}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <AutoComplete
              defaultValue={location.formattedAddress}
              onSelect={this.handlePlace}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="text-area"
              placeholder="Tell us something about this item"
              onChange={this.handleChange}
              value={description || ""}
            ></textarea>
          </div>

          <div className="form-group">
            <UploadWidget onFileSelect={this.handleFileSelect} name="image">
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
                value={this.props.context.user.email || ""}
              />
              {this.props.context.user.email}
            </div>
            {this.props.context.user.phoneNumber && (
              <div>
                <input
                  type="radio"
                  name="contact"
                  onChange={this.handleChange}
                  checked={contact === this.props.context.user.phoneNumber}
                  value={this.props.context.user.phoneNumber}
                />
                {this.props.context.user.phoneNumber}
              </div>
            )}
          </div>

          <Message info icon="info">
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </Message>

          <Button primary>Edit Item</Button>
        </form>
      </div>
    );
  }
}

export default withUser(ItemEditForm);
