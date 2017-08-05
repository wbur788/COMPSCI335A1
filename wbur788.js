function getBooks() {
    //https://www.w3schools.com/jsref/prop_element_classlist.asp
    if (document.getElementById("bookTab").classList.contains("hidden")) {
        document.getElementById("bookTab").classList.remove("hidden");
        document.getElementById("brTab").classList.add("hidden");
        document.getElementById("registerTab").classList.add("hidden");
        document.getElementById("guestBookTab").classList.add("hidden");
    }

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

        tableContent += "<td><img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + record.Id + "'/><figcaption>" + record.AuthorInitials + " " + record.AuthorSurname + "</figcaption><figcaption>"+ record.Title + "</figcaption><button class='buyNowBtn' onclick='buyBook(this)' value='" + record.Id + "'>Buy Now</button></td>";

        counter += 1;

        if (counter > 3) {
            tableContent += "</tr>\n";
            counter = 0;
        }
    } 
        
    
    document.getElementById("showTab_Books").innerHTML = tableContent;
}

function getBr() {
    if (document.getElementById("brTab").classList.contains("hidden")) {
        document.getElementById("brTab").classList.remove("hidden");
        document.getElementById("bookTab").classList.add("hidden");
        document.getElementById("registerTab").classList.add("hidden");
        document.getElementById("guestBookTab").classList.add("hidden");
    }

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

        tableContent += "<td><img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=" + record.Id + "'/><figcaption>" + record.Title + "</figcaption><button class='buyNowBtn' onclick='buyBr(this)' value='" + record.Id + "'>Buy Now</button></td>";

        counter += 1;

        if (counter > 3) {
            tableContent += "</tr>\n";
            counter = 0;
        }
    } 
        
    
    document.getElementById("showTab_Br").innerHTML = tableContent;
}

function getComments() {
    if (document.getElementById("guestBookTab").classList.contains("hidden")) {
        document.getElementById("guestBookTab").classList.remove("hidden");
        document.getElementById("brTab").classList.add("hidden");
        document.getElementById("bookTab").classList.add("hidden");
        document.getElementById("registerTab").classList.add("hidden");
    }

}

function getRegister() {
    if (document.getElementById("registerTab").classList.contains("hidden")) {
        document.getElementById("registerTab").classList.remove("hidden");
        document.getElementById("brTab").classList.add("hidden");
        document.getElementById("bookTab").classList.add("hidden");
        document.getElementById("guestBookTab").classList.add("hidden");
    }

}


function submitComment() {
    var comment = document.getElementById("commentIn").value;
    var name = document.getElementById("commentName").value;

    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/comment?name=" + name;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var jsonComment = JSON.stringify(comment);    

    xhr.send(jsonComment); 

    xhr.onload = function() {
        document.getElementById('commentFrame').src = document.getElementById('commentFrame').src
        document.getElementById("commentName").value = "";
        document.getElementById("commentIn").value = "";
    }
    
    
}

function registerUser() {
    var username = document.getElementById("regUsername").value;
    var address = document.getElementById("regAddress").value;
    var password = document.getElementById("regPassword").value;

    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/register";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var jsonComment = JSON.stringify(
        {
            Address : address,
            Name : username,
            Password : password
        }
    );

    xhr.send(jsonComment); 

    if (username && password != null) {
        document.getElementById("successMsg").innerHTML = "Registered Successfully";        
    }

    xhr.onload = function() {
        document.getElementById("regUsername").value = "";
        document.getElementById("regAddress").value = "";
        document.getElementById("regPassword").value = "";
    }

}

// https://stackoverflow.com/questions/12485759/onclick-function-this-returns-window-object
function buyBook(objPassed) {
    var bookId = objPassed.value;
    window.open("http://redsox.uoa.auckland.ac.nz/BC/Closed/Service.svc/bookbuy?id=" + bookId, "_blank");
}

function buyBr(objPassed) {
    var brId = objPassed.value;
    window.open("http://redsox.uoa.auckland.ac.nz/BC/Closed/Service.svc/brbuy?id=" + brId, "_blank");
}

function hideAll(hideId) {
    var x = document.getElementById(hideId).children;
    for (i=0;i<x.length;i++) {
        x[i].hidden = true;
    }
    
}