import React,{Component} from "react";
import {Link} from "react-router-dom";

export default class Home extends Component{
    render(){
        return(
            
<div className="container py-4">

    <div className=" jumbotron mt-5 bg-light rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">USERNAME LAND LISTING</h1>
        <hr className="my-4" />
        <p className="col-md-8 fs-4">
          Find affordable Lands here on our website...
        </p>
        <Link className="btn btn-primary btn-lg" to="/lands" role="button">
            
            Click to choose your land here...
            </Link>
        
      </div>
    </div>
      </div>
        );
    }

}
