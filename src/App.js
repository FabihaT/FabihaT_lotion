import Main from "./Main";
import Header from "./Header";
import {useState} from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [toggleColumn1, setToggle] = useState(true); //Set state variable if Column1 is currently visible
  
  function sideButton() {
    setToggle(!toggleColumn1); //Set state variable to false if Column1 is toggled
  }
  
  return (
    <div className="App">
      <Header sideButton={sideButton} />
      <Main toggleColumn1={toggleColumn1} />
    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Header sideButton={sideButton} />} />
    //     <Route path="/notes" element={<Main toggleColumn1={toggleColumn1} />} />
    //   </Routes>
    // </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/notes/*" element={<Layout />} >
    //       <Route path="/" element={<Header sideButton={sideButton} />} />
    //       <Route path="/" element={<Main toggleColumn1={toggleColumn1} />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
