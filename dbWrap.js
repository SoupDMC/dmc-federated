const constants = require("./constants.js");
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./state.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("connected to db");
});
