define(['widgets/brXtended/common/libs/Test/mChartMockupBasic'], function (chartMockupBasic) {

    'use strict';

    // chartFamily:
    // will be LineChart or OnlineChart or XYChart or YTChart and so on...

    // designInput:
    // is an object with properties for each chart item with the same structure:
    //
    //      chartItem: { type, quantity, options }
    //
    // following the expected chart items:
    //      xAxis, yAxis, yValues, xValues, xCursors
    // if an item is missing, following default values are filled (value in brackets are default values):
    //
    //  xAxis:  type: Index, (Time),
    //          quantity: 1,
    //          options: {}
    //
    //  yAxis:  quantity: 1,
    //          options: {}
    //
    //  yValues: quantity: 1,
    //          options: {}
    //
    //  xValues: quantity: 1,
    //          options: {}
    //
    //  xCursors: type: Index, (Time)
    //           quantity: 1,
    //           options: {}

    return function (chartFamily, designInput) {

        var chartMockup = _generateChartMockupStructure(chartFamily, designInput);

        return chartMockup;

    };

    function _generateChartMockupStructure(chartFamily, designInput) {

        var chartMockup = {
                chart: {},
                xAxis: [],
                yAxis: [],
                xValues: [],
                yValues: [],
                xCursors: [],
                elem: []
            },
            designDefault = {
                xAxis: {
                    type: ['Time'],
                    quantity: 1,
                    options: {}
                },
                yAxis: {
                    quantity: 1,
                    options: {}
                },
                yValues: {
                    type: ['Time'],
                    quantity: 1,
                    options: {
                        xAxisRefId: [0],
                        yAxisRefId: [0]
                    }
                },
                xValues: {
                    quantity: 1,
                    options: {}
                },
                xCursors: {
                    type: ['Time'],
                    quantity: 1,
                    options: {}
                }
            },

            design = $.extend(true, {}, designDefault, designInput);

        // build chart object
        chartMockup.chart = $.extend(true, {}, ((chartFamily === 'LineChart') ? chartMockupBasic.chart : chartMockupBasic.chartOnline));

        buildStructureXAxis(chartFamily, chartMockupBasic, chartMockup, design);
        buildStructureYAxis(chartFamily, chartMockupBasic, chartMockup, design);
        buildStructureXValue(chartFamily, chartMockupBasic, chartMockup, design);
        buildStructureYValue(chartFamily, chartMockupBasic, chartMockup, design);
        if (chartFamily !== 'OnlineChart') {
            buildStructureXCursor(chartFamily, chartMockupBasic, chartMockup, design);
        }

        return chartMockup;
    }

    function buildStructureXAxis(chartFamily, chartMockupBasic, chartMockup, design) {
        // build xAxis structure
        var cntTime = 0, cntIndex = 0;
        for (var i = 0; i < design.xAxis.quantity; i += 1) {

            var elem, itemId;

            switch (design.xAxis.type[i]) {
                case 'Time':
                case 'OnlineTime':
                    itemId = 'mockXAxis' + design.xAxis.type[i] + cntTime;
                    cntTime += 1;
                    break;

                case 'Index':
                    itemId = 'mockXAxis' + design.xAxis.type[i] + cntIndex;
                    cntIndex += 1;
                    break;

                case 'w':
                    itemId = 'wut';
                    chartMockup.xAxis[itemId] = {};
                    chartMockup.xAxis[itemId].__index__ = i;
                    continue;

                default:
                    continue;
            }

            elem = $('<div id="' + itemId + '" class="widgets_brease_' + chartFamily + design.xAxis.type[i] + 'Axis_style_default"/>').get(0);

            chartMockup.xAxis[itemId] = $.extend(true, {}, chartMockupBasic['xAxis' + design.xAxis.type[i]]);
            chartMockup.xAxis[itemId].elem = elem;
            chartMockup.xAxis[itemId].el = $(chartMockup.xAxis[itemId].elem);

            for (var prop in design.xAxis.options) {
                chartMockup.xAxis[itemId].settings[prop] = design.xAxis.options[prop][i];
            }

            chartMockup.xAxis[itemId].__index__ = i;
        }
    }

    function buildStructureYAxis(chartFamily, chartMockupBasic, chartMockup, design) {

        //build yAxis structure
        for (var i = 0; i < design.yAxis.quantity; i += 1) {

            if (design.yAxis.hasOwnProperty('type')) {
                switch (design.yAxis.type[i]) {
                    case 'w':
                        let itemId = 'wut';
                        chartMockup.yAxis[itemId] = {};
                        chartMockup.yAxis[itemId].__index__ = i;
                        continue;
                }

            }

            var itemId = 'mockYAxis' + i,
                elem = $('<div id="' + itemId + '" class="widgets_brease_' + chartFamily + 'YAxis_style_default"/>').get(0);

            chartMockup.yAxis[itemId] = $.extend(true, {}, chartMockupBasic['yAxis']);
            chartMockup.yAxis[itemId].elem = elem;
            chartMockup.yAxis[itemId].el = $(chartMockup.yAxis[itemId].elem);

            for (var prop in design.yAxis.options) {
                chartMockup.yAxis[itemId].settings[prop] = design.yAxis.options[prop][i];
            }

            chartMockup.yAxis[itemId].__index__ = i;
        }
    }

    function buildStructureXValue(chartFamily, chartMockupBasic, chartMockup, design) {

        //build xValues structure
        for (var i = 0; i < design.xValues.quantity; i += 1) {

            if (design.xValues.hasOwnProperty('type')) {
                switch (design.yAxis.type[i]) {
                    case 'w':
                        let itemId = 'wut';
                        chartMockup.xValues[itemId] = {};
                        chartMockup.xValues[itemId].__index__ = i;
                        continue;
                }

            }

            var itemId = 'mockXValues' + i,
                elem = $('<div id="' + itemId + '" class="widgets_brease_' + chartFamily + 'XValue_style_default"/>').get(0);

            chartMockup.xValues[itemId] = $.extend(true, {}, chartMockupBasic['xValues']);
            chartMockup.xValues[itemId].elem = elem;
            chartMockup.xValues[itemId].el = $(chartMockup.xValues[itemId].elem);

            for (var prop in design.xValues.options) {
                switch (prop) {
                    case 'xAxisRefId':
                        for (var id in chartMockup.xAxis) {
                            if (chartMockup.xAxis[id].__index__ === design.xValues.options[prop][i]) {
                                chartMockup.xValues[itemId].xAxisRefId = id;
                                break;
                            }
                        }
                        break;

                    default:
                        chartMockup.xValues[itemId].settings[prop] = design.xValues.options[prop][i];
                }
            }

            chartMockup.xValues[itemId].__index__ = i;
        }
    }

    function buildStructureYValue(chartFamily, chartMockupBasic, chartMockup, design) {

        // build graph structure
        var cntY = 0, cntTime = 0, cntIndex = 0;
        for (var i = 0; i < design.yValues.quantity; i += 1) {

            var elem, itemId;

            switch (design.yValues.type[i]) {

                case 'Time':
                case 'OnlineTime':
                case 'Index':                

                    var cntAxis = (/time/i.test(design.yValues.type[i])) ? cntTime : cntIndex;

                    itemId = 'mockGraph' + design.yValues.type[i] + 'Axis' + cntAxis;
                    elem = $('<div id="' + itemId + '" class="widgets_brease_' + chartFamily + 'Graph_style_default"/>').get(0);
                    chartMockup.yValues[itemId] = $.extend(true, {}, chartMockupBasic['graph' + design.yValues.type[i] + 'Axis']);

                    if (/time/i.test(design.yValues.type[i])) {
                        cntTime += 1;
                    } else if (design.yValues.type[i] === 'Index') {
                        cntIndex += 1;
                    }
                    break;

                case 'y':
                    itemId = 'mockYValues' + cntY;
                    elem = $('<div id="' + itemId + '" class="widgets_brease_' + chartFamily + 'YValues_style_default"/>').get(0);
                    chartMockup.yValues[itemId] = $.extend(true, {}, chartMockupBasic['yValues']);

                    cntY += 1;
                    break;

                case 'w':
                    itemId = 'wut';
                    chartMockup.yValues[itemId] = {};
                    chartMockup.yValues[itemId].__index__ = i;
                    continue;
            }

            chartMockup.yValues[itemId].elem = elem;
            chartMockup.yValues[itemId].el = $(chartMockup.yValues[itemId].elem);

            for (var prop in design.yValues.options) {
                switch (prop) {
                    case 'xAxisRefId':
                        for (let id in chartMockup.xAxis) {
                            if (chartMockup.xAxis[id].__index__ === design.yValues.options[prop][i]) {
                                chartMockup.yValues[itemId].settings[prop] = id;
                                chartMockup.yValues[itemId].xAxisWidget = chartMockup.xAxis[id];
                                break;
                            }
                        }
                        break;

                    case 'yAxisRefId':
                        for (let id in chartMockup.yAxis) {
                            if (chartMockup.yAxis[id].__index__ === design.yValues.options[prop][i]) {
                                chartMockup.yValues[itemId].axisWidget = chartMockup.yAxis[id];
                                break;
                            }
                        }
                        break;

                    case 'xValuesRefId':
                        for (var id in chartMockup.yAxis) {
                            if (chartMockup.xValues[id].__index__ === design.yValues.options[prop][i]) {
                                chartMockup.yValues[itemId].settigns[prop] = id;
                                break;
                            }
                        }
                        break;

                    default:
                        chartMockup.yValues[itemId].settings[prop] = design.yValues.options[prop][i];
                }
            }

            chartMockup.yValues[itemId].__index__ = i;
        }
    }

    function buildStructureXCursor(chartFamily, chartMockupBasic, chartMockup, design) {
        // build cursors structure
        var cntTime = 0, cntIndex = 0;
        for (var i = 0; i < design.xCursors.quantity; i += 1) {

            var elem, itemId, prop;

            switch (design.xCursors.type[i]) {

                case 'Time':
                    itemId = 'mockXCursors' + design.xCursors.type[i] + cntTime;
                    cntTime += 1;
                    break;

                case 'Index':
                    itemId = 'mockXCursors' + design.xCursors.type[i] + cntIndex;
                    cntIndex += 1;
                    break;

                case 'w':
                    itemId = 'wut';
                    chartMockup.xCursors[itemId] = {
                        settings: {}
                    };
                    for (let id in chartMockup.xAxis) {
                        if (chartMockup.xAxis[id].__index__ === design.xCursors.options[prop][i]) {
                            chartMockup.xCursors[itemId].settings['xAxisRefId'] = id;
                            break;
                        }
                    }

                    chartMockup.xCursors[itemId].__index__ = i;

                    continue;
                default:
                    console.log('xCursors building error: wrong xCursors type. Index: ', i);
                    continue;
            }

            elem = $('<div id="' + itemId + '" class="widgets_brease_' + chartFamily + design.xCursors.type[i] + 'Cursor_style_default"/>').get(0);

            chartMockup.xCursors[itemId] = $.extend(true, {}, chartMockupBasic['xCursors' + design.xCursors.type[i]]);
            chartMockup.xCursors[itemId].elem = elem;
            chartMockup.xCursors[itemId].el = $(chartMockup.xCursors[itemId].elem);

            for (prop in design.xCursors.options) {
                switch (prop) {
                    case 'xAxisRefId':
                        for (var id in chartMockup.xAxis) {
                            if (chartMockup.xAxis[id].__index__ === design.xCursors.options[prop][i]) {
                                chartMockup.xCursors[itemId].settings[prop] = id;
                                break;
                            }
                        }
                        break;

                    default:
                        chartMockup.xCursors[itemId].settings[prop] = design.xCursors.options[prop][i];
                }
            }

            // look for yValues with the same xAxisRefId and register them. Exclude wut
            Object.keys(chartMockup.yValues)
                .filter(function (yValuesId) {
                    return yValuesId !== 'wut';
                })
                .forEach(function (yValuesId) {
                    if (design.xCursors.options.xAxisRefId[i] === chartMockup.yValues[yValuesId].xAxisWidget.__index__) {
                        chartMockup.xCursors[itemId].graphWidgets[yValuesId] = chartMockup.yValues[yValuesId];
                    }
                });

            chartMockup.xCursors[itemId].__index__ = i;
        }
    }
});
