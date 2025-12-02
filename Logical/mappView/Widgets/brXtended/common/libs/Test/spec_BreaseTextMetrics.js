'use strict';
define(['widgets/brXtended/common/libs/BreaseTextMetrics',
    'widgets/brease/common/Test/CommonTestUtils',
    'brTest'
], function (BreaseTextMetrics, CommonTestUtils, { appElem }) {

    var widgetName = 'common',
        libPath = 'widgets.brease.',
        subLib = 'libs.BreaseTextMetrics';

    describe(CommonTestUtils.core.specPath(widgetName, libPath, subLib), function () {
        describe('#method-measureText', function () {
            var tests = [
                {
                    text: undefined,
                    font: undefined,
                    result: 0
                },
                {
                    text: null,
                    font: null,
                    result: 0
                },
                {
                    text: '',
                    font: '',
                    result: 0
                },
                {
                    text: 15,
                    font: '',
                    result: 0
                },
                {
                    text: 'Hello World',
                    font: '16px Arial, sans-serif',
                    result: 82
                },
                {
                    text: 'Hello World',
                    font: '20px Arial, sans-serif',
                    result: 103
                }
            ];
            tests.forEach(function (test) {
                describe(`with #param-text = "${test.text}"`, function () {
                    describe(`and #param-font = "${test.font}"`, function () {
                        it('should not throw an exception', function () {
                            expect(function () { BreaseTextMetrics.measureText(test.text, test.font); }).not.toThrow();
                        });
                        it('should return #result.width', function () {
                            expect(BreaseTextMetrics.measureText(test.text, test.font).width).toBeDefined();
                        });
                        it(`should return #result.width with value = ${test.result}`, function () {
                            expect(BreaseTextMetrics.measureText(test.text, test.font).width).toBeCloseTo(test.result, 0);
                        });
                    });
                });
            });
            describe('#result.width', function () {
                it('should be equal when using the same text with the same font', function () {
                    expect(BreaseTextMetrics.measureText('some text', '10px Arial, sans-serif').width).toEqual(BreaseTextMetrics.measureText('some text', '10px Arial, sans-serif').width);
                });
                it('should increase when using a bigger font size', function () {
                    expect(BreaseTextMetrics.measureText('some text', '20px Arial, sans-serif').width).toBeGreaterThan(BreaseTextMetrics.measureText('some text', '10px Arial, sans-serif').width);
                });
                it('should increase when comparing bold text to none bold text', function () {
                    expect(BreaseTextMetrics.measureText('some text', 'bold 10px Arial, sans-serif').width).toBeGreaterThan(BreaseTextMetrics.measureText('some text', '10px Arial, sans-serif').width);
                });
                it('should have a different value when using a different font-family', function () {
                    expect(BreaseTextMetrics.measureText('some text', '10px Georgia, serif').width).not.toEqual(BreaseTextMetrics.measureText('some text', '10px Arial, sans-serif').width);
                });
                describe('compared to width of an inline element', function () {
                    var el;
                    afterEach(function () {
                        el.detach();
                    });
                    it('should return the same width', function () {
                        return CommonTestUtils.core.asyncAnimationFrame(function () {
                            el = _createSpan().css('font', '10px Arial, sans-serif').text('Hello World');
                            el.appendTo(appElem);
                        }).then(function () {
                            expect(BreaseTextMetrics.measureText('Hello World', el.css('font')).width).toBeCloseTo(el.get(0).getBoundingClientRect().width, 0);
                        });
                    });
                    it('should return the same width when using unicode text', function () {
                        return CommonTestUtils.core.asyncAnimationFrame(function () {
                            el = _createSpan().css('font', '10px Arial, sans-serif').text('键盘');
                            el.appendTo(appElem);
                        }).then(function () {
                            expect(BreaseTextMetrics.measureText('键盘', el.css('font')).width).toBeCloseTo(el.get(0).getBoundingClientRect().width, 0);
                        });
                    });
                    it('should result in the same width when being set on a different element', function () {
                        var el1;
                        return CommonTestUtils.core.asyncAnimationFrame(function () {
                            el = _createSpan().css('font', '10px Arial, sans-serif').text('Hello World');
                            el.appendTo(appElem);
                            el1 = _createSpan().css({
                                'display': 'inline-block',
                                'width': `${Math.ceil(BreaseTextMetrics.measureText('Hello World', el.css('font')).width)}px`
                            });
                            el1.appendTo(appElem);
                        }).then(function () {
                            expect(el1.get(0).getBoundingClientRect().width).toBeCloseTo(el.get(0).getBoundingClientRect().width, 0);
                            el1.detach();
                        });
                    });
                    it('should return the same width when being set on a different element within a scaled area', function () {
                        var el1, factor = 0.5;
                        return CommonTestUtils.core.asyncAnimationFrame(function () {
                            el = _createSpan().css('font', '10px Arial, sans-serif').text('Hello World');
                            el.appendTo(appElem);
                            el1 = _createSpan().css({
                                'display': 'inline-block',
                                'width': `${Math.ceil(BreaseTextMetrics.measureText('Hello World', el.css('font')).width)}px`
                            });
                            el1.appendTo(appElem);
                            $(appElem).css({
                                'transform': `scale(${factor},${factor})`,
                                'transform-origin': '0 0'
                            });
                        }).then(function () {
                            expect(el1.get(0).getBoundingClientRect().width).toBeCloseTo(el.get(0).getBoundingClientRect().width, 0);
                            el1.detach();
                            $(appElem).css({
                                'transform': '',
                                'transform-origin': ''
                            });
                        });
                    });
                    function _createSpan() {
                        return $('<span/>').css({ 'position': 'relative', 'top': '0px', 'left': '0px' });
                    }
                });
            });
        });
    });
});
