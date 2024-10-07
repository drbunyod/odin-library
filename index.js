class Library {
  constructor() {
    this.books = [];
  }

  getBooks() {
    return this.books;
  }

  countBooks() {
    return this.books.length;
  }

  addBook(book) {
    this.books.push(book);
  }

  deleteBook(id) {
    this.books.splice(id, 1);
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  getReadStatus() {
    return this.read ? 'Read' : 'Not read';
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

class ScreenController {
  constructor() {
    this.library = new Library();

    const form = document.querySelector('form');
    const newBookTitle = document.querySelector('#title');
    const newBookAuthor = document.querySelector('#author');
    const newBookPages = document.querySelector('#pages');
    const newBookRead = document.querySelector('#read');

    [newBookTitle, newBookAuthor, newBookPages].forEach((element) => {
      element.addEventListener('input', () =>
        this.validateForm(newBookTitle, newBookAuthor, newBookPages)
      );
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        this.validateForm(newBookTitle, newBookAuthor, newBookPages);
        form.reportValidity();
      } else {
        this.library.addBook(
          new Book(
            newBookTitle.value,
            newBookAuthor.value,
            newBookPages.value,
            newBookRead.checked
          )
        );
        e.target.reset();
        this.updateDisplay();
      }
    });

    this.table = document.querySelector('tbody');

    this.updateDisplay();
  }

  validateForm(title, author, pages) {
    if (title.validity.valueMissing) {
      title.setCustomValidity('Title must be entered.');
    } else {
      title.setCustomValidity('');
    }

    if (author.validity.valueMissing) {
      author.setCustomValidity('Author must be entered.');
    } else {
      author.setCustomValidity('');
    }

    if (pages.validity.valueMissing) {
      pages.setCustomValidity('Number of pages must be entered.');
    } else if (pages.validity.rangeUnderflow) {
      pages.setCustomValidity('Number of pages must be a positive number.');
    } else {
      pages.setCustomValidity('');
    }
  }

  updateDisplay() {
    this.table.innerHTML = '';

    if (this.library.countBooks() === 0) {
      this.table.innerHTML = `<tr><td class="not-found" colspan="6">No books found</td></tr>`;
    } else {
      const books = this.library.getBooks();
      for (let i = 0; i < this.library.countBooks(); i++) {
        this.table.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${books[i].title}</td>
                    <td>${books[i].author}</td>
                    <td>${books[i].pages}</td>
                    <td class="table-status">
                        <button type="button" class="read-status-btn" data-id="${i}">${books[
          i
        ].getReadStatus()}</button>
                    </td>
                    <td class="table-delete">
                        <button type="button" class="delete-btn" data-id="${i}">Delete</button>
                    </td>
                </tr>`;
      }

      const readStatusBtns = document.querySelectorAll('.read-status-btn');
      for (const btn of readStatusBtns) {
        btn.addEventListener('click', this.changeReadStatus.bind(this));
      }

      const deleteBtns = document.querySelectorAll('.delete-btn');
      for (const btn of deleteBtns) {
        btn.addEventListener('click', this.deleteBook.bind(this));
      }
    }
  }

  changeReadStatus(e) {
    this.library.getBooks()[e.target.dataset.id].toggleReadStatus();
    this.updateDisplay();
  }

  deleteBook(e) {
    this.library.deleteBook(e.target.dataset.id);
    this.updateDisplay();
  }
}

const screenController = new ScreenController();
