export function displayLibrary(libraryArr, libraryEle) {
  libraryArr.forEach(book => {
    generateCard(libraryEle, book);
  }
)}

export function generateCard(libraryEle, book) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML = `
    <h2>${book.title}</h2>
    <p>by</p>
    <p>${book.author}</p>
    <p>${book.pages} pages</p>
  `;
  libraryEle.appendChild(newCard);
}