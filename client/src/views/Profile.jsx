import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import withUser from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import FeedBack from "../components/FeedBack";
import CardItem from "../components/Items/CardItem";
import ItemEditFrom from "../components/Items/ItemEditForm";
import ItemForm from "../components/Items/ItemForm";
import "../styles/Profile.css";
import "../styles/form.css";

class Profile extends Component {
  state = {
    phoneNumber: "",
    httpResponse: null,
    selectedItem: null,
    userItems: [],
  };

  componentDidMount() {
    const promises = Promise.all([
      apiHandler.getUserInfos(),
      apiHandler.getUserItems(),
    ]);

    promises.then((allPromises) => {
      const userInfos = allPromises[0];
      const userItems = allPromises[1];

      this.setState({
        user: userInfos,
        userItems: userItems,
      });
    });
  }

  submitPhoneNumber = (event) => {
    event.preventDefault(); // Disable the forms default behaviour (refresh the page and make request.)
    const { httpResponse, userItems, selectedItem, ...userData } = this.state;
    apiHandler
      .updateUser(userData)
      .then((data) => {
        this.props.context.setUser(data);
        this.setState({
          httpResponse: { status: "success", message: "Phone number added." },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message: "An error occured, try again later",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      });
  };

  handlePhoneNumber = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  deleteItem = (itemId) => {
    apiHandler.removeItem(itemId).then(() => {
      const userItems = [...this.state.userItems].filter(
        (item) => item._id !== itemId
      );
      this.setState({ userItems });
    });
  };

  onItemSelect = (itemId) => {
    const selectedItem = this.state.userItems.find(
      (item) => item._id === itemId
    );
    this.setState({ selectedItem: selectedItem });
  };

  onEditFormClose = () => {
    this.setState({ selectedItem: null });
  };

  handleItemUpdate = (updatedItem) => {
    const userItems = [...this.state.userItems].map((item) =>
      item._id === updatedItem._id ? updatedItem : item
    );
    this.setState({ userItems });
  };

  addItem = (item) => {
    this.setState({ userItems: [...this.state.userItems, item] });
  };

  componentWillUnmount() {
    this.timeoutId && clearTimeout(this.timeoutId);
  }

  render() {
    const { httpResponse, userItems, selectedItem, user } = this.state;
    if (!user) return null;

    return (
      <section className="Profile">
        {selectedItem && (
          <ItemEditFrom
            item={selectedItem}
            handleClose={this.onEditFormClose}
            onItemUpdate={this.handleItemUpdate}
          />
        )}
        {user && this.props.displayForm && (
          <ItemForm
            handleClose={this.props.handleFormClose}
            addItem={this.addItem}
          />
        )}

        <div className="user-image round-image">
          <img src={user.profileImg} alt={user.firstName} />
        </div>
        <div className="user-presentation">
          <h2 className="title">
            {user.firstName} {user.lastName}
          </h2>
          <Link className="link" to="/profile/settings">
            Edit profile
          </Link>
        </div>

        <div className="user-contact">
          <h4>Add a phone number</h4>
          {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )}
          <form className="form" onSubmit={this.submitPhoneNumber}>
            <div className="form-group">
              <label className="label" htmlFor="phoneNumber">
                Phone number
              </label>
              <input
                className="input"
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                onChange={this.handlePhoneNumber}
                defaultValue={user.phoneNumber || ""}
                placeholder="Add phone number"
              />
            </div>
            <Button primary>Add phone number</Button>
          </form>
        </div>

        {!userItems.length && (
          <React.Fragment>
            <div>
              <img src="/media/personal-page-empty-state.svg" alt="" />
            </div>
            <p>You don't have any items :(</p>
          </React.Fragment>
        )}

        {!!userItems.length && (
          <div className="CardItems">
            <h3>Your items</h3>
            {userItems.map((item, index) => (
              <CardItem
                key={index}
                {...item}
                handleDelete={this.deleteItem}
                handleEdit={this.onItemSelect}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default withUser(Profile);
