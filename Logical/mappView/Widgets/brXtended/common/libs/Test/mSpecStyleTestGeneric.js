'use strict';
define(['brTest'], function ({ callWidget, TestUtils }) {
    
    return {
        suite: function (wutId, specParam) {

            var wut, widgetCategoryArray, widgetCategory,
                allStylableProperties = specParam.styleConfig;

            widgetCategoryArray = wutId.split('_');
            widgetCategory = widgetCategoryArray[widgetCategoryArray.length - 1];
            widgetCategory = 'value' + widgetCategory.charAt(0).toUpperCase() + widgetCategory.slice(1) + 'Widget'; 
            
            // additional time to render all elements of the widget \u00BB // wait until sorting svg is added TableWidgets
            beforeAll(function () {
                return new Promise(function (resolve) {
                    setTimeout(resolve, 100);
                });
            });

            beforeEach(function () {
                wut = callWidget(wutId, 'widget');
            });

            Object.keys(allStylableProperties).forEach(function (styleablePropertyKey) {
                var styleableProperty = allStylableProperties[styleablePropertyKey];
                (function (styleableProperty) {
                    m.it(styleableProperty.run, '- styleable property \u00BB' + styleableProperty.name + '\u00AB' +
                            ' should have value \u00BB' + styleableProperty[widgetCategory] + '\u00AB' +
                            ' on widget with id \u00BB' + wutId + '\u00AB', async function () {

                        var enableChangedEvent = 'EnableChanged',
                            //selector = '[id^=' + wutId+']' + styleableProperty.selector.replace(', thisId',', [id^=' + wutId+']'),
                            selector = '[id^=' + wutId + ']' + styleableProperty.selector.split(', thisId').join(', [id^=' + wutId + ']'),
                            target = specParam.activeElement ? $('[id^=' + wutId + '] ' + specParam.activeElement.triggerSelector)[0] : '';
                        
                        let expectedValue = styleableProperty[widgetCategory];

                        //check if elements can be active
                        if (specParam.activeElement) {   
                            // set selector and event to reset activeElement
                            specParam.activeElement.resetSelector = specParam.activeElement.resetSelector ? specParam.activeElement.resetSelector : specParam.activeElement.triggerSelector;
                            specParam.activeElement.resetEvent = specParam.activeElement.resetEvent ? specParam.activeElement.resetEvent : specParam.activeElement.triggerEvent;           
                            specParam.activeElement.keys.forEach(function (entry) {
                                if (styleableProperty.name.includes(entry)) {          
                                    specParam.activeElement.run = true;
                                }
                            });
                        }
                        
                        await new Promise(function (resolve) {
                            var disabledHandler = function (e) {
                                    if (e.target.id === wut.elem.id && e.type === enableChangedEvent) {
                                        wut.elem.removeEventListener(enableChangedEvent, disabledHandler, true);
                                        resolve();                     
                                    }
                                },
                                activeElementHandler = function () {
                                    $(target).off(specParam.activeElement.triggerEvent, activeElementHandler);
                                    resolve();             
                                };
                            if (styleableProperty.name.includes('disabled')) {  
                                wut.elem.addEventListener(enableChangedEvent, disabledHandler, true);
                                wut.setEnable(false);
                            } else if (specParam.activeElement && specParam.activeElement.run === true) {  
                                $(target).on(specParam.activeElement.triggerEvent, activeElementHandler);
                                $('[id^=' + wutId + '] ' + specParam.activeElement.triggerSelector).trigger(specParam.activeElement.triggerEvent);
                            } else {
                                resolve();
                            }  
                        });
                        await TestUtils.pollAndWait(() => $(selector).length > 0);
                        let currentValue = $(selector).css(styleableProperty.attribute);
                        expect(currentValue).toEqual(expectedValue); 
                        if (styleableProperty.name.includes('disabled')) {  
                            wut.setEnable(true);
                        } else if (specParam.activeElement && specParam.activeElement.run === true) {
                            specParam.activeElement.run = false; 
                            $('[id^=' + wutId + '] ' + specParam.activeElement.resetSelector).trigger(specParam.activeElement.resetEvent);
                        }    
                    });
                })(styleableProperty);
            });           
        }
    };
});
