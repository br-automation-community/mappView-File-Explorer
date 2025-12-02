'use strict';
define([
    'brTest',
    'brease',
    'widgets/brXtended/common/libs/ChildHandling',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function ({ enum: { Enum }, TestUtils }, { controller: { uiController } }, ChildHandling) {

    return {
        suite: function (specParam) {

            m.describe(specParam.setChildClasses.run, '\u00BBsetChildClasses - function\u00AB', function () {
                    
                m.it(true, '\u00BBCheck if the Module-Function setChildClasses is adding a class to the given Elements\u00AB', function () {
                    var widgetIDs = ['Test1', 'Test2', 'Test3'],
                        classes = 'Class1';

                    return new Promise(function (resolve) {
                        spyOn($.fn, 'addClass').and.callFake(function () {
                            if ($.fn.addClass.calls.count() === widgetIDs.length) {
                                resolve();
                            }
                        });
                        ChildHandling.setChildClasses(widgetIDs, classes);
                    })
                        .then(function () {
                            expect($.fn.addClass).toHaveBeenCalledWith(classes);
                        });
                });

                m.it(true, '\u00BBCheck if the Module-Function setChildClasses is not adding any Class if no Element is given\u00AB', async function () {
                    var widgetIDs = [],
                        classes = 'Class1';

                    spyOn($.fn, 'addClass');
                    ChildHandling.setChildClasses(widgetIDs, classes);

                    await TestUtils.promisedTimeout(5);

                    expect($.fn.addClass).not.toHaveBeenCalled();
                });
            });

            m.describe(specParam.removeChildClasses.run, '\u00BBremoveChildClasses - function\u00AB', function () {

                m.it(true, '\u00BBCheck if the Module-Function removeChildClasses is adding a class to the given Elements\u00AB', function () {
                    var widgetIDs = ['Test1', 'Test2', 'Test3'],
                        classes = 'Class1';

                    return new Promise(function (resolve) {
                        spyOn($.fn, 'removeClass').and.callFake(function () {
                            if ($.fn.removeClass.calls.count() === widgetIDs.length) {
                                resolve();
                            }
                        });
                        ChildHandling.removeChildClasses(widgetIDs, classes);
                    })
                        .then(function () {
                            expect($.fn.removeClass).toHaveBeenCalledWith(classes);
                        });
                });

                m.it(true, '\u00BBCheck if the Module-Function removeChildClasses is not adding any Class if no Element is given\u00AB', async function () {
                    var widgetIDs = [],
                        classes = 'Class1';

                    spyOn($.fn, 'removeClass');
                    ChildHandling.removeChildClasses(widgetIDs, classes);

                    await TestUtils.promisedTimeout(5);

                    expect($.fn.removeClass).not.toHaveBeenCalled();
                });

            });

            m.describe(specParam.setSameParameterForAllChilds.run, '\u00BBsetSameParameterForAllChilds - function\u00AB', function () {

                m.it(true, '\u00BBCheck if the Module-function setSameParameterForAllChilds is calling the function for each Instance and parameter with uiController.callWidget(id, fnName, parameter)\u00AB', function () {
                    var widgetIDs = ['Test1', 'Test2', 'Test3'],
                        fnName = 'TestFn',
                        parameter = 'TestParam';
                    let spy;
                    return new Promise(function (resolve) {
                        spy = spyOn(uiController, 'callWidget').and.callFake(function () {
                            if (spy.calls.count() === widgetIDs.length) {
                                resolve();
                            }
                        });
                        ChildHandling.setSameParameterForAllChilds(widgetIDs, fnName, parameter);
                    })
                        .then(function () {
                            expect(spy.calls.argsFor(0)).toEqual(['Test1', 'TestFn', 'TestParam']);
                            expect(spy.calls.argsFor(1)).toEqual(['Test2', 'TestFn', 'TestParam']);
                            expect(spy.calls.argsFor(2)).toEqual(['Test3', 'TestFn', 'TestParam']);
                        });
                });

                m.it(true, '\u00BBCheck if the Module-function setSameParameterForAllChilds is not calling the function when no instance is given to uiController.callWidget(id, fnName, parameter)\u00AB', async function () {
                    var widgetIDs = [],
                        fnName = 'TestFn',
                        parameter = 'TestParam';

                    let spy = spyOn(uiController, 'callWidget');

                    ChildHandling.setSameParameterForAllChilds(widgetIDs, fnName, parameter);
                    
                    await TestUtils.promisedTimeout(5);
                    
                    expect(spy).not.toHaveBeenCalled();
                });

            });

            m.describe(specParam.setParameterForChild.run, '\u00BBsetParameterForChild - function\u00AB', function () {

                m.it(true, '\u00BBCheck if the Module-function setParameterForChild is calling the function for the Instance and parameter with uiController.callWidget(id, fnName, parameter)\u00AB', function () {
                    var widgetID = 'Test1',
                        fnName = 'TestFn',
                        parameter = 'TestParam';
                    let spy;
                    return new Promise(function (resolve) {
                        spy = spyOn(uiController, 'callWidget').and.callFake(resolve);
                        ChildHandling.setParameterForChild(widgetID, fnName, parameter);
                    })
                        .then(function () {
                            expect(spy.calls.argsFor(0)).toEqual(['Test1', 'TestFn', 'TestParam']);
                        });
                });

            });

            m.describe(specParam.getChildren.run, '\u00BBgetChildren - function\u00AB', function () {

                beforeEach(function () {
                    TestUtils.addSpyStrategy('callThroughAndThen');
                });

                m.it(true, '\u00BBThe Function should return an Object with empty members id & instance\u00AB', function () {
                    var container = $('<div><p></p></div>'),
                        getValue;
                    return new Promise(function (resolve) {
                        TestUtils.spyOnCallThroughAndThen(container, 'find', resolve);
                        getValue = ChildHandling.getChildren(container);
                    })
                        .then(function () {
                            expect(getValue).toEqual({ id: [] });
                        });
                });

                m.it(true, '\u00BBThe Function should return an Object with members id & instance (1 Child)\u00AB', function () {
                    var container = $('<div><div id="Test" data-brease-widget="widgets/brease/Test"></div></div>'),
                        getValue;

                    return new Promise(function (resolve) {
                        TestUtils.spyOnCallThroughAndThen(container, 'find', resolve);
                        getValue = ChildHandling.getChildren(container);
                    })
                        .then(function () {
                            expect(getValue).toEqual({ id: ['Test'] });
                        });
                });

                m.it(true, '\u00BBThe Function should return an Object with members id & instance (2 Childs)\u00AB', function () {
                    var container = $('<div><div id="Test" data-brease-widget="widgets/brease/Test"></div><div id="Test1" data-brease-widget="widgets/brease/Test"></div>'),
                        getValue;

                    return new Promise(function (resolve) {
                        TestUtils.spyOnCallThroughAndThen(container, 'find', resolve);
                        getValue = ChildHandling.getChildren(container);
                    })
                        .then(function () {
                            expect(getValue).toEqual({ id: ['Test', 'Test1'] });
                        });
                });
            });

            m.describe(specParam.childrenInitDone.run, '\u00BBchildrenInitDone - function\u00AB', function () {

                m.it(true, 'The Function should not find any Children and should not call the callback Function', function () {
                    var widgetIDs = [];
                    var obj = {
                        testFn: function () { return 1; }
                    };
                        
                    spyOn(obj, 'testFn').and.returnValue();

                    ChildHandling.childrenInitDone(widgetIDs, function () { obj.testFn(); });

                    expect(obj.testFn.calls.count()).toEqual(0);
                });

                m.it(true, 'The Function should all Children which are not initialized but should call the callback Function since they get NOT INITIALIZED', function () {
                    var widgetIDs = ['Test1', 'Test2'];
                    var obj = {
                        testFn: function () { },
                        testWidget: $('<div></div>')
                    };
                        
                    return new Promise(function (resolve) {
                        spyOn($.fn, 'init').and.returnValue(obj.testWidget);
                        spyOn(obj, 'testFn');
                        let spy = spyOn(uiController, 'getWidgetState').and.callFake(function () {
                            window.setTimeout(function (callsCount) {
                                if (callsCount === 2) { resolve(); }
                            }, 0, spy.calls.count());
                            return Enum.WidgetState.IN_PARSE_QUEUE;
                        });
                        ChildHandling.childrenInitDone(widgetIDs, obj.testFn);
                    })
                        .then(function () {
                            expect(obj.testFn.calls.count()).toEqual(0);
                        });
                });

                m.it(true, 'The Function should all Children which are initialized but should call the callback Function since they are already INITIALIZED', function () {
                    var widgetIDs = ['Test1', 'Test2'];
                    var obj = {
                        testFn: function () { },
                        testWidget: $('<div></div>')[0]
                    };

                    return new Promise(function (resolve) {
                        spyOn(obj, 'testFn');
                        let spy = spyOn(uiController, 'getWidgetState').and.callFake(function () {
                            window.setTimeout(function (callsCount) {
                                if (callsCount === 4) { resolve(); }
                            }, 0, spy.calls.count());
                            return Enum.WidgetState.INITIALIZED;
                        });
                        ChildHandling.childrenInitDone(widgetIDs, obj.testFn);
                    })
                        .then(function () {
                            expect(obj.testFn.calls.count()).toEqual(1);
                        });
                });
            });
        }
    };
});
