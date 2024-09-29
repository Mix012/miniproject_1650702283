"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const labrary_1 = require("./labrary");
const book_1 = require("./book");
const myLibrary = new labrary_1.Library();
// Adding books
myLibrary.addBook({
    id: 1,
    title: "test A",
    author: "A",
    genre: book_1.Genre.type_Fiction,
    publishedYear: 1,
    availability: true,
});
myLibrary.addBook({
    id: 2,
    title: "test B",
    author: "B",
    genre: book_1.Genre.type_Science,
    publishedYear: 4,
    availability: false,
});
// Save to file
myLibrary.saveToFile("details.json");
// Create a new library instance and load from file
const newLibrary = new labrary_1.Library();
newLibrary.loadFromFile("details.json");
// List books to confirm loading
newLibrary.listBooks();
