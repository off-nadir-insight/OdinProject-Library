export default function generateCard(idx, book, libraryEle) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.dataset.index = idx;

  generateElement(newCard, "h2", book.title)
  generateElement(newCard, "p", "by")
  generateElement(newCard, "p", book.author)
  generateElement(newCard, "p", `${book.pages} pages`)
  generateElement(newCard, "span", `x`, "deleteBook")
   
  const paraBookIsRead = document.createElement("p")
  generateElement(paraBookIsRead, "span", book.isRead ? "☑️ read" : "🔲 not read", "btnIsRead")
  newCard.appendChild(paraBookIsRead)

  libraryEle.appendChild(newCard);
}

function generateElement(parentEl, type, content, classList = "") {
  const newEl = document.createElement(type);
  newEl.textContent = content;
  if (classList) {
    newEl.classList.add(classList)
  }
  parentEl.appendChild(newEl)
}