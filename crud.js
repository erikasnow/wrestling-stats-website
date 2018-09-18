read();
var matchArr = [];

function create_row() {
    var x = document.getElementById("createTable");
    x.style.display = "block";
}
function save_row() {
    var x = document.getElementById("createTable");
    x.style.display = "none";

    var match = {};
    //match.id = document.getElementById('uId').innerHTML;
    //match.id = new_id();
    match.redName = document.getElementById('cRedName').innerHTML;
    match.redScore = document.getElementById('cRedScore').innerHTML;
    match.greenName = document.getElementById('cGreenName').innerHTML;
    match.greenScore = document.getElementById('cGreenScore').innerHTML;
    match.winner = document.getElementById('cWinner').innerHTML;
    match.winType = document.getElementById('cWinType').innerHTML;

    console.log("match: " + JSON.stringify(match));
    var req = new XMLHttpRequest();
    req.open('POST', '/create');
    req.responseType = 'text';
    req.onload = function() { 
        console.log('create done!'); 
        location.reload(); 
    }
    req.send(JSON.stringify(match));
}
function cancel() {
    var x = document.getElementById("createTable");
    x.style.display = "none";
    var y = document.getElementById("updateTable");
    y.style.display = "none";
}
function edit_row(id) {
    var x = document.getElementById("updateTable");
    x.style.display = "block";

    match_current = matchArr.filter( function(d){ return d.id === id; } )[0];
    console.log("match_current: " + JSON.stringify(match_current));
    document.getElementById('uId').innerHTML = match_current.id;
    document.getElementById('uRedName').innerHTML = match_current.redName;
    document.getElementById('uRedScore').innerHTML = match_current.redScore;
    document.getElementById('uGreenName').innerHTML = match_current.greenName;
    document.getElementById('uGreenScore').innerHTML = match_current.greenScore;
    document.getElementById('uWinner').innerHTML = match_current.winner;
    document.getElementById('uWinType').innerHTML = match_current.winType;
}
function update_row() {
    var x = document.getElementById("updateTable");
    x.style.display = "none";

    var match = {};
    match.id = document.getElementById('uId').innerHTML;
    match.redName = document.getElementById('uRedName').innerHTML;
    match.redScore = document.getElementById('uRedScore').innerHTML;
    match.greenName = document.getElementById('uGreenName').innerHTML;
    match.greenScore = document.getElementById('uGreenScore').innerHTML;
    match.winner = document.getElementById('uWinner').innerHTML;
    match.winType = document.getElementById('uWinType').innerHTML;

    console.log("match: " + JSON.stringify(match));
    var req = new XMLHttpRequest();
    req.open('PUT', '/update');
    req.responseType = 'text';
    req.onload = function() { 
        console.log('done!'); 
        location.reload(); 
    }
    req.send(JSON.stringify(match));
}
function build(rows) {
   for(let i = 0; i < rows.length; i++){
       console.log("entered build loop");
       var row = document.getElementById("results").insertRow(i+2);
       var rn = row.insertCell(0);
       var rs = row.insertCell(1);
       var gn = row.insertCell(2);
       var gs = row.insertCell(3);
       var w = row.insertCell(4);
       var wt = row.insertCell(5);

       rn.innerHTML = rows[i].redName;
       rs.innerHTML = rows[i].redScore;
       gn.innerHTML = rows[i].greenName;
       gs.innerHTML = rows[i].greenScore;
       w.innerHTML = rows[i].winner;
       wt.innerHTML = rows[i].winType;

       var editBtn = row.insertCell(6);
       editBtn.style.width = "1%";
       var delBtn = row.insertCell(7);
       delBtn.style.width = "1%";

       var iden = rows[i].id;

       editBtn.innerHTML = '<button onclick="edit_row(\'' + iden + '\')">Edit</button>';
       delBtn.innerHTML = '<button onclick="delete_row(' + rows[i].id + ')">Delete</button>';
   }
}
function read() {
    console.log("Sending read request");
    var req = new XMLHttpRequest();
    req.open("GET", "/read");
    req.responseType = 'json';
    req.onload = function () {
        matchArr = req.response;
        build(matchArr);
    };
    req.send();
}