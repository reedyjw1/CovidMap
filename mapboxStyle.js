function loadStatePoly(stringResponse) {
    // var polyJson = JSON.parse(stringResponse)
    // console.log(polyJson["features"][0].properties.NAME)

}

function readTextFile(map)
{
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            var polyJson = JSON.parse(httpRequest.responseText);
            addData(polyJson["features"], map);
        }
    }
    httpRequest.open("GET", "https://raw.githubusercontent.com/reedyjw1/CovidMap/feature/state-boundaries/geoJson20M.json", true);

    httpRequest.send(null)
}

function addData(featureArray, map){
    const introGeoJson = "{\"type\": \"geojson\",\"data\": {\"type\": \"Feature\", \"geometry\": "

    for(var i = 0; i < featureArray.length; i++){
        var concatString = introGeoJson + JSON.stringify(featureArray[i].geometry) + "}}"

        map.addSource(featureArray[i].properties.NAME, JSON.parse(concatString))
        map.addLayer({
            'id': featureArray[i].properties.NAME,
            'type': 'fill',
            'source': featureArray[i].properties.NAME,
            'layout': {},
            'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.1
            }
            });
    }
}

function getStateMapKey() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            var statesObj = JSON.parse(httpRequest.responseText);
            let stateCodeToStates = new Object();

            for (let el in statesObj){
                stateCodeToStates[statesObj[el]] = el
            }
            console.log(stateCodeToStates)
        }
    }
    httpRequest.open("GET", "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json", true);

    httpRequest.send(null)
}