define(['widgets/brXtended/common/libs/DataAdapter'], function (DataAdapter) {
    'use strict';

    describe('widgets.brXtended.common.libs.DataAdapter', function () {
        var dataAdapter,
            widgetMock = function () {
                this.chartItems = {
                    yValues: {},
                    yAxis: {},
                    xAxis: {}
                };
                this.settings = {
                    width: 10,
                    height: 10,
                    chartMargin: '0px'
                };
                this.elem = document.createElement('div');
                this.el = $(this.elem);
                this.getMinZoomLevel = function () { return 0; };
                this.getMaxZoomLevel = function () { return 0; };
            },
            axisWidgetMock = function () {
                this.settings = {
                    width: 10,
                    height: 10
                };
                this.getTickLabelDistance = function () { return 0; };
                this.getTickLabelRotation = function () { return '0deg'; };
                this.getAxisPosition = function () { return 'left'; };
                this.getAxisLabelDistance = function () { return 0; };
                this.getMinZoomLevel = function () { return 0; };
                this.currentFormat = function () { return {}; };
                this.minimum = function () { return 0; };
                this.maximum = function () { return 0; };
                this._getAxisType = function () { return 'index'; };
            };
        describe('#method-updateScales', function () {
            it('should not throw if widget has no axis assigned', function () {
                dataAdapter = new DataAdapter(new widgetMock());
                expect(function () {
                    dataAdapter.updateScales();
                }).not.toThrow();
            });
            describe('while minimum of yAxis is equal to maxium of yAxis', function () {
                var mock;
                beforeEach(function () {
                    mock = new widgetMock();
                    mock.chartItems.yAxis['yAxis1'] = new axisWidgetMock();
                });
                it('should scale from -1 to 1 if axis has minValue = maxValue = 0', function () {
                    dataAdapter = new DataAdapter(mock);
                    dataAdapter.widget.chartItems.length = 1;
                    dataAdapter.updateScales();
                    expect(dataAdapter.yScales['yAxis1'].domain()).toEqual([-1, 1]);
                });
                it('should scale from 0.9 to 1.1 if axis has minValue = maxValue = 1', function () {
                    spyOn(mock.chartItems.yAxis['yAxis1'], 'minimum').and.returnValue(1);
                    spyOn(mock.chartItems.yAxis['yAxis1'], 'maximum').and.returnValue(1);
                    dataAdapter = new DataAdapter(mock);
                    dataAdapter.widget.chartItems.length = 1;
                    dataAdapter.updateScales();
                    expect(dataAdapter.yScales['yAxis1'].domain()).toEqual([0.9, 1.1]);
                });
            });
        });
        describe('#method-updateZoomLevelLimits', function () {
            it('should not throw if widget has no axis assigned', function () {
                dataAdapter = new DataAdapter(new widgetMock());
                expect(function () {
                    dataAdapter.updateZoomLevelLimits();
                }).not.toThrow();
            });
            describe('while widget has a yAxis with id "yAxis1" assigned', function () {
                var mock;
                beforeEach(function () {
                    mock = new widgetMock();
                    mock.chartItems.yAxis['yAxis1'] = new axisWidgetMock();
                });
                it('should assign minZoomLevel to #property-yAxisAreas[yAxis1].info.minZoomLevel', function () {
                    dataAdapter = new DataAdapter(mock);
                    dataAdapter.widget.chartItems.length = 1;
                    dataAdapter.updateZoomLevelLimits();
                    expect(dataAdapter.yAxisAreas['yAxis1'].info.minZoomLevel).toBeDefined();
                });
                it('should assign maxZoomLevel to #property-yAxisAreas[yAxis1].info.maxZoomLevel', function () {
                    dataAdapter = new DataAdapter(mock);
                    dataAdapter.widget.chartItems.length = 1;
                    dataAdapter.updateZoomLevelLimits();
                    expect(dataAdapter.yAxisAreas['yAxis1'].info.maxZoomLevel).toBeDefined();
                });
            });
            describe('while widget has a xAxis with id "xAxis1" assigned', function () {
                var mock;
                beforeEach(function () {
                    mock = new widgetMock();
                    mock.chartItems.xAxis['xAxis1'] = new axisWidgetMock();
                });
                it('should assign minZoomLevel to #property-xAxisAreas[xAxis1].info.minZoomLevel', function () {
                    dataAdapter = new DataAdapter(mock);
                    dataAdapter.widget.chartItems.length = 1;
                    dataAdapter.updateZoomLevelLimits();
                    expect(dataAdapter.xAxisAreas['xAxis1'].info.minZoomLevel).toBeDefined();
                });
                it('should assign maxZoomLevel to #property-xAxisAreas[xAxis1].info.maxZoomLevel', function () {
                    dataAdapter = new DataAdapter(mock);
                    dataAdapter.widget.chartItems.length = 1;
                    dataAdapter.updateZoomLevelLimits();
                    expect(dataAdapter.xAxisAreas['xAxis1'].info.maxZoomLevel).toBeDefined();
                });
            });
        });
        describe('#method-getYAxesMinimum', function () {
            beforeEach(function () {
                dataAdapter = new DataAdapter(new widgetMock());
            });
            it('should return null initially', function () {
                expect(dataAdapter.getYAxesMinimum()).toBeNull();
            });
            it('should return null if widget has no chartItems', function () {
                dataAdapter.widget.chartItems.length = 0;
                expect(dataAdapter.getYAxesMinimum()).toBeNull();
            });
            describe('while widget has a yAxis with minValue = 0 assigned', function () {
                var mock; 
                beforeEach(function () {
                    mock = new widgetMock();
                    mock.chartItems.yAxis['yAxis1'] = new axisWidgetMock();
                });
                it('should return 0', function () {
                    dataAdapter = new DataAdapter(mock);
                    dataAdapter.widget.chartItems.length = 1;
                    expect(dataAdapter.getYAxesMinimum()).toEqual(0);
                });
                describe('and a second yAxis with minValue = 1', function () {
                    beforeEach(function () {
                        mock.chartItems.yAxis['yAxis2'] = new axisWidgetMock();
                        spyOn(mock.chartItems.yAxis['yAxis2'], 'minimum').and.returnValue(1);
                    });
                    it('should return 0', function () {
                        dataAdapter = new DataAdapter(mock);
                        dataAdapter.widget.chartItems.length = 2;
                        expect(dataAdapter.getYAxesMinimum()).toEqual(0);
                    });
                });
            });
        });
        describe('#method-getYAxesMaximum', function () {
            beforeEach(function () {
                dataAdapter = new DataAdapter(new widgetMock());
            });
            it('should return null initially', function () {
                expect(dataAdapter.getYAxesMaximum()).toBeNull();
            });
            it('should return null if widget has no chartItems', function () {
                dataAdapter.widget.chartItems.length = 0;
                expect(dataAdapter.getYAxesMaximum()).toBeNull();
            });
            describe('while widget has a yAxis with maxValue = 2 assigned', function () {
                var mock;
                beforeEach(function () {
                    mock = new widgetMock();
                    mock.chartItems.yAxis['yAxis1'] = new axisWidgetMock();
                    spyOn(mock.chartItems.yAxis['yAxis1'], 'maximum').and.returnValue(2);
                });
                it('should return 2', function () {
                    dataAdapter = new DataAdapter(mock);
                    dataAdapter.widget.chartItems.length = 1;
                    expect(dataAdapter.getYAxesMaximum()).toEqual(2);
                });
                describe('and a second yAxis with maxValue = 1', function () {
                    beforeEach(function () {
                        mock.chartItems.yAxis['yAxis2'] = new axisWidgetMock();
                        spyOn(mock.chartItems.yAxis['yAxis2'], 'maximum').and.returnValue(1);
                    });
                    it('should return 2', function () {
                        dataAdapter = new DataAdapter(mock);
                        dataAdapter.widget.chartItems.length = 2;
                        expect(dataAdapter.getYAxesMaximum()).toEqual(2);
                    });
                });
            });
        });
    });
});
