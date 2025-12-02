// chart mockup
// coordinates:
//          xPositionsTime                          xPosition(Pixels)                           yValues                                 yValue (pixels)
// 1  Date('1969-12-31T23:10:00.000Z')                      0                            0 + (10*2*idx_yValues)              [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 2  Date('1969-12-31T23:10:05.455Z')       5.455*[720 - (60*#y-axis) - 2x15] / 60          7 + (10*2*idx_yValues)              [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 3  Date('1969-12-31T23:10:10.909Z')      10.909*[720 - (60*#y-axis) - 2x15] / 60         14 + (10*2*idx_yValues)              [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 4  Date('1969-12-31T23:10:16.364Z')      16.364*[720 - (60*#y-axis) - 2x15] / 60         21 + (10*2*idx_yValues)              [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 5  Date('1969-12-31T23:10:21.818Z')      21.818*[720 - (60*#y-axis) - 2x15] / 60         28 + (10*2*idx_yValues)              [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 6  Date('1969-12-31T23:10:27.273Z')      27.273*[720 - (60*#y-axis) - 2x15] / 60         35 + (10*2*idx_yValues)              [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 7  Date('1969-12-31T23:10:32.727Z')      32.727*[720 - (60*#y-axis) - 2x15] / 60         42 + (10*2*idx_yValues)              [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 8  Date('1969-12-31T23:10:38.182Z')      38.182*[720 - (60*#y-axis) - 2x15] / 60         49 + (10*2*idx_yValues)              [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 9  Date('1969-12-31T23:10:43.636Z')      43.636*[720 - (60*#y-axis) - 2x15] / 60         56 + (10*2*idx_yValues)              [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
//10  Date('1969-12-31T23:10:49.091Z')      49.091*[720 - (60*#y-axis) - 2x15] / 60         63 + (10*2*idx_yValues)              [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
//11  Date('1969-12-31T23:10:54.545Z')      54.545*[720 - (60*#y-axis) - 2x15] / 60         70 + (10*2*idx_yValues)              [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
//12  Date('1969-12-31T23:11:00.000Z')      60.000*[720 - (60*#y-axis) - 2x15] / 60         77 + (10*2*idx_yValues)              [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)

//         xPositionsIndex                  xPosition(Pixels)                               yValues                                     yValue (pixels)
// 1              17                                0                             0 + [10*(2*idx_yValues + 1)]            [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 2              18                1*{720 - (60*#y-axis) - 2*15] / 11}           7 + [10*(2*idx_yValues + 1)]            [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 3              19                2*{720 - (60*#y-axis) - 2*15] / 11}          14 + [10*(2*idx_yValues + 1)]            [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 4              20                3*{720 - (60*#y-axis) - 2*15] / 11}          21 + [10*(2*idx_yValues + 1)]            [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 5              21                4*{720 - (60*#y-axis) - 2*15] / 11}          28 + [10*(2*idx_yValues + 1)]            [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 6              22                5*{720 - (60*#y-axis) - 2*15] / 11}          35 + [10*(2*idx_yValues + 1)]            [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 7              23                6*{720 - (60*#y-axis) - 2*15] / 11}          42 + [10*(2*idx_yValues + 1)]            [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 8              24                7*{720 - (60*#y-axis) - 2*15] / 11}          49 + [10*(2*idx_yValues + 1)]            [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
// 9              25                8*{720 - (60*#y-axis) - 2*15] / 11}          56 + [10*(2*idx_yValues + 1)]            [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
//10              26                9*{720 - (60*#y-axis) - 2*15] / 11}          63 + [10*(2*idx_yValues + 1)]            [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
//11              27               10*{720 - (60*#y-axis) - 2*15] / 11}          70 + [10*(2*idx_yValues + 1)]            [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)
//12              28               11*{720 - (60*#y-axis) - 2*15] / 11}          77 + [10*(2*idx_yValues + 1)]            [440 - (50*#x-axis) - 2*15] * (1 - yValues/100)

// y-axis
// unit: 'GRM', unit symbol: 'g'

