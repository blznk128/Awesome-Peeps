import React, { Component } from "react";
import Row from "../../components/Row"
import API from "../../utils/API"
import RegistryHeader from "../../components/RegistryHeader"
import UserList from "../../components/UserList"

class Create extends Component {
  state = {
    savedItems: [],
    item: "",
    price: 0,
    url: "",
    occasion: "",
    comments: "",
    users: [],
    user: {
      login: {
        uuid: "",
        account_key: "",
        sessionId: ""
      },
      profile: {
        email: "",
        name: "",
        pic: ""
      },
      notes: ""
    }
  }

  componentDidMount() {
    this.getSavedItems();
    // this.getAllUsers();
  }

  getSavedItems = () => {
    API.getItems()
      .then(res =>
        this.setState({ savedItems: res.data })
      )
      .catch(err => console.log(err));
  };

  //Find saved users
  getAllUsers = () => {
    API.getUsers()
      .then(res =>
        this.setState({ users: res.data }) 
      )
      .catch(err => console.log(err));
  };

 //Delete item from registry
  deleteItem = (id) => {
    API.deleteItem(id)
      .then(res =>
        this.getSavedItems())
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  
//Saves item to registry
  handleSaveItem = event => {
    event.preventDefault();
    console.log("CLICK")
    if (this.state.item) {
      API.saveItem({
        item: this.state.item,
        price: this.state.price,
        url: this.state.url,
        occasion: this.state.occasion,
        comments: this.state.comments
      })
        .then(res => {
          console.log("save item response: ", res);
          this.getSavedItems();
        })
        .catch(err => console.log(err));
    }
  };

//Share registry with another user
shareRegistry = event => {
  event.preventDefault();
  console.log("Share with user")
  
    API.getUsers({
      name: this.state.user.profile.name
    })
      .then(res => {
        console.log("users data: ", res);
        this.getAllUsers();
      })
      .catch(err => console.log(err));
  
};

  //Value from URL input
  handleURL = (event) => {
    this.setState({ url: event.target.value });
  }

  //Value from Price input
  handlePrice = (event) => {
    this.setState({ price: event.target.value });
  }

  //Value from Occasion input
  handleOccasion = (event) => {
    this.setState({ occasion: event.target.value });
  }

  //Value from Comments input
  handleComments = (event) => {
    this.setState({ comments: event.target.value });
  }

  renderSaved = () => {
    return this.state.savedItems.map(save => (
      <Row
        _id={save._id}
        key={save._id}
        item={save.item}
        price={save.price}
        url={save.url}
        occasion={save.occasion}
        comments={save.comments}
        deleteItem={this.deleteItem}
        getSavedArticles={this.getSavedArticles}
      />
    ))
  }

  renderUsers = () => {
    return this.state.users.map(save => (
      <UserList
      
        _id={save._id}
        key={save._id}
        name={save.profile.name}
      
      />
    ))
  }

  render() {
    return (
      <div className="container bg-white">
        <h1 className="text-">Create Your Registry</h1>
        <form>
          <div
            className="form-group"
          >
            <label htmlFor="item"><h4 >Item</h4></label>
            <input
              onChange={this.handleChange}
              name="item"
              value={this.state.item}
              type="text"
              className="form-control" id="item" aria-describedby="emailHelp"
            />
          </div>
          <div
            className="form-group"
          >
            <label htmlFor="price"><h4 >Price</h4></label>
            <input
              onChange={this.handleChange}
              name="price"
              value={this.state.price}
              type="text"
              className="form-control" id="price"
            />
          </div>
          <div
            className="form-group"
          >
            <label htmlFor="url"><h4 >URL</h4></label>
            <input
              onChange={this.handleChange}
              name="url"
              value={this.state.url}
              type="text"
              className="form-control" id="url"
            />
          </div>
          <div
            className="form-group"
          >
            <label htmlFor="occasion"><h4 >Occasion</h4></label>
            <input
              onChange={this.handleChange}
              name="occasion"
              value={this.state.occasion}
              type="text"
              className="form-control" id="occasion"
            />
          </div>
          <div
            className="form-group"
          >
            <label htmlFor="comments"><h4 >Comments</h4></label>
            <input
              onChange={this.handleChange}
              name="comments"
              value={this.state.comments}
              type="text"
              className="form-control" id="comments"
            />
          </div>
          <button onClick={this.handleSaveItem} type="submit"
            className="btn btn-info">Add To Registry</button>
          <button onClick={this.shareRegistry} type="submit"
            className="btn btn-info">Share Registry</button>
        </form>
        <br></br>
        <RegistryHeader />
        <div>
          {this.renderSaved()}
        </div>
        <h4>Who do you want to share your list with?</h4>
        <UserList />
        <div>
          {this.renderUsers()}
        </div>
      </div>
    );
  }
}


export default Create;