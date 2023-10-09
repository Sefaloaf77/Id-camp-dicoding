const books = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOK_APPS";

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser tidak mendukung local storage");
    return false;
  }
  return true;
}

function generateBookObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted,
  };
}

function generateId() {
  return +new Date();
}
function findBook(bookId) {
  for (bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

function readBook(bookObject) {
  const { id, title, author, year, isCompleted } = bookObject;

  const textTitle = document.createElement("h3");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = author;

  const textYear = document.createElement("p");
  textYear.innerText = year;

  const divAction = document.createElement("div");
  divAction.classList.add("action");

  if (isCompleted == true) {
    const greenButton = document.createElement("button");
    greenButton.innerText = "Belum Selesai Dibaca";
    greenButton.classList.add("green");
    greenButton.addEventListener("click", () => {
      undoBookFromCompleted(id);
    });

    const redButton = document.createElement("button");
    redButton.innerText = "Hapus Buku";
    redButton.classList.add("red");
    redButton.addEventListener("click", () => {
      removeBook(id);
    });

    divAction.append(greenButton, redButton);
  } else {
    const greenButton = document.createElement("button");
    greenButton.innerText = "Selesai Dibaca";
    greenButton.classList.add("green");
    greenButton.addEventListener("click", () => {
      addBookToCompleted(id);
    });

    const redButton = document.createElement("button");
    redButton.innerText = "Hapus Buku";
    redButton.classList.add("red");
    redButton.addEventListener("click", () => {
      removeBook(id);
    });
    divAction.append(greenButton, redButton);
  }

  const article = document.createElement("article");
  article.classList.add("book_item");
  article.setAttribute("id", `book-${id}`);
  article.append(textTitle, textAuthor, textYear, divAction);

  return article;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function addBook() {
  const titleBook = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputBookAuthor").value;
  const yearBook = document.getElementById("inputBookYear").value;
  const isCompletedBook = document.getElementById(
    "inputBookIsComplete"
  ).checked;

  const generatedID = generateId();
  const bookObject = generateBookObject(
    generatedID,
    titleBook,
    authorBook,
    yearBook,
    isCompletedBook
  );
  books.push(bookObject);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
  });

  const search = document.getElementById("searchBook");
  search.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchBook = document
      .getElementById("searchBookTitle")
      .value.toLowerCase();
    const bookList = document.querySelectorAll(".book_item > h3");
    for (item of bookList) {
      if (searchBook !== "") {
        if (searchBook !== item.innerText.toLowerCase()) {
          item.parentElement.style.display = "none";
        } else {
          item.parentElement.style.display = "block";
        }
      } else {
        item.parentElement.style.display = "block";
      }
    }
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
  localStorage.re;
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeBook(bookId) {
  const confirmationModal = document.getElementById("confirmationModal");
  confirmationModal.style.display = "block";

  const yesButton = document.getElementById("yesButton");
  yesButton.addEventListener("click", function () {
    const bookTarget = findBookIndex(bookId);
    if (bookTarget === -1) return;
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
    confirmationModal.style.display = "none";
  });

  const noButton = document.getElementById("noButton");
  const closeButton = document.getElementById("closeButton");

  [noButton, closeButton].forEach(function (btn) {
    btn.addEventListener("click", function () {
      confirmationModal.style.display = "none";
    });
  });
}

function undoBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

document.addEventListener(RENDER_EVENT, () => {
  const uncompletedBookList = document.getElementById(
    "incompleteBookshelfList"
  );
  const listCompleted = document.getElementById("completeBookshelfList");

  uncompletedBookList.innerHTML = "";
  listCompleted.innerHTML = "";

  for (bookItem of books) {
    const bookElement = readBook(bookItem);
    if (bookItem.isCompleted) {
      listCompleted.append(bookElement);
    } else {
      uncompletedBookList.append(bookElement);
    }
  }
});
