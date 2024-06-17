const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create or open the database
const db = new sqlite3.Database(path.resolve(__dirname, "forms.db"), (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

// Create the forms table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS forms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    form_type TEXT,
    name TEXT,
    country_code TEXT,
    phone_number TEXT
  )`);
});

module.exports = db;
