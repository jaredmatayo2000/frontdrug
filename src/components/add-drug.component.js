import React, { Component } from "react";
import LandDataService from "./services/land.service";

export default class AddLand extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice=this.onChangePrice.bind(this);
    this.onChangeLocation=this.onChangeLocation.bind(this);
    
    this.saveLand = this.saveLand.bind(this);
    this.newLand = this.newLand.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      price :"",
      location :"",
      
      submitted: false
    };
}

onChangeTitle(e) {
  this.setState({
    title: e.target.value
  });
}

onChangeDescription(e) {
  this.setState({
    description: e.target.value
  });
}

onChangePrice(e) {
  this.setState({
    price: e.target.value
  });
}
onChangeLocation(e) {
  this.setState({
    location: e.target.value
  });
}

saveLand() {
  var data = {
    title: this.state.title,
    description: this.state.description,
    price: this.state.price,
      location: this.state.location
  };
  LandDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          location: response.data.location,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    newLand() {
        this.setState({
          id: null,
          title: "",
          description: "",
          price: "",
          location: "",
          
    
          submitted: false
        });
      }
    
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newLand}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <h2 className="heading">Add Land</h2>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
              </div>

<div className="form-group">
  <label htmlFor="description">Description</label>
  <input
    type="text"
    className="form-control"
    id="description"
    required
    value={this.state.description}
    onChange={this.onChangeDescription}
    name="description"
  />
</div>

<div className="form-group">
  <label htmlFor="price">Price(Kshs)</label>
  <input
    type="number"
    className="form-control"
    id="price"
    required
    value={this.state.price}
    onChange={this.onChangePrice}
    name="price"
  />
</div>

      <div className="form-group">
  <label htmlFor="location">Location</label>
  <input
    type="text"
    className="form-control"
    id="location"
    required
    value={this.state.location}
    onChange={this.onChangeLocation}
    name="location"
  />
</div>


<button onClick={this.saveLand} className="btn btn-success">
  Submit
</button>
</div>
)}
</div>
    );
  }
}
