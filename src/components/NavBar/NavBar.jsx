import "./NavBar.css"
import {SearchBar} from "../SearchBar/SearchBar.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
export const NavBar = ({setSearchInput}) => {

  const handleOnChange = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  return (
    <div>
      <nav className='navbar-container'>
        <div className="navbar__logo">
          <h2>Hobby Hub</h2>
        </div>
        <div className="navbar__searchbar">
          <SearchBar onChange={handleOnChange}/>
        </div>
        <div className="navbar__links">
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
        </div>
      </nav>
    </div>
  )
}