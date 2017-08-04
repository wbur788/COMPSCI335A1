function getBooks() {
    showBookTab();

    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booklist";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var resp = JSON.parse(xhr.responseText);
        showBooks(resp);
    }
    xhr.send(null);
}

function searchBooks(search_term) {
    document.getElementById("showTab_Books").hidden = false;
    document.getElementById("showTab_Br").hidden = true;

    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booksearch?term=" + search_term;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var resp = JSON.parse(xhr.responseText);
        
        showBooks(resp);
    }
    xhr.send(null);
}

function showBooks(books) {
    var tableContent = "";
    var counter = 0;
    
    for (var i = 0; i < books.length; i+=1) {
        var record = books[i];

        if (counter == 0) {
            if (i & 1 == 1) {
                tableContent += "<tr class='orderOdd'>";
            }
            else {
                tableContent += "<tr class='orderEven'>";
            }
        }

        tableContent += "<td><img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + record.Id + "'/><figcaption>" + record.AuthorInitials + " " + record.AuthorSurname + "</figcaption><figcaption>"+ record.Title + "</figcaption></td>";

        counter += 1;

        if (counter > 3) {
            tableContent += "</tr>\n";
            counter = 0;
        }
    } 
        
    
    document.getElementById("showTab_Books").innerHTML = tableContent;
}

function getBr() {
    showBrTab();

    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brlist";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var resp = JSON.parse(xhr.responseText);
        showBr(resp);
    }
    xhr.send(null);
}

function searchBr(search_term) {
    document.getElementById("showTab_Books").hidden = true;
    document.getElementById("showTab_Br").hidden = false;

    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brsearch?term=" + search_term;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var resp = JSON.parse(xhr.responseText);
        
        showBr(resp);
    }
    xhr.send(null);
}

function showBr(br) {
    var tableContent = "";
    var counter = 0;
    
    for (var i = 0; i < br.length; i+=1) {
        var record = br[i];

        if (counter == 0) {
            if (i & 1 == 1) {
                tableContent += "<tr class='orderOdd'>";
            }
            else {
                tableContent += "<tr class='orderEven'>";
            }
        }

        tableContent += "<td><img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=" + record.Id + "'/><figcaption>" + record.Title + "</figcaption></td>";

        counter += 1;

        if (counter > 3) {
            tableContent += "</tr>\n";
            counter = 0;
        }
    } 
        
    
    document.getElementById("showTab_Br").innerHTML = tableContent;
}

function showBookTab() {
    document.getElementById("showTab_Books").hidden = false;
    document.getElementById("showTab_Br").hidden = true;
    document.getElementById("br_head").hidden = true;
    document.getElementById("search_br").hidden = true;
    document.getElementById("book_head").hidden = false;
    document.getElementById("search_book").hidden = false;
}

function showBrTab() {
    document.getElementById("showTab_Br").hidden = false;
    document.getElementById("showTab_Books").hidden = true;
    document.getElementById("br_head").hidden = false;
    document.getElementById("search_br").hidden = false;
    document.getElementById("book_head").hidden = true;
    document.getElementById("search_book").hidden = true;
}