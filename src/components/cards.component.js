import React, { Component } from "react";
import DrugDataService from "./services/drug.service";
import { Link } from "react-router-dom";

export default class DrugsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveDrugs = this.retrieveDrugs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDrug = this.setActiveDrug.bind(this);
    this.removeAllDrugs = this.removeAllDrugs.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      drugs: [],
      currentDrug: null,
      currentIndex: -1,
      searchName: ""
    };
  }
  componentDidMount() {
    this.retrieveDrugs();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveDrugs() {
    DrugDataService.getAll()
      .then(response => {
        this.setState({
          drugs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDrugs();
    this.setState({
      currentDrug: null,
      currentIndex: -1
    });
  }

  setActiveDrug(drug, index) {
    this.setState({
      currentDrug: drug,
      currentIndex: index
    });
  }
  removeAllDrugs() {
    DrugDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    DrugDataService.findByTitle(this.state.searchName)
      .then(response => {
        this.setState({
          drugs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { searchName, drugs, currentDrug, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary m-2"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Drugs available</h4>





           <div>
            {drugs &&
              drugs.map((drug, index) => (
                <div className="card m-2" style={{with:"0rem"}}>
                
                    
                <h2 className="card-title m-2" > 
                 {drug.name} 
                 </h2>
                <h5 className="price m-2" style={{color:"blue"}}>
                  (Kshs.{drug.price})
                  </h5>
                
                

                <p className="description m-2" >{drug.description}</p>
                <hr className="break"/>
                <button
            className=" m-1 btn btn-sm btn-primary"
            onClick={""} style={{with:"5rem"}}>
            More infor...
          </button>
          
  
                </div>
              ))}
          </div>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllDrugs}
          >
            Remove All
          </button>
          


        </div>
        <div className="col-md-6">
          {currentDrug ? (
            <div>
              <h4>Drug</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentDrug.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentDrug.description}
              </div>
              

              <Link
                to={"/drugs/" + currentDrug.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a drug to edit...</p>
            </div>
          )}
        </div>
      </div>
);
}
}