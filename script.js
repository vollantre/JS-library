let myLibrary = [];
let newBookBtn = document.querySelector("#newbook");


class Book{
    constructor(title, author, pages, status){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status; 
    }
    
    info(){
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.status;
    }
}

function addBookToLibrary(){
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let status = document.querySelector("#status").value;
    let book = new Book(title, author, pages, status);
    myLibrary.push(book);
}

function remove(button){
    let idx = Number(button.parentNode.parentNode.id);

    if(confirm(`Do you want to delete ${myLibrary[idx].title}?`)){
        myLibrary.splice(idx, 1);
    }

    render();
}

function changeStatus(button){
    let idx = Number(button.parentNode.id);

    if(myLibrary[idx].status == "read"){
        myLibrary[idx].status = "unread"
    }else{
        myLibrary[idx].status = "read"
    }

    render();
    
}

function render(){
    clearTable();
    let table = document.querySelector("#library");
    myLibrary.forEach((book, index) => {
        let row = table.insertRow();
        row.id = index;
        let title = row.insertCell();
        let author = row.insertCell();
        let pages = row.insertCell();

        let cell = row.insertCell();
        let status = document.createElement("SPAN");
        status.classList.add("status");
        status.innerHTML = book.status;
        status.setAttribute("onclick", "changeStatus(this);");
        cell.appendChild(status);

        title.innerHTML = book.title;
        author.innerHTML = book.author;
        pages.innerHTML = book.pages;

        cell = row.insertCell();
        let removeBtn = document.createElement("INPUT");
        removeBtn.type = "button";
        removeBtn.value = "Delete";
        removeBtn.setAttribute("onclick", "remove(this);")
        cell.appendChild(removeBtn);


    });
}

function showModal(){
    let modal = document.querySelector(".new-book-modal");
    modal.style.display = 'block';
}

function hideModal() {
    let modal = document.querySelector(".new-book-modal");
    modal.style.display = 'none';
}

let closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function(){
    hideModal();
});

newBookBtn.addEventListener("click", function(){
    showModal();
});

function clearTable(){
    document.querySelector("#library").innerHTML = `<tbody><tr id="book-headers">
    <th>Title</th>
    <th>Author</th>
    <th>Pages</th>
    <th>Status</th>
    <th></th>
</tr>
</tbody>`
}

let form = document.querySelector("#form");
form.addEventListener("submit", function(a){
    a.preventDefault();
    addBookToLibrary();
    hideModal();
    render();
});

render();



