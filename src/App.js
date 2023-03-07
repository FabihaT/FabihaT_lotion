import {useState} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";

function App() {
  const [toggleColumn1, setToggle] = useState(true); //Set state variable if Column1 is currently visible
  
  function sideButton() {
    setToggle(!toggleColumn1); //Set state variable to false if Column1 is toggled
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout sideButton={sideButton} toggleColumn1={toggleColumn1}/>}>
          <Route path="/notes/:noteId?" element={<Navigate replace to="/notes" />}/>
          <Route path="/notes/:noteId?" element={<Navigate replace to="/notes" />}/>
          <Route path="/notes/:noteId?/edit" element={<Navigate replace to="/notes" />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
