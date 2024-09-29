import { Library } from "./labrary";
import { Genre } from "./book";

const myLibrary = new Library();

// Adding books
myLibrary.addBook({
  id: 1,
  title: "test A",
  author: "A",
  genre: Genre.type_Fiction,
  publishedYear: 1,
  availability: true,
});
myLibrary.addBook({
  id: 2,
  title: "test B",
  author: "B",
  genre: Genre.type_Science,
  publishedYear: 4,
  availability: false,
});

// Save to file
myLibrary.saveToFile("details.json");

// Create a new library instance and load from file
const newLibrary = new Library();
newLibrary.loadFromFile("details.json");

// List books to confirm loading
newLibrary.listBooks();
