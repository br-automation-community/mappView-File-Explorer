'use strict';
define(['widgets/brXtended/common/libs/redux/view/ItemView/ItemView',
    'brTest',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'], function (ItemView, { enum: { Enum } }) {

    return {
        suite: function () {

            var element, props, item;

            beforeEach(function () {
                element = $('<div id=WidgetMockItemView></div>');
                props = {
                    text: {
                        text: 'Test',
                        textSettings: {
                            multiLine: false,
                            wordWrap: false,
                            ellipsis: false
                        },
                        showText: true
                    },
                    image: {
                        image: 'projects/UnitTest/img/icons/icon-test1.png',
                        showImage: true
                    },
                    itemSettings: {
                        itemHeight: 40,
                        imageAlign: Enum.ImageAlign.left
                    },
                    status: {
                        enabled: true,
                        visible: true,
                        selected: false,
                        lastItem: false
                    },
                    onClick: function () { }
                };
            });

            afterEach(function () {
                element = undefined;
                props = undefined;
                item = undefined;
            });

            m.describe(true, 'DisplaySettings', function () {

                m.it(true, 'show image only', function () {
                    props.text.showText = false;
                    item = new ItemView(props, element);
                    expect(item.text).toBe(undefined);
                    expect(item.image).not.toBe(undefined);
                });

                m.it(true, 'show text only', function () {
                    props.image.showImage = false;
                    item = new ItemView(props, element);
                    expect(item.text).not.toBe(undefined);
                    expect(item.image).toBe(undefined);
                });

                m.it(true, 'show text and image', function () {
                    item = new ItemView(props, element);
                    expect(item.text).not.toBe(undefined);
                    expect(item.image).not.toBe(undefined);
                });

                m.it(true, 'show nothing', function () {
                    props.text.showText = false;
                    props.image.showImage = false;
                    item = new ItemView(props, element);
                    expect(item.text).toBe(undefined);
                    expect(item.image).toBe(undefined);
                });

            });

        }
    };

});
