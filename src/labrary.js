let library = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    publishedYear: 1925,
    availability: true,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publishedYear: 1960,
    availability: true,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Science Fiction",
    publishedYear: 1949,
    availability: false,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publishedYear: 1813,
    availability: true,
  },
];

let currentEditIndex = null;
document.getElementById("message2").innerHTML = "Add new book";
displayBooks();

function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const publishedYear = parseInt(
    document.getElementById("publishedYear").value
  );
  const genre = document.getElementById("genre").value;
  const availability = document.getElementById("availability").checked;

  // Check if all fields are filled out
  if (!title || !author || !publishedYear || isNaN(publishedYear)) {
    alert("Please fill in all fields correctly.");
    return; // Stop further execution if fields are not filled
  }

  const newBook = {
    id: library.length + 1,
    title,
    author,
    genre,
    publishedYear,
    availability,
  };

  if (currentEditIndex !== null) {
    library[currentEditIndex] = newBook; // Update existing book
    currentEditIndex = null; // Reset after editing
  } else {
    library.push(newBook); // Add new book
  }
  document.getElementById("message2").innerHTML = "Add new book";
  displayBooks();
  clearInputFields();
  editMode = false;
  toggleAddBook(); // Hide the add book section after adding
}

function displayBooks(booksToDisplay = library) {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = ""; // Clear the list before displaying

  booksToDisplay.forEach((book, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.publishedYear}</td>
      <td>${book.genre}</td>
      <td>${book.availability ? "Available" : "Not Available"}</td>
      <td>
        <button onclick="editBook(${index})">Update</button>
        <button onclick="deleteBook(${library.indexOf(book)})">Delete</button>
      </td>
    `;
    bookList.appendChild(row);
  });
}

var editMode = false;
function editBook(index) {
  editMode = true;
  document.getElementById("message2").innerHTML = "Update book";
  const book = library[index];
  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("publishedYear").value = book.publishedYear;
  document.getElementById("genre").value = book.genre;
  document.getElementById("availability").checked = book.availability;

  currentEditIndex = index; // Set the index of the book being edited
  toggleAddBook(); // Show the add book section when in edit mode
}

function deleteBook(index) {
  library.splice(index, 1); // Remove the book from the library
  displayBooks(); // Refresh the list
}

function clearInputFields() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("publishedYear").value = "";
  document.getElementById("genre").value = "Fiction";
  document.getElementById("availability").checked = false;
}

function searchBooks() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  if (searchTerm) {
    const filteredLibrary = library.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );

    displayBooks(filteredLibrary);
  } else {
    displayBooks(); // Display all books if search term is empty
  }
}

function funcAddBook() {
  document.getElementById("message2").innerHTML = "Update book";
  editMode = false;
  clearInputFields();
  toggleAddBook();
}

function toggleAddBook() {
  const addBookSection = document.getElementById("addBookSection");
  if (
    addBookSection.style.display === "none" ||
    addBookSection.style.display === "" ||
    editMode === true
  ) {
    addBookSection.style.display = "block";
  } else {
    addBookSection.style.display = "none";
    document.getElementById("message2").innerHTML = "Add new book";
  }
}

function exportToJSON() {
  const books = library;
  const booksJSON = JSON.stringify(books, null, 2);
  const blob = new Blob([booksJSON], { type: "application/json" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "books.json";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
