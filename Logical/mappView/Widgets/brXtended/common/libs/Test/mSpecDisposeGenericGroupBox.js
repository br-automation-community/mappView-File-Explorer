'use strict';
define(['brTest'], function ({ callWidget, controller: { uiController } }) {

    return {
        suite: function (widgets, className, configParam) {
    
            it('Dispose should make widget uncallable', function () {
                var container = document.getElementById(className + '_container');
                    
                if (container) {
                    uiController.walkWidgets(container, true, 'onBeforeDispose');
                    uiController.walkWidgets(container, true, 'dispose');
                        
                    var i;
                    for (i = 0; i < widgets.length; i += 1) {
                        if (uiController.getWidget(widgets[i].id)) {
                            callWidget(widgets[i].id, 'widget').dispose();
                        }
                        expect(document.getElementById(widgets[i].id)).toBeNull();
                        expect(uiController.getWidget(widgets[i].id)).toBeUndefined();
                    }
    
                    if (configParam === 'c') {
                        for (i = 0; i < widgets.length; i += 1) {
                            console.debug(className + '[id=' + widgets[i].id + '] successfully disposed');
                        }
                    }
    
                    container.parentElement.removeChild(container);
                }
            });
        }
    };
});
