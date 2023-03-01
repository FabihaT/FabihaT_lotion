import Column1 from "./Column1";
import Column2 from "./Column2";
import {useState} from "react";
import uuid from "react-uuid";

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
      const answer = window.confirm("Are you sure you want to delete this note?");
      if (answer) { //Filter the id of note to delete from the notes array 
        setNotes(notes.filter((note) => note.id !== noteId));
      }
    };
    
    const addNote = () => {
      const noteAttributes = { //Creates objects of a new note with initial values
        id: uuid(), //use library to create unique id for each new note
        title: "Untitled",
        datetime: null,
        body: " ",
      };
  
      setNotes([noteAttributes, ...notes]); //create new array of note objects and insert notes from previous array
      setSelectedNote(noteAttributes.id);
    }
  
    const getSelectedNote = () => {
      //Find and return the active note or an empty object if there is none
      return notes.find((note) => note.id === selectedNote);
    }

    const updateNote = (updatedNote) => {
      const updateNoteAttributes = {
        ...updatedNote, //Add unmodified note fields to the updatedNote
        datetime: formatDatetime(updatedNote.datetime) //Modify datetime format and save in updateNote
      };
    
      const updatedNotes = notes.map((note) => {
        if (note.id === selectedNote) {
          return updateNoteAttributes;
        }
        return note;
      });
    
      setNotes(updatedNotes); //save updated notes to notes array
    };
  
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
          updateNote={updateNote}
          /> {/*Call to Column2 component*/}
        </div>
      </main>
    );
  }

  export default Main;