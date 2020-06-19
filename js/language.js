"use strict";

let language;
function getLanguage() {
    (localStorage.getItem('language') === null) ? setLanguage('en') : false;
    $.ajax({
        url:  'language/' +  localStorage.getItem('language') + '.json',
        dataType: 'json', async: false,
        success: function (lang) { language = lang }
    });
    //Revise
    $(document).ready(function(){
        //Nav Menu
        $('#home-tab').text(language["nutritionStatus"]);
        $('#national-profile-tab').text(language["national-profile"]);
        $('#sentinelSurvey-tab').text(language["sentinelSurvey"]);
        $('#dhis-tab').text(language["dhis"]);
        $('#agricultureCensus-tab').text(language["agricultureCensus"]);
        $('#data-repository-link').text(language["data-repository-link"]);
        $('#about-nipn-link').text(language["about-nipn-link"]);

        //*********Overview of Nutrition Row
        $('#overviewOfNutrition').text(language["overviewOfNutrition"]);
        $('#textCardIcon1').text(language["textCardIcon1"]);
        $('#textCardIcon2').text(language["textCardIcon2"]);
        $('#textCardIcon3').text(language["textCardIcon3"]);
        $('#textCardIcon4').text(language["textCardIcon4"]);

        //***
        //Section 1: Current Nutrition Status
        //***
        $('#textSec1Header').text(language["textSec1Header"]);
        //Child Malnutrition
        $('#textTitleChildMalnutrition').text(language["textTitleChildMalnutrition"]);
        $('#wastingAndOverweightChartPNGDownload').text(language["wastingAndOverweightChartPNGDownload"]);
        $('#wastingAndOverweightChartDataDownload').text(language["wastingAndOverweightChartDataDownload"]);
        $('#overviewWastingButton').text(language["overviewWastingButton"]);
        $('#overviewOverweightButton').text(language["overviewOverweightButton"]);
        $('#overviewResetButton').text(language["overviewResetButton"]);
        //Women Undernutrition
        $('#textHeaderWomenUndernutrition').text(language["textHeaderWomenUndernutrition"]);
        //Prevalence of Overweight and Obesity
        $('#textHeaderPrevalenceOfOverweightAndObesity').text(language["textHeaderPrevalenceOfOverweightAndObesity"]);

        //***
        //Section 2: Immediate determinant of Undernutrition
        //***
        $('#textSec2Header').text(language["textSec2Header"]);
        //Infant and Young Child Feeding Practices
        $('#infantAndYoungChildFeedingPractices').text(language["infantAndYoungChildFeedingPractices"]);
    });
}
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}
getLanguage();