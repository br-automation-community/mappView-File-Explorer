'use strict';
define([
    'widgets/brXtended/common/libs/Test/mSpecDisposeCssGeneric',
    'brTest',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function (mSpecDisposeCssGeneric, { appView, controller: { uiController } }) {

    return {
        suite: function (widgets, className, disposeCssFlag, chartFamily, configParam) {
            
            if (disposeCssFlag) {
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

                    cssArray = (chartFamily === 'OnlineChart') ? cssFilesOnlineChart : cssFilesLineChart;

                afterAll(mSpecDisposeCssGeneric.func.bind(null, cssArray));
            }
            
            it('Dispose should make widget uncallable', function () {

                var target = document.getElementById(className + '_container');

                uiController.walkWidgets(target, true, 'onBeforeDispose');
                uiController.walkWidgets(target, true, 'dispose');

                $(target).empty();

                for (var i = 0; i < widgets.length; i += 1) {
                    expect(document.getElementById(widgets[i].id)).toBeNull();
                    expect(uiController.getWidget(widgets[i].id)).toBeUndefined();
                }

                if (configParam === 'c') {
                    for (var j = 0; j < widgets.length; j += 1) {
                        console.debug(className + '[id=' + widgets[j].id + '] successfully disposed');
                    }
                }

                target.parentElement.removeChild(target);
            });
        }
    };
});
