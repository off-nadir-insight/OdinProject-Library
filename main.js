import generateCard from "./js/generateNewCard.js"
import storageAvailable, { setLibrary } from "./js/localStorage.js"

const libraryEle = document.getElementById("library");
const btnOpenAddBookModal = document.getElementById("btn-add-book");
const formNewBook = document.getElementById("form--new-book");
const modalAddBook = document.getElementById("modal--add-book");
const closeModal = document.getElementById("close-modal");
const submitStatusMesg = document.getElementById("status-message");
let myLibraryArr;

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
  addBookToLibrary(title.value, author.value, pages.value, isRead.checked)
  submitStatusMesg.textContent = "Book submitted";
  setTimeout(() => {
    submitStatusMesg.textContent = "";
  }, 1000);
  clearAddBookForm();
})

function clearAddBookForm() {
  const fieldsToClear = formNewBook.querySelectorAll('[type="text"]')
  fieldsToClear.forEach(field => {
    field.value = "";
  })
}

// ----- end add-book modal -----

function addBookToLibrary(title, author, pages, isRead) {
  myLibraryArr.push({title, author, pages, isRead});
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