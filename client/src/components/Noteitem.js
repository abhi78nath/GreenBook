import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props
    return (
        <div className='col-md-4'>
            <div className="card my-3">
                <div className="card-body d-flex flex-column justify-content-between" style={{ height: '17rem' }}>
                    <div>
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <small className="text-muted">{new Date(note.date).toLocaleDateString()}</small>
                        <div>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                            <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success"); }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NoteItem