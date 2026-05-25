const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connections
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rajitha@2006",
  database: "registerdb"
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

// Home Route
app.get("/", (req, res) => {
  res.send("Server Working");
});

// Register Route
app.post("/api/user", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const sql =
    "INSERT INTO users(name,email,password) VALUES(?,?,?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.status(201).json({
      message: "User Registered Successfully",
    });
  });
});


// Server Start
app.listen(3000, () => {
  console.log("Server Running On Port 3000");
});