import {useState, useRef, useEffect} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function Column2({selectedNote, deleteNote, updateNote}) {
  const [editMode, setEditMode] = useState(true);
  const [editedNote, setEditedNote] = useState([]);

  const editField = (key, value) => {
    setEditedNote((prevNote) => ({
      ...prevNote,
      [key]: value,
      datetime: selectDatetime,
    }));
  };

  const handleSave = () => {
    const updatedNote = {
      ...editedNote,
    };

    updateNote(updatedNote);
    setEditMode(false);
  };

  let currentDatetime = new Date(Date.now()).toISOString().slice(0, 16);
  const [selectDatetime, setSelectDatetime] = useState(currentDatetime);
  const onDateChange = (e) => {
    setSelectDatetime(new Date(e.target.value).toISOString().slice(0, 16));
  };
  
  const modules = { //Create text editor tools
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'link'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['clean']
    ]
  };

  let editorContents;
  if (!selectedNote) {
    editorContents = (
      <div id="no-note">
          <h1>Select a note, or create a new one.</h1>
      </div>
    );
  }
  else if (editMode) {
    editorContents = (
      <div className="edit-note">
        <div className="note-head" style={{border:"none"}}>
          <div>
            <div>
              <input 
              style={{fontSize:"30px"}} 
              type="text"
              id="title"
              value={editedNote.title || "Untitled"}
              onChange={(e) => editField("title", e.target.value)}
              autoFocus />
            </div>
            <input 
              type="datetime-local" 
              id="datetime"
              value={selectDatetime}
              onChange={onDateChange}
            />
          </div>
          <div>
            <button className="navbutton" onClick={handleSave}>Save</button>
            <button className="navbutton" onClick={() => deleteNote(selectedNote.id)}>Delete</button>
          </div>
        </div>
        <div className="text-editor">
          <ReactQuill
            theme="snow"
            id="body"
            style={{height:"100vh"}}
            placeholder="Your Note Here"
            modules={modules}
            value={editedNote.body}
            onChange={(value) => editField("body", value)}
          />
        </div>
      </div>
    );
  }
  else if (!editMode) {
    editorContents = (
      <div className="edit-note">
        <div className="note-head">
          <div>
            <h1>{selectedNote.title}</h1>
            <small>{selectedNote.datetime}</small>
          </div>
          <div>
            <button className="navbutton" onClick={() => setEditMode(true)}>Edit</button>
            <button className="navbutton" onClick={() => deleteNote(selectedNote.id)}>Delete</button>
          </div>
        </div>
        <div style={{padding:"20px"}} dangerouslySetInnerHTML={{ __html: selectedNote.body }} />
      </div>
    );
  }
  
  return ( //Return formatted main column
    <div className="edit-all-notes">
      {editorContents}
    </div>
  );
}

export default Column2;