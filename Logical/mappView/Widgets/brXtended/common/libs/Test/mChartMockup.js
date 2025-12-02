// chart mockup
// coordinates:
//          xPositionsTime                  xPosition(Pixels)          yValues              yValue (pixels)
// 1  Date('1969-12-31T23:10:00.000Z')              0                       0                       350
// 2  Date('1969-12-31T23:10:06.000Z')             63                       7                       325.5
// 3  Date('1969-12-31T23:10:12.000Z')            126                      14                       301
// 4  Date('1969-12-31T23:10:18.000Z')            189                      21                       276.5
// 5  Date('1969-12-31T23:10:24.000Z')            252                      28                       252
// 6  Date('1969-12-31T23:10:30.000Z')            315                      35                       227.5
// 7  Date('1969-12-31T23:10:36.000Z')            378                      42                       203
// 8  Date('1969-12-31T23:10:42.000Z')            441                      49                       178.5
// 9  Date('1969-12-31T23:10:48.000Z')            504                      56                       154
//10  Date('1969-12-31T23:10:54.000Z')            567                      63                       129.5
//11  Date('1969-12-31T23:11:00.000Z')            630                      70                       105

//         xPositionsIndex                  xPosition(Pixels)          yValues              yValue (pixels)
// 1              17                                0                       0                       350
// 2              18                               63                       7                       325.5
// 3              19                              126                      14                       301
// 4              20                              189                      21                       276.5
// 5              21                              252                      28                       252
// 6              22                              315                      35                       227.5
// 7              23                              378                      42                       203
// 8              24                              441                      49                       178.5
// 9              25                              504                      56                       154
//10              26                              567                      63                       129.5
//11              27                              630                      70                       105

