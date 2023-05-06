import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props
    return (
        <div className='col-md-4'>
            <div className="card my-3">

                <div className="card-body" style={{height:'17rem'}}>
                    <div className='d-flex align-items-center justify-content-between'>
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <small className="text-muted">{new Date(note.date).toLocaleDateString()}</small>

                            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success");}}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                        </div>
                        

                    </div>
                    <p className="card-text">{note.description}</p>
                    {/* <a href="/" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
    )
}

export default NoteItem