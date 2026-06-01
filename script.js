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

function bookDisplay(myLibrary) {
  let bookShelf = document.querySelector(".bookshelf");

  for (const book of myLibrary) {
    const bookCard = document.createElement("div");
    bookCard.className = "book card";
    // console.log(book);

    for (const property in book) {
      // console.log(property);
      switch (property) {
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
          pages.textContent = book[property];
          bookCard.appendChild(pages);
          break;
        case "isRead":
          const isRead = document.createElement("div");
          isRead.className = "book read";
          isRead.textContent = `${book[property] ? "Already read" : "Not yet read"}`;
          bookCard.appendChild(isRead);
          break;
      }
    }

    bookShelf.appendChild(bookCard);
  }

  // return bookShelf;
}

// Run this on browser console for testing
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
