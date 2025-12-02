'use strict';
define(['brTest',
    'widgets/brXtended/common/libs/Test/TestUtils'], 
function ({ appElem, appView, settings: breaseSettings, controller: { uiController }, events: { BreaseEvent } }, 
    wfTestUtils) {
 
    return {
        // eslint-disable-next-line no-unused-vars
        suite: function (widgets, widgetIds, widgetName, options, specAdditions) {
            var contentId;

            if (options) {
                contentId = options.contentId || breaseSettings.globalContent;
            }

            if (specAdditions && specAdditions.beforeAll) {
                beforeAll(specAdditions.beforeAll);
            }

            if (specAdditions && specAdditions.afterAll) {
                afterAll(specAdditions.afterAll);
            }

            it("widgets should dispatch a '" + BreaseEvent.WIDGET_READY + "'-event after they are instantiated", function () {

                var callback, target,
                    widgetIdsWithChildren = wfTestUtils.getIdsFromWidgetConfiguration(widgets);

                return new Promise(function (resolve) {
                    callback = jasmine.createSpy();
                    function _widgetReadyHandler(e) {
                        if (widgetIdsWithChildren.indexOf(e.target.id) !== -1) {
                            callback();
                            if (callback.calls.count() === widgetIdsWithChildren.length) {
                                target.removeEventListener(BreaseEvent.WIDGET_READY, _widgetReadyHandler, true);
                                resolve();
                            }
                        }
                    }
                    appElem.style.height = 'auto';
                    appElem.style.position = 'relative';
                    if (options && options.setHeight) {
                        target = $(`<div id="${widgetName}_container" style="height:${options?.height ? options.height : '1500'}px;width:${options?.width ? options.width : '1500'}px;overflow:hidden;" />`).appendTo(appView)[0];
                    } else {
                        target = $(`<div id="${widgetName}_container" style="height:auto; overflow:hidden;" />`).appendTo(appView)[0];
                    }

                    target.addEventListener(BreaseEvent.WIDGET_READY, _widgetReadyHandler, true);
                    uiController.createWidgets(target, widgets.slice(0), true, contentId);
                })
                    .then(function () {
                        expect(callback).toHaveBeenCalledTimes(widgetIdsWithChildren.length);
                    });
            });
        }
    };
});
