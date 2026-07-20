/*
    components.js
    Fetches shared header and footer partials and injects them into placeholder
    elements. Dispatches 'navReady' after the nav is in the DOM so that main.js
    can initialise dropotron and the mobile nav panel.

    Standard pages  : use <div id="site-header"></div>  → loads components/header.html
    index.html      : uses <div id="site-nav"></div>     → loads components/nav.html
                      (the hero section stays inline inside #header-wrapper)
    All pages       : use <div id="site-footer"></div>   → loads components/footer.html
*/
(function () {
    'use strict';

    function load(placeholderId, file, callback) {
        var el = document.getElementById(placeholderId);
        if (!el) {
            if (callback) callback();
            return;
        }
        fetch('components/' + file)
            .then(function (r) { return r.text(); })
            .then(function (html) {
                el.outerHTML = html;
                if (callback) callback();
            });
    }

    function dispatchNavReady() {
        document.dispatchEvent(new CustomEvent('navReady'));
    }

    // Standard pages have #site-header; index.html has #site-nav.
    if (document.getElementById('site-header')) {
        load('site-header', 'header.html', dispatchNavReady);
    } else if (document.getElementById('site-nav')) {
        load('site-nav', 'nav.html', dispatchNavReady);
    }

    load('site-footer', 'footer.html');
})();
