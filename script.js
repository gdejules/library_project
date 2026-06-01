// array of books
const myLibrary = [];

// constructor function
function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor!");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? "have read it" : "not read yet"}`;
  };
}

// add book to library function
function addBookToLibrary(bookObject) {
  let bookTitle = bookObject.title;
  let authorName = bookObject.author;
  let totalPages = bookObject.pages;
  let readStatus = bookObject.isRead;

  let book = new Book(bookTitle, authorName, totalPages, readStatus);

  myLibrary.push(book);
}

// co-pilot suggests to extract card building logic with my existing code
function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.className = "book card";
  bookCard.id = `book-${book.id}`; // Add ID to the DOM element

  for (const property in book) {
    switch (property) {
      case "id":
        const id = document.createElement("div");
        id.className = "book-id";
        id.textContent = book[property];
        bookCard.appendChild(id);
        break;
      case "title":
        const title = document.createElement("div");
        title.className = "book title";
        title.textContent = book[property];
        bookCard.appendChild(title);
        break;
      case "author":
        const author = document.createElement("div");
        author.className = "book author";
        author.textContent = book[property];
        bookCard.appendChild(author);
        break;
      case "pages":
        const pages = document.createElement("div");
        pages.className = "book pages";
        pages.textContent = `${book[property]} pages`;
        bookCard.appendChild(pages);
        break;
      case "isRead":
        const isRead = document.createElement("div");
        isRead.className = "book read";
        isRead.textContent = `${book[property] ? "Already read" : "Haven't read"}`;
        bookCard.appendChild(isRead);
        break;
    }
  }

  return bookCard;
}

// Initial display - render all books once on page load (co-pilot)
function bookDisplay(myLibrary) {
  const bookShelf = document.querySelector(".bookshelf");
  for (const book of myLibrary) {
    bookShelf.appendChild(createBookCard(book));
  }
}

// Run this to add initial data
const ikigai = new Book("Ikigai", "Hector Garcia", 200, true);
const outliers = new Book("Outliers", "Malcolm Gladwell", 500, true);
const sputnik = new Book("Sputnik Sweetheart", "Haruki Murakami", 300, true);
const hMart = new Book("Crying in H Mart", "Michelle Zauner", 400, false);

addBookToLibrary(ikigai);
addBookToLibrary(outliers);
addBookToLibrary(sputnik);
addBookToLibrary(hMart);
bookDisplay(myLibrary);

// Show and hide book form for submitting new book
const toggleForm = document.getElementById("toggle-form");
const bookForm = document.getElementById("book-form");
toggleForm.addEventListener("click", () => {
  bookForm.classList.toggle("form-hidden");

  if (bookForm.classList.contains("form-hidden")) {
    toggleForm.textContent = "Add new book";
    toggleForm.classList.replace("hide", "show");
  } else {
    toggleForm.textContent = "Hide book form";
    toggleForm.classList.replace("show", "hide");
  }
});

// Submitting new book form
// When adding new book, append only the new one - co-pilot suggests
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!bookForm.reportValidity()) return;

  const bookObj = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    pages: document.getElementById("pages").value,
    isRead: document.querySelector('[name="isRead"]:checked').value === "true",
  };

  addBookToLibrary(bookObj);
  // append only the newly added book
  const newBook = myLibrary[myLibrary.length - 1];
  document.querySelector(".bookshelf").appendChild(createBookCard(newBook));
  bookForm.reset();
});
