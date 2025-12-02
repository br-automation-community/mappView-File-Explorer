define(['widgets/brXtended/common/libs/Test/mChartBuildMockupStruct'], function (chartMockupStruct) {

    'use strict';

    return function (chartFamily, design) {

        var chartMockupSchema = chartMockupStruct(chartFamily, design),
            chartMockup;

        chartMockup = $.extend(true, {}, chartMockupSchema.chart);

        // register chart item
        registerChartItem(chartMockup, chartMockupSchema, 'xAxis', design);
        registerChartItem(chartMockup, chartMockupSchema, 'xValues', design);
        registerChartItem(chartMockup, chartMockupSchema, 'xCursors', design);
        registerChartItem(chartMockup, chartMockupSchema, 'yAxis', design);
        registerChartItem(chartMockup, chartMockupSchema, 'yValues', design);

        return chartMockup;
    };

    function registerChartItem(mockup, mockupStruct, itemType, design) {

        for (var itemId in mockupStruct[itemType]) {
            
            var idxItem = mockupStruct[itemType][itemId].__index__;

            mockup.chartItems[itemType][itemId] = $.extend({}, mockupStruct[itemType][itemId]);

            if (itemId === 'wut') { continue; }

            if (itemType === 'xValues') {
                let axisWidget = mockupStruct.xAxis[mockupStruct.xValues[itemId].settings['xAxisRefId']];
                mockup.chartItems.xValues[itemId]._registerAxisWidget(axisWidget);
            
            } else if (itemType === 'xCursors') {
                let axisWidget = mockupStruct.xAxis[mockupStruct.xCursors[itemId].settings['xAxisRefId']];
                mockup.chartItems.xCursors[itemId]._registerAxisWidget(axisWidget);
                    
                for (var xAxisId in mockup.chartItems.xAxis) {
                    if (mockup.chartItems.xAxis[xAxisId].__index__ === design.xCursors.options.xAxisRefId[idxItem] && xAxisId !== 'wut') {
                        mockup.chartItems.xAxis[xAxisId].cursors[itemId] = mockup.chartItems.xCursors[itemId];
                    }
                }

            }
        }
    }

});
