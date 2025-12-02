'use strict';
define([
    'brTest',
    'widgets/brXtended/common/libs/Test/mSpecInitGeneric',
    'widgets/brXtended/common/libs/Test/mSpecDisposeGeneric',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'], 
function ({ events: { BreaseEvent }, TestUtils, callWidget, services: { runtimeService }, controller: { bindingController } }, 
    mSpecInitGeneric, mSpecDisposeGeneric) {
 
    return {
        suite: function (className, options) {
            var eventType = {
                    click: 'Click',
                    disabledClick: 'DisabledClick'
                },
                widgetNamespace = 'brease',
                testContainerName = className + '_ClickTest',
                runWidgetInstantiation = true,
                widgetIds,
                isClickEventExpected,
                isDisabledClickEventExpected,
                clickTargetSelector,
                $clickTarget,
                _spyObj = {
                    typeCaller: function () { },
                    originCaller: function () { },
                    permissionCaller: function () { }
                },
                _events = {},
                bindingControllerStub = {
                    addEventSubscription: function (refId, eventName) {
                        if (_events[refId] === undefined) {
                            _events[refId] = {};
                        }
                        _events[refId][eventName] = true;
                    },
                    removeEventSubscription: function (refId, eventName) {
                        if (_events[refId] !== undefined) {
                            delete _events[refId][eventName];
                            
                        }
                        
                    }
                },
                disabledClickTests = {
                    enable: {
                        description: 'enable=false',
                        setupFunction: function () {
                            callWidget(widgetIds[0], 'setEnable', false);

                            expect(callWidget(widgetIds[0], 'getEnable')).toBeFalsy();
                            expect(callWidget(widgetIds[0], 'isEnabled')).toBeFalsy();
                        },
                        teardownFunction: function () {
                            callWidget(widgetIds[0], 'setEnable', true);

                            expect(callWidget(widgetIds[0], 'getEnable')).toBeTruthy();
                            expect(callWidget(widgetIds[0], 'isEnabled')).toBeTruthy();
                        }
                    },
                    permissionOperate: {
                        description: 'permission-operate=false',
                        setupFunction: function () {
                            var wut = callWidget(widgetIds[0], 'widget');

                            wut.settings.permissionOperate = ['NotInRoles'];
                            wut._updatePermissions();
                            wut._internalEnable();

                            expect(wut.settings.permissions.operate).toBeFalsy();
                            expect(wut.isEnabled()).toBeFalsy();
                        },
                        teardownFunction: function () {
                            var wut = callWidget(widgetIds[0], 'widget');

                            wut.settings.permissionOperate = ['Everyone'];
                            wut._updatePermissions();
                            wut._internalEnable();

                            expect(wut.settings.permissions.operate).toBeTruthy();
                            expect(wut.isEnabled()).toBeTruthy();
                        }
                    },
                    editable: {
                        description: 'editable=false',
                        setupFunction: function () {
                            var wut = callWidget(widgetIds[0], 'widget');

                            wut.settings.editable = false;
                            wut._internalEnable();

                            expect(wut.isEnabled()).toBeFalsy();
                        },
                        teardownFunction: function () {
                            var wut = callWidget(widgetIds[0], 'widget');

                            wut.settings.editable = true;
                            wut._internalEnable();

                            expect(wut.isEnabled()).toBeTruthy();
                        }
                    }
                };
            var widgets;
            if (options) {

                widgetNamespace = options.widgetNamespace || 'brease';

                isClickEventExpected = (options.hasOwnProperty('isClickEventExpected')) ? options.isClickEventExpected : true;

                isDisabledClickEventExpected = (options.hasOwnProperty('isDisabledClickEventExpected')) ? options.isDisabledClickEventExpected : true;

                if (options.widgetIds) {
                    if (Array.isArray(options.widgetIds)) {
                        widgetIds = [options.widgetIds[0]];
                    } else {
                        console.error('test click event ABORTED - expected options.widgetIds to be an array');
                        expect(Array.isArray(options.widgetIds)).toBeTruthy();
                        return;
                    }
                    runWidgetInstantiation = false;
                } else {
                    widgets = [{
                        className: 'widgets.' + widgetNamespace + '.' + className,
                        id: className + '_ClickTestInstance'
                    }];
                    widgetIds = widgets.map(function (item) {
                        return item.id;
                    });
                }

                clickTargetSelector = options.clickTargetSelector || '#' + widgetIds[0];
            } else {

                widgets = [{
                    className: 'widgets.' + widgetNamespace + '.' + className,
                    id: className + '_ClickTestInstance'
                }];
                widgetIds = widgets.map(function (item) {
                    return item.id;
                });
                clickTargetSelector = '#' + widgetIds[0];
                isClickEventExpected = true;
                isDisabledClickEventExpected = true;
            }

            describe('widget events', function () {
                
                var eventDetail,
                    listener = {
                        disabledClickHandler: function (e) {
                            eventDetail = e.detail;
                        }
                    };
                beforeAll(function () {
                    runtimeService.spyOn('sendEvent').and.callFake(function (e) {
                        var eventType = e.event,
                            origin = e.eventArgs['origin'],
                            permission = e.eventArgs['hasPermission'];
                
                        _spyObj.typeCaller(eventType);
                        _spyObj.originCaller(origin);
                        if (e.eventArgs.hasOwnProperty('hasPermission')) {
                            _spyObj.permissionCaller(permission);
                        }
                    });
                    // eslint-disable-next-line no-unused-vars
                    bindingController.spyOn('eventIsSubscribed').and.callFake(function (eventType, eventName, refId) {
                        return _events[refId] !== undefined && _events[refId][eventName] !== undefined;
                    });
                }); 
                describe('Setup Test', function () {

                    m.describe(runWidgetInstantiation, 'Create ClickOrigin Widget Instance', mSpecInitGeneric.suite, [widgets, widgetIds, testContainerName]);

                    m.describe(true, 'Set click target for Click event test', function () {

                        m.it(true, '- click target for Click event test set', function () {
                            $clickTarget = $(clickTargetSelector);

                            expect($clickTarget.length).not.toBe(0);
                        });
                    });
                });

                describe('Widget DISABLED', function () {

                    beforeEach(function () {
                        var wut = callWidget(widgetIds[0], 'widget');

                        for (var event in eventType) {
                            if (wut.events.hasOwnProperty(eventType[event])) {
                                delete wut.events[eventType[event]];
                            }
                        }

                        bindingControllerStub.addEventSubscription(widgetIds[0], eventType.click);
                        bindingControllerStub.addEventSubscription(widgetIds[0], eventType.disabledClick);
                    });

                    afterEach(function () {
                        var wut = callWidget(widgetIds[0], 'widget');

                        for (var event in eventType) {
                            if (wut.events.hasOwnProperty(eventType[event])) {
                                delete wut.events[eventType[event]];
                            }
                        }
                        bindingControllerStub.removeEventSubscription(widgetIds[0], eventType.click);
                        bindingControllerStub.removeEventSubscription(widgetIds[0], eventType.disabledClick);
                    });

                    for (var testCase in disabledClickTests) {

                        (function (testCase) {
                            m.describe(true, 'widget event-' + disabledClickTests[testCase].description, function () {
                                m.it(isDisabledClickEventExpected, '- Click event on ' + widgetIds[0] + ' when ' + disabledClickTests[testCase].description + ' should ' +
                                    (isDisabledClickEventExpected ? '' : 'NOT') + ' trigger event ' + eventType.disabledClick, function () {

                                    disabledClickTests[testCase].setupFunction();

                                    spyOn(_spyObj, 'typeCaller');

                                    $clickTarget.trigger('click');

                                    expect(_spyObj.typeCaller).not.toHaveBeenCalledWith(eventType.click);
                                    expect(_spyObj.typeCaller).toHaveBeenCalledWith(eventType.disabledClick);

                                    disabledClickTests[testCase].teardownFunction();
                                });

                                m.it(isDisabledClickEventExpected, '- Click event on ' + widgetIds[0] + ' when ' + disabledClickTests[testCase].description + ' should ' +
                                    (isDisabledClickEventExpected ? '' : 'NOT') + ' trigger event ' + eventType.disabledClick + ' with origin and permission', function () {

                                    disabledClickTests[testCase].setupFunction();

                                    var wut = callWidget(widgetIds[0], 'widget'),
                                        hasPermission = wut.settings.editable && wut.settings.permissions.operate;

                                    spyOn(_spyObj, 'originCaller');
                                    spyOn(_spyObj, 'permissionCaller');

                                    $clickTarget.trigger('click');

                                    expect(_spyObj.originCaller).toHaveBeenCalledWith(widgetIds[0]);
                                    expect(_spyObj.permissionCaller).toHaveBeenCalledWith(hasPermission);

                                    disabledClickTests[testCase].teardownFunction();
                                });

                                m.it(isDisabledClickEventExpected, '- Click event on ' + widgetIds[0] + ' when ' + disabledClickTests[testCase].description + ' should dispatch DOM event ' + BreaseEvent.DISABLED_CLICK, function () {

                                    TestUtils.addSpyStrategy('callThroughAndThen');

                                    var expectedEventDetail;

                                    return new Promise(function (resolve) {
                                        disabledClickTests[testCase].setupFunction();

                                        var wut = callWidget(widgetIds[0], 'widget'),
                                            hPos = 1, vPos = 2;

                                        expectedEventDetail = {
                                            contentId: wut.settings.parentContentId,
                                            hasPermission: wut.settings.editable && wut.settings.permissions.operate,
                                            origin: widgetIds[0],
                                            widgetId: widgetIds[0],
                                            horizontalPos: hPos + 'px',
                                            verticalPos: vPos + 'px'
                                        };
                                        TestUtils.spyOnCallThroughAndThen(listener, 'disabledClickHandler', resolve);

                                        document.body.addEventListener(BreaseEvent.DISABLED_CLICK, listener.disabledClickHandler);

                                        var e = new jQuery.Event('click');
                                        e.clientX = hPos;
                                        e.clientY = vPos;
                                        $clickTarget.trigger(e);
                                    })
                                        .then(function () {
                                        
                                            expect(eventDetail).toEqual(expectedEventDetail);

                                            document.body.removeEventListener(BreaseEvent.DISABLED_CLICK, listener.disabledClickHandler);
                                            disabledClickTests[testCase].teardownFunction();
                                        });
                                });

                                m.it(!isDisabledClickEventExpected, '- click event when ' + disabledClickTests[testCase].description + ' should NOT call _clickHandler', function () {

                                    var wut = callWidget(widgetIds[0], 'widget');

                                    spyOn(wut, '_clickHandler');

                                    $clickTarget.trigger('click');

                                    expect(wut._clickHandler).not.toHaveBeenCalled();
                                });
                            });
                        })(testCase);
                    }
                });

                describe('Widget ENABLED - should ' + ((isClickEventExpected) ? '' : 'NOT ') + 'trigger', function () {

                    beforeEach(function () {
                        var wut = callWidget(widgetIds[0], 'widget');

                        for (var event in eventType) {
                            if (wut.events.hasOwnProperty(eventType[event])) {
                                delete wut.events[eventType[event]];
                            }
                        }
                    });

                    m.describe(isClickEventExpected, 'widget event correctly', function () {

                        m.it(true, '- Click event on ' + widgetIds[0], function () {
                            var eventTypeClick = eventType.click,
                                eventTypeDisabledClick = eventType.disabledClick,
                                wut = callWidget(widgetIds[0], 'widget');

                            bindingControllerStub.addEventSubscription(widgetIds[0], eventTypeClick);
                            bindingControllerStub.addEventSubscription(widgetIds[0], eventTypeDisabledClick);
                            spyOn(_spyObj, 'typeCaller');

                            expect(wut.isEnabled()).toBeTruthy();

                            $clickTarget.trigger('click');
                            
                            expect(_spyObj.typeCaller).toHaveBeenCalledWith(eventTypeClick);
                            expect(_spyObj.typeCaller).not.toHaveBeenCalledWith(eventTypeDisabledClick);
                        });
                    });

                    m.describe(isClickEventExpected, 'widget event origin correctly', function () {

                        it("- origin for 'Click' event on " + widgetIds[0], function () {
                            var eventTypeClick = eventType.click,
                                eventTypeDisabledClick = eventType.disabledClick,
                                wut = callWidget(widgetIds[0], 'widget');

                            bindingControllerStub.addEventSubscription(widgetIds[0], eventTypeClick);
                            bindingControllerStub.addEventSubscription(widgetIds[0], eventTypeDisabledClick);
                            spyOn(_spyObj, 'originCaller');

                            expect(wut.isEnabled()).toBeTruthy();

                            $clickTarget.trigger('click');

                            expect(_spyObj.originCaller).toHaveBeenCalledWith(widgetIds[0]);
                            TestUtils.closeAllOverlays(true);
                        });
                    });

                    m.it(!isDisabledClickEventExpected, '- click event should NOT call _clickHandler', function () {

                        var wut = callWidget(widgetIds[0], 'widget');

                        spyOn(wut, '_clickHandler');

                        $clickTarget.trigger('click');

                        expect(wut._clickHandler).not.toHaveBeenCalled();
                    });
                });

                describe('\u00BBTeardown Test\u00AB', function () {
                    m.describe(runWidgetInstantiation, 'Removing ClickOrigin Widget Instance', mSpecDisposeGeneric.suite, [widgets, testContainerName]);
                });
            });
        }
    };
});
