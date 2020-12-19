function loadStatePoly(stringResponse) {
   console.log(stringResponse)

}

function readTextFile()
{
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4 && httpRequest.status == 200)
        callback(httpRequest.responseText)
    }
    httpRequest.open("GET", "https://api.covidtracking.com/v1/states/current.json", true);
    httpRequest.send(null)
}