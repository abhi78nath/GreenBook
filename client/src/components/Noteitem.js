import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  const [isActive, setIsActive] = useState(false);

  const handleTickClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className='col-md-4'>
      <div className="card my-3">
        <div className="card-body d-flex flex-column justify-content-between" style={{ height: '19rem' }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="card-title">{note.title}</h5>
            <button className={`btn btn-sm ${isActive ? 'btn-success' : 'btn-secondary'}`} onClick={handleTickClick}>
                {isActive ? <i className="fa-solid fa-check-circle"></i> : <i className="fa-solid fa-circle"></i>}
            </button>
          </div>
          <p className="card-text">{note.description}</p>
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
  );
};

export default NoteItem;
