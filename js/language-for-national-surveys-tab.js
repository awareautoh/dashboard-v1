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
function inputLang (language) {
    //Nav Menu
    document.getElementById('home-tab').innerText = language["nutrition-profiles"];
    document.getElementById('national-surveys-tab').innerText = language["national-surveys"];
    document.getElementById('nutrition-surveillance-tab').innerText = language["nutrition-surveillance"];
    document.getElementById('dhis-tab').innerText = language["dhis"];
    document.getElementById('navbarDropdownMenuLinkSurvey').innerText = language["more-data"];
    document.getElementById('navbarDropdownMenuLinkNIPN').innerText = language["about-nipn"];
    document.getElementById('agricultural-statistics-tab').innerText = language["agricultural-statistics"];
    document.getElementById('data-repository-link').innerText = language["data-repository-link"];
    document.getElementById('about-nipn-link').innerText = language["about-nipn-link"];
    //***
    //Section 1: Current Nutrition Status
    //***
    document.getElementById('textSec1Header').innerText = language["textSec1Header"];
    //Child Malnutrition
    document.getElementById('textTitleChildMalnutrition').innerText = language["textTitleChildMalnutrition"];
    document.getElementById('wastingAndOverweightChartPNGDownload').innerText = language["wastingAndOverweightChartPNGDownload"];
    document.getElementById('wastingAndOverweightChartDataDownload').innerText = language["wastingAndOverweightChartDataDownload"];
    document.getElementById('overviewWastingButton').innerText = language["overviewWastingButton"];
    document.getElementById('overviewOverweightButton').innerText = language["overviewOverweightButton"];
    document.getElementById('overviewResetButton').innerText = language["overviewResetButton"];
    //Women UnderNutrition
    document.getElementById('textHeaderWomenUndernutrition').innerText = language["textHeaderWomenUndernutrition"];
    //Prevalence of Overweight and Obesity
    document.getElementById('textHeaderPrevalenceOfOverweightAndObesity').innerText = language["textHeaderPrevalenceOfOverweightAndObesity"];

    //***
    //Section 2: Immediate determinant of Undernutrition
    //***
    document.getElementById('textSec2Header').innerText = language["textSec2Header"];
    //Infant and Young Child Feeding Practices
}

