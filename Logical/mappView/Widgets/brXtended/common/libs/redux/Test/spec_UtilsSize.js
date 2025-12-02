'use strict';
define(['brTest', 'widgets/brXtended/common/libs/redux/utils/UtilsSize'], function ({ TestUtils, appView }, UtilsSize) {

    describe('widgets.brXtended.common.libs.redux.utils.UtilsSize', function () {
        var container;
        beforeEach(function () {
            container = $('<div></div>')
                .css({
                    width: '200px',
                    height: '300px',
                    background: 'orange',
                    position: 'absolute',
                    top: 0,
                    left: 0
                });
        });
        
        describe('#method-getWidth', function () {
            var tests = [
                {
                    width: 100,
                    'max-width': 'none',
                    'min-width': 'none',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        width: 100
                    }
                },
                {
                    width: '100%',
                    'max-width': 'none',
                    'min-width': 'none',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        width: 200
                    }
                },
                {
                    width: '100%',
                    'max-width': '50px',
                    'min-width': 'none',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        width: 50
                    }
                },
                {
                    width: '100%',
                    'max-width': 'none',
                    'min-width': '250px',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        width: 250
                    }
                },
                {
                    width: '100%',
                    'max-width': 'none',
                    'min-width': 'none',
                    scaleX: 0.5,
                    scaleY: 0.5,
                    result: {
                        width: 200
                    }
                },
                {
                    width: '50%',
                    'max-width': 'none',
                    'min-width': 'none',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        width: 100
                    }
                },
                {
                    width: '0%',
                    'max-width': 'none',
                    'min-width': 'none',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        width: 0
                    }
                },
                {
                    width: 100,
                    'max-width': 'none',
                    'min-width': '200px',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        width: 200
                    }
                },
                {
                    width: 200,
                    'max-width': '100px',
                    'min-width': 'none',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        width: 100
                    }
                }
            ];

            describe('when #param-elem is instance of HTMLElement', function () {
                var elem;

                beforeEach(function () {
                    elem = document.createElement('DIV');
                    container.append(elem);
                    appView.append(container);
                });
                tests.forEach(function (test) {
                    describe(`and #param-width = ${test.width} and  min-width = ${test['min-width']} and max-width = ${test['max-width']} and scale(${test.scaleX},${test.scaleY})`, function () {
                        beforeEach(function () {
                            $(elem).css({
                                width: test.width,
                                'min-width': test['min-width'],
                                'max-width': test['max-width'],
                                position: 'relative'
                            });
                            container.css('transform', `scale(${test.scaleX}, ${test.scaleY})`);
                        });
                        it(`should return ${test.result.width}`, function () {
                            expect(UtilsSize.getWidth(test.width, elem)).toBeCloseTo(test.result.width, 1);
                        });
                    });
                });
                describe('and element is hidden', function () {
                    beforeEach(function () {
                        $(elem).css({
                            'display': 'none'
                        });
                    });
                    describe(`and #param-width = 100%`, function () {
                        beforeEach(function () {
                            $(elem).css({
                                width: '100%',
                                position: 'relative'
                            });
                        });
                        it(`should return 0`, function () {
                            expect(UtilsSize.getWidth('100%', elem)).toBeCloseTo(0, 1);
                        });
                    });
                });
            });
            describe('when #param-elem is instance of SVGElement', function () {
                var svgElem;
                beforeEach(function () {
                    svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    container.append(svgElem);
                    appView.append(container);
                });

                tests.forEach(function (test) {
                    describe(`and #param-width = ${test.width} and  min-width = ${test['min-width']} and max-width = ${test['max-width']} and scale(${test.scaleX},${test.scaleY})`, function () {
                        beforeEach(function () {
                            $(svgElem).css({
                                width: test.width,
                                'min-width': test['min-width'],
                                'max-width': test['max-width'],
                                position: 'relative'
                            });
                            container.css('transform', `scale(${test.scaleX}, ${test.scaleY})`);
                        });
                        it(`should return ${test.result.width}`, function () {
                            expect(UtilsSize.getWidth(test.width, svgElem)).toBeCloseTo(test.result.width, 1);
                        });
                    });
                });
                describe('and element is hidden', function () {
                    beforeEach(function () {
                        $(svgElem).css({
                            'display': 'none'
                        });
                    });
                    describe(`and #param-width = 100%`, function () {
                        beforeEach(function () {
                            $(svgElem).css({
                                width: '100%',
                                position: 'relative'
                            });
                        });
                        it(`should return 0`, function () {
                            expect(UtilsSize.getWidth('100%', svgElem)).toBeCloseTo(0, 1);
                        });
                    });
                });
            });
        });
        describe('#method-setAndGetWidth', function () {
            var tests = [
                {
                    width: 100,
                       
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        width: 100
                    }
                },
                {
                    width: '100%',
                       
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        width: 200
                    }
                },
                {
                    width: '100%',
                       
                    scaleX: 0.5,
                    scaleY: 0.5,
                    result: {
                        width: 200
                    }
                },
                {
                    width: '50%',
                       
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        width: 100
                    }
                },
                {
                    width: '0%',
                      
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        width: 0
                    }
                }
            ];

            describe('when #param-elem is instance of HTMLElement', function () {
                var elem;

                beforeEach(function () {
                    elem = document.createElement('DIV');
                    container.append(elem);
                    appView.append(container);
                });
                tests.forEach(function (test) {
                    describe(`and #param-width = ${test.width} and  min-width = ${test['min-width']} and max-width = ${test['max-width']} and scale(${test.scaleX},${test.scaleY})`, function () {
                        beforeEach(function () {
                            $(elem).css({
                                width: test.width,
                                'min-width': test['min-width'],
                                'max-width': test['max-width'],
                                position: 'relative'
                            });
                            container.css('transform', `scale(${test.scaleX}, ${test.scaleY})`);
                        });
                        it(`should return ${test.result.width}`, function () {
                            expect(UtilsSize.setAndGetWidth(test.width, elem)).toBeCloseTo(test.result.width, 1);
                        });
                    });
                });
                describe('and element is hidden', function () {
                    beforeEach(function () {
                        $(elem).css({
                            'display': 'none'
                        });
                    });
                    describe(`and #param-width = 100%`, function () {
                        beforeEach(function () {
                            $(elem).css({
                                width: '100%',
                                position: 'relative'
                            });
                        });
                        it(`should return 0`, function () {
                            expect(UtilsSize.setAndGetWidth('100%', elem)).toBeCloseTo(0, 1);
                        });
                    });
                });
            });
            describe('when #param-elem is instance of SVGElement', function () {
                var svgElem;
                beforeEach(function () {
                    svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    container.append(svgElem);
                    appView.append(container);
                });

                tests.forEach(function (test) {
                    describe(`and #param-width = ${test.width} and  min-width = ${test['min-width']} and max-width = ${test['max-width']} and scale(${test.scaleX},${test.scaleY})`, function () {
                        beforeEach(function () {
                            $(svgElem).css({
                                width: test.width,
                                'min-width': test['min-width'],
                                'max-width': test['max-width'],
                                position: 'relative'
                            });
                            container.css('transform', `scale(${test.scaleX}, ${test.scaleY})`);
                        });
                        it(`should return ${test.result.width}`, function () {
                            expect(UtilsSize.setAndGetWidth(test.width, svgElem)).toBeCloseTo(test.result.width, 1);
                        });
                    });
                });
                describe('and element is hidden', function () {
                    beforeEach(function () {
                        $(svgElem).css({
                            'display': 'none'
                        });
                    });
                    describe(`and #param-width = 100%`, function () {
                        beforeEach(function () {
                            $(svgElem).css({
                                width: '100%',
                                position: 'relative'
                            });
                        });
                        it(`should return 0`, function () {
                            expect(UtilsSize.setAndGetWidth('100%', svgElem)).toBeCloseTo(0, 1);
                        });
                    });
                    describe(`and #param-padding-left = 10px`, function () {
                        beforeEach(function () {
                            $(svgElem).css({
                                width: 100,
                                heigt: 100,
                                'padding-left': 10,
                                position: 'relative'
                            });
                        });
                        it(`should return 100`, function () {
                            expect(UtilsSize.setAndGetWidth('100', svgElem)).toBeCloseTo(100, 1);
                        });
                    });
                    describe(`and #param-padding-right = 10px`, function () {
                        beforeEach(function () {
                            $(svgElem).css({
                                width: 100,
                                heigt: 100,
                                'padding-right': 10,
                                position: 'relative'
                            });
                        });
                        it(`should return 100`, function () {
                            expect(UtilsSize.setAndGetWidth('100', svgElem)).toBeCloseTo(100, 1);
                        });
                    });
                });
            });
        });
        describe('#method-getHeight', function () {
            var tests = [
                {
                    height: 100,
                    'max-height': 'none',
                    'min-height': 'none',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        height: 100
                    }
                },
                {
                    height: '100%',
                    'max-height': 'none',
                    'min-height': 'none',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        height: 300
                    }
                },
                {
                    height: '100%',
                    'max-height': '50px',
                    'min-height': 'none',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        height: 50
                    }
                },
                {
                    height: '100%',
                    'max-height': 'none',
                    'min-height': '350px',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        height: 350
                    }
                },
                {
                    height: '100%',
                    'max-height': 'none',
                    'min-height': 'none',
                    scaleX: 0.5,
                    scaleY: 0.5,
                    result: {
                        height: 300
                    }
                },
                {
                    height: '50%',
                    'max-height': 'none',
                    'min-height': 'none',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        height: 150
                    }
                },
                {
                    height: '0%',
                    'max-height': 'none',
                    'min-height': 'none',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        height: 0
                    }
                },
                {
                    height: 100,
                    'max-height': 'none',
                    'min-height': '200px',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        height: 200
                    }
                },
                {
                    height: 200,
                    'max-height': '100px',
                    'min-height': 'none',
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        height: 100
                    }
                }
            ];

            describe('when #param-elem is instance of HTMLElement', function () {
                var elem;

                beforeEach(function () {
                    elem = document.createElement('DIV');
                    container.append(elem);
                    appView.append(container);
                });
                tests.forEach(function (test) {
                    describe(`and #param-height = ${test.height} and  min-height = ${test['min-height']} and max-height = ${test['max-height']} and scale(${test.scaleX},${test.scaleY})`, function () {
                        beforeEach(function () {
                            $(elem).css({
                                height: test.height,
                                'min-height': test['min-height'],
                                'max-height': test['max-height'],
                                position: 'relative'
                            });
                            container.css('transform', `scale(${test.scaleX}, ${test.scaleY})`);
                        });
                        it(`should return ${test.result.height}`, function () {
                            expect(UtilsSize.getHeight(test.height, elem)).toBeCloseTo(test.result.height, 1);
                        });
                    });
                });
            });
            describe('when #param-elem is instance of SVGElement', function () {
                var svgElem;
                beforeEach(function () {
                    svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    container.append(svgElem);
                    appView.append(container);
                });

                tests.forEach(function (test) {
                    describe(`and #param-height = ${test.height} and  min-height = ${test['min-height']} and max-height = ${test['max-height']} and scale(${test.scaleX},${test.scaleY})`, function () {
                        beforeEach(function () {
                            $(svgElem).css({
                                height: test.height,
                                'min-height': test['min-height'],
                                'max-height': test['max-height'],
                                position: 'relative'
                            });
                            container.css('transform', `scale(${test.scaleX}, ${test.scaleY})`);
                        });
                        it(`should return ${test.result.height}`, function () {
                            expect(UtilsSize.getHeight(test.height, svgElem)).toBeCloseTo(test.result.height, 1);
                        });
                    });
                });
                describe('and element is hidden', function () {
                    beforeEach(function () {
                        $(svgElem).css({
                            'display': 'none'
                        });
                    });
                    describe(`and #param-width = 100% and #param-height = 100%`, function () {
                        beforeEach(function () {
                            $(svgElem).css({
                                width: '100%',
                                heigt: '100%',
                                position: 'relative'
                            });
                        });
                        it(`should return 0`, function () {
                            expect(UtilsSize.getHeight('100%', svgElem)).toBeCloseTo(0, 1);
                        });
                    });
                });
            });
        });
        describe('#method-setAndGetHeight', function () {
            var tests = [
                {
                    height: 100,
                       
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        height: 100
                    }
                },
                {
                    height: '100%',
                       
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        height: 300
                    }
                },
                {
                    height: '100%',
                      
                    scaleX: 0.5,
                    scaleY: 0.5,
                    result: {
                        height: 300
                    }
                },
                {
                    height: '50%',
                       
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        height: 150
                    }
                },
                {
                    height: '0%',
                      
                    scaleX: 1,
                    scaleY: 1,
                    result: {
                        height: 0
                    }
                }
            ];

            describe('when #param-elem is instance of HTMLElement', function () {
                var elem;

                beforeEach(function () {
                    elem = document.createElement('DIV');
                    container.append(elem);
                    appView.append(container);
                });
                tests.forEach(function (test) {
                    describe(`and #param-height = ${test.height} and  min-height = ${test['min-height']} and max-height = ${test['max-height']} and scale(${test.scaleX},${test.scaleY})`, function () {
                        beforeEach(function () {
                            $(elem).css({
                                height: test.height,
                                'min-height': test['min-height'],
                                'max-height': test['max-height'],
                                position: 'relative'
                            });
                            container.css('transform', `scale(${test.scaleX}, ${test.scaleY})`);
                        });
                        it(`should return ${test.result.height}`, function () {
                            expect(UtilsSize.setAndGetHeight(test.height, elem)).toBeCloseTo(test.result.height, 1);
                        });
                    });
                        
                });
                describe('and element is hidden', function () {
                    beforeEach(function () {
                        $(elem).css({
                            'display': 'none'
                        });
                    });
                    describe(`and #param-width = 100%`, function () {
                        beforeEach(function () {
                            $(elem).css({
                                height: '100%',
                                position: 'relative'
                            });
                        });
                        it(`should return 0`, function () {
                            expect(UtilsSize.setAndGetHeight('100%', elem)).toBeCloseTo(0, 1);
                        });
                    });
                });
            });
            describe('when #param-elem is instance of SVGElement', function () {
                var svgElem;
                beforeEach(function () {
                    svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    container.append(svgElem);
                    appView.append(container);
                });

                tests.forEach(function (test) {
                    describe(`and #param-height = ${test.height} and  min-height = ${test['min-height']} and max-height = ${test['max-height']} and scale(${test.scaleX},${test.scaleY})`, function () {
                        beforeEach(function () {
                            $(svgElem).css({
                                height: test.height,
                                'min-height': test['min-height'],
                                'max-height': test['max-height'],
                                position: 'relative'
                            });
                            container.css('transform', `scale(${test.scaleX}, ${test.scaleY})`);
                        });
                        it(`should return ${test.result.height}`, function () {
                            expect(UtilsSize.setAndGetHeight(test.height, svgElem)).toBeCloseTo(test.result.height, 1);
                        });
                    });
                });
                describe('and element is hidden', function () {
                    beforeEach(function () {
                        $(svgElem).css({
                            'display': 'none'
                        });
                    });
                    describe(`and #param-width = 100% and #param-height = 100%`, function () {
                        beforeEach(function () {
                            $(svgElem).css({
                                width: '100%',
                                heigt: '100%',
                                position: 'relative'
                            });
                        });
                        it(`should return 0`, function () {
                            expect(UtilsSize.setAndGetHeight('100%', svgElem)).toBeCloseTo(0, 1);
                        });
                        describe(`and #param-padding-top = 10px`, function () {
                            beforeEach(function () {
                                $(svgElem).css({
                                    width: 100,
                                    heigt: 100,
                                    'padding-top': 10,
                                    position: 'relative'
                                });
                            });
                            it(`should return 100`, function () {
                                expect(UtilsSize.setAndGetHeight('100', svgElem)).toBeCloseTo(100, 1);
                            });
                        });
                        describe(`and #param-padding-bottom = 10px`, function () {
                            beforeEach(function () {
                                $(svgElem).css({
                                    width: 100,
                                    heigt: 100,
                                    'padding-bottom': 10,
                                    position: 'relative'
                                });
                            });
                            it(`should return 100`, function () {
                                expect(UtilsSize.setAndGetHeight('100', svgElem)).toBeCloseTo(100, 1);
                            });
                        });
                    });
                });
            });
        });
        afterEach(TestUtils.cleanup);
    });
});
