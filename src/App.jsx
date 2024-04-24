
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NavBar} from "./components/NavBar/NavBar.jsx";
import {Home} from "./pages/Home.jsx";
import {Create} from "./pages/Create.jsx";
import {PostPage} from "./pages/PostPage.jsx";
import {useState} from "react";


function App() {
    const [searchInput, setSearchInput] = useState("")


  return (
    <>
      <BrowserRouter>
      <NavBar setSearchInput={setSearchInput}/>
        <Routes>
          <Route path="/" element={<Home searchInput={searchInput}/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/post/:uuid" element={<PostPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App