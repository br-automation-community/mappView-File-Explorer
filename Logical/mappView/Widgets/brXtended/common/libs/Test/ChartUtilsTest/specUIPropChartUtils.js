'use strict';
define(['libs/d3/d3',
    'brTest',
    'widgets/brXtended/common/libs/ChartUtils',
    'widgets/brXtended/common/libs/Test/ChartUtilsTest/UIPropTest/cSpecUIPropChartUtils',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function (d3, { appElem }, ChartUtils, specParam) {

    describe('widgets.brXtended.common.libs.ChartUtils', function () {
        m.describe(specParam.rotateTickLabels.run, 'rotateTickLabel', function () {
            var rotateTickLabelRoot = specParam.rotateTickLabels;

            m.describe(rotateTickLabelRoot.axisTop.run, 'axis position: Top', function () {

                beforeEach(function () {
                    var svgContainer = document.createElementNS(d3.ns.prefix.svg, 'svg'),
                        tickGroup1 = createGroupTickSvg('tickGroup1', 0, 0, 'Top'),
                        tickGroup2 = createGroupTickSvg('tickGroup2', 30, 0, 'Top');

                    svgContainer.setAttribute('id', 'axis');
                    svgContainer.append(tickGroup1);
                    svgContainer.append(tickGroup2);
                    appElem.appendChild(svgContainer);
                });

                afterEach(function () {
                    var svgContainer = document.getElementById('axis');
                    appElem.removeChild(svgContainer);
                });

                m.cases(rotateTickLabelRoot.axisTop.position.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisTop.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the ' + rotateTickLabelRoot.axisTop.positionAttribute + ' attribute of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisTop.run, rotateTickLabelRoot.axisTop.positionAttribute + ' attribute', function (rotation, yAttribute) {

                        var axisPosition = rotateTickLabelRoot.axisTop.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisTop.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(textItem.getAttribute(rotateTickLabelRoot.axisTop.positionAttribute)).toBe(yAttribute);
                        });
                    });

                m.cases(rotateTickLabelRoot.axisTop.dy.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisTop.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the dy attribute of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisTop.run, 'dy attribute', function (rotation, dyAttribute) {

                        var axisPosition = rotateTickLabelRoot.axisTop.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisTop.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(textItem.getAttribute('dy')).toBe(dyAttribute);
                        });
                    });

                m.cases(rotateTickLabelRoot.axisTop.transform.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisTop.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the transform attribute of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisTop.run, 'transform attribute', function (rotation, transform) {

                        var axisPosition = rotateTickLabelRoot.axisTop.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisTop.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(textItem.getAttribute('transform')).toBe(transform);
                        });
                    });

                m.cases(rotateTickLabelRoot.axisTop.textAnchor.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisTop.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the text-anchor CSS property of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisTop.run, 'text-anchor CSS property', function (rotation, textAnchor) {

                        var axisPosition = rotateTickLabelRoot.axisTop.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisTop.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(window.getComputedStyle(textItem).textAnchor).toBe(textAnchor);
                        });
                    });
            });

            m.describe(rotateTickLabelRoot.axisBottom.run, 'axis position: Bottom', function () {

                beforeEach(function () {
                    var svgContainer = document.createElementNS(d3.ns.prefix.svg, 'svg'),
                        tickGroup1 = createGroupTickSvg('tickGroup1', 0, 0, 'Bottom'),
                        tickGroup2 = createGroupTickSvg('tickGroup2', 30, 0, 'Bottom');

                    svgContainer.setAttribute('id', 'axis');
                    svgContainer.append(tickGroup1);
                    svgContainer.append(tickGroup2);
                    appElem.appendChild(svgContainer);
                });

                afterEach(function () {
                    var svgContainer = document.getElementById('axis');
                    appElem.removeChild(svgContainer);
                });

                m.cases(rotateTickLabelRoot.axisBottom.position.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisBottom.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the ' + rotateTickLabelRoot.axisBottom.positionAttribute + ' attribute of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisBottom.run, rotateTickLabelRoot.axisBottom.positionAttribute + ' attribute', function (rotation, yAttribute) {

                        var axisPosition = rotateTickLabelRoot.axisBottom.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisBottom.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(textItem.getAttribute(rotateTickLabelRoot.axisBottom.positionAttribute)).toBe(yAttribute);
                        });
                    });

                m.cases(rotateTickLabelRoot.axisBottom.dy.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisBottom.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the dy attribute of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisBottom.run, 'dy attribute', function (rotation, dyAttribute) {

                        var axisPosition = rotateTickLabelRoot.axisBottom.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisBottom.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(textItem.getAttribute('dy')).toBe(dyAttribute);
                        });
                    });

                m.cases(rotateTickLabelRoot.axisBottom.transform.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisBottom.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the transform attribute of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisBottom.run, 'transform attribute', function (rotation, transform) {

                        var axisPosition = rotateTickLabelRoot.axisBottom.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisBottom.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(textItem.getAttribute('transform')).toBe(transform);
                        });
                    });

                m.cases(rotateTickLabelRoot.axisBottom.textAnchor.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisBottom.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the text-anchor CSS property of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisBottom.run, 'text-anchor CSS property', function (rotation, textAnchor) {

                        var axisPosition = rotateTickLabelRoot.axisBottom.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisBottom.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(window.getComputedStyle(textItem).textAnchor).toBe(textAnchor);
                        });
                    });
            });

            m.describe(rotateTickLabelRoot.axisLeft.run, 'axis position: Left', function () {

                beforeEach(function () {
                    var svgContainer = document.createElementNS(d3.ns.prefix.svg, 'svg'),
                        tickGroup1 = createGroupTickSvg('tickGroup1', 0, 0, 'Left'),
                        tickGroup2 = createGroupTickSvg('tickGroup2', 0, 30, 'Left');

                    svgContainer.setAttribute('id', 'axis');
                    svgContainer.append(tickGroup1);
                    svgContainer.append(tickGroup2);
                    appElem.appendChild(svgContainer);
                });

                afterEach(function () {
                    var svgContainer = document.getElementById('axis');
                    appElem.removeChild(svgContainer);
                });

                m.cases(rotateTickLabelRoot.axisLeft.position.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisLeft.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the ' + rotateTickLabelRoot.axisLeft.positionAttribute + ' attribute of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisLeft.run, rotateTickLabelRoot.axisLeft.positionAttribute + ' attribute', function (rotation, yAttribute) {

                        var axisPosition = rotateTickLabelRoot.axisLeft.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisLeft.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(textItem.getAttribute(rotateTickLabelRoot.axisLeft.positionAttribute)).toBe(yAttribute);
                        });
                    });

                m.cases(rotateTickLabelRoot.axisLeft.dy.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisLeft.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the dy attribute of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisLeft.run, 'dy attribute', function (rotation, dyAttribute) {

                        var axisPosition = rotateTickLabelRoot.axisLeft.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisLeft.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(textItem.getAttribute('dy')).toBe(dyAttribute);
                        });
                    });

                m.cases(rotateTickLabelRoot.axisLeft.transform.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisLeft.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the transform attribute of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisLeft.run, 'transform attribute', function (rotation, transform) {

                        var axisPosition = rotateTickLabelRoot.axisLeft.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisLeft.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(textItem.getAttribute('transform')).toBe(transform);
                        });
                    });

                m.cases(rotateTickLabelRoot.axisLeft.textAnchor.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisLeft.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the text-anchor CSS property of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisLeft.run, 'text-anchor CSS property', function (rotation, textAnchor) {

                        var axisPosition = rotateTickLabelRoot.axisLeft.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisLeft.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(window.getComputedStyle(textItem).textAnchor).toBe(textAnchor);
                        });
                    });
            });

            m.describe(rotateTickLabelRoot.axisRight.run, 'axis position: Right', function () {

                beforeEach(function () {
                    var svgContainer = document.createElementNS(d3.ns.prefix.svg, 'svg'),
                        tickGroup1 = createGroupTickSvg('tickGroup1', 0, 0, 'Right'),
                        tickGroup2 = createGroupTickSvg('tickGroup2', 0, 30, 'Right');

                    svgContainer.setAttribute('id', 'axis');
                    svgContainer.append(tickGroup1);
                    svgContainer.append(tickGroup2);
                    appElem.appendChild(svgContainer);
                });

                afterEach(function () {
                    var svgContainer = document.getElementById('axis');
                    appElem.removeChild(svgContainer);
                });

                m.cases(rotateTickLabelRoot.axisRight.position.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisRight.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the ' + rotateTickLabelRoot.axisRight.positionAttribute + ' attribute of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisRight.run, rotateTickLabelRoot.axisRight.positionAttribute + ' attribute', function (rotation, yAttribute) {

                        var axisPosition = rotateTickLabelRoot.axisRight.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisRight.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(textItem.getAttribute(rotateTickLabelRoot.axisRight.positionAttribute)).toBe(yAttribute);
                        });
                    });

                m.cases(rotateTickLabelRoot.axisRight.dy.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisRight.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the dy attribute of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisRight.run, 'dy attribute', function (rotation, dyAttribute) {

                        var axisPosition = rotateTickLabelRoot.axisRight.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisRight.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(textItem.getAttribute('dy')).toBe(dyAttribute);
                        });
                    });

                m.cases(rotateTickLabelRoot.axisRight.transform.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisRight.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the transform attribute of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisRight.run, 'transform attribute', function (rotation, transform) {

                        var axisPosition = rotateTickLabelRoot.axisRight.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisRight.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(textItem.getAttribute('transform')).toBe(transform);
                        });
                    });

                m.cases(rotateTickLabelRoot.axisRight.textAnchor.cases)
                    .caseDescription('- With tickLabelDistance=' + rotateTickLabelRoot.axisRight.setup.tickLabelDistance + 'px and rotation $$0, ' +
                    'the text-anchor CSS property of the text element of the tick should be $$1')
                    .it(rotateTickLabelRoot.axisRight.run, 'text-anchor CSS property', function (rotation, textAnchor) {

                        var axisPosition = rotateTickLabelRoot.axisRight.setup.axisPosition,
                            tickLabelDistance = rotateTickLabelRoot.axisRight.setup.tickLabelDistance,
                            svgContainer = document.getElementById('axis'),
                            textNodes = svgContainer.querySelectorAll('.tick text');

                        ChartUtils.rotateTickLabels(d3.select(svgContainer).selectAll('.tick text'), axisPosition, tickLabelDistance, rotation);

                        textNodes.forEach(function (textItem) {
                            expect(window.getComputedStyle(textItem).textAnchor).toBe(textAnchor);
                        });
                    });
            });
        });
    });

    function createGroupTickSvg(id, translateX, translateY, axisPosition) {

        var svgNameSpace = d3.ns.prefix.svg,
            tickGroup = document.createElementNS(svgNameSpace, 'g'),
            line = document.createElementNS(svgNameSpace, 'line'),
            text = document.createElementNS(svgNameSpace, 'text'),
            x1 = 0, x2 = 0, y1 = 0, y2 = 0;

        switch (axisPosition) {
            case 'Top':
                y2 = -6;
                break;
            case 'Bottom':
                y2 = 6;
                break;
            case 'Left':
                x2 = -6;
                break;
            case 'Right':
                x2 = 6;
                break;
        }

        tickGroup.setAttribute('id', id);
        tickGroup.setAttribute('class', 'tick');
        tickGroup.setAttribute('transform', 'translate(' + translateX + ',' + translateY + ')');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        tickGroup.appendChild(line);
        tickGroup.appendChild(text);

        return tickGroup;
    }
});
