import React, { Component } from "react";
import LandDataService from "./services/land.service";
import { Link } from "react-router-dom";

export default class LandsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveLands = this.retrieveLands.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLand = this.setActiveDrug.bind(this);
    this.removeAllLands = this.removeAllLands.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      lands: [],
      currentLand: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }
  componentDidMount() {
    this.retrieveLands();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveLands() {
    LandDataService.getAll()
      .then(response => {
        this.setState({
          lands: response.data
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
      currentLand: null,
      currentIndex: -1
    });
  }

  setActiveLand(land, index) {
    this.setState({
      currentLand: land,
      currentIndex: index
    });
  }
  removeAllLands() {
    LandDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    LandDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          lands: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { searchTitle, lands, currentland, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary m-2"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lands available</h4>





           <div>
            {lands &&
              lands.map((drug, index) => (
                <div className="card m-2" style={{with:"0rem"}}>
                
                    
                <h2 className="card-title m-2" > 
                 {land.title} 
                 </h2>
                <h5 className="price m-2" style={{color:"blue"}}>
                  (Kshs.{land.price})
                  </h5>
                
                

                <p className="description m-2" >{land.description}</p>
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
            onClick={this.removeAllLands}
          >
            Remove All
          </button>
          


        </div>
        <div className="col-md-6">
          {currentLand ? (
            <div>
              <h4>Land</h4>
              <div>
                <label>
                  <strong>TITLE:</strong>
                </label>{" "}
                {currentDrug.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentLand.description}
              </div>
              

              <Link
                to={"/lands/" + currentLand.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a land to edit...</p>
            </div>
          )}
        </div>
      </div>
);
}
}
