import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://greenbook-server-qn9l.onrender.com"
  // const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // GEt All Notes
  const getNotes = async () => {
    // API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjYmM2MzJhZTI2MDE5ODA3Mjc4YWRjIn0sImlhdCI6MTY1NzU1NjY0NX0.7vSXMTn4HzY8X059oTJhF8waxQ2y2PhWgyiCFL_RBcQ'
        
      },
      // body: JSON.stringify()
    });
    
    const json = await response.json()
    setNotes(json)
  }
  
  
  // Add a Note
  const addNote = async (title, description, date) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjYmM2MzJhZTI2MDE5ODA3Mjc4YWRjIn0sImlhdCI6MTY1NzU1NjY0NX0.7vSXMTn4HzY8X059oTJhF8waxQ2y2PhWgyiCFL_RBcQ'

      },
      body: JSON.stringify({title, description, date})
    });
    const note = await response.json()
    setNotes(notes.concat(note))
  }


  // Delete a Note
  const deleteNote = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjYmM2MzJhZTI2MDE5ODA3Mjc4YWRjIn0sImlhdCI6MTY1NzU1NjY0NX0.7vSXMTn4HzY8X059oTJhF8waxQ2y2PhWgyiCFL_RBcQ'

      },

    });
    const json = response.json();
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  // Edit a Note
  const editNote = async (id, title, description, date) => {
    // API CALL
    // Default options are marked with *
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
        // "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjYmM2MzJhZTI2MDE5ODA3Mjc4YWRjIn0sImlhdCI6MTY1NzU1NjY0NX0.7vSXMTn4HzY8X059oTJhF8waxQ2y2PhWgyiCFL_RBcQ'

      },
      body: JSON.stringify({title, description, date})
    });
    
    
    const json = response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].date = date;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;