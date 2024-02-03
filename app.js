import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(express.json()); // middleware to send form data
app.use(cors());

app.use(bodyParser.json({ limit: "50mb", extended: true }));
// app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Dwivedi$96",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("Welcome to Bookstore!");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM BOOKS";
  db.query(q, (err, data) => {
    if (!err) return res.json(data);
    else return res.json(err);
  });
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM BOOKS WHERE ID = ?";
  db.query(q, [bookId], (err, data) => {
    if (!err) return res.json(data);
    else return res.json(err);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO BOOKS (TITLE, DESCRIPTION, PRICE, COVER) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  console.log(values);
  db.query(q, [values], (err, data) => {
    if (!err) return res.json("Book has been added successfully.");
    else console.log(err);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE BOOKS SET TITLE = ?, DESCRIPTION = ?, COVER = ?, PRICE = ? WHERE ID = ?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (!err) return res.json("Book has been Updated successfully.");
    else return res.json(err);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM BOOKS WHERE ID = ?";
  db.query(q, [bookId], (err, data) => {
    if (!err) return res.json("Book has been deleted successfully.");
    else return res.json(err);
  });
});

app.listen(5000, () => {
  console.log("Server is running at port 5000.");
});
