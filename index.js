import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();

app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_DB_SECRET,
  database: "blogTest_DB",
});

app.get("/", (req, res) => {
  res.json("this is the backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM book";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO book(`title`,`desc`,`img`,`price`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.price, req.body.img];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/book/:id", (req, res) => {
  const bookId = req.params.id;

  const q = "DELETE FROM book WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("your book was deleted");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const q =
    "UPDATE book SET `title` = ?,`desc` = ?,`price` = ?,`img` = ? WHERE id = ?";

  const values = [req.body.title, req.body.desc, req.body.price, req.body.img];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(5000, () => {
  console.log("server is connected");
});
