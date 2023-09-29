const express = require("express");

// Import our files containing our routes
const notesRouter = require("./notes.js");

// Create and instance of express so we can apply the middleware and routing
const app = express();

// api/notes
app.use("/notes", notesRouter);

module.exports = app;
