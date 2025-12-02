'use strict';
define([
    'brTest'
], function ({ appView, events: { BreaseEvent }, TestUtils }) {

    return {
        suite: function (widgets, widgetIds, className, cbInitChildren) {

            describe(' / widget instantiation', function () {
                var callback1, callback2, target, ready = [];
                callback1 = jasmine.createSpy();
                callback2 = jasmine.createSpy();
    
                var contentId = className + '_container';
                target = $('#' + contentId)[0];
                        
                if (!target) {
                    target = $('<div id="' + contentId + '" style="height:auto;" />').appendTo(appView)[0];
                }
    
                target.addEventListener(BreaseEvent.WIDGET_READY, function (e) {
                    if (widgetIds.indexOf(e.target.id) !== -1) {
                        callback1();
                    }
                }, true);
                
                target.addEventListener('TableReady', function (e) {
                    if (widgetIds.indexOf(e.target.id) !== -1) {
                        if (widgetIds.indexOf(e.target.id) !== -1) {
                            ready.push(e.target.id);
                        }
                        callback2();
                    }
                }, true);
    
                it("widgets should dispatch a '" + BreaseEvent.WIDGET_READY + "'-event after they are instantiated", async function () {
                    
                    await TestUtils.createWidgetsV3(widgets, contentId + '_target', target, contentId);
                    
                    cbInitChildren();

                    await TestUtils.pollAndWait(function () {
                        if (callback2.calls.count() >= widgets.length) {
                            console.debug('All tables ready');
                        }
                        return callback2.calls.count() >= widgets.length;
                    }, 10000);
    
                    console.debug('Total number of Tables ready:', callback2.calls.count(), 'out of', widgets.length, 'on target', contentId);
                });
            });
        }
    };
});
