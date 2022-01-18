import React, { Component } from "react";
import DrugDataService from "./services/drug.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getDrug = this.getDrug.bind(this);
    
    this.updateDrug = this.updateDrug.bind(this);
    this.deleteDrug = this.deleteDrug.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        name: "",
        description: "",
        
    },
    message: ""
  };
}

componentDidMount() {
    this.getDrug(this.props.id);
}

onChangeName(e) {
  const name = e.target.value;

  this.setState(function(prevState) {
    return {
      currentTutorial: {
        ...prevState.currentDrug,
        name: name
      }
    };
  });
}
onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentDrug: {
        ...prevState.currentDrug,
        description: description
      }
    }));
  }

  getDrug(id) {
    DrugDataService.get(id)
      .then(response => {
        this.setState({
          currentDrug: response.data
        });
        console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
}

updateDrug(status) {
  var data = {
    id: this.state.currentTutorial.id,
    name: this.state.currentDrug.name,
    description: this.state.currentDrug.description
    
  };

  DrugDataService.update(this.state.currentDrug.id, data)
    .then(response => {
      this.setState(prevState => ({
        currentDrug: {
            ...prevState.currentDrug,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  updateDrug() {
    DrugDataService.update(
      this.state.currentDrug.id,
      this.state.currentDrug
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The drug was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDrug() {    
    DrugDataService.delete(this.state.currentDrug.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/drugs')
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentDrug } = this.state;

    return (
      <div>
        {currentDrug ? (
          <div className="edit-form">
            <h4>Drug</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentDrug.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentDrug.description}
                  onChange={this.onChangeDescription}
                />
              </div>

            
            </form>
         
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteDrug}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateDrug}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Drug...</p>
            </div>
        )}
      </div>
    );
  }
}