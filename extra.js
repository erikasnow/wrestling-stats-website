function request_wrestler() {
    var x = document.getElementById("wrestlerTable");
    x.style.display = "block";

    //disable every button but enter and cancel
    var y = document.getElementById("createButton");
    y.setAttribute("disabled", "true");
    var z = document.getElementById("wrestlerButton");
    z.setAttribute("disabled", "true");
    var editBtns = document.getElementsByClassName("editBtn");
    var delBtns = document.getElementsByClassName("delBtn");
    for (let i = 0; i < editBtns.length; i++) {
        //could separate these, but there should be same number of each
        editBtns[i].setAttribute("disabled", "true");
        delBtns[i].setAttribute("disabled", "true");
    }
}

function get_wrestler_info() {
    var x = document.getElementById("wrestlerTable");
    x.style.display = "none";
    var a = document.getElementById("wrestlerInfo");
    a.style.display = "block";

    //grab data to send to server
    var wrestlerData = {};
    wrestlerData.name = document.getElementById("wrestler").innerHTML;

    console.log("wrestlerData: " + JSON.stringify(wrestlerData));
    var req = new XMLHttpRequest();
    req.open("POST", "/getWrestlerInfo");
    req.responseType = 'json';
    req.onload = function () {
        wrestlerInfo = req.response;
        buildWrestler(wrestlerInfo);
    };
    req.send(JSON.stringify(wrestlerData));
}

function buildWrestler(info) {
    console.log("entered buildWrestler");
    var x = document.getElementById("wname");
    x.innerHTML = info.name;

    var y = document.getElementById("wpoints");
    y.innerHTML = info.points;
}

function exit() {
    var x = document.getElementById("wrestlerInfo");
    x.style.display = "none";

    //enable all the disabled buttons
    var y = document.getElementById("createButton");
    y.removeAttribute("disabled");
    var z = document.getElementById("wrestlerButton");
    z.removeAttribute("disabled");
    var editBtns = document.getElementsByClassName("editBtn");
    var delBtns = document.getElementsByClassName("delBtn");
    for (let i = 0; i < editBtns.length; i++) {
        //could separate these, but there should be same number of each
        editBtns[i].removeAttribute("disabled");
        delBtns[i].removeAttribute("disabled");
    }
}