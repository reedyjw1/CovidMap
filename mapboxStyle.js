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
    // const introGeoJson = "{\"type\": \"geojson\",\"data\": {\"type\": \"Feature\", \"geometry\": "

    // for(var i = 0; i < featureArray.length; i++){
    //     var concatString = introGeoJson + JSON.stringify(featureArray[i].geometry) + "}}"
        // map.addLayer({
        //     'id': featureArray[i].properties.NAME,
        //     'type': 'fill',
        //     'source': featureArray[i].properties.NAME,
        //     'layout': {},
        //     'paint': {
        //         'fill-color': '#088',
        //         'fill-opacity': [
        //             'case',
        //             ['boolean', ['feature-state', 'hover'], false],
        //             .5,
        //             0.1
        //             ]
        //     }
        //     });
    //     map.addSource(featureArray[i].properties.NAME, JSON.parse(concatString))
    // }
    var hoveredStateId = null;

    map.addSource('states', {
        'type': 'geojson',
        'data':
        'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
        });

    map.addLayer({
        'id': 'states-fill',
        'type': 'fill',
        'source': 'states',
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                .4,
                0.1
                ]
        }
    });

    map.on('mousemove', 'states-fill', function (e) {
        if (e.features.length > 0) {
            if (hoveredStateId) {
                map.setFeatureState(
                    { source: 'states', id: hoveredStateId },
                    { hover: false }
                );
            }
            hoveredStateId = e.features[0].id;
            map.setFeatureState(
                { source: 'states', id: hoveredStateId },
                { hover: true }
            );
        }
    });
         
    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    map.on('mouseleave', 'states-fill', function () {
        if (hoveredStateId) {
            map.setFeatureState(
                { source: 'states', id: hoveredStateId },
                { hover: false }
            );
        }
        hoveredStateId = null;
    });


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