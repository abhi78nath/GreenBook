import React, { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context

    const [note, setNote] = useState({title:"",description:"", date:""})

    const handleClick = (e) =>{
        e.preventDefault()
        addNote(note.title, note.description, note.date);
        setNote({title:"",description:"", date:""})
    }
    const onChange = (e)=>{
        setNote({ ...note, [e.target.name]: e.target.value})
    }
    return (
        <div className='container my-2'>
            <h2 style={{color:'green'}}>Add a Task</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" value={note.title}id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description (upto 30words)</label>
                    <textarea rows="4" cols="50" type="text" className="form-control"value={note.description} id="description" name="description" onChange={onChange} minLength={5} maxLength={150} pattern="^\w+( \w+){0,29}$" title="Please enter up to 30 words"
 required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" value={note.date} id="date" name="date" onChange={onChange} required/>
                </div>
                
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-success" onClick={handleClick}>Add Note</button>
            </form>


        </div>
    )
}

export default AddNote