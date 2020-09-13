'use strict';

var Resource = require('dw/web/Resource');
var HashMap = require('dw/util/HashMap');
var PageMgr = require('dw/experience/PageMgr');

module.exports.init = function(editor) {
    // Default values for L10N properties
    var l10nDefaults = {
        buttonBreakout: 'Select',
        titleBreakout: 'Breakout Content Title',
        placeholder: 'Select your favorite unicorn',
        description: 'Unicorns are magical creatures you want for every component. Select the one of your choice now!',
        group1: 'Unicorns from JSON Config',
        group2: 'Unicorns from init()'
    };

    // Add some localizations
    var localization = Object.keys(l10nDefaults).reduce(function (acc, key) {
        acc.put(key, Resource.msg(key, 'experience.editors.com.sfcc.magical', l10nDefaults[key]));
        return acc;
    }, new HashMap());
    editor.configuration.put('localization', localization);

    // Pass through property `options.config` from the `attribute_definition` to be used in a breakout editor
    var options = new HashMap();
    options.put('config', editor.configuration.options.config);

    // Create a configuration for a custom editor to be displayed in a modal breakout dialog (breakout editor)
    var breakoutEditorConfig = new HashMap();
    breakoutEditorConfig.put('localization', localization);
    breakoutEditorConfig.put('options', options);

    // Add a dependency to the configured breakout editor
    var breakoutEditor = PageMgr.getCustomEditor('com.sfcc.magicalBreakout', breakoutEditorConfig);
    editor.dependencies.put('magical_breakout', breakoutEditor);
};