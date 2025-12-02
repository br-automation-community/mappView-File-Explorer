'use strict';
define([
    'brTest'
], function ({
    appView,
    callWidget,
    config: breaseConfig,
    core: { Utils },
    events: { BreaseEvent },
    TestUtils
}) {

    return {
        suite: function (widgets, widgetIds, className, { initialDrawCount = 2, fnBeforeAll, fnAfterAll, size } = {}) {

            let widgetReadyCallback;
            let contentId;
            let target;
            let drawEvents = [];
            let rendererEvents = [];
                
            if (typeof fnBeforeAll === 'function') {
                beforeAll(fnBeforeAll);
            }
    
            if (typeof fnAfterAll === 'function') {
                afterAll(fnAfterAll);
            }
            it(`widgets should dispatch a '${BreaseEvent.WIDGET_READY}'-event after they are instantiated`, async function () {
                    
                widgetReadyCallback = jasmine.createSpy('widgetReadyCallback');
                contentId = `${className}_container`;
                target = $(`#${contentId}`)[0];
                if (!target) {
                    target = $(`<div id="${contentId}" style="height:${size?.height ? size.height : 'auto'};${size?.width ? 'width:' + size.width + ';' : ''};" />`).appendTo(appView)[0];
                }
                
                target.addEventListener(BreaseEvent.WIDGET_READY, function (e) {
                    if (breaseConfig.editMode) {
                        let parentWidgetElem = Utils.closestWidgetElem(e.target.parentNode);
                        // attention: this will only work if TableWidget is created before its childwidgets, like in the Content Editor
                        if (Utils.hasClass(parentWidgetElem, 'breaseTableWidget')) {
                            window.setTimeout(function () {
                                parentWidgetElem.dispatchEvent(new CustomEvent('widget_added', { detail: { widgetId: e.target.id } }));
                            }, 0);
                        } 
                    }
                    if (widgetIds.indexOf(e.target.id) !== -1) {
                        widgetReadyCallback(); 
                    }
                }, true);
                
                let parsedIds = Array.from(widgetIds);
                let parsedListener = function (e) {
                    let index = parsedIds.indexOf(e.target.id);
                    if (index >= 0) {
                        parsedIds.splice(index, 1);
                        $('#' + e.target.id).one(BreaseEvent.WIDGET_INITIALIZED, function (e) {
                            let widget = callWidget(e.target.id, 'widget');
                            if (initialDrawCount > 0) {
                                drawEvents.push(TestUtils.promisedEvent(widget.eventDispatcher, 'draw', {
                                // eslint-disable-next-line no-unused-vars
                                    resolveOn: function (e, count) { return count === initialDrawCount; }
                                })); 
                            }
                        });
                    }
                    if (parsedIds.length === 0) {
                        target.removeEventListener(BreaseEvent.CONTENT_PARSED, parsedListener, true);
                    }
                };
                target.addEventListener(BreaseEvent.CONTENT_PARSED, parsedListener, true);

                let promisedEditorReadyEvents = [];
                if (breaseConfig.editMode) {
                    promisedEditorReadyEvents.push(TestUtils.promisedEvent(target, BreaseEvent.WIDGET_EDITOR_IF_READY, {
                        resolveOn: function (e) {
                            return widgetIds.includes(e.target.id);
                        }
                    }));
                }
                await TestUtils.createWidgetsV3(widgets, `${contentId}_target`, target, contentId, (size?.height || size?.width) ? size : undefined);
                
                if (breaseConfig.editMode) {
                    await Promise.all(promisedEditorReadyEvents);
                }
                await Promise.all(drawEvents);
                
                if (!breaseConfig.editMode) {
                    widgets.forEach(widgetConfig => {
                        let widget = callWidget(widgetConfig.id, 'widget');
                        if (!widget.renderer.initialized) {
                            rendererEvents.push(TestUtils.promisedEvent(widget.elem, 'RendererInitialized'));
                        }
                    });
                    await Promise.all(rendererEvents); 
                }
                expect(widgetReadyCallback).toHaveBeenCalledTimes(widgetIds.length);
            });
        }
    };
});
