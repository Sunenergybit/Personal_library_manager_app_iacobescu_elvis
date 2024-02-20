const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// This will store our books in memory,
// "id" is the unique identifier,
// other fields are up to you
let books = [{
  id: 1708010782691,
  date: 1708010782691,
  genre:['Fiction', 'Action'],
  name: 'Example Book',
  bookmark: 5,
  read: false,
  author: 'Iacobescu Elvis'
},
{
  id: 1708010782692,
  date: 1708010782692,
  genre:['Fiction'],
  name: 'Example Book',
  bookmark: 5,
  read: false,
  author: 'Iacobescu Elvis'
},
{
  id: 1708010782693,
  date: 1708010782693,
  genre: ['Fiction'],
  name: 'Example Book',
  bookmark: 5,
  read: true,
  author: 'Iacobescu Elvis'
},
{
  id: 1708010782694,
  date: 1708010782694,
  genre: ['Fiction'],
  name: 'Example Book,Example Book, Example Book',
  bookmark: 5,
  read: false,
  author: 'Iacobescu Elvis'
}
];

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Add a new book
app.post("/books", (req, res) => {
  const book = {...req.body, id: Date.now(), date: Date.now()};
  books.push(book);
  res.status(201).json(book);
});

// Update a book
app.put("/books/:id", (req, res) => {
  const index = books.findIndex((book) => book.id === parseInt(req.params.id));
  if (index >= 0) {
    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Delete a book
app.delete("/books/:id", (req, res) => {
  books = books.filter((book) => book.id !== parseInt(req.params.id));
  res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});