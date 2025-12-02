'use strict';
define([
    'brTest',
    'widgets/brXtended/common/libs/DataAdapter',
    'widgets/brXtended/common/libs/Renderer',
    'widgets/brXtended/common/libs/Test/mChartBuildMockup',
    'widgets/brXtended/common/libs/Test/mSpecLoadCssGeneric',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function ({
    appElem,
    appView,
    callWidget,
    events: { BreaseEvent },
    enum: { Enum },
    controller: { uiController }
}, DataAdapter, Renderer, mChartBuildMock, mLoadCss) {

    var cssFilesLineChart = ['widgets/brease/LineChart/meta/LineChart_default.sass.css',
            'widgets/brease/LineChartGraph/meta/LineChartGraph_default.sass.css',
            'widgets/brease/LineChartYAxis/meta/LineChartYAxis_default.sass.css',
            'widgets/brease/LineChartIndexAxis/meta/LineChartIndexAxis_default.sass.css',
            'widgets/brease/LineChartTimeAxis/meta/LineChartTimeAxis_default.sass.css',
            'widgets/brease/LineChartXAxisIndexCursor/meta/LineChartXAxisIndexCursor_default.sass.css',
            'widgets/brease/LineChartXAxisTimeCursor/meta/LineChartXAxisTimeCursor_default.sass.css'],
        cssFilesOnlineChart = ['widgets/brease/OnlineChart/meta/OnlineChart_default.sass.css',
            'widgets/brease/OnlineChartGraph/meta/OnlineChartGraph_default.sass.css',
            'widgets/brease/OnlineChartYAxis/meta/OnlineChartYAxis_default.sass.css',
            'widgets/brease/OnlineChartTimeAxis/meta/OnlineChartTimeAxis_default.sass.css'],
        cssFiles;

    var out = {
        suite: function (chartFamily, chartItemType, design, widgets, className, loadCSSFlag) {

            var widgetIds = widgets.map(function (d) {
                return d.id;
            });

            cssFiles = (chartFamily === 'LineChart') ? cssFilesLineChart : cssFilesOnlineChart;

            m.describe(loadCSSFlag, 'Loading css default files for chartMockup', mLoadCss.suite, [cssFiles]);

            m.it(true, "widgets should dispatch a '" + BreaseEvent.WIDGET_READY + "'-event after they are instantiated", function () {
                var callback, containerDiv, targetInstance = [];
                
                return new Promise(function (resolve) {
                    callback = jasmine.createSpy();
                    var listener = function (e) {
                        _widgetReadyHandler(e);
                        if (callback.calls.count() >= widgets.length) {
                            appElem.removeEventListener(BreaseEvent.WIDGET_READY, listener);
                            resolve();
                        }
                    };
                    appElem.addEventListener(BreaseEvent.WIDGET_READY, listener);
                    console.time('[widget instantiation]');

                    appView.css('height', 'auto');

                    containerDiv = $('<div id="' + className + '_container" style="overflow:hidden;height:auto" />').appendTo(appElem);

                    for (var i = 0; i < widgets.length; i += 1) {

                        if (chartItemType === 'chart') {
                            targetInstance[widgetIds[i]] = containerDiv;
                        } else {
                            targetInstance[widgetIds[i]] = $(_generateChartMockupHtmls(chartFamily, widgets[i].id)).appendTo(containerDiv);
                        }

                        uiController.createWidgets(targetInstance[widgetIds[i]], [widgets[i]], true);
                    }
                })
                    .then(function () {
                        console.timeEnd('[widget instantiation]');
                        expect(callback).toHaveBeenCalledTimes(widgets.length);
                    });

                function _widgetReadyHandler(e) {
                    if (widgetIds.indexOf(e.target.id) !== -1) {

                        var widget = callWidget(e.target.id, 'widget'),
                            chartMockInstance = {},
                            chartMock;

                        if (chartItemType === 'chart') {
                            chartMock = mChartBuildMock(chartFamily, design);
                            _registerMockChartItemsToChartWidget(widget, chartMock);
                            chartMockInstance = widget;
                        } else {
                            chartMockInstance = mChartBuildMock(chartFamily, design);

                            chartMockInstance.elem = targetInstance[e.target.id][0];
                            chartMockInstance.el = $(chartMockInstance.elem);
                        }

                        if (chartItemType === 'xCursors') {
                            initCursorWidget(chartMockInstance, widget);
                        } else if (chartItemType === 'xAxis') {
                            initXAxisWidget(chartMockInstance, widget);
                        } else if (chartItemType === 'yAxis') {
                            initYAxisWidget(chartMockInstance, widget);
                        } else if (chartItemType === 'yValues') {
                            initYValueWidget(chartMockInstance, widget);
                        }

                        // substitute 'wut' item with the real widget to instantiate
                        if (chartItemType !== 'chart') {
                            wut2widget(chartMockInstance.chartItems, chartItemType, widget);
                        }

                        chartMockInstance.dataAdapter = new DataAdapter(chartMockInstance);
                        chartMockInstance.renderer = new Renderer(chartMockInstance);

                        // add class
                        if (chartItemType !== 'chart') {
                            $('[id^=' + widget.elem.id + ']').addClass('widgets_brease_' + widgets[widgetIds.indexOf(widget.elem.id)].name + '_style_default');
                        }

                        // eslint-disable-next-line no-unused-vars
                        $('[id^=mock]').each(function (idx, elem) {

                            var elemClass = elem.getAttribute('class');

                            switch (elemClass) {

                                case 'xAxis':
                                    if (elem.getAttribute('id').indexOf('Time') !== -1) {
                                        elem.setAttribute('class', elemClass + ' widgets_brease_' + chartFamily + 'TimeAxis_style_default');
                                    } else if (elem.getAttribute('id').indexOf('Index') !== -1) {
                                        elem.setAttribute('class', elemClass + ' widgets_brease_' + chartFamily + 'IndexAxis_style_default');
                                    }
                                    break;

                                case 'yAxis':
                                    elem.setAttribute('class', elemClass + ' widgets_brease_' + chartFamily + 'YAxis_style_default');
                                    break;

                                case 'graph':
                                    elem.setAttribute('class', elemClass + ' widgets_brease_' + chartFamily + 'Graph_style_default');
                                    break;

                                case 'xCursorArea':
                                    if (elem.getAttribute('id').indexOf('Time') !== -1) {
                                        elem.setAttribute('class', elemClass + ' widgets_brease_' + chartFamily + 'XAxisTimeCursor_style_default');
                                    } else if (elem.getAttribute('id').indexOf('Index') !== -1) {
                                        elem.setAttribute('class', elemClass + ' widgets_brease_' + chartFamily + 'XAxisIndexCursor_style_default');
                                    }
                                    break;
                            }
                        });

                        if (chartItemType !== 'chart') {
                            _applyStyleToWidget(chartItemType, widget);
                        }

                        _registerChartToChartItems(chartMockInstance);

                        // initialization of the chart mockup instance
                        chartMockInstance.dataAdapter.updateScales();
                        chartMockInstance.dataAdapter.updateGraphData();
                        chartMockInstance.dataAdapter.updateCursor();
                        chartMockInstance.renderer.updateAxis();
                        chartMockInstance.renderer.updateGraphs();
                        chartMockInstance.renderer.updateCursor();

                        if (chartItemType !== 'chart') {
                            _resolveDeferredInitializationObject(chartMockInstance.chartItems, chartItemType, widget);
                        }

                        callback();
                    }
                }
            });
        }
    };

    function _generateChartMockupHtmls(chartFamily, widgetId) {
        return $('<div id="' + chartFamily + 'Mockup_' + widgetId + '" class="breaseChartWidget widgets_brease_' + chartFamily + '_style_default"/>')[0];
    }

    function wut2widget(chartItemList, chartItemType, widget) {
        var items = [], itemId;
        for (itemId in chartItemList[chartItemType]) {
            if (itemId === 'wut') {
                items[widget.elem.id] = widget;
                items[widget.elem.id].__index__ = chartItemList[chartItemType][itemId].__index__;
            } else {
                items[itemId] = $.extend({}, chartItemList[chartItemType][itemId]);
            }
        }
        delete chartItemList[chartItemType];
        chartItemList[chartItemType] = [];
        for (itemId in items) {
            chartItemList[chartItemType][itemId] = $.extend({}, items[itemId]);
        }
        // update reference in cursor for graph widgets
        Object.keys(chartItemList['xCursors']).forEach(function (cursorId) {
            Object.keys(chartItemList['xCursors'][cursorId].graphWidgets).forEach(function (graphId) {
                chartItemList['xCursors'][cursorId].graphWidgets[graphId] = chartItemList['yValues'][graphId];
            });
        });
    }

    function _resolveDeferredInitializationObject(chartItemList, chartItemType, widget) {
        chartItemList[chartItemType][widget.elem.id].allChartItemsInitializedDeferred.resolve();
    }

    function _registerChartToChartItems(chartMockupInstance) {
        Object.keys(chartMockupInstance.chartItems)
            .filter(function (item) { return item !== 'isDirty'; })
            .forEach(function (item) {
                for (var itemId in chartMockupInstance.chartItems[item]) {
                    if (chartMockupInstance.chartItems[item][itemId].chartWidget === undefined) {
                        chartMockupInstance.chartItems[item][itemId].chartWidget = chartMockupInstance;
                    }
                }
            });
    }

    function initCursorWidget(chartMockInstance, widget) {
        // register x-Axis on the cursor
        for (var axisId in chartMockInstance.chartItems.xAxis) {
            if (chartMockInstance.chartItems.xAxis[axisId].__index__ === widget.settings.xAxisRefId) {
                widget.settings.xAxisRefId = chartMockInstance.chartItems.xAxis[axisId].elem.id;
                widget.axisWidget = chartMockInstance.chartItems.xAxis[axisId];
                break;
            }
        }

        // register cursor in the x-axis
        widget.axisWidget.cursors[widget.elem.id] = widget;

        // register yValue on the cursor
        for (var yValuesId in chartMockInstance.chartItems.yValues) {
            if (widget.settings.xAxisRefId === chartMockInstance.chartItems.yValues[yValuesId].xAxisWidget.elem.id) {
                widget.graphWidgets[yValuesId] = chartMockInstance.chartItems.yValues[yValuesId];
            }
        }

        // register chartWidget
        widget.chartWidget = chartMockInstance;
    }

    function _applyStyleToWidget(chartItemType, widget) {

        if (chartItemType === 'xCursors') {
            // apply style
            if ($('#' + widget.elem.id + '_breaseChartXAxisCursor')) {
                $('#' + widget.elem.id + '_breaseChartXAxisCursor').removeClass(widget.settings.stylePrefix + '_style_default');
            }
            if ($('#' + widget.elem.id + '_breaseChartXAxisCursor')) {
                $('#' + widget.elem.id + '_breaseChartXAxisCursor').addClass(widget.settings.stylePrefix + '_style_' + widget.settings.style);
            }
        } else if (chartItemType === 'xAxis') {
            // apply style
            if ($('#' + widget.elem.id + '_breaseChartXAxis')) {
                $('#' + widget.elem.id + '_breaseChartXAxis').removeClass(widget.settings.stylePrefix + '_style_default');
            }
            if ($('#' + widget.elem.id + '_breaseChartXAxis')) {
                $('#' + widget.elem.id + '_breaseChartXAxis').addClass(widget.settings.stylePrefix + '_style_' + widget.settings.style);
            }
        } else if (chartItemType === 'yAxis') {
            // apply style
            if ($('#' + widget.elem.id + '_breaseChartYAxis')) {
                $('#' + widget.elem.id + '_breaseChartYAxis').removeClass(widget.settings.stylePrefix + '_style_default');
            }
            if ($('#' + widget.elem.id + '_breaseChartYAxis')) {
                $('#' + widget.elem.id + '_breaseChartYAxis').addClass(widget.settings.stylePrefix + '_style_' + widget.settings.style);
            }
        } else if (chartItemType === 'yValues') {
            // applyStyle
            if ($('#' + widget.elem.id + '_breaseChartYValueList')) {
                $('#' + widget.elem.id + '_breaseChartYValueList').removeClass(widget.settings.stylePrefix + '_style_default');
                $('#' + widget.elem.id + '_breaseChartYValueList_area').removeClass(widget.settings.stylePrefix + '_style_default');
            }
            if ($('#' + widget.elem.id + '_breaseChartYValueList')) {
                $('#' + widget.elem.id + '_breaseChartYValueList').addClass(widget.settings.stylePrefix + '_style_' + widget.settings.style);
                $('#' + widget.elem.id + '_breaseChartYValueList_area').addClass(widget.settings.stylePrefix + '_style_' + widget.settings.style);
            }
        }
    }

    function initXAxisWidget(chartMockInstance, widget) {

        for (var item in chartMockInstance.chartItems) {
            Object.keys(chartMockInstance.chartItems[item])
                .filter(function (itemId) {
                    return itemId !== 'wut';
                })
                .forEach(function (elementId) {
                    if (chartMockInstance.chartItems[item][elementId].settings.hasOwnProperty('xAxisRefId')) {
                        if (chartMockInstance.chartItems[item][elementId].settings.xAxisRefId === 'wut') {
                            chartMockInstance.chartItems[item][elementId].settings.xAxisRefId = widget.elem.id;
                            if (item === 'yValues') {
                                var yValueWidget = chartMockInstance.chartItems[item][elementId];
                                yValueWidget.xAxisWidget = widget;
                                if (/Linechart/.test(yValueWidget.xAxisWidget.elem.id)) {
                                    yValueWidget.xAxisWidget._registerGraphArraySize('yValueWidget', yValueWidget._coordinates().length);
                                }
                                if (/Online/.test(yValueWidget.elem.id)) {
                                    yValueWidget.data.maxValue = new Date(yValueWidget._getMinTime() + Number(widget.getTimeSpan()) * 1000);
                                }
                            } else if (item === 'xCursors') {
                                chartMockInstance.chartItems[item][elementId].axisWidget = widget;
                            }
                        }
                    }
                });
        }

        widget.chartWidget = chartMockInstance;
    }

    function initYAxisWidget(chartMockInstance, widget) {

        for (var item in chartMockInstance.chartItems) {
            Object.keys(chartMockInstance.chartItems[item])
                .filter(function (itemId) {
                    return itemId !== 'wut';
                })
                .forEach(function (elementId) {
                    if (item === 'yValues') {
                        chartMockInstance.chartItems[item][elementId].axisWidget = widget;
                        widget.axisItems[elementId] = chartMockInstance.chartItems[item][elementId];
                    }
                });
        }

        widget.chartWidget = chartMockInstance;
    }

    function initYValueWidget(chartMockInstance, widget) {

        for (var xAxisId in chartMockInstance.chartItems.xAxis) {
            var xAxisWidget = chartMockInstance.chartItems.xAxis[xAxisId];
            if (xAxisWidget.__index__ === widget.settings.xAxisRefId) {
                widget.settings.xAxisRefId = xAxisId;
                widget.xAxisWidget = xAxisWidget;
            }
        }

        for (var yAxisId in chartMockInstance.chartItems.yAxis) {
            var yAxisWidget = chartMockInstance.chartItems.yAxis[yAxisId];
            if (yAxisWidget.__index__ === widget.settings.yAxisRefId) {
                widget._registerAxisWidget(yAxisWidget);
                yAxisWidget.axisItems[widget.elem.id] = widget;
            }
        }

        widget.chartWidget = chartMockInstance;
    }

    function _registerMockChartItemsToChartWidget(chartWidget, chartMock) {

        for (var chartItem in chartMock.chartItems) {
            $.extend(chartWidget.chartItems[chartItem], chartMock.chartItems[chartItem]);
        }
    }

    // TO IMPLEMENT: initialization function for the other chart's items to instantiate
    return out;
});
