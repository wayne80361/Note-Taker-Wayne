const notes = require("express").Router();
const fs = require("fs");
// import helper function
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");
// import unique ID generator
const { v4: uuidv4 } = require("uuid");

// GET Route for retrieving all the notes
// api/notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
// api/notes
notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully`);
  } else {
    res.error("Error in adding note");
  }
});

// DELETE Route for an existing note
// api/notes/:id
notes.delete("/:note_id", (req, res) => {
  // Get the note ID from the request parameters
  const noteIdToDelete = req.params.note_id;

  // Read the existing notes from the JSON file
  readFromFile("./db/db.json")
    .then((data) => {
      const notes = JSON.parse(data);

      // Find the index of the note with the specified ID
      const noteIndex = notes.findIndex((note) => note.id === noteIdToDelete);

      // Check if the note exists
      if (noteIndex !== null) {
        // Remove the note from the array
        notes.splice(noteIndex, 1);

        // Write the updated notes array back to the file, and use indentation of 4 for spacing
        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json("Error deleting note");
          } else {
            res.json("Note deleted successfully");
          }
        });
      } else {
        res.status(404).json("Note not found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json("Error reading notes");
    });
});

module.exports = notes;
