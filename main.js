const root = document.getElementById("root");
const library = document.getElementById("library");
const btnAddBook = document.getElementById("btn-add-book");
const formNewBook = document.getElementById("form--new-book");
const modalAddBook = document.getElementById("modal--add-book");
const closeModal = document.getElementById("close-modal");

let myLibrary = [
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

btnAddBook.addEventListener("click", e => {
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
  console.log(e)
})

// ----- end add-book modal -----


function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
  let newBook = new Book(title, author, pages)
  myLibrary.push(newBook);
  return newBook;
}

function displayLibrary() {
  myLibrary.forEach(book => {
    generateCard(book);
  }
)}

function generateCard(book) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML = `
    <h2>${book.title}</h2>
    <p>by</p>
    <p>${book.author}</p>
    <p>${book.pages} pages</p>
  `;
  library.appendChild(newCard);
}

displayLibrary()