// y-axis
// unit: 'GRM', unit symbol: 'g'
'use strict';
define(['brTest'], function ({ callWidget }) {

    return function (chartItemArray, type) {

        var chartMock = {
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
                getInfiniteScroll: function () { return true; },
                getZoomType: function () { return 'xy'; }
            },

            xAxisTime: {
                el: $('<div id="xAxisTime" [data-brease-widget]="widgets/brease/ChartXAxisWidget" class="breaseChartXAxisWidget widgets_brease_LineChartTimeAxis_style_default"/>'),
                elem: $('<div id="xAxisTime" [data-brease-widget]="mock" class="breaseChartXAxisWidget widgets_brease_LineChartTimeAxis_style_default"/>')[0],
                settings: {
                    height: 60
                },
                cursors: [],
                _setActiveCursor: function (cursorId) {
                    if (cursorId) {
                        callWidget(cursorId, '_setActive', true);
                    }
                },
                getAxisPosition: function () { return 'bottom'; },
                getAxisLabelDistance: function () { return 45; },
                getAxisLabel: function () { return ''; },
                isEnabled: function () { return true; },
                currentFormat: function () { return 'mm:ss'; },
                getTickLabelDistance: function () { return '9px'; },
                getTickLabelRotation: function () { return '0deg'; },
                _getMinValue: function () { return (new Date('1969-12-31T23:10:00.000Z')); },
                _getMaxValue: function () { return (new Date('1969-12-31T23:11:00.000Z')); },
                _xPositions: function () { return _generateXPosition(); },
                _registerGraphArraySize: function () { },
                _registerChartWidget: function () { },
                _chartItemsReadyHandler: function () { },
                setStyle: function () { },
                _getAxisType: function () { return 'dateTime'; },
                allChartItemsInitializedDeferred: $.Deferred(),
                getTimeSpan: function () { return 60; },
                _bind: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                }

            },

            xAxisIndex: {
                el: $('<div id="xAxisIndex" [data-brease-widget]="mock" class="breaseChartXAxisWidget widgets_brease_LineChartIndexAxis_style_default"/>'),
                elem: $('<div id="xAxisIndex" [data-brease-widget]="mock" class="breaseChartXAxisWidget widgets_brease_LineChartIndexAxis_style_default"/>')[0],
                settings: {
                    height: 60
                },
                cursors: [],
                _setActiveCursor: function (cursorId) {
                    if (cursorId) {
                        callWidget(cursorId, '_setActive', true);
                    }
                },
                getAxisPosition: function () { return 'bottom'; },
                getAxisLabelDistance: function () { return 45; },
                getAxisLabel: function () { return ''; },
                isEnabled: function () { return true; },
                getTickLabelDistance: function () { return '9px'; },
                getTickLabelRotation: function () { return '0deg'; },
                _getMinValue: function () { return 17; },
                _getMaxValue: function () { return 27; },
                _xPositions: function () { return [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]; },
                _registerGraphArraySize: function () { },
                _registerChartWidget: function () { },
                _chartItemsReadyHandler: function () { },
                setStyle: function () { },
                _getAxisType: function () { return 'index'; },
                allChartItemsInitializedDeferred: $.Deferred(),
                _bind: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                }
            },

            yAxis: {
                el: $('<div id="yAxis" [data-brease-widget]="mock" class="breaseChartYAxisWidget widgets_brease_LineChartYAxis_style_default"/>'),
                elem: $('<div id="yAxis" [data-brease-widget]="mock" class="breaseChartYAxisWidget widgets_brease_LineChartYAxis_style_default"/>')[0],
                settings: {
                    width: 60
                },
                getAxisPosition: function () { return 'left'; },
                getAxisLabelDistance: function () { return 45; },
                getAxisLabel: function () { return ''; },
                currentFormat: function () { return { decimalPlaces: 1, minimumIntegerDigits: 1 }; },
                currentUnitSymbol: function () { return ''; },
                isEnabled: function () { return true; },
                minimum: function () { return 0; },
                maximum: function () { return 100; },
                getTickLabelDistance: function () { return '9px'; },
                getTickLabelRotation: function () { return '0deg'; },
                _isDirty: function () { },
                currentUnit: function () { return 'GRM'; },
                _registerChartWidget: function () { },
                _chartItemsReadyHandler: function () { },
                setStyle: function () { },
                allChartItemsInitializedDeferred: $.Deferred(),
                measurementExternalDeferredObject: $.Deferred(),
                measurementSystemChanged: function () { return this.measurementExternalDeferredObject.promise(); },
                _bind: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                }
            },

            xValue: {
                el: $('<div id="xValue" [data-brease-widget]="mock" class="breaseChartXValueListWidget"/>'),
                elem: $('<div id="xValue" [data-brease-widget]="mock" class="breaseChartXValueListWidget"/>')[0],
                settings: {},
                _registerChartWidget: function () { },
                _chartItemsReadyHandler: function () { },
                setStyle: function () { },
                setTriggerTime: function () { },
                setValue: function () { },
                allChartItemsInitializedDeferred: $.Deferred(),
                _bind: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                }
            },

            graphTimeAxis: {
                el: $('<div id="graphTimeAxis" [data-brease-widget]="mock" class="breaseChartYValueListWidget widgets_brease_LineChartGraph_style_default"/>'),
                elem: $('<div id="graphTimeAxis" [data-brease-widget]="mock" class="breaseChartYValueListWidget widgets_brease_LineChartGraph_style_default"/>')[0],
                settings: {
                    minValue: 0,
                    maxValue: 20
                },
                isEnabled: function () { return true; },
                getCursorValue: function () {
                    return 49;
                },
                _getIntersectionValue: function (xCoordinate) {
                    var xPositions = _generateXPosition(),
                        data = _generateData();

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
                    }
                },
                _coordinates: function () {
                    var data = _generateData(),
                        xPositions = _generateXPosition(),
                        coordinates = [];

                    for (var i = 0; i < xPositions.length; i += 1) {
                        coordinates.push({
                            x: xPositions[i],
                            y: data[i]
                        });
                    }

                    return coordinates;
                },
                _registerChartWidget: function () { },
                _chartItemsReadyHandler: function () { },
                setStyle: function () { },
                setValue: function () { },
                getValue: function () { return _generateData(); },
                getIntersectionPointSize: function () { return 10; },
                _getYValueFromXCoordinate: function (xCoordinate) { return this._getIntersectionValue(xCoordinate); },
                allChartItemsInitializedDeferred: $.Deferred(),
                updateBuffer: function () { },
                resetBuffer: function () { },
                isVisible: function () { return true; },
                getNumberOfSamples: function () { return -1; },
                _bind: function () { },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                }
            },

            graphIndexAxis: {
                el: $('<div id="graphIndexAxis" [data-brease-widget]="mock" class="breaseChartYValueListWidget widgets_brease_LineChartGraph_style_default"/>'),
                elem: $('<div id="graphIndexAxis" [data-brease-widget]="mock" class="breaseChartYValueListWidget widgets_brease_LineChartGraph_style_default"/>')[0],
                settings: {
                    minValue: 0,
                    maxValue: 20
                },
                isEnabled: function () { return true; },
                getCursorValue: function () {
                    return 49;
                },
                _getIntersectionValue: function (xCoordinate) {
                    var xPositions = _generateXPosition(),
                        data = _generateData();

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
                    }
                },
                _coordinates: function () {
                    var data = _generateData(),
                        xPositions = _generateXPosition(),
                        coordinates = [];

                    for (var i = 0; i < xPositions.length; i += 1) {
                        coordinates.push({
                            x: xPositions[i],
                            y: data[i]
                        });
                    }

                    return coordinates;
                },
                _registerChartWidget: function () { },
                _chartItemsReadyHandler: function () { },
                setStyle: function () { },
                allChartItemsInitializedDeferred: $.Deferred(),
                updateBuffer: function () { },
                getNumberOfSamples: function () { return -1; },
                getValue: function () { return _generateData(); },
                getIntersectionPointSize: function () { return 10; },
                isVisible: function () { return true; },
                _getYValueFromXCoordinate: function (xCoordinate) { return this._getIntersectionValue(xCoordinate); },
                _bind: function () { },
                _getMaxDrawnXSampleIndex: function () { return 11; },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                }
            },

            xCursorTime: {
                el: $('<div id="xCursorTime" [data-brease-widget]="mock" class="breaseChartXAxisCursorWidget widgets_brease_LineChartXAxisTimeCursor_style_default"/>'),
                elem: $('<div id="xCursorTime" [data-brease-widget]="mock" class="breaseChartXAxisCursorWidget widgets_brease_LineChartXAxisTimeCursor_style_default"/>')[0],
                settings: {},
                isEnabled: function () {
                    return true;
                },
                getEnable: function () {
                    return true;
                },
                getValue: function () {
                    return 5;
                },
                setValue: function () {},
                _getValue: function () {
                    return (new Date('1969-12-31T23:10:18.000Z'));
                },
                _registerAxisWidget: function (widget) {
                    this.axisWidget = widget;
                },
                _getActive: function () {
                    return true;
                },
                _isDirty: function () {
                },
                _registerChartWidget: function () { },
                setStyle: function () { },
                _getMaxAvailableXPositionIndex: function () { return this.axisWidget._xPositions().length - 1; },
                allChartItemsInitializedDeferred: $.Deferred(),
                _bind: function () { },
                _setActive: function () { },
                _getMaxDrawnXSampleIndex: function () { return 11; },
                _getInitializationPromise: function () {
                    var def = $.Deferred();
                    def.resolve();
                    return def.promise();
                },
                _getMaxNumberOfSamples: function () { return 11; },
                isVisible: function () { return true; }
            },

            xCursorIndex: {
                el: $('<div id="xCursorIndex" [data-brease-widget]="mock" class="breaseChartXAxisCursorWidget widgets_brease_LineChartXAxisIndexCursor_style_default"/>'),
                elem: $('<div id="xCursorIndex" [data-brease-widget]="mock" class="breaseChartXAxisCursorWidget widgets_brease_LineChartXAxisIndexCursor_style_default"/>')[0],
                settings: {},
                setValue: function () {},
                _registerChartWidget: function () { },
                _chartItemsReadyHandler: function () { },
                setStyle: function () { },
                _getMaxAvailableXPositionIndex: function () { return this.axisWidget._xPositions().length - 1; },
                allChartItemsInitializedDeferred: $.Deferred(),
                _bind: function () { },
                _setActive: function () { },
                _getMaxDrawnXSampleIndex: function () { return 11; }
            },
            elem: [],
            _getInitializationPromise: function () {
                var def = $.Deferred();
                def.resolve();
                return def.promise();
            },
            _getMaxNumberOfSamples: function () { return 11; },
            isVisible: function () { return true; }
        };

        chartMock.chartItemsToTest = chartItemArray;
        chartMock.chartItemsToTestType = type;

        _generateChartMockupHtmls(chartMock);

        return chartMock;
    };

    function _generateChartMockupHtmls(chartMock) {

        for (var i = 0; i < chartMock.chartItemsToTest.length; i += 1) {
            chartMock.elem[chartMock.chartItemsToTest[i].id] = $('<div id="lineChartMockup_' + chartMock.chartItemsToTest[i].id + '" class="widgets_brease_LineChart_style_default"/>')[0];
        }

    }

    // Generate 1 point every 6 seconds over a time range of 60 seconds -> 11 points
    function _generateXPosition() {
        var startTime = new Date('1969-12-31T23:10:00.000Z'),
            stopTime = new Date('1969-12-31T23:11:00.000Z'),
            period = 6000,
            temp = startTime,
            positions = [];

        do {
            positions.push(temp);
            temp = new Date(temp.getTime() + period);

        } while (temp <= stopTime);

        return positions;
    }

    function _generateData() {
        var xPositionLength = _generateXPosition().length,
            data = [],
            temp = 0;

        for (var i = 0; i < xPositionLength; i += 1) {
            data[i] = temp;
            temp += 7;
        }

        return data;
    }
});
