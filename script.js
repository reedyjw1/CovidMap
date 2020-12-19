function getCovidByState() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            var jsonResponse = JSON.parse(httpRequest.responseText)
            let formattedResponse = new Object();
            for (let el in jsonResponse){
                formattedResponse[jsonResponse[el].state] = jsonResponse[el]
            }
            console.log(formattedResponse)

            //callback(httpRequest.responseText)
        }
    }
    httpRequest.open("GET", "https://api.covidtracking.com/v1/states/current.json", true);
    httpRequest.send(null)
}

// function displayData(text){

//     for(var i = 0; i < obj.length; i++){
//         console.log(obj[i].state)
//     }
// }