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



    $('.place').hover(function () {
        var $this = $(this);
        var cord = $this.data("cord");
        map.flyTo({
            zoom: 15,
            center: cord
        });
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


    $.getJSON("./data/main.json", function (json) {

        console.log(json);

    })

    initMap();
});
