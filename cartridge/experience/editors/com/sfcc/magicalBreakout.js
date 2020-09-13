'use strict';

var URLUtils = require('dw/web/URLUtils');

module.exports.init = function(editor) {
    var optionsConfig = editor.configuration.options.config;
    var optionsInit = [
        'Blythe',
        'Cadillac',
        'Calimerio',
        'Jasper',
        'Joshi',
        'Julius',
        'Mika',
        'Nightwind',
        'Rainbow',
        'Wynstar'
    ];

    // Add more unicorns programmatically
    editor.configuration.options.put('init', optionsInit);

    // Provide `baseUrl` to the static assets/content
    editor.configuration.put('baseUrl', URLUtils.staticURL('/experience/editors/com/sfcc/').https().toString());

    // Conditionally add a resource which is only required in case of a lot of unicorns
    /*if ((optionsConfig.length + optionsInit.length) > 20) {
        editor.resources.styles.push('/experience/editors/com/sfcc/magical_extreme.css');
    }*/
};