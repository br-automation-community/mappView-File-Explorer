'use strict';
define([
    'brTest',
    'widgets/brXtended/common/libs/ShakeElements',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function ({ TestUtils }, ShakeElements) {

    return {
        suite: function (specParam) {

            m.describe(specParam.startShaking.run, '\u00BBstartShaking - function\u00AB', function () {
                    
                m.it(true, '\u00BBCheck if the Module-Function startShaking is adding a class to the given Elements\u00AB', function () {
                    var widgetIDs = ['Test1', 'Test2', 'Test3'];

                    return new Promise(function (resolve) {
                        spyOn($.fn, 'addClass').and.callFake(function () {
                            if ($.fn.addClass.calls.count() === 3) {
                                resolve();
                            }
                        });
                        ShakeElements.startShaking(widgetIDs);
                    })
                        .then(function () {
                            expect($.fn.addClass.calls.count()).toEqual(widgetIDs.length);
                            expect($.fn.addClass.calls.argsFor(0)).toEqual(['shakeAlternate']);
                            expect($.fn.addClass.calls.argsFor(1)).toEqual(['shake']);
                            expect($.fn.addClass.calls.argsFor(2)).toEqual(['shakeAlternate']);
                        });
                });

                m.it(true, '\u00BBCheck if the Module-Function startShaking is not adding any Class if no Element is given\u00AB', async function () {
                    var widgetIDs = [];

                    spyOn($.fn, 'addClass').and.returnValue();

                    ShakeElements.startShaking(widgetIDs);

                    await TestUtils.asyncAnimationFrame();

                    expect($.fn.addClass).not.toHaveBeenCalled();
                });
            });

            m.describe(specParam.stopShaking.run, '\u00BBstopShaking - function\u00AB', function () {

                m.it(true, '\u00BBCheck if the Module-Function stopShaking is removing the classes from the given Elements\u00AB', function () {
                    var widgetIDs = ['Test1', 'Test2', 'Test3'],
                        classes = 'shake shakeAlternate';

                    return new Promise(function (resolve) {
                        spyOn(ShakeElements.helpers.childHandling, 'removeChildClasses').and.callFake(function () {
                            if (ShakeElements.helpers.childHandling.removeChildClasses.calls.count() === 1) {
                                resolve();
                            }
                        });
                        ShakeElements.stopShaking(widgetIDs, classes);
                    })
                        .then(function () {
                            expect(ShakeElements.helpers.childHandling.removeChildClasses.calls.argsFor(0)).toEqual([widgetIDs, classes]);
                        });
                });

            });
        }
    };
});
