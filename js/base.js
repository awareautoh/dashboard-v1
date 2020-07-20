'use strict';

const base = () => {
    //When the user scrolls down 50px from the top of the document, resize the header's font size
    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 250) {
            document.getElementById("navBarTop").style.fontSize = "1rem";
            document.getElementById("navBarTop").style["min-height"] = "auto";
            document.getElementById("navBarTop").classList.add("fixed-top");
        } else {
            document.getElementById("navBarTop").style.fontSize = "1rem";
            document.getElementById("navBarTop").style["min-height"] = "80px";
            document.getElementById("navBarTop").classList.remove("fixed-top");
        }
    }

    //Metadata activate area
    d3.selectAll('.metadataInfo')
        .on('click', () => {
            $('#metaData').modal('show');
        });

    //Activate Function generateResult
    document.getElementById("english-language-option").addEventListener("click", () => setLanguage('en'));
    document.getElementById("lao-language-option").addEventListener("click", () => setLanguage('lo'));
    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        location.reload();
    }
}

export {base as default}