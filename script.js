function getCovidByState(codeMap) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            var jsonResponse = JSON.parse(httpRequest.responseText);
            let formattedResponse = new Object();
            console.log(codeMap)
            for (let el in jsonResponse){
                formattedResponse[codeMap[jsonResponse[el].state]] = jsonResponse[el];
            }
            console.log(formattedResponse);
        }
    }
    httpRequest.open("GET", "https://api.covidtracking.com/v1/states/current.json", true);
    httpRequest.send(null)
}

function getStateMapKey(callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            var statesObj = JSON.parse(httpRequest.responseText);
            
            //let stateCodeToStates = new Object();
            
            //Flips state code and name for key/value pair
            // for (let el in statesObj){
            //     stateCodeToStates[statesObj[el]] = el;
            // }
            //console.log(stateCodeToStates);
            callback(statesObj);
        }
    }
    httpRequest.open("GET", "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json", true);

    httpRequest.send(null)
}

// function displayData(text){

//     for(var i = 0; i < obj.length; i++){
//         console.log(obj[i].state)
//     }
// }