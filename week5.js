class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  describe() {
    return `${this.title} written by ${this.author}`;
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book instanceof Book) {
      this.books.push(book);
    } else {
      throw new Error(`Please add a book, this is not a book: ${book}`);
    }
  }

  describe() {
    return `${this.name} has ${this.books.length} books`;
  }
}

class Menu {
  constructor() {
    this.libraries = [];
    this.selectedLibrary = null;
  }

  start() {
    let selection = this.showMainMenu();
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createLibrary();
          break;
        case "2":
          this.viewLibrary();
          break;
        case "3":
          this.deleteLibrary();
          break;
        case "4":
          this.displayLibraries();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenu();
    }
    alert('Bye bye book lover!');
    }
  showMainMenu() {
    return prompt(`
     0) exit
     1) create a new library
     2) view library
     3) delete a library
     4) display all libraries`
    );
  }
  showBookMenuOptions(bookInfo) {
    return prompt(`
     0) back
     1) add a book
     2) delete a book
    ----------------
    ${bookInfo}
    `
    );
  }

  displayLibraries() {
    let libraryString = "";
    for (let i = 0; i < this.libraries.length; i++) {
      libraryString += i + `)` + this.libraries[i].name + `\n`;
    }
    alert(libraryString);
  }

  createLibrary() {
    let name = prompt('Enter name for new library: ');
    this.libraries.push(new Library(name));
  }

  viewLibrary() {
    let index = prompt('Enter the index of the library that you want to view: ');
    if (index > -1 && index < this.libraries.length) {
      this.selectedLibrary = this.libraries[index];
      let description = 'Library Name: ' + this.selectedLibrary.name + '\n';
      description += ' ' + this.selectedLibrary.describe() + '\n';
      for (let i = 0; i < this.selectedLibrary.books.length; i++) {
        description += i + ") " + this.selectedLibrary.books[i].describe() + "\n";
      }
      let selection1 = this.showBookMenuOptions(description);
      switch (selection1) {
        case "1":
          this.createBook();
          break;
        case "2":
          this.deleteBook();
      }
    }
  } //validate user input
  deleteLibrary() {
    let index = prompt("Enter the index of the library that you wish to delete: ");
    if (index > -1 && index < this.libraries.length) {
      this.libraries.splice(index, 1);
    }
  }
  createBook() {
    let title = prompt("Enter title of new book: ");
    let author = prompt("Enter author of new book: ");
    this.selectedLibrary.addBook(new Book(title, author));
  }
  deleteBook() {
    let index = prompt("Enter the index of the book that you want to delete: ");
    if (index > -1 && index < this.selectedLibrary.books.length) {
    this.selectedLibrary.books.splice(index,1);
    }
  }
}
let menu = new Menu();
menu.start();

