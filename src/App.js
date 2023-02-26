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

//All fields of date and time
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
}
//Format date and time in a format like Month Day, Year at Hour:Minutes AM/PM
const formatDatetime = (when) => {
  const formatted = new Date(when).toLocaleString("en-US", options);
  if (formatted === "Invalid Date") {
      return "";
  }
  return formatted;
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
