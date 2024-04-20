function Library() {
    this.books = [];
}

Library.prototype.getBooks = function() {
    return this.books;
};

Library.prototype.countBooks = function() {
    return this.books.length;
};

Library.prototype.addBook = function(book) {
    this.books.push(book);
};

Library.prototype.deleteBook = function(id) {
    this.books.splice(id, 1);
};

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.getReadStatus = function() {
    return this.read ? "Read" : "Not read";
};

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

function ScreenController() {
    this.library = new Library();

    const form = document.querySelector("form");
    const newBookTitle = document.querySelector("#title");
    const newBookAuthor = document.querySelector("#author");
    const newBookPages = document.querySelector("#pages");
    const newBookRead = document.querySelector("#read");

    form.addEventListener("submit", e => {
        e.preventDefault();
    
        if (newBookTitle.value == "") {
            alert("Title must be entered.");
        } else if (newBookAuthor.value == "") {
            alert("Author must be entered.");
        } else if (newBookPages.value == "") {
            alert("Number of pages must be entered.");
        } else {
            this.library.addBook(new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookRead.checked));
            e.target.reset();
            this.updateDisplay();
        }
    });

    this.table = document.querySelector("tbody");

    this.updateDisplay();
}

ScreenController.prototype.updateDisplay = function() {
    this.table.innerHTML = "";

    if (this.library.countBooks() === 0) {
        this.table.innerHTML = `<tr><td class="not-found" colspan="6">No books found</td></tr>`;
    } else {
        const books = this.library.getBooks();
        for (let i = 0; i < this.library.countBooks(); i++) {
            this.table.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${books[i].title}</td>
                <td>${books[i].author}</td>
                <td>${books[i].pages}</td>
                <td class="table-status">
                    <button type="button" class="read-status-btn" data-id="${i}">${books[i].getReadStatus()}</button>
                </td>
                <td class="table-delete">
                    <button type="button" class="delete-btn" data-id="${i}">Delete</button>
                </td>
            </tr>`;
        }

        const readStatusBtns = document.querySelectorAll(".read-status-btn");
        for (const btn of readStatusBtns) {
            btn.addEventListener("click", this.changeReadStatus.bind(this));
        }

        const deleteBtns = document.querySelectorAll(".delete-btn");
        for (const btn of deleteBtns) {
            btn.addEventListener("click", this.deleteBook.bind(this));
        }
    }
};
 
ScreenController.prototype.changeReadStatus = function(e) {
    this.library.getBooks()[e.target.dataset.id].toggleReadStatus();
    this.updateDisplay();
};

ScreenController.prototype.deleteBook = function(e) {
    this.library.deleteBook(e.target.dataset.id);
    this.updateDisplay();
};

const screenController = new ScreenController();