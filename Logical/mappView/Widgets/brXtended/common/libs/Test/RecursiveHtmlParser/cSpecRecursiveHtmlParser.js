define(function () {
   
    'use strict';

    var specList = {
        widgetNames: {
            defaultWidget: 'defaultWidget',
            parsedInsideConfigurationWidget: 'parsedInsideConfigurationWidget'
        },
        method: {
            getIdsFromWidgetConfiguration: {
                expect: {
                    widgetIds: ['GroupBox_defaultWidget', 'GroupBox_a_defaultWidget', 'BarChart_a_defaultWidget', 'BarChartItem_a0_defaultWidget', 'BarChartItem_a1_defaultWidget', 'GroupBox_b_defaultWidget', 'BarChart_b_defaultWidget', 'BarChartItem_b0_defaultWidget', 'BarChartItem_b1_defaultWidget',
                        'GroupBox_parsedInsideConfigurationWidget', 'GroupBox_a_parsedInsideConfigurationWidget', 'BarChart_a_parsedInsideConfigurationWidget', 'BarChartItem_a0_parsedInsideConfigurationWidget', 'BarChartItem_a1_parsedInsideConfigurationWidget', 'GroupBox_b_parsedInsideConfigurationWidget', 'BarChart_b_parsedInsideConfigurationWidget', 'BarChartItem_b0_parsedInsideConfigurationWidget', 'BarChartItem_b1_parsedInsideConfigurationWidget']
                }
            },
            generateHtmlContentString: {
                expect: {
                    htmlContentStringDefaultWidget: 
                                        '<div id="GroupBox_a_defaultWidget" data-brease-widget="widgets/brease/GroupBox" data-brease-options="{}" style="height:402px; width:402px; position:relative;">' +
                                            '<svg id="BarChart_a_defaultWidget" data-brease-widget="widgets/brease/BarChart" data-brease-options="{}" style="height:80%; width:60%;">' +
                                                '<g id="BarChartItem_a0_defaultWidget" data-brease-widget="widgets/brease/BarChartItem" data-brease-options="{\'text\':\'a0_defaultWidget\',\'value\':50}" class="barWidget"><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></g>' +
                                                '<g class="barWidget" id="BarChartItem_a1_defaultWidget" data-brease-widget="widgets/brease/BarChartItem" data-brease-options="{\'text\':\'a1_defaultWidget\',\'value\':50}"><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></g>' +
                                            '</svg>' +
                                        '</div><div id="GroupBox_b_defaultWidget" data-brease-widget="widgets/brease/GroupBox" data-brease-options="{}" style="height:402px; width:402px; position:relative; top:450px;"><svg id="BarChart_b_defaultWidget" data-brease-widget="widgets/brease/BarChart" data-brease-options="{}" style="height:80%; width:60%;">' +
                                                '<g id="BarChartItem_b0_defaultWidget" data-brease-widget="widgets/brease/BarChartItem" data-brease-options="{\'text\':\'b0_defaultWidget\',\'value\':50}" class="barWidget"><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></g>' +
                                                '<g class="barWidget" id="BarChartItem_b1_defaultWidget" data-brease-widget="widgets/brease/BarChartItem" data-brease-options="{\'text\':\'b1_defaultWidget\',\'value\':50}"><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></g>' +
                                            '</svg>' +
                                        '</div>',
                    htmlContentStringParsedInsideConfigurationWidget: 
                                        '<div id="GroupBox_a_parsedInsideConfigurationWidget" data-brease-widget="widgets/brease/GroupBox" data-brease-options="{}" style="height:402px; width:402px; position:relative;">' +
                                            '<svg id="BarChart_a_parsedInsideConfigurationWidget" data-brease-widget="widgets/brease/BarChart" data-brease-options="{}" style="height:80%; width:60%;">' +
                                                '<g id="BarChartItem_a0_parsedInsideConfigurationWidget" data-brease-widget="widgets/brease/BarChartItem" data-brease-options="{\'text\':\'a0_parsedInsideConfigurationWidget\',\'value\':50}" class="barWidget"><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></g>' +
                                                '<g class="barWidget" id="BarChartItem_a1_parsedInsideConfigurationWidget" data-brease-widget="widgets/brease/BarChartItem" data-brease-options="{\'text\':\'a1_parsedInsideConfigurationWidget\',\'value\':50}"><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></g>' +
                                            '</svg>' +
                                        '</div><div id="GroupBox_b_parsedInsideConfigurationWidget" data-brease-widget="widgets/brease/GroupBox" data-brease-options="{}" style="height:402px; width:402px; position:relative; top:450px;"><svg id="BarChart_b_parsedInsideConfigurationWidget" data-brease-widget="widgets/brease/BarChart" data-brease-options="{}" style="height:80%; width:60%;">' +
                                                '<g id="BarChartItem_b0_parsedInsideConfigurationWidget" data-brease-widget="widgets/brease/BarChartItem" data-brease-options="{\'text\':\'b0_parsedInsideConfigurationWidget\',\'value\':50}" class="barWidget"><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></g>' +
                                                '<g class="barWidget" id="BarChartItem_b1_parsedInsideConfigurationWidget" data-brease-widget="widgets/brease/BarChartItem" data-brease-options="{\'text\':\'b1_parsedInsideConfigurationWidget\',\'value\':50}"><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></g>' +
                                            '</svg>' +
                                        '</div>'
                }
            }
        }
        
    };

    return specList;
});
