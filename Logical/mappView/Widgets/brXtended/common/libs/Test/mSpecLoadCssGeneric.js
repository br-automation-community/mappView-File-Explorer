define([
    'widgets/brXtended/common/libs/Test/UtilsStyles', 
    'widgets/brease/common/Test/CommonTestUtils'], 
function (UtilsStyles, CommonTestUtils) {

    'use strict';

    return {
        suite: function (cssFilesArray) {

            it('Loading CSS files', async function () {
                var fileLength = 0,
                    cssFilesMissing,
                    cssFilesLoaded;

                await new Promise(function (resolve) {
                    cssFilesMissing = [];
                    cssFilesLoaded = [];

                    function loadHandler(e) {
                        cssFilesLoaded.push(e.target.href);
                        if (cssFilesLoaded.length + cssFilesMissing.length === fileLength) { resolve(); }
                    }

                    function errorHandler(e) {
                        console.log('errorHandler:' + e.target.href);
                        cssFilesMissing.push(e.target.href);
                        if (cssFilesLoaded.length + cssFilesMissing.length === fileLength) { resolve(); }
                    }

                    fileLength = addCssFilesToDOM(UtilsStyles.prepareCssFileArrayElements(cssFilesArray), loadHandler, errorHandler);
                });
                if (cssFilesMissing.length > 0) {
                    console.warn('error loading css files:' + JSON.stringify(cssFilesMissing));
                }
                expect(cssFilesLoaded.length).withContext('nr of loaded css files').toEqual(fileLength);
                await CommonTestUtils.core.asyncAnimationFrame();
            });
        }
    };

    function addCssFilesToDOM(cssFilesArray, loadHandler, errorHandler) {
        // use reverse array to be able to splice elements
        // but not alter the order of added css files
        cssFilesArray = cssFilesArray.reverse(); 
        for (var i = cssFilesArray.length - 1; i >= 0; i -= 1) {

            if (!document.getElementById(cssFilesArray[i])) {
                $('<link id="' + UtilsStyles.prepareLinkId(cssFilesArray[i]) + '" href="./' + cssFilesArray[i] + '" rel="StyleSheet" type="text/css" />')
                    .on('error', errorHandler)
                    .on('load', loadHandler)
                    .appendTo(document.head);

            } else {
                console.warn('css file ' + cssFilesArray[i] + ' already present. Loading skipped!');
                cssFilesArray.splice(i, 1);
            }
        }
        return cssFilesArray.length;
    }
});
