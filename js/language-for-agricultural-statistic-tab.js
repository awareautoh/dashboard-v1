"use strict";
import * as base from './base.js';
base.default();
import * as load from './load.js'
load.default();

getLanguage();
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

function getLanguage() {
    let output = localStorage.getItem('language');
    (localStorage.getItem('language') === null) ? output = 'en' : false;
    let url = '../language/' + output + '.json';

    async function loadJSON (url) {
        const res = await fetch(url);
        return await res.json();
    }

    loadJSON(url).then(data => {
        return inputLang(data)
    });
}

//Language Input
function inputLang(language) {
    //Nav Menu
    document.getElementById('home-tab').innerText = language["nutrition-profiles"];
    document.getElementById('national-surveys-tab').innerText = language["national-surveys"];
    document.getElementById('nutrition-surveillance-tab').innerText = language["nutrition-surveillance"];
    document.getElementById('dhis-tab').innerText = language["dhis"];
    document.getElementById('agricultural-statistics-tab').innerText = language["agricultural-statistics"];
    document.getElementById('data-repository-link').innerText = language["data-repository-link"];
    document.getElementById('about-nipn-link').innerText = language["about-nipn-link"];
}