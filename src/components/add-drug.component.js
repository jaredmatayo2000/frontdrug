import React, { Component } from "react";
import DrugDataService from "./services/drug.service";

export default class AddDrug extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice=this.onChangePrice.bind(this);
    
    this.saveDrug = this.saveDrug.bind(this);
    this.newDrug = this.newDrug.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "", 
      price :"",
      
      submitted: false
    };
}

onChangeName(e) {
  this.setState({
    name: e.target.value
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


saveDrug() {
  var data = {
    name: this.state.title,
    description: this.state.description,
    price: this.state.price
  };
  DrugDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    newTutorial() {
        this.setState({
          id: null,
          name: "",
          description: "",
          price: "",
          
    
          submitted: false
        });
      }
    
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <h2 className="heading">Add Drug</h2>
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
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


<button onClick={this.saveDrug} className="btn btn-success">
  Submit
</button>
</div>
)}
</div>
    );
  }
}