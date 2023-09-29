const notes = require("express").Router();
// import helper function
const { readFromFile } = require("../helpers/fsUtils");

// GET Route for retrieving all the
// api/notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

module.exports = notes;
