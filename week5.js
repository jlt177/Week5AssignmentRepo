class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

//this is the object book with the properties of title and author

  describe() {
    return `${this.title} written by ${this.author}`;
  }
}

//describe is a method which will return the title and the author when called 

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }
//this object library has name an an array of books as its properties


  /*another way of creating a book entry
  // addBook(book) {
  //   if (book instanceof Book) {
  //     this.books.push(book);
  //   } else {
  //     throw new Error(`Please add a book, this is not a book: ${book}`);
  //   }
       }*/

  describe() {
    return `${this.name} has ${this.books.length} books`;
  }
}

//when this describe method is called it return the name of the library and the index length of books it contains

class Menu {
  constructor() {
    this.libraries = [];
    this.selectedLibrary = null;
  }
/*this object is menu which is made of of an array of libraries, in this class is the start function which has switch cases for every
option*/
  
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
    alert("Bye bye book lover!");
  }
  showMainMenu() {
    return prompt(`
     0) exit
     1) create a new library
     2) view library
     3) delete a library
     4) display all libraries`);
  }
  showBookMenuOptions(bookInfo) {
    return prompt(`
     0) back
     1) add a book
     2) delete a book
    ----------------
    ${bookInfo}
    `);
  }
/* if option 4 is selected in the showMainMenu prompt the function displayLibraries
is called and it returns the string of indexed libraries*/
  

  displayLibraries() {
    let libraryString = "";
    for (let i = 0; i < this.libraries.length; i++) {
      libraryString += i + `)` + this.libraries[i].name + `\n`;
    }
    alert(libraryString);
  }

  createLibrary() {
    let name = prompt("Enter name for new library: ");
    this.libraries.push(new Library(name));
  }

/*createLibrary function takes the string from the prompt and pushes the new library name
into the index of libraries*/
  
  viewLibrary() {
    let index = prompt(
      "Enter the index of the library that you want to view: "
    );
    if (index > -1 && index < this.libraries.length) {
      this.selectedLibrary = this.libraries[index];
      let description = "Library Name: " + this.selectedLibrary.name + "\n";
      description += " " + this.selectedLibrary.describe() + "\n";
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
            break;
        } 
      }
    }
/*for the length of the library index each library is associated with an index
each library has a description assiocated with the 'attached' index
the describe function is called for each index of book 
the selection options switches depending on which option is selected*/

  deleteLibrary() {
    let index = prompt(
      "Enter the index of the library that you wish to delete: "
    );
    if (index > -1 && index < this.libraries.length) {
      this.libraries.splice(index, 1);
    }
  }
/*deleteLibrary method takes the entered index and deletes a library with the splice method
as long as the number entered is in the range of the index*/

  createBook() {
    let title = prompt("Enter title of new book: ");
    let author = prompt("Enter author of new book: ");
    this.selectedLibrary.books.push(new Book(title, author));
    //this.selectedLibrary.addBook(new Book(title, author))
  }
/*createBook method enters a new book in the library by title and author in the library
the user has chosen by the push method, what is commmented out in createBook is part 
of an alternate method of creating a new book entry*/
  
  deleteBook() {
    let index = prompt("Enter the index of the book that you want to delete: ");
    if (index > -1 && index < this.selectedLibrary.books.length) {
      this.selectedLibrary.books.splice(index, 1);
    }
  } //if the number entered is in the range of the index of that selected library, that book with that index will be deleted 
}
let menu = new Menu();
menu.start();
