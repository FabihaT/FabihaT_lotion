import Main from "./Main";
import {useState} from "react";

function Header(event) {
  return ( //Return formatted page header
  <div className="page-header">
      <div className="head1">
        {/*Add event listener to button to toggle Column1*/}
        <button className="navbutton" onClick={event.sideButton}>&#9776;</button> 
      </div>
      <div className="head2">
        <h1>Lotion</h1>
        <p style={{color:'#59308c'}}>Like Notion, but worse.</p>
      </div>
      <div className="head3"></div>
  </div>
  );
}

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
  );
}

export default App;
