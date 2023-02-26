import {useState, useRef} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function Column2({selectedNote, deleteNote, updateNote}) {
    const editField = (key, value) => { //Update new note in text editor 
      updateNote({
        id: selectedNote.id,
        [key]: value,
        datetime: selectedNote.datetime,
      })
    }
  
    const quillRef = useRef();
  
    // const handleSave = () => {
    //   const title = document.getElementById('title').value;
    //   const body = quillRef.current.getEditor().getContents();
    //   const datetime = new Date(document.getElementById('datetime').value).getTime();
  
    //   const updatedNote = {
    //     id: selectedNote.id,
    //     title,
    //     datetime,
    //     body
    //   };
  
    //   updateNote(updatedNote);
    // };
  
    // let currentDatetime = new Date(selectedNote.datetime).toLocaleString().slice(0, 15);
    // const [selectDatetime, setSelectDatetime] = useState(currentDatetime);
    // const onDateChange = (event) => {
    //   setSelectDatetime(new Date(event.target.value).toLocaleString().slice(0, 15));
    // };
    
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
    else {
      editorContents = (
        <div className="edit-note">
          <div className="note-head" style={{border:"none"}}>
            <div>
              <div>
                <input 
                style={{fontSize:"30px"}} 
                type="text"
                id="title"
                value={selectedNote.title}
                onChange={(e) => editField("title", e.target.value)}
                autoFocus />
              </div>
                <input 
                  type="datetime-local" 
                  id="datetime"
                  value={selectedNote.datetime}
                  //onChange={onDateChange}
                />
              <p>{new Date(selectedNote.datetime).toLocaleString()}</p>
              <p>{new Date(selectedNote.datetime).toISOString()}</p>
            </div>
            <div>
              <button className="navbutton" 
              //onClick={editField}
              >Save</button>
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
              ref={quillRef}
              onChange={(e) => editField("body", e.target.value)}
            />
          </div>
        </div>
      );
    }
    
    return ( //Return formatted main column
      <div className="main">
        {editorContents}
      </div>
    );
  }

  export default Column2;