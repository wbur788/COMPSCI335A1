function getBooks() {
    var uri = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booklist";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        var resp = JSON.parse(xhr.responseText);
        showBooks(resp);
        alert(xhr.responseText)
    }
    xhr.send(null);
}

function showBooks(books) {
    var tableContent = "<tr class='orderTitle'><td>Author</td><td>Title</td></tr>\n";
    for (var i = 0; i < books.length; ++i){
        var record = books[i];
        if (i & 1 == 1) {
            tableContent += "<tr class='orderOdd'>";
        }
        else {
            tableContent += "<tr class='orderEven'>";
        }
        tableContent += "<td><img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + record.Id + "'/></td><td>" + record.AuthorInitials + " " + record.AuthorSurname + "</td><td>" + record.Title + "</td></tr>\n";
    } 
    document.getElementById("showTab").innerHTML = tableContent;
}

