'use strict';
define([
    'brease',
    'brTest',
    'widgets/brXtended/common/libs/ReorderingByJson',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function ({ controller: { uiController } }, { TestUtils }, Reordering) {
    
    return {
        suite: function (specParam) {

            m.describe(specParam.ordering.run, '\u00BBordering - function\u00AB', function () {
                m.it(true, '\u00BBWhen calling the ordering - function, the function should detach each element and append it then (1 call for each item)\u00AB', async function () {

                    var JSONString = '[{"wRef":"GridLineItem1","s":1},{"wRef":"GridLineItem2","s":0},{"wRef":"GridLineItem3","s":0},{"wRef":"GridLineItem4","s":0}]',
                        container = $('<div><div id="TestContent_GridLineItem1"></div><div id="TestContent_GridLineItem2"></div><div id="TestContent_GridLineItem3"></div><div id="TestContent_GridLineItem4"></div></div>'),
                        contentId = 'TestContent',
                        detachReturnEl = $('<div id="TestReturnEl"></div>'),
                        objArr = [{ wRef: 'GridLineItem1', s: 1 }, { wRef: 'GridLineItem2', s: 0 }, { wRef: 'GridLineItem3', s: 0 }, { wRef: 'GridLineItem4', s: 0 }];

                    spyOn($.fn, 'detach').and.returnValue(detachReturnEl);
                    spyOn($.fn, 'append').and.returnValue();
                    spyOn(Reordering.helpers.utilsJson, 'convertJSONtoObject').and.returnValue(objArr);

                    Reordering.ordering(JSONString, container, contentId);

                    await TestUtils.pollAndWait(function () {
                        return $.fn.detach.calls.count() === 4 && $.fn.append.calls.count() === 4 && Reordering.helpers.utilsJson.convertJSONtoObject.calls.count() === 1;
                    });

                    expect($.fn.detach.calls.count()).toEqual(4);
                    expect($.fn.append.calls.count()).toEqual(4);
                    expect(Reordering.helpers.utilsJson.convertJSONtoObject.calls.count()).toEqual(1);

                    expect(Reordering.helpers.utilsJson.convertJSONtoObject).toHaveBeenCalledWith(JSONString);
                    expect($.fn.append).toHaveBeenCalledWith(detachReturnEl);
                });
            });

            m.describe(specParam.getOrder.run, '\u00BBgetOrder - function\u00AB', function () {
                m.it(true, '\u00BBWhen calling the getOrder - function, the function should return the JSON String of the ID and the Status of each ChildWidget\u00AB', async function () {
                    var container = $('<div><div id="TestContent_GridLineItem1"></div><div id="TestContent_GridLineItem2"></div><div id="TestContent_GridLineItem3"></div><div id="TestContent_GridLineItem4"></div></div>'),
                        objArr = [{ wRef: 'GridLineItem1', s: 1 }, { wRef: 'GridLineItem2', s: 1 }, { wRef: 'GridLineItem3', s: 1 }, { wRef: 'GridLineItem4', s: 1 }];

                    spyOn($.fn, 'find').and.returnValue([$('<div id="TestContent_GridLineItem1"></div>')[0], $('<div id="TestContent_GridLineItem2"></div>')[0], $('<div id="TestContent_GridLineItem3"></div>')[0], $('<div id="TestContent_GridLineItem4"></div>')[0]]);
                    let callSpy = spyOn(uiController, 'callWidget').and.returnValue({ settings: { parentContentId: 'TestContent' }, getStatus: function () { return 1; } });
                    spyOn(Reordering.helpers.utilsJson, 'convertObjectToJSON').and.returnValue();

                    Reordering.getOrder(container);

                    await TestUtils.pollAndWait(function () {
                        return $.fn.find.calls.count() === 1 && callSpy.calls.count() === 4 && Reordering.helpers.utilsJson.convertObjectToJSON.calls.count() === 1;
                    });

                    expect(Reordering.helpers.utilsJson.convertObjectToJSON).toHaveBeenCalledWith(objArr);
                });
            });
        }
    };
});