// chart default width x height: (720 x 440)px
//       default margin: 15px
// x-axis default height: 50px
// y-axis default width: 60px
//        default range: 0-100

define(function () {

    'use strict';

    var nPoints = 12, // number of points to generate. FIXED VALUE. DO NOT CHANGE IT!!
        chartMock = {
            chart: {
                elem: {},
                el: {},
                settings: {
                    height: 440,
                    width: 720,
                    chartMargin: '15px',
                    showGrid: true
                },
                dataAdapter: {},
                renderer: {},
                chartItems: {
                    xAxis: [],
                    yAxis: [],
                    yValues: [],
                    xValues: [],
                    xCursors: []
                },
                _axisIsDirty: function () {
                    this.dataAdapter.updateScales();
                    this.renderer.updateAxis();
                },
                _cursorIsDirty: function () {
                    this.dataAdapter.updateCursor();
                    this.renderer.updateCursor();
                },
                _valueListIsDirty: function () {
                    this.dataAdapter.updateGraphData();
                    this.renderer.updateGraphs();
                },
                getMinZoomLevel: function () { return 20; },
                getMaxZoomLevel: function () { return 500; },
                dispatchEvent: function () { },
                _bind: function () { },
                getInfiniteScroll: function () { return true; },
                getZoomType: function () { return 'xy'; },
                setParentEnableState: function () { },
                isVisible: function () { return true; }
            },

            chartOnline: {
                elem: {},
                el: {},
                settings: {
                    height: 440,
                    width: 720,
                    chartMargin: '15px',
                    showGrid: true
                },
                dataAdapter: {},
                renderer: {},
                chartItems: {
                    xAxis: [],
                    yAxis: [],
                    yValues: [],
                    xValues: [],
                    xCursors: []
                },
                _axisIsDirty: function () {
                    this.dataAdapter.updateScales();
                    this.renderer.updateAxis();
                },
                _cursorIsDirty: function () {
                    this.dataAdapter.updateCursor();
                    this.renderer.updateCursor();
                },
                _valueListIsDirty: function () {
                    this.dataAdapter.updateGraphData();
                    this.renderer.updateGraphs();
                },
                getMinZoomLevel: function () { return 20; },
                getMaxZoomLevel: function () { return 500; },
                dispatchEvent: function () { },
                updateAllBuffers: function () {
                    for (var yValueId in this.chartItems.yValues) {
                        this.chartItems.yValues[yValueId].updateBuffer(new Date());
                    }
                },
                getAutoscale: function () { return false; },
                _bind: function () { },
                getInfiniteScroll: function () { return true; },
                getZoomType: function () { return 'xy'; },
                setParentEnableState: function () { },
                isVisible: function () { return true; }
            },

            xAxisTime: {
                settings: {
                    height: 50
                },
                cursors: [],
                _setActiveCursor: function (cursorId) {
                    if (cursorId) {
                        for (var id in this.cursors) {
                            if (id === cursorId) {
                                this.cursors[id]._setActive(true);
                            } else {
                                this.cursors[id]._setActive(false);
                            }
                        }
                    }
                },
                getAxisPosition: function () { return this.settings.axisPosition; },
                getAxisLabelDistance: function () { return this.settings.axisLabelDistance; },
                getAxisLabel: function () { return this.settings.axisLabel; },
                isEnabled: function () { return true; },
                currentFormat: function () { return 'mm:ss'; },
                getTickLabelRotation: function () { return '0deg'; },
                getTickLabelDistance: function () { return '9px'; },
                _getMinValue: function () { return (new Date('1969-12-31T23:10:00.000Z')); },
                _getMaxValue: function () { return (new Date('1969-12-31T23:11:00.000Z')); },
                _xPositions: function () { return _generateXPosition('Time', 'secondsTime'); },
                _registerGraphArraySize: function () { },
                _getAxisType: function () { return 'dateTime'; },
                _bind: function () { },
                setParentEnableState: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                },
                isVisible: function () { return true; }
            },

            xAxisOnlineTime: {
                settings: {
                    height: 50
                },
                cursors: [],
                _setActiveCursor: function (cursorId) {
                    if (cursorId) {
                        for (var id in this.cursors) {
                            if (id === cursorId) {
                                this.cursors[id]._setActive(true);
                            } else {
                                this.cursors[id]._setActive(false);
                            }
                        }
                    }
                },
                getAxisPosition: function () { return this.settings.axisPosition; },
                getAxisLabelDistance: function () { return this.settings.axisLabelDistance; },
                getAxisLabel: function () { return this.settings.axisLabel; },
                isEnabled: function () { return true; },
                currentFormat: function () { return 'mm:ss'; },
                getTickLabelRotation: function () { return '0deg'; },
                getTickLabelDistance: function () { return '9px'; },
                _getMinValue: function () { return (new Date('1969-12-31T23:10:00.000Z')); },
                _getMaxValue: function () { return (new Date('1969-12-31T23:11:00.000Z')); },
                _xPositions: function () { return _generateXPosition('Time', 'secondsTime'); },
                _registerGraphArraySize: function () { },
                _getAxisType: function () { return 'dateTime'; },
                getTimeSpan: function () { return 60; },
                _isDirty: function () { this.chartWidget._axisIsDirty(); },
                _bind: function () { },
                setParentEnableState: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                },
                isVisible: function () { return true; }
            },

            xAxisIndex: {
                settings: {
                    height: 50
                },
                cursors: [],
                _setActiveCursor: function (cursorId) {
                    if (cursorId) {
                        for (var id in this.cursors) {
                            if (id === cursorId) {
                                this.cursors[id]._setActive(true);
                            } else {
                                this.cursors[id]._setActive(false);
                            }
                        }
                    }
                },
                getAxisPosition: function () { return this.settings.axisPosition; },
                getAxisLabelDistance: function () { return this.settings.axisLabelDistance; },
                getAxisLabel: function () { return this.settings.axisLabel; },
                isEnabled: function () { return true; },
                currentFormat: function () { return { decimalPlaces: 0, minimumIntegerDigits: 1 }; },
                getTickLabelRotation: function () { return '0deg'; },
                getTickLabelDistance: function () { return '9px'; },
                _getMinValue: function () { return 17; },
                _getMaxValue: function () { return 28; },
                _xPositions: function () { return [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]; },
                _registerGraphArraySize: function () { },
                _getAxisType: function () { return 'index'; },
                _bind: function () { },
                setParentEnableState: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                },
                isVisible: function () { return true; }
            },

            yAxis: {
                settings: {
                    width: 60
                },
                getAxisPosition: function () { return this.settings.axisPosition; },
                getAxisLabelDistance: function () { return this.settings.axisLabelDistance; },
                getAxisLabel: function () { return this.settings.axisLabel; },
                currentFormat: function () { return { decimalPlaces: 1, minimumIntegerDigits: 1 }; },
                currentUnitSymbol: function () { return ''; },
                isEnabled: function () { return true; },
                minimum: function () { return 0; },
                maximum: function () { return 100; },
                getTickLabelRotation: function () { return '0deg'; },
                getTickLabelDistance: function () { return '9px'; },
                _isDirty: function () { },
                currentUnit: function () { return 'GRM'; },
                axisItems: [],
                _bind: function () { },
                setParentEnableState: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                },
                isVisible: function () { return true; }
            },

            xValues: {
                settings: {},
                _registerAxisWidget: function (widget) {
                    this.axisWidget = widget;
                },
                setParentEnableState: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                },
                isVisible: function () { return true; }
            },

            graphTimeAxis: {
                settings: {
                    minValue: 0,
                    maxValue: 100
                },
                isEnabled: function () { return true; },
                getCursorValue: function () {
                    return 49;
                },
                getMinValue: function () { return this.settings.minValue; },
                getMaxValue: function () { return this.settings.maxValue; },
                updateUnit: function () { 
                    
                    var deferredValueChange = $.Deferred();
                    
                    deferredValueChange.resolve();
                    
                    return deferredValueChange.promise();
                },
                _getIntersectionValue: function (xCoordinate) {
                    var xPositions = _generateXPosition('Time'),
                        data = _generateData.call(this);

                    switch (+xCoordinate) {
                        case +xPositions[0]:
                            return data[0];
                        case +xPositions[1]:
                            return data[1];
                        case +xPositions[2]:
                            return data[2];
                        case +xPositions[3]:
                            return data[3];
                        case +xPositions[4]:
                            return data[4];
                        case +xPositions[5]:
                            return data[5];
                        case +xPositions[6]:
                            return data[6];
                        case +xPositions[7]:
                            return data[7];
                        case +xPositions[8]:
                            return data[8];
                        case +xPositions[9]:
                            return data[9];
                        case +xPositions[10]:
                            return data[10];
                        case +xPositions[11]:
                            return data[11];
                    }
                },
                _coordinates: function () {
                    var data = _generateData.call(this),
                        xPositions = [],
                        coordinates = [];

                    if (/mock/.test(this.xAxisWidget.elem.id)) {
                        xPositions = _generateXPosition('Time');
                    } else {
                        if (this.xAxisWidget.data.maxArraySize !== data.length) {
                            this.xAxisWidget._registerGraphArraySize('mockTimeAxis', data.length);
                        }
                        xPositions = this.xAxisWidget._xPositions();
                    }

                    for (var i = 0; i < xPositions.length; i += 1) {
                        coordinates.push({
                            x: xPositions[i],
                            y: data[i]
                        });
                    }

                    return coordinates;
                },
                getInterpolationType: function () { return 'linear'; },
                getNumberOfSamples: function () { return 12; },
                getIntersectionPointSize: function () { return 10; },
                _getYValueFromXCoordinate: function (xCoordinate) { return this._getIntersectionValue(xCoordinate); },
                _bind: function () { },
                setParentEnableState: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                },
                isVisible: function () { return true; },
                getValue: function () { return _generateData.call(this); }
            },

            graphOnlineTimeAxis: {
                settings: {
                    minValue: 0,
                    maxValue: 100,
                    value: 0
                },
                data: {
                    minValue: _generateXPosition('Time')[0],
                    maxValue: _generateXPosition('Time')[_generateXPosition('Time').length - 1]
                },
                getMinValue: function () { return this.settings.minValue; },
                getMaxValue: function () { return this.settings.maxValue; },
                isEnabled: function () { return true; },
                _getYValueFromXCoordinate: function (xCoordinate) { return this._getIntersectionValue(xCoordinate); },
                _getMinTime: function () { return this.data.minValue; },
                _getMaxTime: function () { return this.data.maxValue; },
                _coordinates: function () {
                    var data = _generateData.call(this),
                        xPositions,
                        coordinates = [];

                    xPositions = _generateXPosition('Time');

                    for (var i = 0; i < xPositions.length; i += 1) {
                        coordinates.push({
                            x: xPositions[i],
                            y: data[i]
                        });
                    }

                    return coordinates;
                },
                updateBuffer: function () { },
                resetBuffer: function () { },
                updateUnit: function () {

                    var deferredValueChange = $.Deferred();

                    deferredValueChange.resolve();

                    return deferredValueChange.promise();
                },
                getInterpolationType: function () { return 'linear'; },
                getIntersectionPointSize: function () { return 10; },
                _bind: function () { },
                setParentEnableState: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                },
                isVisible: function () { return true; },
                getValue: function () { return _generateData.call(this); }
            },

            graphIndexAxis: {
                settings: {
                    minValue: 17,
                    maxValue: 27
                },
                isEnabled: function () { return true; },
                getCursorValue: function () {
                    return 49;
                },
                getMinValue: function () { return this.settings.minValue; },
                getMaxValue: function () { return this.settings.maxValue; },
                updateUnit: function () {

                    var deferredValueChange = $.Deferred();

                    deferredValueChange.resolve();

                    return deferredValueChange.promise();
                },
                _getIntersectionValue: function (xCoordinate) {
                    var xPositions = _generateXPosition('Index'),
                        data = _generateData.call(this);

                    switch (+xCoordinate) {
                        case +xPositions[0]:
                            return data[0];
                        case +xPositions[1]:
                            return data[1];
                        case +xPositions[2]:
                            return data[2];
                        case +xPositions[3]:
                            return data[3];
                        case +xPositions[4]:
                            return data[4];
                        case +xPositions[5]:
                            return data[5];
                        case +xPositions[6]:
                            return data[6];
                        case +xPositions[7]:
                            return data[7];
                        case +xPositions[8]:
                            return data[8];
                        case +xPositions[9]:
                            return data[9];
                        case +xPositions[10]:
                            return data[10];
                        case +xPositions[11]:
                            return data[11];
                    }
                },
                _coordinates: function () {
                    var data = _generateData.call(this),
                        xPositions,
                        coordinates = [];

                    if (/mock/.test(this.xAxisWidget.elem.id)) {
                        xPositions = _generateXPosition('Index');
                    } else {
                        if (this.xAxisWidget.data.maxArraySize !== data.length) {
                            this.xAxisWidget._registerGraphArraySize('mockIndexAxis', data.length);
                        }
                        xPositions = this.xAxisWidget._xPositions();
                    }

                    for (var i = 0; i < xPositions.length; i += 1) {
                        coordinates.push({
                            x: xPositions[i],
                            y: data[i]
                        });
                    }

                    return coordinates;
                },
                getInterpolationType: function () { return 'linear'; },
                getNumberOfSamples: function () { return 12; },
                getIntersectionPointSize: function () { return 10; },
                _getYValueFromXCoordinate: function (xCoordinate) { return this._getIntersectionValue(xCoordinate); },
                _bind: function () { },
                setParentEnableState: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                },
                isVisible: function () { return true; },
                getValue: function () { return _generateData.call(this); }
            },

            yValues: {
                settings: {},
                _bind: function () { },
                setParentEnableState: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                },
                isVisible: function () { return true; }
            },

            xCursorsTime: {
                settings: {
                    active: false
                },
                graphWidgets: [],
                isEnabled: function () {
                    return true;
                },
                getEnable: function () {
                    return true;
                },
                setValue: function () { },
                getValue: function () {
                    return this.settings.value;
                },
                _getValue: function () {

                    var tmpDate = new Date(this.settings.value);

                    tmpDate.setMinutes(tmpDate.getMinutes() + tmpDate.getTimezoneOffset());

                    return tmpDate;
                },
                _registerAxisWidget: function (widget) {
                    this.axisWidget = widget;
                },
                _getActive: function () {
                    return this.settings.active;
                },
                _setActive: function (activeState) {
                    this.settings.active = activeState;
                },
                _isDirty: function () {
                },
                _getMaxAvailableXPositionIndex: function () { return 12; },
                _updateValue: function (value) {
                    this.axisWidget._setActiveCursor(this.elem.id);
                },
                _bind: function () { },
                _getMaxDrawnXSampleIndex: function () { return 12; },
                setParentEnableState: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                },
                isVisible: function () { return true; },
                _getMaxNumberOfSamples: function () { return 12; }
            },

            xCursorsIndex: {
                settings: {
                    active: false
                },
                graphWidgets: [],
                isEnabled: function () {
                    return true;
                },
                getEnable: function () {
                    return true;
                },
                setValue: function () { },
                getValue: function () {
                    return this.settings.value;
                },
                _registerAxisWidget: function (widget) {
                    this.axisWidget = widget;
                },
                _getActive: function () {
                    return this.settings.active;
                },
                _setActive: function (activeState) {
                    this.settings.active = activeState;
                },
                _isDirty: function () {
                },
                _getMaxAvailableXPositionIndex: function () { return 12; },
                _getValue: function () {
                    return this.settings.value;
                },
                _updateValue: function (value) {
                    this.axisWidget._setActiveCursor(this.elem.id);
                },
                _bind: function () { },
                _getMaxDrawnXSampleIndex: function () { return 12; },
                setParentEnableState: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                },
                isVisible: function () { return true; },
                _getMaxNumberOfSamples: function () { return 12; }
            },

            xCursorMsTime: {
                settings: {
                    active: false
                },
                graphWidgets: [],
                isEnabled: function () {
                    return true;
                },
                getEnable: function () {
                    return true;
                },
                getValue: function () {
                    return this.settings.value;
                },
                _registerAxisWidget: function (widget) {
                    this.axisWidget = widget;
                },
                _getActive: function () {
                    return this.settings.active;
                },
                _setActive: function (activeState) {
                    this.settings.active = activeState;
                },
                _isDirty: function () {
                },
                _getMaxAvailableXPositionIndex: function () { return 12; },
                _getValue: function () {
                    return new Date(+this.axisWidget._getMinValue() + this.getValue());
                },
                _updateValue: function (value) {
                    this.axisWidget._setActiveCursor(this.elem.id);
                },
                _bind: function () { },
                _getMaxDrawnXSampleIndex: function () { return 12; },
                setParentEnableState: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                },
                isVisible: function () { return true; },
                _getMaxNumberOfSamples: function () { return 12; }
            }
        };

    function _generateXPosition(axisType, cursorType) {

        var positions;

        switch (axisType) {

            case 'Time':

                if (cursorType === 'secondsTime') {
                    positions = [
                        new Date('1969-12-31T23:10:00.000Z'),
                        new Date('1969-12-31T23:10:05.455Z'),
                        new Date('1969-12-31T23:10:10.909Z'),
                        new Date('1969-12-31T23:10:16.364Z'),
                        new Date('1969-12-31T23:10:21.818Z'),
                        new Date('1969-12-31T23:10:27.273Z'),
                        new Date('1969-12-31T23:10:32.727Z'),
                        new Date('1969-12-31T23:10:38.182Z'),
                        new Date('1969-12-31T23:10:43.636Z'),
                        new Date('1969-12-31T23:10:49.091Z'),
                        new Date('1969-12-31T23:10:54.545Z'),
                        new Date('1969-12-31T23:11:00.000Z')
                    ];
                    break;
                } else {
                    positions = [
                        new Date('1969-12-31T23:10:00.000Z'),
                        new Date('1969-12-31T23:10:05.455Z'),
                        new Date('1969-12-31T23:10:10.909Z'),
                        new Date('1969-12-31T23:10:16.364Z'),
                        new Date('1969-12-31T23:10:21.818Z'),
                        new Date('1969-12-31T23:10:27.273Z'),
                        new Date('1969-12-31T23:10:32.727Z'),
                        new Date('1969-12-31T23:10:38.182Z'),
                        new Date('1969-12-31T23:10:43.636Z'),
                        new Date('1969-12-31T23:10:49.091Z'),
                        new Date('1969-12-31T23:10:54.545Z'),
                        new Date('1969-12-31T23:11:00.000Z')
                    ];
                    break;
                }

            case 'Index':

                positions = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
                break;
        }

        return positions;
    }

    function _generateData() {
        var data = [],
            idx,
            temp = 0;

        idx = 2 * Number(this.elem.id.match(/(\d+)(?!.*\d)/)[0]);

        if (/Index/i.test(this.elem.id)) {
            idx += 1;
        }

        for (var i = 0; i < nPoints; i += 1) {
            data[i] = temp + 10 * idx;
            temp += 7;
        }

        return data;

    }

    return chartMock;

    //function _roundMag(number, magnitude) {

    //return (Math.round(number * Math.pow(10, -magnitude)) * Math.pow(10, magnitude));

    /*--------------------------------------------------------------------------------------
        | no longer used, since most of the code is using Math.round, that it is not compilant |
        | with any JS standard IEEE 754 but widely used                                        |
        --------------------------------------------------------------------------------------*/

    //// rounding from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round

    //number = (number instanceof Array) ? number : [number];

    //var neg;
    //number = number.map(function (d) {
    //    neg = false;

    //    if (d < 0) {
    //        d = -d;
    //        neg = true;
    //    }

    //    d = d.toString().split('e');
    //    d = Math.round(+(d[0] + 'e' + (d[1] ? (d[1] - magnitude) : -magnitude)));
    //    d = d.toString().split('e');
    //    d = +(d[0] + 'e' + (d[1] ? (d[1] + magnitude) : magnitude));

    //    return (neg) ? -d : d;
    //});

    //return (number.length === 1) ? number[0] : number;
    //}
});
