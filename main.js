// import { displayLibrary } from "./js/display.js"

const libraryEle = document.getElementById("library");
const btnOpenAddBookModal = document.getElementById("btn-add-book");
const formNewBook = document.getElementById("form--new-book");
const modalAddBook = document.getElementById("modal--add-book");
const closeModal = document.getElementById("close-modal");
const submitStatusMesg = document.getElementById("status-message");
const btnIsRead = document.getElementById("btnIsRead");

let myLibraryArr = [
  {
    title: "book1",
    author: "author1",
    pages: 1234,
    isRead: false,
  },
  {
    title: "book2",
    author: "author2",
    pages: 2345,
    isRead: true,
  },
  {
    title: "Book Titles with Many Words and Extend Far Too Long",
    author: "Long Author Name Sr, the III",
    pages: 3457.8,
    isRead: false,
  },
  {
    title: "book4",
    author: "author4",
    pages: 6789,
    isRead: false,
  }
];

// ----- start add-book modal -----

btnOpenAddBookModal.addEventListener("click", e => {
  modalAddBook.style.display = "block";
})

closeModal.addEventListener("click", e => {
  modalAddBook.style.display = "none";
})

window.addEventListener("click", e => {
  if (e.target === modalAddBook) {
    modalAddBook.style.display = "none";
  }
})

formNewBook.addEventListener("submit", e => {
  e.preventDefault();
  addBookToLibrary(e.target.title.value, e.target.author.value, e.target.pages.value)
  submitStatusMesg.textContent = "Book submitted";
  setTimeout(() => {
    submitStatusMesg.textContent = "";
  }, 1000);
  // clearAddBookForm(); // ** disabled for testing **
})

function clearAddBookForm() {
  const fieldsToClear = formNewBook.querySelectorAll('[type="text"]')
  fieldsToClear.forEach(field => {
    field.value = "";
  })
}

// ----- end add-book modal -----


function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead)
  myLibraryArr.push(newBook);
  displayLibrary();
}

function generateCard(idx, book) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.dataset.index = idx;
  newCard.innerHTML = `
    <h2>${book.title}</h2>
    <p>by</p>
    <p>${book.author}</p>
    <p>${book.pages} pages</p>
    <p><span class="btnIsRead">${ book.isRead ? "☑️ read" : "🔲 not read" }</span></p>
    <span class="deleteBook">x</span>
  `;
  libraryEle.appendChild(newCard);
}

function displayLibrary() {
  libraryEle.innerHTML = "";
  myLibraryArr.forEach((book, idx) => {
    generateCard(idx, book);
  })

  const btnDeleteBook = document.querySelectorAll(`.deleteBook`);
  btnDeleteBook.forEach(btn => {
    btn.addEventListener("click", e => {
      myLibraryArr.splice(e.target.parentElement.dataset.index, 1);
      displayLibrary();
    })
  })

  const btnIsRead = document.querySelectorAll(`.btnIsRead`);
  btnIsRead.forEach(btn => {
    btn.addEventListener("click", e => {
      const bookNum = e.target.parentElement.parentElement.dataset.index;
      myLibraryArr[bookNum].isRead = !myLibraryArr[bookNum].isRead;
      displayLibrary();
    })
  })
}

displayLibrary();