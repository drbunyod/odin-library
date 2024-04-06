function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.readStatus = function() {
    return this.read ? "Read" : "Not read";
};

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function deleteBookFromLibrary(id) {
    myLibrary.splice(id, 1);
}

function displayLibrary() {
    table.innerHTML = "";

    if (myLibrary.length === 0) {
        table.innerHTML = `<tr><td class="not-found" colspan="6">No books found</td></tr>`;
    } else {
        for (let i = 0; i < myLibrary.length; i++) {
            table.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${myLibrary[i].title}</td>
                <td>${myLibrary[i].author}</td>
                <td>${myLibrary[i].pages}</td>
                <td class="table-status">
                    <button type="button" class="read-status-btn" data-id="${i}" onclick="changeReadStatus(this)">${myLibrary[i].readStatus()}</button>
                </td>
                <td class="table-delete">
                    <button type="button" class="delete-btn" data-id="${i}" onclick="deleteBook(this)">Delete</button>
                </td>
            </tr>`;
        }
    }
}

function changeReadStatus(e) {
    myLibrary[e.dataset.id].toggleReadStatus();
    displayLibrary();
}

function deleteBook(e) {
    deleteBookFromLibrary(e.dataset.id);
    displayLibrary();
}

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();

    if (newBookTitle.value == "") {
        alert("Title must be entered.");
    } else if (newBookAuthor.value == "") {
        alert("Author must be entered.");
    } else if (newBookPages.value == "") {
        alert("Number of pages must be entered.");
    } else {
        addBookToLibrary(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookRead.checked);
        e.target.reset();
        displayLibrary();
    }
});

const myLibrary = [];

const newBookTitle = document.querySelector("#title");
const newBookAuthor = document.querySelector("#author");
const newBookPages = document.querySelector("#pages");
const newBookRead = document.querySelector("#read");

const table = document.querySelector("tbody");

displayLibrary();