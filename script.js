function getCovidByState(callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText)
    }
    httpRequest.open("GET", "https://api.covidtracking.com/v1/states/current.json", true);
    httpRequest.send(null)
}

function displayData(text){
    var obj = JSON.parse(text)

    for(var i = 0; i < obj.length; i++){
        console.log(obj[i].state)
    }
}