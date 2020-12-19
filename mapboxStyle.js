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