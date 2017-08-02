function getBooks() {
    document.getElementById("showTab_Books").hidden = false;
    document.getElementById("showTab_Br").hidden = true;

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

function showBooks(books) {
    var tableContent = "";
    for (var i = 0; i < books.length-3; i+=4){
        var record = books[i];
        var record2 = books[i+1];
        var record3 = books[i+2];
        var record4 = books[i+3];
        if (i & 1 == 1) {
            tableContent += "<tr class='orderOdd'>";
        }
        else {
            tableContent += "<tr class='orderEven'>";
        }
        tableContent += "<td><img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + record.Id + "'/><figcaption>" + record.AuthorInitials + " " + record.AuthorSurname + "</figcaption><figcaption>"+ record.Title + "</figcaption></td><td><img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + record2.Id + "'/><figcaption>" + record2.AuthorInitials + " " + record2.AuthorSurname + "</figcaption><figcaption>"+ record2.Title + "</figcaption></td><td><img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + record3.Id + "'/><figcaption>" + record3.AuthorInitials + " " + record3.AuthorSurname + "</figcaption><figcaption>"+ record3.Title + "</figcaption></td><td><img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + record4.Id + "'/><figcaption>" + record4.AuthorInitials + " " + record4.AuthorSurname + "</figcaption><figcaption>"+ record4.Title + "</figcaption></td></tr>\n";
    } 
    document.getElementById("showTab_Books").innerHTML = tableContent;
}

function getBr() {
    document.getElementById("showTab_Br").hidden = false;
    document.getElementById("showTab_Books").hidden = true;

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

function showBr(br) {
    var tableContent = "";
    for (var i = 0; i < br.length-3; i+=4){
        var record = br[i];
        var record2 = br[i+1];
        var record3 = br[i+2];
        var record4 = br[i+3];
        if (i & 1 == 1) {
            tableContent += "<tr class='orderOdd'>";
        }
        else {
            tableContent += "<tr class='orderEven'>";
        }
        tableContent += "<td><img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=" + record.Id + "'/><figcaption>"+ record.Title + "</figcaption></td><td><img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=" + record2.Id + "'/><figcaption>"+ record2.Title + "</figcaption></td><td><img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=" + record3.Id + "'/><figcaption>"+ record3.Title + "</figcaption></td><td><img src='http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=" + record4.Id + "'/><figcaption>"+ record4.Title + "</figcaption></td></tr>\n";
    } 
    document.getElementById("showTab_Br").innerHTML = tableContent;
}