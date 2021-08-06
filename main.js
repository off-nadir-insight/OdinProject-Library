import { displayLibrary } from "./js/display.js"

const libraryEle = document.getElementById("library");
const btnOpenAddBookModal = document.getElementById("btn-add-book");
const formNewBook = document.getElementById("form--new-book");
const modalAddBook = document.getElementById("modal--add-book");
const closeModal = document.getElementById("close-modal");
const submitStatusMesg = document.getElementById("status-message");

let myLibraryArr = [
  {
    title: "book1",
    author: "author1",
    pages: 1234,
  },
  {
    title: "book2",
    author: "author2",
    pages: 2345,
  },
  {
    title: "book3",
    author: "author3",
    pages: 3457,
  },
  {
    title: "book4",
    author: "author4",
    pages: 6789,
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
  // let targets = e.target.querySelectorAll('[type="text"]')
  // console.log(targets)
  console.log(`
    title: ${e.target.title.value}
    author: ${e.target.author.value}
    pages: ${e.target.pages.value}
    `)
  addBookToLibrary(e.target.title.value, e.target.author.value, e.target.pages.value)
  submitStatusMesg.textContent = "Book submitted";
  setTimeout(() => {
    submitStatusMesg.textContent = "";
  }, 1000);
  // clearAddBookForm();
})

function clearAddBookForm() {
  const fieldsToClear = formNewBook.querySelectorAll('[type="text"]')
  fieldsToClear.forEach(field => {
    field.value = "";
  })
}

// ----- end add-book modal -----


function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
  let newBook = new Book(title, author, pages)
  myLibraryArr.push(newBook);
  libraryEle.innerHTML = "";
  displayLibrary(myLibraryArr, libraryEle);
}

displayLibrary(myLibraryArr, libraryEle)