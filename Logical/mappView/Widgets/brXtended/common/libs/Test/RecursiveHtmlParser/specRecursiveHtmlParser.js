define([
    'widgets/brXtended/common/libs/Test/mSpecInitGeneric',
    'widgets/brXtended/common/libs/Test/mSpecDisposeGeneric',
    'widgets/brXtended/common/libs/Test/RecursiveHtmlParser/cSpecRecursiveHtmlParser',
    'widgets/brXtended/common/libs/Test/recursiveHTMLParser',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'], 
function (specInitGeneric, specDisposeGeneric, specList, recursive_HTMLParser) {

    'use strict';

    var suiteName = 'widgets.brXtended.common.libs.RecursiveHtmlParser',
        widgetPath = 'widgets.brease.',
        itemPath = 'widgets/brease/',
        classNameLevel1 = 'GroupBox',
        classNameLevel2 = 'GroupBox',
        classNameLevel3 = 'BarChart',
        classNameLevel4 = 'BarChartItem',
        
        widgets = [{
            className: widgetPath + classNameLevel1,
            id: classNameLevel1 + '_' + specList.widgetNames.defaultWidget,
            options: {
            },
            HTMLAttributes: {
                style: 'height:900px; width:500px; position:relative;'
            },
            content: {
                html: [{
                    className: itemPath + classNameLevel2,
                    id: classNameLevel2 + '_a_' + specList.widgetNames.defaultWidget,
                    options: {
                    },
                    htmlTagName: 'div',
                    HTMLAttributes: {
                        style: 'height:402px; width:402px; position:relative;'
                    },

                    content: {
                        html: [{
                            className: itemPath + classNameLevel3,
                            id: classNameLevel3 + '_a_' + specList.widgetNames.defaultWidget,
                            options: {
                            },
                            htmlTagName: 'svg',
                            HTMLAttributes: {
                                style: 'height:80%; width:60%;'
                            },
                            content: {
                                html: [{
                                    id: classNameLevel4 + '_a0_' + specList.widgetNames.defaultWidget,
                                    className: itemPath + classNameLevel4,
                                    options: {
                                        text: 'a0_' + specList.widgetNames.defaultWidget,
                                        value: 50
                                    },
                                    htmlTagName: '<' + 'g' + '><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></' + 'g' + '>',
                                    HTMLAttributes: {
                                        class: 'barWidget'
                                    }
                                },
                                {
                                    id: classNameLevel4 + '_a1_' + specList.widgetNames.defaultWidget,
                                    className: itemPath + classNameLevel4,
                                    options: {
                                        text: 'a1_' + specList.widgetNames.defaultWidget,
                                        value: 50
                                    },
                                    htmlTagName: '<' + 'g class="test"' + '><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></' + 'g' + '>',
                                    HTMLAttributes: {
                                        class: 'barWidget'
                                    }
                                }]
                            }
                        }]
                    }

                },
                {
                    className: itemPath + classNameLevel2,
                    id: classNameLevel2 + '_b_' + specList.widgetNames.defaultWidget,
                    options: {
                    },
                    htmlTagName: 'div',
                    HTMLAttributes: {
                        style: 'height:402px; width:402px; position:relative; top:450px;'
                    },

                    content: {
                        html: [{
                            className: itemPath + classNameLevel3,
                            id: classNameLevel3 + '_b_' + specList.widgetNames.defaultWidget,
                            options: {
                            },
                            htmlTagName: 'svg',
                            HTMLAttributes: {
                                style: 'height:80%; width:60%;'
                            },
                            content: {
                                html: [{
                                    id: classNameLevel4 + '_b0_' + specList.widgetNames.defaultWidget,
                                    className: itemPath + classNameLevel4,
                                    options: {
                                        text: 'b0_' + specList.widgetNames.defaultWidget,
                                        value: 50
                                    },
                                    htmlTagName: '<' + 'g' + '><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></' + 'g' + '>',
                                    HTMLAttributes: {
                                        class: 'barWidget'
                                    }
                                },
                                {
                                    id: classNameLevel4 + '_b1_' + specList.widgetNames.defaultWidget,
                                    className: itemPath + classNameLevel4,
                                    options: {
                                        text: 'b1_' + specList.widgetNames.defaultWidget,
                                        value: 50
                                    },
                                    htmlTagName: '<' + 'g class="test"' + '><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></' + 'g' + '>',
                                    HTMLAttributes: {
                                        class: 'barWidget'
                                    }
                                }]
                            }
                        }]
                    }

                }]
            }
        },
        {
            className: widgetPath + classNameLevel1,
            id: classNameLevel1 + '_' + specList.widgetNames.parsedInsideConfigurationWidget,
            options: {
            },
            HTMLAttributes: {
                style: 'height:900px; width:500px; position:relative;'
            },
            content: {
                html: recursive_HTMLParser.generateHtmlContentString([{
                    className: itemPath + classNameLevel2,
                    id: classNameLevel2 + '_a_' + specList.widgetNames.parsedInsideConfigurationWidget,
                    options: {
                    },
                    htmlTagName: 'div',
                    HTMLAttributes: {
                        style: 'height:402px; width:402px; position:relative;'
                    },
    
                    content: {
                        html: [{
                            className: itemPath + classNameLevel3,
                            id: classNameLevel3 + '_a_' + specList.widgetNames.parsedInsideConfigurationWidget,
                            options: {
                            },
                            htmlTagName: 'svg',
                            HTMLAttributes: {
                                style: 'height:80%; width:60%;'
                            },
                            content: {
                                html: [{
                                    id: classNameLevel4 + '_a0_' + specList.widgetNames.parsedInsideConfigurationWidget,
                                    className: itemPath + classNameLevel4,
                                    options: {
                                        text: 'a0_' + specList.widgetNames.parsedInsideConfigurationWidget,
                                        value: 50
                                    },
                                    htmlTagName: '<' + 'g' + '><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></' + 'g' + '>',
                                    HTMLAttributes: {
                                        class: 'barWidget'
                                    }
                                },
                                {
                                    id: classNameLevel4 + '_a1_' + specList.widgetNames.parsedInsideConfigurationWidget,
                                    className: itemPath + classNameLevel4,
                                    options: {
                                        text: 'a1_' + specList.widgetNames.parsedInsideConfigurationWidget,
                                        value: 50
                                    },
                                    htmlTagName: '<' + 'g class="test"' + '><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></' + 'g' + '>',
                                    HTMLAttributes: {
                                        class: 'barWidget'
                                    }
                                }]
                            }
                        }]
                    }
    
                },
                {
                    className: itemPath + classNameLevel2,
                    id: classNameLevel2 + '_b_' + specList.widgetNames.parsedInsideConfigurationWidget,
                    options: {
                    },
                    htmlTagName: 'div',
                    HTMLAttributes: {
                        style: 'height:402px; width:402px; position:relative; top:450px;'
                    },
    
                    content: {
                        html: [{
                            className: itemPath + classNameLevel3,
                            id: classNameLevel3 + '_b_' + specList.widgetNames.parsedInsideConfigurationWidget,
                            options: {
                            },
                            htmlTagName: 'svg',
                            HTMLAttributes: {
                                style: 'height:80%; width:60%;'
                            },
                            content: {
                                html: [{
                                    id: classNameLevel4 + '_b0_' + specList.widgetNames.parsedInsideConfigurationWidget,
                                    className: itemPath + classNameLevel4,
                                    options: {
                                        text: 'b0_' + specList.widgetNames.parsedInsideConfigurationWidget,
                                        value: 50
                                    },
                                    htmlTagName: '<' + 'g' + '><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></' + 'g' + '>',
                                    HTMLAttributes: {
                                        class: 'barWidget'
                                    }
                                },
                                {
                                    id: classNameLevel4 + '_b1_' + specList.widgetNames.parsedInsideConfigurationWidget,
                                    className: itemPath + classNameLevel4,
                                    options: {
                                        text: 'b1_' + specList.widgetNames.parsedInsideConfigurationWidget,
                                        value: 50
                                    },
                                    htmlTagName: '<' + 'g class="test"' + '><defs><clipPath><rect></rect></clipPath></defs><rect class="bar"></rect><text class="valueText"></text></' + 'g' + '>',
                                    HTMLAttributes: {
                                        class: 'barWidget'
                                    }
                                }]
                            }
                        }]
                    }
    
                }])
            }
        }
    
        ];

    var wuts = [];
    wuts[0] = $.extend(true, {}, widgets[0]);
    wuts[1] = $.extend(true, {}, widgets[1]);
    
    describe(suiteName, function () {

        describe('unit tests', function () {

            var currentValue, expectedValue;

            afterEach(function () {
                wuts[0] = widgets[0];
                wuts[1] = widgets[1];
            });

            describe('>>generateHtmlContentString<<', function () {

                it('- defaultWidget should return html content string of all nested widgets ' +
                    'when method is directly called', function () {
                    expectedValue = specList.method.generateHtmlContentString.expect.htmlContentStringDefaultWidget;
                    currentValue = recursive_HTMLParser.generateHtmlContentString(wuts[0].content.html);

                    expect(currentValue).toEqual(expectedValue);
                });

                it('- parsedInsideConfigurationWidget should return html content string of all nested widgets ' +
                    'when method is directly called, but html content string was already generated inside the widget configuration', function () {
                    expectedValue = specList.method.generateHtmlContentString.expect.htmlContentStringParsedInsideConfigurationWidget;
                    currentValue = recursive_HTMLParser.generateHtmlContentString(wuts[1].content.html);
                    expect(currentValue).toEqual(expectedValue);
                });

                it('- parsedInsideConfigurationWidget should contain generated html content string of all nested widgets ' +
                    'when method is called inside the widget configuration', function () {
                    expectedValue = specList.method.generateHtmlContentString.expect.htmlContentStringParsedInsideConfigurationWidget;
                    currentValue = wuts[1].content.html;
                    expect(currentValue).toEqual(expectedValue);
                });
            });
            
            describe('>>getIdsFromWidgetConfiguration<<', function () {

                it('- getIdsFromWidgetConfiguration method should return all configured widget ids of defaultWidget + parsedInsideConfigurationWidget' +
                    'when method is called', function () {
                    expectedValue = specList.method.getIdsFromWidgetConfiguration.expect.widgetIds;
                    currentValue = recursive_HTMLParser.getIdsFromWidgetConfiguration(wuts);
                    expect(currentValue).toEqual(expectedValue);
                });

                it('- defaultWidget should return html content string of all nested widgets ' +
                    'when method is directly called', function () {
                    recursive_HTMLParser.getIdsFromWidgetConfiguration(wuts);
                    expectedValue = specList.method.generateHtmlContentString.expect.htmlContentStringDefaultWidget;
                    currentValue = wuts[0].content.html;
                    expect(currentValue).toEqual(expectedValue);
                });

                it('- parsedInsideConfigurationWidget should return html content string of all nested widgets ' +
                    'when method is directly called, but html content string was already generated inside the widget configuration', function () {
                    recursive_HTMLParser.getIdsFromWidgetConfiguration(wuts);
                    expectedValue = specList.method.generateHtmlContentString.expect.htmlContentStringParsedInsideConfigurationWidget;
                    currentValue = wuts[1].content.html;
                    expect(currentValue).toEqual(expectedValue);
                });
            }); 
        });

        describe('additional tests', function () {    
            describe('>>recursive_HTMLParser should enable to instantiate all configured widgets<<', function () {
                var widgetIds = recursive_HTMLParser.getIdsFromWidgetConfiguration(widgets);
                m.describe(true, 'Widget instantiation', specInitGeneric.suite, [widgets, widgetIds, suiteName]);
                m.describe(true, 'Removing', specDisposeGeneric.suite, [widgets, suiteName]);
            });      
        });
    });
});
