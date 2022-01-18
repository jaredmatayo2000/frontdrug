
import './App.css';
import React,{Component} from 'react';
import {Route, Link,Routes } from "react-router-dom";
import AddDrug from './components/add-drug.component';
import Drug from './components/drug.component'
import Home from './components/homesreen';
import DrugsList from './components/cards.component';


import "bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/drugs"} className="nav-link">
                Drugs
              </Link>
            </li>
            <li className="nav-item">
            <Link to={"/add"} className="nav-link">
                Add drug
              </Link>
            </li>

          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            
            <Route exact path="/drugs" element={<DrugsList/>} />
            <Route exact path="/add" element={<AddDrug/>} />
            <Route path="/drugs/:id" element={<Drug/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
