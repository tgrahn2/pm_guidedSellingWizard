'use strict';

var URLUtils = require('dw/web/URLUtils');

module.exports.init = function(editor) {
    var optionsConfig = editor.configuration.options.config;
    var optionsInit = [
        /*{
            "pageNumber": 2,
            "pageTitle": "PG 2 TITLE HERE",
            "pageQuestion": "WHAT DOES YOU WANTS TO DOES"
        },
        {
            "pageNumber": 3,
            "pageTitle": "PG 3 TITLE HERE",
            "pageQuestion": "WHAT DOES YOU WANTS TO DOES"
        }*/
    ];

    // Add more unicorns programmatically
    editor.configuration.options.put('init', optionsInit);
    editor.configuration.options.put('pageNumber', 1);

    // Provide `baseUrl` to the static assets/content
    editor.configuration.put('baseUrl', URLUtils.staticURL('/experience/editors/com/sfcc/').https().toString());

    // Conditionally add a resource which is only required in case of a lot of unicorns
    /*if ((optionsConfig.length + optionsInit.length) > 20) {
        editor.resources.styles.push('/experience/editors/com/sfcc/finder_extreme.css');
    }*/
};