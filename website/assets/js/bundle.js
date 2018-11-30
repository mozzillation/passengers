var map;



function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibW96emlsbGF0aW9uIiwiYSI6ImNqcDNlaHNiMDA3N3gzcnFmaHh4bGtzNzQifQ.YTndeLngjj6SzGvw8XDOQw';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mozzillation/cjp3f23cf0jhg2sqk90y2ndah',
        center: [9.193772, 45.467227],
        zoom: 13
    });
}


$(document).ready(function () {
    initMap();
})
