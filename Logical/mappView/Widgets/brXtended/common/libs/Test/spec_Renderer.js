'use strict';
define([
    'widgets/brXtended/common/libs/Renderer',
    'widgets/brXtended/common/libs/DataAdapter',
    'widgets/brease/common/Test/CommonTestUtils',
    'brTest'
], function (Renderer, DataAdapter, CommonTestUtils, { enum: { Enum }, appElem }) {

    describe('widgets.brXtended.common.libs.Renderer', function () {
        var renderer,
            widgetMock = function () {
                this.chartItems = {
                    yValues: {},
                    yAxis: {},
                    xAxis: {}
                };
                this.settings = {
                    width: 100,
                    height: 100,
                    chartMargin: '0px'
                };
                this.elem = document.createElement('div');
                this.elem.id = 'chart_mock';
                this.el = $(this.elem);
                this.el.css({ 'border-width': '1px', 'margin': '10px' });
                this.dispatchEvent = function () { };
                this.getZoomType = function () { };
                this.getInfiniteScroll = function () { };
                this.getMinZoomLevel = function () { return 0; };
                this.getMaxZoomLevel = function () { return 0; };
                this.chartItems.yAxis['yAxis1'] = new axisWidgetMock();
                this.chartItems.xAxis['xAxis1'] = new axisWidgetMock();
                this.chartItems.yAxis['yAxis1'].elem.id = 'yAxis1';
                this.chartItems.xAxis['xAxis1'].elem.id = 'xAxis1';
                this.chartItems.yValues['graph1'] = new graphWidgetMock();
                this.chartItems.yValues['graph1'].axisWidget = this.chartItems.yAxis['yAxis1'];
                this.chartItems.yValues['graph1'].xAxisWidget = this.chartItems.xAxis['xAxis1'];
                this.chartItems.length = 3;
                this.dataAdapter = new DataAdapter(this);
                this.dataAdapter.updateScales();
                appElem.appendChild(this.elem);
            },
            axisWidgetMock = function () {
                this.settings = {
                    width: 10,
                    height: 10,
                    format: { decimalPlaces: 0 }
                };
                this.getTickLabelDistance = function () { return 0; };
                this.getTickLabelRotation = function () { return '0deg'; };
                this.getAxisPosition = function () { return 'left'; };
                this.getAxisLabelDistance = function () { return 0; };
                this.getMinZoomLevel = function () { return 0; };
                this.currentFormat = function () { return { decimalPlaces: 0, minimumIntegerDigits: 1 }; };
                this.minimum = function () { return 0; };
                this.maximum = function () { return 0; };
                this._getAxisType = function () { return 'index'; };
                this.isEnabled = function () { return true; };
                this._clickHandler = function () { };
                this.getAxisLabel = function () { };
                this._bound = {};
                this._bind = function (f) {
                    if (typeof f.bind === 'function') {
                        return f.bind(this);
                    } else {
                        return function () {};
                    }
                };
                this._handlerProxy = function (fn, ...args) {
                    this[fn].apply(this, args);
                };
                this.elem = document.createElement('div');
                this.elem.id = 'chart_mock';
                this.el = $(this.elem);
                this._getMinValue = function () { return 0; };
                this._getMaxValue = function () { return 0; };
                this.currentUnitSymbol = function () { return ''; };
            },
            graphWidgetMock = function () {
                this.elem = document.createElement('div');
                this.el = $(this.elem);
                this._coordinates = function () { return [1]; };
                this.getInterpolationType = function () { };
                this.updateZoomType = function () { };
                this.updateZoomLevelLimits = function () { };
                this.isHidden = false;
                this.isEnabled = function () { return true; };
                this._clickHandler = function () { };
                this._bound = {};
                this._bind = function (f) {
                    if (typeof f.bind === 'function') {
                        return f.bind(this);
                    } else {
                        return function () {};
                    }
                };
                this._handlerProxy = function (fn, ...args) {
                    this[fn].apply(this, args);
                };
            };
        beforeEach(function () {
            renderer = new Renderer(new widgetMock());
        });
        afterEach(CommonTestUtils.cleanup);
        describe('#method-updateZoomLevelLimits', function () {
            it('should not throw an exception', function () {
                expect(function () { renderer.updateZoomLevelLimits(); }).not.toThrow();
            });
        });
        describe('#method-updateZoomType', function () {
            it('should not throw an exception', function () {
                expect(function () { renderer.updateZoomType(); }).not.toThrow();
            });
            describe(`with #param-getZoomType = ${Enum.ChartZoomType.none}`, function () {
                beforeEach(function () {
                    renderer.updateZoomType(Enum.ChartZoomType.none);
                });
                it('should set #property-savedX to null', function () {
                    expect(renderer.savedX).toBeDefined();
                });
                it('should set #property-savedY to 0', function () {
                    expect(renderer.savedY).toEqual(0);
                });
            });
            describe(`with #param-getZoomType = ${Enum.ChartZoomType.x}`, function () {
                beforeEach(function () {
                    renderer.updateZoomType(Enum.ChartZoomType.x);
                });
                it('should set #property-savedX to null', function () {
                    expect(renderer.savedX).toBeNull();
                });
                it('should set #property-savedY to 0', function () {
                    expect(renderer.savedY).toEqual(0);
                });
            });
            describe(`with #param-getZoomType = ${Enum.ChartZoomType.y}`, function () {
                beforeEach(function () {
                    renderer.updateZoomType(Enum.ChartZoomType.y);
                });
                it('should set #property-savedX to 0', function () {
                    expect(renderer.savedX).toEqual(0);
                });
                it('should set #property-savedY to null', function () {
                    expect(renderer.savedY).toBeNull();
                });
            });
            describe(`with #param-getZoomType = ${Enum.ChartZoomType.xy}`, function () {
                beforeEach(function () {
                    renderer.updateZoomType(Enum.ChartZoomType.xy);
                });
                it('should set #property-savedX to null', function () {
                    expect(renderer.savedX).toBeNull();
                });
                it('should set #property-savedY to null', function () {
                    expect(renderer.savedY).toBeNull();
                });
            });
        });
        describe('#method-zoomReset', function () {
            beforeEach(function () {
                renderer.scrollLeft();
            });
            it('should not throw an exception', function () {
                expect(function () { renderer.zoomReset(); }).not.toThrow();
            });
            describe(`while #method-getZoomType returns ${Enum.ChartZoomType.none}`, function () {
                beforeEach(function () {
                    spyOn(renderer.widget, 'getZoomType').and.returnValue(Enum.ChartZoomType.none);
                });
                it('should not throw an exception', function () {
                    expect(function () { renderer.zoomReset(); }).not.toThrow();
                });
            });
            describe(`while #method-getZoomType returns ${Enum.ChartZoomType.x}`, function () {
                beforeEach(function () {
                    spyOn(renderer.widget, 'getZoomType').and.returnValue(Enum.ChartZoomType.x);
                });
                it('should set #property-savedX to null', function () {
                    renderer.zoomReset();
                    expect(renderer.savedX).toBeNull();
                });
                it('should set #property-savedY to 0', function () {
                    renderer.zoomReset();
                    expect(renderer.savedY).toEqual(0);
                });
            });
            describe(`while #method-getZoomType returns ${Enum.ChartZoomType.y}`, function () {
                beforeEach(function () {
                    spyOn(renderer.widget, 'getZoomType').and.returnValue(Enum.ChartZoomType.y);
                });
                it('should set #property-savedX to 0', function () {
                    renderer.zoomReset();
                    expect(renderer.savedX).toEqual(0);
                });
                it('should set #property-savedY to null', function () {
                    renderer.zoomReset();
                    expect(renderer.savedY).toBeNull();
                });
            });
        });
        describe('#method-scrollLeft', function () {
            it('should not throw an exception', function () {
                expect(function () { renderer.scrollLeft(); }).not.toThrow();
            });
        });
        describe('#method-scrollRight', function () {
            it('should not throw an exception', function () {
                expect(function () { renderer.scrollRight(); }).not.toThrow();
            });
        });
        describe('#method-scrollUp', function () {
            it('should not throw an exception', function () {
                expect(function () { renderer.scrollUp(); }).not.toThrow();
            });
        });
    });
});
