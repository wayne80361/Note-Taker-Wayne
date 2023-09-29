// DEPENDENCIES
const express = require("express");
const path = require("path");
const api = require("./routes/index.js");

// PORT/APP
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
// STATIC public folder
app.use(express.static("public"));

// ROUTES
// GET Route for homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// START THE SERVER
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
