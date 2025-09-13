const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// For local development ONLY
const DB_PATH = path.resolve(__dirname, "../../../client/data/app.db");

// Ensure the directory exists (only in dev)
if (process.env.NODE_ENV !== "production") {
  const dbDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS polygons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        points TEXT NOT NULL,
        color TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          console.error("Error creating 'polygons' table:", err.message);
        } else {
          console.log("'polygons' table ensured.");
        }
      }
    );
  }
});

module.exports = db;
