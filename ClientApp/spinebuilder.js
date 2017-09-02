(function () {

    let books = null;
    let colors = null;
    let currentPos = 0;
    let shelf = document.getElementsByClassName('bookshelf')[0];

    var bookInfoRequest = new XMLHttpRequest();
    bookInfoRequest.addEventListener("load", loadBookJson);
    bookInfoRequest.open("GET", "book_info.json");
    bookInfoRequest.send();

    function loadBookJson() {
        books = JSON.parse(this.responseText);
        loadColors();
    }

    function loadColors(books) {
        let colorRequest = new XMLHttpRequest();
        colorRequest.addEventListener('load', loadColorJson);
        colorRequest.open('GET', 'book_colors.json');
        colorRequest.send();
    }

    function loadColorJson() {
        colors = JSON.parse(this.responseText);
        loadBooks();
    }

    function loadBooks() {
        
       
        var totalWidth = 0;
        for(let i = 0; i < books.length; i++) {
            let spine = generateSpine(books[i].book);
            shelf.appendChild(spine);
            totalWidth += parseInt(spine.style.width, 10);
        }
      
        shelf.style.width = totalWidth + 100;

        let interval = setInterval(transitionShelf, 30000);
    }

    function transitionShelf() {
        currentPos -= window.innerWidth;

        if ((currentPos * -1) >= parseInt(shelf.style.width,10)) {
            currentPos = 0;
        }

        //shelf.style.left = currentPos;
        shelf.style.transform = 'translateX(' + currentPos + 'px)';
    }

    function generateSpine(book) {
        let s = new Spine(book);

        let spineElement = document.createElement('div');
        spineElement.classList.add('book-spine');
        spineElement.style.height = s.height;
        spineElement.style.width = s.width;
        spineElement.style.backgroundColor = s.color;
        spineElement.style.borderBottom = "4px solid " + s.border;


        let spineTitle = document.createElement('div');
        spineTitle.classList.add('book-title');
        spineTitle.innerHTML = getTitle(book.title);
        spineTitle.style.color = s.textColor;
        spineElement.appendChild(spineTitle);

        let spineAuthor = document.createElement('div');
        spineAuthor.classList.add('book-author');
        spineAuthor.innerHTML = book.authors.author.name;
        spineAuthor.style.color = s.textColor;
        spineElement.appendChild(spineAuthor);

        
        return spineElement;

    }

    function getTitle(title) {
        if (title.indexOf('(') !== -1) {
            return title.substring(0, title.indexOf('('));
        }
        //TODO fix special chars like what is in Horrorstor 
        return title;
    }

    function Spine(book) {

        let default_height = 300;
        let default_width = 100;
        let width = book.num_pages / 3;

        if (width < 50) {
            width = 50;
        }

        let height = 500;
        let adjustment = Math.floor((Math.random() * 40) + 1);
        if (width > 150 || book.title.length > 35) {
            // increase height randomly:
            height += adjustment;
        } else {
            // decrease height randomly:
            height -= adjustment;
        }

        let colorInfo = colors.find(c => c.BookId === +book.id["#text"]);

        return {
            height: height,
            width: width,
            color: colorInfo.Colors[0].HexCode,
            border: colorInfo.Colors[1].HexCode,
            textColor: colorInfo.Colors[0].IsDark ? "#fff" : "#000"
           // title: ''
        };
    }


})();