'use strict';
define(['brTest',
    'widgets/brXtended/common/libs/DataAdapter',
    'widgets/brXtended/common/libs/Renderer',
    'widgets/brXtended/common/libs/Test/mChartMockup',
    'widgets/brXtended/common/libs/Test/mSpecLoadCssGeneric',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function ({
    appElem,
    appView,
    callWidget,
    events: { BreaseEvent },
    enum: { Enum },
    controller: { uiController }
}, DataAdapter, Renderer, mChartMock, mLoadCssFiles) {

    var cssFiles = ['widgets/brease/LineChart/meta/LineChart_default.sass.css',
        'widgets/brease/LineChartGraph/meta/LineChartGraph_default.sass.css',
        'widgets/brease/LineChartIndexAxis/meta/LineChartIndexAxis_default.sass.css',
        'widgets/brease/LineChartTimeAxis/meta/LineChartTimeAxis_default.sass.css',
        'widgets/brease/LineChartXAxisIndexCursor/meta/LineChartXAxisIndexCursor_default.sass.css',
        'widgets/brease/LineChartXAxisTimeCursor/meta/LineChartXAxisTimeCursor_default.sass.css',
        'widgets/brease/LineChartYAxis/meta/LineChartYAxis_default.sass.css'];

    return {
        suite: function (chartItemType, widgets, widgetIds, className) {

            m.describe(true, 'Load CSS files for ' + className, mLoadCssFiles.suite, [cssFiles]);

            m.it(true, "widgets should dispatch a '" + BreaseEvent.WIDGET_READY + "'-event after they are instantiated", function () {
                var callback, containerDiv,
                    chartMock = mChartMock(widgets, chartItemType);

                return new Promise(function (resolve) {
                    function _widgetReadyHandler(e) {
                        if (Object.keys(chartMock.elem).indexOf(e.target.id) !== -1) {
    
                            var widget = callWidget(e.target.id, 'widget'),
                                chartMockInstance = [];
    
                            if (widget.elem.className.match(/ChartWidget/i)) {
                                chartMockInstance[widget.elem.id] = widget;
                            } else {
                                chartMockInstance[widget.elem.id] = $.extend(true, {}, chartMock.chart);
                                chartMockInstance[widget.elem.id].elem = chartMock.elem[widget.elem.id];
                                chartMockInstance[widget.elem.id].el = $(chartMock.elem[widget.elem.id]);
                            }
    
                            chartMockInstance[widget.elem.id].chartItems.xAxis[chartMock.xAxisTime.elem.id] = chartMock.xAxisTime;
                            chartMockInstance[widget.elem.id].chartItems.yAxis[chartMock.yAxis.elem.id] = chartMock.yAxis;
                            chartMockInstance[widget.elem.id].chartItems.xValues[chartMock.xValue.elem.id] = chartMock.xValue;
                            chartMockInstance[widget.elem.id].chartItems.yValues[chartMock.graphTimeAxis.elem.id] = chartMock.graphTimeAxis;
                            chartMockInstance[widget.elem.id].chartItems.xCursors[chartMock.xCursorTime.elem.id] = chartMock.xCursorTime;
                            chartMockInstance[widget.elem.id].chartItems.xCursors[chartMock.xCursorTime.elem.id]._registerAxisWidget(chartMock.xAxisTime);
    
                            if (/chart/ig.test(chartMock.chartItemsToTestType)) {
                                chartMockInstance[widget.elem.id].chartItems.xAxis[chartMock.xAxisTime.elem.id].cursors[chartMock.xCursorTime.elem.id] = chartMockInstance[widget.elem.id].chartItems.xCursors[chartMock.yAxis.elem.id];
                                chartMockInstance[widget.elem.id].chartItems.yValues[chartMock.graphTimeAxis.elem.id].axisWidget = chartMockInstance[widget.elem.id].chartItems.yAxis[chartMock.yAxis.elem.id];
                                chartMockInstance[widget.elem.id].chartItems.yValues[chartMock.graphTimeAxis.elem.id].xAxisWidget = chartMockInstance[widget.elem.id].chartItems.xAxis[chartMock.xAxisTime.elem.id];
    
                            } else if (/xAxis/ig.test(chartMock.chartItemsToTestType)) {
                                delete chartMockInstance[widget.elem.id].chartItems.xAxis[chartMock.xAxisTime.elem.id];
                                chartMockInstance[widget.elem.id].chartItems.xAxis[widget.elem.id] = widget;
                                chartMockInstance[widget.elem.id].chartItems.yValues[chartMock.graphTimeAxis.elem.id].axisWidget = chartMockInstance[widget.elem.id].chartItems.yAxis[chartMock.yAxis.elem.id];
                                chartMockInstance[widget.elem.id].chartItems.yValues[chartMock.graphTimeAxis.elem.id].xAxisWidget = chartMockInstance[widget.elem.id].chartItems.xAxis[chartMock.xAxisTime.elem.id];
                                
                            } else if (/yAxis/ig.test(chartMock.chartItemsToTestType)) {
                                delete chartMockInstance[widget.elem.id].chartItems.yAxis[chartMock.yAxis.elem.id];
                                chartMockInstance[widget.elem.id].chartItems.yAxis[widget.elem.id] = widget;
                                chartMockInstance[widget.elem.id].chartItems.xAxis[chartMock.xAxisTime.elem.id].cursors[chartMock.xCursorTime.elem.id] = chartMockInstance[widget.elem.id].chartItems.xCursors[chartMock.yAxis.elem.id];
                                chartMockInstance[widget.elem.id].chartItems.yValues[chartMock.graphTimeAxis.elem.id].axisWidget = chartMockInstance[widget.elem.id].chartItems.yAxis[chartMock.yAxis.elem.id];
                                chartMockInstance[widget.elem.id].chartItems.yValues[chartMock.graphTimeAxis.elem.id].xAxisWidget = chartMockInstance[widget.elem.id].chartItems.xAxis[chartMock.xAxisTime.elem.id];
    
                            } else if (/graphTime/ig.test(chartMock.chartItemsToTestType)) {
                                delete chartMockInstance[widget.elem.id].chartItems.yValues[chartMock.graphTimeAxis.elem.id];
                                chartMockInstance[widget.elem.id].chartItems.yValues[widget.elem.id] = widget;
                                chartMockInstance[widget.elem.id].chartItems.xAxis[chartMock.xAxisTime.elem.id].cursors[chartMock.xCursorTime.elem.id] = chartMockInstance[widget.elem.id].chartItems.xCursors[chartMock.yAxis.elem.id];
                                chartMockInstance[widget.elem.id].chartItems.xCursors[chartMock.xCursorTime.elem.id]._registerAxisWidget(chartMock.xAxisTime);
                                widget.xAxisWidget = chartMock.xAxisTime;
                                widget.xAxisWidget.cursors[chartMock.xCursorTime.elem.id] = chartMock.xCursorTime;
                                widget._registerAxisWidget(chartMock.yAxis);
                                    
                            } else if (/xCursor/ig.test(chartMock.chartItemsToTestType)) {
                                delete chartMockInstance[widget.elem.id].chartItems.xCursors[chartMock.xCursorTime.elem.id];
                                chartMockInstance[widget.elem.id].chartItems.xCursors[widget.elem.id] = widget;
                                widget._registerAxisWidget(chartMock.xAxisTime);
                                widget.graphWidgets[chartMock.graphTimeAxis.elem.id] = chartMockInstance[widget.elem.id].chartItems.yValues[chartMock.graphTimeAxis.elem.id];
                                chartMockInstance[widget.elem.id].chartItems.xAxis[chartMock.xAxisTime.elem.id].cursors[chartMock.xCursorTime.elem.id] = chartMockInstance[widget.elem.id].chartItems.xCursors[chartMock.yAxis.elem.id];
                                chartMockInstance[widget.elem.id].chartItems.yValues[chartMock.graphTimeAxis.elem.id].axisWidget = chartMockInstance[widget.elem.id].chartItems.yAxis[chartMock.yAxis.elem.id];
                                chartMockInstance[widget.elem.id].chartItems.yValues[chartMock.graphTimeAxis.elem.id].xAxisWidget = chartMockInstance[widget.elem.id].chartItems.xAxis[chartMock.xAxisTime.elem.id];
                            }
                                
                            if (!widget.elem.className.match(/ChartWidget/i)) {
                                widget._registerChartWidget(chartMockInstance[widget.elem.id]);
                            }
    
                            chartMockInstance[widget.elem.id].dataAdapter = new DataAdapter(chartMockInstance[widget.elem.id]);
                            chartMockInstance[widget.elem.id].renderer = new Renderer(chartMockInstance[widget.elem.id]);
    
                            if (/xAxis/ig.test(chartMock.chartItemsToTestType)) {
                                widget.setStyle(widget.settings.style);
                            } else {
                                $('#' + chartMockInstance[widget.elem.id].elem.id).find('#' + chartMock.xAxisTime.elem.id + '_breaseChartXAxis').addClass('widgets_brease_LineChartTimeAxis_style_default');
                            }
                            if (/yAxis/ig.test(chartMock.chartItemsToTestType)) {
                                widget.setStyle(widget.settings.style);
                            } else {
                                $('#' + chartMockInstance[widget.elem.id].elem.id).find('#' + chartMock.yAxis.elem.id + '_breaseChartYAxis').addClass('widgets_brease_LineChartYAxis_style_default');
                            }
                            if (/graph/ig.test(chartMock.chartItemsToTestType)) {
                                widget.setStyle(widget.settings.style);
                            } else {
                                $('#' + chartMockInstance[widget.elem.id].elem.id).find('#' + chartMock.graphTimeAxis.elem.id + '_breaseChartYValueList').addClass('widgets_brease_LineChartGraph_style_default');
                            }
                            if (/xCursor/ig.test(chartMock.chartItemsToTestType)) {
                                widget.setStyle(widget.settings.style);
                            } else {
                                $('#' + chartMockInstance[widget.elem.id].elem.id).find('#' + chartMock.graphTimeAxis.elem.id + '_breaseChartXAxisCursor').addClass('widgets_brease_LineChartXAxisTimeCursor_style_default');
                            }
    
                            chartMockInstance[widget.elem.id].dataAdapter.updateScales();
                            chartMockInstance[widget.elem.id].dataAdapter.updateGraphData();
                            chartMockInstance[widget.elem.id].dataAdapter.updateCursor();
                            chartMockInstance[widget.elem.id].renderer.updateAxis();
                            chartMockInstance[widget.elem.id].renderer.updateGraphs();
                            chartMockInstance[widget.elem.id].renderer.updateCursor();
    
                            callback();
                            if (callback.calls.count() >= chartMock.chartItemsToTest.length) {
                                appElem.removeEventListener(BreaseEvent.WIDGET_READY, _widgetReadyHandler);
                                resolve();
                            }
                        }
                    }
                    callback = jasmine.createSpy();
                    appElem.addEventListener(BreaseEvent.WIDGET_READY, _widgetReadyHandler);

                    appView.css('height', 'auto');

                    containerDiv = $('<div id="' + className + '_container" style="overflow:hidden;height:auto" />').appendTo(appElem);

                    for (var i = 0; i < chartMock.chartItemsToTest.length; i += 1) {
                        var targetInstance = $(chartMock.elem[chartMock.chartItemsToTest[i].id]).appendTo(containerDiv),
                            widget = chartMock.chartItemsToTest[i];

                        uiController.createWidgets(targetInstance, [widget], true);
                    }
                })
                    .then(function () {
                        expect(callback).toHaveBeenCalledTimes(chartMock.chartItemsToTest.length);
                    });

            }, [widgets, chartItemType]);
        }
    };

});
