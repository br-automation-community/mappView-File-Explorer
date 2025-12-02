define(['widgets/brXtended/common/libs/Test/mSpecInitGeneric',
    'widgets/brXtended/common/libs/Test/mSpecDisposeGeneric',
    'widgets/brXtended/common/libs/Test/CustomMatchers',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'], 
function (mSpecInitGeneric, mSpecDisposeGeneric, CustomMatchers) {

    'use strict';

    return {
        suite: function (className, options) {
            var runWidgetInstantiation = true,
                testContainerName = className + '_borderBoxTest',
                widgetNamespace = 'brease',
                widgetIds, widgets,
                targetDomElementSelector;

            if (options) {

                widgetNamespace = options.widgetNamespace || 'brease';

                if (options.widgetIds) {
                    if (Array.isArray(options.widgetIds)) {
                        widgetIds = [options.widgetIds[0]];
                    } else {
                        console.error('boderBox test ABORTED: expected options.widgetIds to be an array');
                        expect(Array.isArray(options.widgetIds)).toBeTruthy();
                        return;
                    }
                    runWidgetInstantiation = false;
                } else {
                    widgets = [{
                        className: 'widgets.' + widgetNamespace + '.' + className,
                        id: className + '_BorderBoxTestInstance'
                    }];
                    widgetIds = widgets.map(function (item) {
                        return item.id;
                    });
                }

                if (options.targetDomElementSelector) {
                    targetDomElementSelector = options.targetDomElementSelector;
                }

            } else {

                widgets = [{
                    className: 'widgets.' + widgetNamespace + '.' + className,
                    id: className + '_BorderBoxTestInstance'
                }];
                widgetIds = widgets.map(function (item) {
                    return item.id;
                });
            }

            m.describe(true, 'BorderBox test setup', function () {

                m.describe(runWidgetInstantiation, 'Create borderBox Widget instance', mSpecInitGeneric.suite, [widgets, widgetIds, testContainerName]);

            });

            m.describe(true, 'Increase border width and padding of the target DOM element', function () {

                beforeEach(function () {
                    CustomMatchers.addMatchers(this, ['toBeHtmlOrSvgElement']);
                });

                m.it(true, 'increasing the border width and padding of the DOM element under test should not change the size of the DOM element itself', function () {

                    var checkSVGHTMLElement = /(SVG|HTML)\w*Element/,
                        targetDomElement,
                        sides = ['Top', 'Left', 'Bottom', 'Right'],
                        oldTargetDomElementHeight,
                        topBottomIncrement,
                        oldTargetDomElementWidth,
                        leftRightIncrement,
                        increments = Array(4),
                        oldTargetDomElementBorderWidths = [],
                        oldTargetDomElementPaddingWidths = [];

                    targetDomElement = $(targetDomElementSelector)[0] || document.getElementById(widgetIds[0]);

                    if (checkSVGHTMLElement.test(targetDomElement.constructor.name)) {

                        var targetDomElementStyle = window.getComputedStyle(targetDomElement);

                        oldTargetDomElementHeight = targetDomElement.getBoundingClientRect().height;
                        oldTargetDomElementWidth = targetDomElement.getBoundingClientRect().width;

                        // increments of 5% of DOM element size
                        topBottomIncrement = oldTargetDomElementHeight * 0.05;
                        leftRightIncrement = oldTargetDomElementWidth * 0.05;
                        increments = [topBottomIncrement, leftRightIncrement, topBottomIncrement, leftRightIncrement];

                        // increase border width
                        sides.forEach(function (side, index) {
                            var borderWidthSide = 'border' + side + 'Width',
                                value = parseInt(targetDomElementStyle[borderWidthSide], 10);

                            oldTargetDomElementBorderWidths[borderWidthSide] = value + 'px';
                            targetDomElement.style[borderWidthSide] = (value + increments[index]) + 'px';
                        });

                        // increase padding
                        sides.forEach(function (side, index) {
                            var paddingWidthSide = 'padding' + side,
                                value = parseInt(targetDomElementStyle[paddingWidthSide], 10);

                            oldTargetDomElementPaddingWidths[paddingWidthSide] = value + 'px';
                            targetDomElement.style[paddingWidthSide] = (value + increments[index]) + 'px';
                        });

                        targetDomElementStyle = window.getComputedStyle(targetDomElement);

                        // test border and padding increasing
                        sides.forEach(function (side) {
                            var borderWidthSide = 'border' + side + 'Width',
                                paddingWidthSide = 'padding' + side;

                            expect(parseInt(targetDomElementStyle[borderWidthSide], 10))
                                .toBeGreaterThan(parseInt(oldTargetDomElementBorderWidths[borderWidthSide], 10));

                            expect(parseInt(targetDomElementStyle[paddingWidthSide], 10))
                                .toBeGreaterThan(parseInt(oldTargetDomElementPaddingWidths[paddingWidthSide], 10));
                        });

                        // test DOMElement constancy size
                        expect(targetDomElement.getBoundingClientRect().width).toBe(oldTargetDomElementWidth);
                        expect(targetDomElement.getBoundingClientRect().height).toBe(oldTargetDomElementHeight);
                    } else {
                        expect(targetDomElement).toBeHtmlOrSvgElement();
                    }
                });
            });

            m.describe(true, 'BorderBox test teardown', function () {

                m.describe(runWidgetInstantiation, 'Removing borderBox test widget instance', mSpecDisposeGeneric.suite, [widgets, testContainerName]);
            });
        }
    };
});
