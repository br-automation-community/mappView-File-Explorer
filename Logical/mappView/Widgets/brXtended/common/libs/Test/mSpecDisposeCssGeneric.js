'use strict';
define(['brTest', 'widgets/brXtended/common/libs/Test/UtilsStyles'], function ({ TestUtils }, UtilsStyles) {

    return {
        func: async function (cssFiles) {
            const cssIncludeFilePaths = UtilsStyles.prepareCssFileArrayElements(cssFiles);

            removeStyleObject();

            cssIncludeFilePaths.forEach(function (cssItem) {
                document.getElementById(UtilsStyles.prepareLinkId(cssItem))?.remove();
            });
           
            await TestUtils.asyncAnimationFrame();
        }
    };

    function removeStyleObject() {
        document.head.querySelectorAll('style')
            .forEach(function (node) {
                if (!node.id || !node.id.includes('jasmine')) {
                    node.remove(); 
                }
            });
    }

});
