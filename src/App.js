import {useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import uuid from "react-uuid";

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
const formatDate = (when) => {
  const formatted = new Date(when).toLocaleString("en-US", options);
  if (formatted === "Invalid Date") {
      return "";
  }
  return formatted;
}

function Column1({notes, addNote, selectedNote, setSelectedNote}) {
  let noteElements; //Sets note contents as new-note or no-note if the notes array is empty
  if (notes.length > 0) {
    noteElements = notes.map((note) => ( //Creates new note in mapped array
      <div className={`new-note ${note.id === selectedNote && "active"}`}
        onClick={() => setSelectedNote(note.id)}> {/*Sets active note when clicking on it*/}
        {/*Add title, date  , and body objects from addNote function*/}
        <h2>{note.title}</h2>
        <small>
          {formatDate(note.datetime)}
        </small> 
        <p>{note.body && note.body.substr(0, 100) + "..."}</p> {/*Add substring of first 100 characters to body*/}
      </div>
      ));
  }
  else {
    noteElements = (
    <div id="no-note">
      <h2>No Note Yet</h2>
    </div>
    );
  }

  return ( //Return formatted side panel
    <div className="sidepanel">
      <div className="note-head">
        <h1>Notes</h1>
        {/*Add new note with addNote function when button pressed*/}
        <button className="navbutton" onClick={addNote}>&#43;</button> 
      </div>
      <div className="all-notes">
        {noteElements}
      </div>
    </div>
  );
}

function Column2({selectedNote, deleteNote}) {
  const modules = { //Create text editor tools
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'link'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['clean']
    ]
  };

  // if (!selectedNote) {
  //   return (
  //     <div id="no-note">
  //         <h1>Select a note, or create a new one.</h1>
  //     </div>
  //   );
  // }
  
  return ( //Return formatted main column
    <div className="main">
      <div className="edit-note">
        <div className="note-head" style={{border:"none"}}>
          <div>
            <div>
              <input 
              style={{fontSize:"30px"}} 
              type="text"
              id="title"
              value={selectedNote.title}
              autoFocus />
            </div>
            <small>
              <input 
                type="datetime-local" 
                id="datetime"
                value={formatDate(selectedNote.datetime)}
              />
            </small>
          </div>
          <div>
            <button className="navbutton">Save</button>
            <button className="navbutton" onClick={(e) => deleteNote(selectedNote.id)}>Delete</button>
          </div>
        </div>
        <div className="text-editor">
          <ReactQuill
            theme="snow"
            style={{height:"100vh"}}
            placeholder="Your Note Here"
            modules={modules}
            value={selectedNote.body}
            //onChange={setValue}
          />
        </div>
      </div>
    </div>
  );
}

function Main(event) {
  let column1State; //toggle the Column1 depending on the boolean value of showColumn1
  if (event.toggleColumn1) {
    column1State = "side-panel-open"
  }
  else {
    column1State = "side-panel-closed"
  }

  const [notes, setNotes] = useState([]); //Set array of new notes setter and getter
  const [selectedNote, setSelectedNote] = useState(false);

  const deleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };
  
  const addNote = () => {
    const noteAttributes = { //Creates objects of a new note with initial values
      id: uuid(), //use library to create unique id for each new note
      title: "Untitled",
      datetime: Date.now(),
      body: " ",
    };

    setNotes([noteAttributes, ...notes]); //create new array of note objects and insert notes from previous array
    setSelectedNote(noteAttributes.id);
  }

  const getSelectedNote = () => {
    //Find and return the active note or an empty object if there is none
    return notes.find((note) => note.id === selectedNote) || {};
  }

  return ( 
    <main>
      <div className={"column1 " + column1State}> {/*Add variable to column1 class*/}
        <Column1 
          notes={notes} 
          addNote={addNote}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        /> {/*Call to Column1 component*/}
      </div>
      <div className="column2">
        <Column2 
        selectedNote={getSelectedNote()}
        deleteNote={deleteNote}
        /> {/*Call to Column2 component*/}
      </div>
    </main>
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
