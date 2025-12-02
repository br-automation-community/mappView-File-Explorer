define(function () {
    
    'use strict';

    var UtilsStyles = {

        prepareCssFileArrayElements: function (cssFiles) {

            if (!Array.isArray(cssFiles)) {
                cssFiles = [cssFiles];
            }

            return cssFiles.map(function (cssFile) {
                if (/^(css!)/.test(cssFile)) { console.warn('Attention: Use of deprecated \'css!\' syntax: ' + cssFile); }
                return cssFile.replace('css!', '');
            });
        },

        prepareLinkId: function (id) {
            return id.replace(/\/|\./g, '_');
        }
    };
    return UtilsStyles; 
});
