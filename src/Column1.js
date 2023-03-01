function Column1({notes, addNote, selectedNote, setSelectedNote}) {
    let noteElements; //Sets note contents as new-note or no-note if the notes array is empty
    if (notes.length > 0) {
      noteElements = notes.map((note) => ( //Creates new note in mapped array
        <div key={note.id} className={`new-note ${note.id === selectedNote && "active"}`}
          onClick={() => setSelectedNote(note.id)}> {/*Sets active note when clicking on it*/}
          {/*Add title, date  , and body objects from addNote function*/}
          <h2>{note.title}</h2>
          <small>
            {note.datetime}
          </small>
          {/*Add substring of first 100 characters to body*/}
          <div style={{paddingTop:"10px"}} dangerouslySetInnerHTML={{ __html: note.body && note.body.substr(0, 100) + "..." }} />
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

  export default Column1;