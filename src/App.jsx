
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NavBar} from "./components/NavBar/NavBar.jsx";
import {Home} from "./pages/Home.jsx";
import {Create} from "./pages/Create.jsx";


function App() {


  return (
    <>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<Create/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App