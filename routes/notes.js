const notes = require("express").Router();
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
      note_id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = notes;
