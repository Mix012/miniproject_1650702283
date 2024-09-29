import { Book } from "./book";
type BookState = "available" | "checkedOut";
import * as fs from "fs";

export class Library {
  private books: Book[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  listBooks(): void {
    this.books.forEach((book) => {
      console.log(
        `ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}, Year: ${book.publishedYear}, Available: ${book.availability}`
      );
    });
  }

  searchBooks<K extends keyof Book>(key: K, value: Book[K]): Book[] {
    return this.books.filter((book) => book[key] === value);
  }

  updateBook(id: number, updatedFields: Partial<Book>): void {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      this.books[bookIndex] = { ...this.books[bookIndex], ...updatedFields };
    }
  }

  deleteBook(id: number): void {
    this.books = this.books.filter((book) => book.id !== id);
  }

  getBookState(book: Book): BookState {
    return book.availability ? "available" : "checkedOut";
  }

  // Method to save books to a JSON file
  saveToFile(filename: string): void {
    fs.writeFileSync(filename, JSON.stringify(this.books, null, 2));
    console.log(`Books saved to ${filename}`);
  }

  // Method to load books from a JSON file
  loadFromFile(filename: string): void {
    if (fs.existsSync(filename)) {
      const data = fs.readFileSync(filename, "utf8");
      this.books = JSON.parse(data);
      console.log(`Books loaded from ${filename}`);
    } else {
      console.log(`File ${filename} does not exist.`);
    }
  }
}
