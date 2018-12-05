/*jslint browser: true*/
/*eslint-env browser*/
/*jslint node: true */
/* jshint esnext: true, expr: true, unused: false */
/*jshint validthis: true */
/*global $*/

"use strict";

var map;
var mapboxgl;

var preload = $("#preload"),
    preloadLogo = $("#preload .logo_text");




function loadData() {

    $.getJSON("./data/main.json", function (json) {


        json.places.forEach(function (marker) {

            // MAKERS
            var el = document.createElement("div");
            $(el).addClass("marker").attr("data-place", marker.properties.id).attr("data-cord", '[' + marker.geometry.coordinates + ']');


            // SIDEBAR
            var element = document.createElement("article");
            $(element).addClass("place").attr('data-place', marker.properties.id).attr("data-cord", '[' + marker.geometry.coordinates + ']').html("  <div class='place_thumb'></div><div class='place_address'>" + marker.properties.description + "</div><div class = 'place_time' >" + marker.properties.timestamp + "</div>")
            $('#sidebar .places').append(element)



            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
        });


        $('.place, .marker').hover(function () {
            var id = $(this).data("place");
            $('[data-place="' + id + '"]').toggleClass('highlight')
        })

        $('.place, .marker').click(function () {




            $('.passenger').remove();

            var $this = $(this);
            var cord = $this.data("cord");
            var id = $this.data("place");

            $('[data-place="' + id + '"]').toggleClass('is-active');

            var lat = cord[0];
            var long = cord[1];


            console.log(id);

            map.flyTo({
                zoom: 15,
                center: cord
            });


            $.getJSON('./data/places/gustavoModena.json', function (json) {


                json.passengers.forEach(function (marker) {


                    var element = document.createElement("li");

                    $(element).html(marker.mac);
                    $('#subsidebar').append(element);

                    var el = document.createElement("div");
                    var randCoord = getRandomLocation(lat, long, 250);
                    el.className = "passenger";

                    new mapboxgl.Marker(el)
                        .setLngLat([randCoord.latitude, randCoord.longitude])
                        .addTo(map);

                    $('#subsidebar').addClass('is-active');



                })

            })
        })

    })


}

function isLoaded() {
    if (!preload.hasClass("is-ready")) {
        preload.addClass("is-ready");
    }
}

function load() {
    loadData();
    isLoaded();
}


//function animateLogo() {
//
//    var randomize = ['P4:SS:3N:G3:RS', "pA:S$:EN:Ge:Rs", "PA:$S:EN:g3:rS", "Pa:SS:3n:GE:r$"];
//
//    setInterval(function () {
//        var text = randomize[Math.floor(Math.random() * randomize.length)];
//        preloadLogo.html(text);
//    }, 100);
//
//}


function initMap() {
    mapboxgl.accessToken = "pk.eyJ1IjoibW96emlsbGF0aW9uIiwiYSI6ImNqcDNlaHNiMDA3N3gzcnFmaHh4bGtzNzQifQ.YTndeLngjj6SzGvw8XDOQw";
    map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mozzillation/cjp3f23cf0jhg2sqk90y2ndah",
        center: [9.193772, 45.467227],
        zoom: 12
    });

    map.on("style.load", function () {
        if (map.loaded) {
            setTimeout(load, 1000);
        }


    });
}





$(document).ready(function () {
    //    animateLogo();    

    initMap();
});
