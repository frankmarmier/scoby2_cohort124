import React from "react";
import AppMap from "../components/AppMap";
import ItemDisplay from "../components/Items/ItemDisplay";
import ItemForm from "../components/Items/ItemForm";
import withUser from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

class Home extends React.Component {
  state = {
    selectedItem: null,
    items: [],
  };

  componentDidMount() {
    apiHandler.getItems().then((data) => {
      this.setState({ items: data });
    });
  }

  addItem = (item) => {
    this.setState({ items: [...this.state.items, item] });
  };

  onSelectItem = (selectedItem) => {
    this.setState({ selectedItem: selectedItem });
  };

  handleClose = () => {
    this.setState({ selectedItem: null });
  };

  render() {
    const { user } = this.props.context;

    return (
      <React.Fragment>
        {user && this.props.displayForm && (
          <ItemForm
            handleClose={this.props.handleFormClose}
            addItem={this.addItem}
          />
        )}
        {this.state.selectedItem !== null && (
          <ItemDisplay
            item={this.state.selectedItem}
            handleClose={this.handleClose}
          />
        )}
        <AppMap items={this.state.items} handleSelectItem={this.onSelectItem} />
      </React.Fragment>
    );
  }
}

export default withUser(Home);
