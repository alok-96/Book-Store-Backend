import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json()); // middleware to send form data
app.use(cors());
app.use(express.urlencoded({ extended: false }));

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
  const q = "INSERT INTO BOOKS (TITLE, AUTHOR, PRICE, COVER) VALUES (?)";
  const values = [
    req.body.title,
    req.body.author,
    req.body.price,
    req.body.cover,
  ];
  console.log("req.file = ", req.body);
  db.query(q, [values], (err, data) => {
    if (!err) return res.json("Book has been added successfully.");
    else console.log(err);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE BOOKS SET TITLE = ?, AUTHOR = ?, COVER = ?, PRICE = ? WHERE ID = ?";
  const values = [
    req.body.title,
    req.body.author,
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
