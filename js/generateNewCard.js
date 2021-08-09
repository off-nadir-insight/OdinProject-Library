export default function generateCard(idx, book, libraryEle) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.dataset.index = idx;

  const bookTitle = document.createElement("h2");
  bookTitle.textContent = book.title;

  const bookBy = document.createElement("p");
  bookBy.textContent = "by"

  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = book.author;

  const bookPages = document.createElement("p");
  bookPages.textContent = `${book.pages} pages`;

  const bookIsRead = document.createElement("span");
  bookIsRead.textContent = book.isRead ? "☑️ read" : "🔲 not read";
  bookIsRead.classList.add("btnIsRead")
  const paraBookIsRead = document.createElement("p")
  paraBookIsRead.appendChild(bookIsRead)

  const deleteBtn = document.createElement("span")
  deleteBtn.classList.add("deleteBook")
  deleteBtn.textContent = "x"  
  
  newCard.appendChild(bookTitle)
  newCard.appendChild(bookBy)
  newCard.appendChild(bookAuthor)
  newCard.appendChild(bookPages)
  newCard.appendChild(paraBookIsRead)
  newCard.appendChild(deleteBtn)

  libraryEle.appendChild(newCard);
}