define(['widgets/brXtended/common/libs/wfUtils/UtilsCommon',
    'widgets/brXtended/common/libs/BoxLayout',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'], function (Utils, BoxLayout) {

    'use strict';
    var suite = {
        name: 'widgets.brXtended.common.libs.wfUtils.UtilsCommon'
    };
    describe(suite.name, function () {
        var $parentElement, props;
        describe('#cfg-textSettings', function () {
            beforeEach(function () {
                $parentElement = $('<div id="WidgetMockView"></div>');
                props = {
                    selected: false,
                    textSettings: {
                        ellipsis: true,
                        multiLine: true,
                        wordWrap: true,
                        breakWord: true
                    }
                };
            });

            function runSpec(spec) {
                it(JSON.stringify(spec.textSettings), function () {
                    props.textSettings = spec.textSettings;
                    var $el = $(BoxLayout.createBox());
                    $parentElement.append($el);
                    Utils.addCssClasses($el, props.textSettings, props.selected);

                    for (var key in spec.expected) {
                        if (spec.expected[key]) {
                            expect($el).toHaveClass(key);
                        } else {
                            expect($el).not.toHaveClass(key);
                        }
                    }
                });
            }
            [
                {
                    textSettings: { ellipsis: true, multiLine: true, wordWrap: true, breakWord: true },
                    expected: { ellipsis: true, multiLine: false, wordWrap: true, breakWord: true }
                },
                {
                    textSettings: { ellipsis: true, multiLine: true, wordWrap: true, breakWord: false },
                    expected: { ellipsis: true, multiLine: false, wordWrap: true, breakWord: false }
                },
                {
                    textSettings: { ellipsis: true, multiLine: true, wordWrap: false, breakWord: true },
                    expected: { ellipsis: true, multiLine: false, wordWrap: false, breakWord: true }
                },
                {
                    textSettings: { ellipsis: true, multiLine: true, wordWrap: false, breakWord: false },
                    expected: { ellipsis: true, multiLine: true, wordWrap: false, breakWord: false }
                },
                {
                    textSettings: { ellipsis: true, multiLine: false, wordWrap: true, breakWord: true },
                    expected: { ellipsis: true, multiLine: false, wordWrap: false, breakWord: false }
                },
                {
                    textSettings: { ellipsis: true, multiLine: false, wordWrap: true, breakWord: false },
                    expected: { ellipsis: true, multiLine: false, wordWrap: false, breakWord: false }
                },
                {
                    textSettings: { ellipsis: true, multiLine: false, wordWrap: false, breakWord: true },
                    expected: { ellipsis: true, multiLine: false, wordWrap: false, breakWord: false }
                },
                {
                    textSettings: { ellipsis: true, multiLine: false, wordWrap: false, breakWord: false },
                    expected: { ellipsis: true, multiLine: false, wordWrap: false, breakWord: false }
                },
                {
                    textSettings: { ellipsis: false, multiLine: true, wordWrap: true, breakWord: true },
                    expected: { ellipsis: false, multiLine: false, wordWrap: true, breakWord: true }
                },
                {
                    textSettings: { ellipsis: false, multiLine: true, wordWrap: true, breakWord: false },
                    expected: { ellipsis: false, multiLine: false, wordWrap: true, breakWord: false }
                },
                {
                    textSettings: { ellipsis: false, multiLine: true, wordWrap: false, breakWord: true },
                    expected: { ellipsis: false, multiLine: false, wordWrap: false, breakWord: true }
                },
                {
                    textSettings: { ellipsis: false, multiLine: true, wordWrap: false, breakWord: false },
                    expected: { ellipsis: false, multiLine: true, wordWrap: false, breakWord: false }
                },
                {
                    textSettings: { ellipsis: false, multiLine: false, wordWrap: true, breakWord: true },
                    expected: { ellipsis: false, multiLine: false, wordWrap: false, breakWord: false }
                },
                {
                    textSettings: { ellipsis: false, multiLine: false, wordWrap: true, breakWord: false },
                    expected: { ellipsis: false, multiLine: false, wordWrap: false, breakWord: false }
                },
                {
                    textSettings: { ellipsis: false, multiLine: false, wordWrap: false, breakWord: true },
                    expected: { ellipsis: false, multiLine: false, wordWrap: false, breakWord: false }
                },
                {
                    textSettings: { ellipsis: false, multiLine: false, wordWrap: false, breakWord: false },
                    expected: { ellipsis: false, multiLine: false, wordWrap: false, breakWord: false }
                }
            ].forEach(function (spec) {
                runSpec(spec);
            });
        });
    });
});
