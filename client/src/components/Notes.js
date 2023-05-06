import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
// import AddNote from './AddNote';

const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getNotes()
        }
        else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])
    const [note, setNote] = useState({id:"",etitle:"",edescription:"", edate:"default"})

    const updateNote = (currentnote) => {
        ref.current.click()
        setNote({id:currentnote._id,etitle: currentnote.title, edescription: currentnote.description, edate: currentnote.date})
        
    }
    const ref = useRef(null)
    const refClose = useRef(null)

    const handleClick = (e) =>{
        // console.log("Updating", note)
        editNote(note.id, note.etitle, note.edescription, note.edate)
        refClose.current.click();
        // e.preventDefault()
        // addNote(note.title, note.description, note.date);
        props.showAlert("Updated Successfully", "success");
    }
    const onChange = (e)=>{
        setNote({ ...note, [e.target.name]: e.target.value})
    }
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-4'>
                        <AddNote showAlert={props.showAlert} />
                    </div>


                    <div className='col-md-8'>
                        <div className='row my-3'>
                            <h2>Your Tasks</h2>
                            <div className="container mx-2">
                                {notes.length === 0 &&'No Notes to Display'}
                            </div>
                            {/* {notes.map((note) => {
                                return <Noteitem className='col-md-4' key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                            })} */}
                            {notes.sort((a, b) => new Date(b.date) - new Date(a.date)).map((note) => {
                                return <Noteitem className='col-md-4' key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                            })}

                        </div>
                    </div>
                    {/* <!-- Modal --> */}
                    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="etitle">Title</label>
                                            <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="edescription" className="form-label">Description</label>
                                            <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="edate" className="form-label">date</label>
                                            <input type="text" className="form-control"  value={note.edate} id="edate" name="edate" onChange={onChange} />
                                        </div>

                                        
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick = {handleClick} type="button" className="btn btn-primary">Update Note</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                </div>
            </div>
        </>

    )
}

export default Notes