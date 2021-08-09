import generateCard from "./js/generateNewCard.js"
import storageAvailable from "./js/localStorage.js"

const libraryEle = document.getElementById("library");
const btnOpenAddBookModal = document.getElementById("btn-add-book");
const formNewBook = document.getElementById("form--new-book");
const modalAddBook = document.getElementById("modal--add-book");
const closeModal = document.getElementById("close-modal");
const submitStatusMesg = document.getElementById("status-message");
const btnIsRead = document.getElementById("btnIsRead");
let myLibraryArr;

// myLibraryArr = [
//   {
//     title: "book1",
//     author: "author1",
//     pages: 1234,
//     isRead: false,
//   },
//   {
//     title: "book2",
//     author: "author2",
//     pages: 2345,
//     isRead: true,
//   },
//   {
//     title: "Book Titles with Many Words and Extend Far Too Long",
//     author: "Long Author Name Sr, the III",
//     pages: 3457.8,
//     isRead: false,
//   },
//   {
//     title: "book4",
//     author: "author4",
//     pages: 6789,
//     isRead: false,
//   }
// ];

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
  const { title, author, pages, isRead } = e.target;
  addBookToLibrary(e.target.title.value, e.target.author.value, e.target.pages.value, e.target.isRead.checked)
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
  let newBook = new Book(title, author, pages, isRead);
  myLibraryArr.push(newBook);
  setLibrary(myLibraryArr);
  displayLibrary();
}

function displayLibrary() {
  libraryEle.innerHTML = "";
  
  Array.from(myLibraryArr).forEach((book, idx) => {
    generateCard(idx, book, libraryEle);
  })

  const btnDeleteBook = document.querySelectorAll(`.deleteBook`);
  btnDeleteBook.forEach(btn => {
    btn.addEventListener("click", e => {
      myLibraryArr.splice(e.target.parentElement.dataset.index, 1);
      setLibrary(myLibraryArr);
      displayLibrary();
    })
  })

  const btnIsRead = document.querySelectorAll(`.btnIsRead`);
  btnIsRead.forEach(btn => {
    btn.addEventListener("click", e => {
      const bookNum = e.target.parentElement.parentElement.dataset.index;
      myLibraryArr[bookNum].isRead = !myLibraryArr[bookNum].isRead;
      setLibrary(myLibraryArr);
      displayLibrary();
    })
  })
}


// load library on refresh
if (storageAvailable("sessionStorage") && sessionStorage.getItem("library")) {
  myLibraryArr = JSON.parse(sessionStorage.getItem("library"));
  console.log('library loaded');
} else {
  myLibraryArr = [];
  console.log("empty library initialized");
  setLibrary(myLibraryArr);
}

displayLibrary();

function setLibrary(myLibrary) {
  if (storageAvailable("sessionStorage")) {
    sessionStorage.setItem("library", JSON.stringify(myLibrary))
    console.log("library saved in sessionStorage")
  }
  else {
    console.log("library not saved")
  }
}
