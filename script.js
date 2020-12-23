function getAPI() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            sessionStorage.setItem('covidData', httpRequest.responseText);
            console.log("request made.")

        }
    }
    httpRequest.open("GET", "https://api.covidtracking.com/v1/states/current.json", true);
    httpRequest.send(null)
}

function getStateDictionary(){
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            sessionStorage.setItem('stateDictionary', httpRequest.responseText);
        }
    }
    httpRequest.open("GET", "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json", true);

    httpRequest.send(null)
}

function getCovidByState(name, map, e){
    var statesObj = JSON.parse(sessionStorage.getItem('stateDictionary'));
    var covidObject = JSON.parse(sessionStorage.getItem('covidData'));

    if(statesObj !== null && covidObject !== null){
        var formattedResponse = new Object()
        for (let el in covidObject){
            formattedResponse[statesObj[covidObject[el].state]] = covidObject[el];;
        }
        var tableVal = '<h3>' + name+ '</h3>\
            <table border="1" style="border-collapse: collapse; width: 100%; height: 42px;">\
            <tbody>\
            <tr style="height: 21px;">\
            <td style="width: 200px; height: 21px;">Total Cases</td>\
            <td style="width: 50px; height: 21px;">\
            <div>\
            <div><span>' + formattedResponse[name].positive + '</span></div>\
            </div>\
            </td>\
            </tr>\
            <tr style="height: 21px;">\
            <td style="width: 50%; height: 21px;">Deaths</td>\
            <td style="width: 50%; height: 21px;">\
            <div>\
            <div><span>' + formattedResponse[name].death + '</span></div>\
            </div>\
            </td>\
            </tr>\
            </tbody>\
            </table>'
        //alert(formattedResponse[name].death)
        var popup = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(e.lngLat)
        .setHTML(tableVal)
        .addTo(map);
    }
    
}


function getStateMapKey(name) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            var statesObj = JSON.parse(httpRequest.responseText);
            
            var jsonResponse = JSON.parse(sessionStorage.getItem('covidData'))
            var formattedResponse = new Object()
            for (let el in jsonResponse){
                formattedResponse[statesObj[jsonResponse[el].state]] = jsonResponse[el];
                sessionStorage.setItem('covidData', JSON.stringify(formattedResponse));
            }

            alert(formattedResponse[name].death);
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
