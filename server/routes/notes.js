const express = require('express')
const { body,validationResult } = require('express-validator')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require("../models/Note")


// Route 1: Get all the notes using: GET "/api/notes/getuser" .Login reqd
router.get('/fetchallnotes', fetchuser, async(req,res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error"); 
    }
})

// Route 2: Add a new note using: POST "/api/notes/addnote" Login Reqd
router.post('/addnote', fetchuser, [
    body('title','Enter a Valid Title').isLength({ min: 3 }),
    body('description','Description must be atleast 5 characters').isLength({ min: 5}),
], async(req,res)=>{
    try {
        const {title, description, tag } = req.body;

        // If there are errors , return bad request and the errors
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save() 
        res.json(savedNote)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error"); 
    }
})

// Route 3: Update an existing note using POST "/api/notes/updatenotes". Login Required

router.put('/updatenote/:id', fetchuser, async(req,res)=>{
    const {title, description, tag} = req.body;
    // create a new note object
    try{

        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag}
    
        // Find the note to be updates and update it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
    
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note})
    } catch(error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error"); 
    }
})

// Route 4: Delete an existing note using Delete "/api/notes/deletenote". Login Required

router.delete('/deletenote/:id', fetchuser, async(req,res)=>{
    

    try{
        // Find the note to be updates and delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
    
        // Allow deletion if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted", note:note})

    } catch(error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error"); 
    }
})
module.exports = router