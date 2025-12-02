'use strict';
define([ 'brTest'], 
    function ({ TestUtils, services, controller: { uiController } }) {

        return {
            suite: function (widgets, className, configParam, specAdditions) {

                var widgetToDispose = className;

                if (specAdditions && specAdditions.beforeAll) {
                    beforeAll(specAdditions.beforeAll);
                }
    
                if (specAdditions && specAdditions.afterAll) {
                    afterAll(specAdditions.afterAll);
                }

                if (widgets.length > 0) {
                    it('Dispose should make widget uncallable', function () {

                        var container = document.getElementById(className + '_container');
                        if (container) {
                            uiController.walkWidgets(container, true, 'onBeforeDispose');
                            uiController.walkWidgets(container, true, 'dispose');
                            for (let i = 0; i < widgets.length; i += 1) {
                                expect(document.getElementById(widgets[i].id)).toBeNull();
                                expect(uiController.getWidget(widgets[i].id)).toBeUndefined();
                            }
                            if (configParam === 'c') {
                                for (let i = 0; i < widgets.length; i += 1) {
                                    console.debug(className + '[id=' + widgets[i].id + '] successfully disposed');
                                }
                            }
                            container.parentElement.removeChild(container);
                        }
                        expect(document.getElementById(className + '_container')).toBeNull();
                    });
                }

                it('Default language should be "de"', async function () {
                    let current = services.language.getCurrentLanguage();
                    if (current !== 'de') {
                        console.warn(`Dispose widget: ${widgetToDispose} - current language "${current}" different from default one "de"!! Please correct your teardown functions`);
                        await TestUtils.switchLanguage('de');
                    } 
                    expect(services.language.getCurrentLanguage()).toEqual('de');
                });
            }
        };
    });
