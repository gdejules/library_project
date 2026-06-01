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
  bookCard.className = "book-card";
  bookCard.setAttribute("data-id", `${book.id}`); // Add ID to the DOM element
  const label = document.createElement("div");
  label.className = "book-label";

  for (const property in book) {
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
        pages.textContent = `${book[property]} pages`;
        label.appendChild(pages);
        break;
      case "isRead":
        const isRead = document.createElement("div");
        isRead.className = `${book[property] ? "read" : "not-read"}`;
        isRead.textContent = `${book[property] ? "Already read" : "Haven't read"}`;
        label.appendChild(isRead);
        bookCard.appendChild(label);
        break;
    }
  }

  const actionBtn = document.createElement("div");
  actionBtn.className = "action-button";

  const markRead = document.createElement("button");
  markRead.className = "mark-read";
  const svgCheck = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#dbe8f5"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12l5 5l10 -10" />
</svg>`;

  markRead.textContent = "Mark as Read";
  markRead.insertAdjacentHTML("afterbegin", svgCheck);
  actionBtn.appendChild(markRead);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-book";
  deleteBtn.dataset.action = "delete";
  const svgDelete = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#ff7f50"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 7l16 0" />
  <path d="M10 11l0 6" />
  <path d="M14 11l0 6" />
  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg>`;

  deleteBtn.insertAdjacentHTML("afterbegin", svgDelete);
  actionBtn.appendChild(deleteBtn);
  bookCard.appendChild(actionBtn);

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

// Submitting new book form. When adding new book, append only the new one - co-pilot suggests
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

// delete book function event
const bookShelf = document.querySelector(".bookshelf");
bookShelf.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest('[data-action="delete"]');
  if (!deleteBtn) return;

  const bookCard = deleteBtn.closest(".book-card");
  if (!bookCard) return;

  const index = myLibrary.findIndex((book) => book.id === bookCard.dataset.id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
  bookCard.remove();
});
