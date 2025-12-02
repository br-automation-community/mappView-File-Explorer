'use strict';
define([
    'widgets/brXtended/common/libs/redux/view/TextView/TextView',
    'brTest',
    'widgets/brXtended/common/libs/wfUtils/UtilsCommon'
], function (TextView, { TestUtils }, Utils) {
    var suite = {
        name: 'widgets.brXtended.common.libs.redux.view.TextView.TextView'
    };
    describe(suite.name, function () {
        var $parentElement, props, view;
        beforeAll(function () {
            TestUtils.logSuite(suite);
        });
        describe('#method-constructor', function () {

            it('should create view with element with class "TextView"', function () {
                view = new TextView(props, $parentElement);
                expect(view.el).toHaveClass('TextView');
            });
        });
        describe('#cfg-selected', function () {

            it('should create view with element with class "textSelected"', function () {
                props.selected = true;
                view = new TextView(props, $parentElement);
                expect(view.el).toHaveClass('textSelected');
            });
            it('should create view with element without class "textSelected"', function () {
                props.selected = false;
                view = new TextView(props, $parentElement);
                expect(view.el).not.toHaveClass('textSelected');
            });
        });
        describe('#method-render', function () {
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
            it('should call Utils.addCssClasses"', function () {
                spyOn(Utils, 'addCssClasses');
                view = new TextView(props, $parentElement);
                view.render(props, $parentElement);
                expect(Utils.addCssClasses).toHaveBeenCalledWith(view.el, props.textSettings, props.selected);
            });
        });
        
        describe('#cfg-html', function () {
            beforeEach(function () {
                $parentElement = $('<div id="WidgetMockTextView"></div>');
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
            afterEach(function () {
                view.dispose();
            });
           
            it('should create view with text === Number in span', function () {
                var text = 1;
                props.text = text;
                view = new TextView(props, $parentElement);
                view.render(props, $parentElement);
                expect(view.el.get(0).innerHTML).toEqual(`<span>${text}</span>`);
            });
            it('should create view with text === String in span', function () {
                var text = 'some text';
                props.text = text;
                view = new TextView(props, $parentElement);
                view.render(props, $parentElement);
                expect(view.el.get(0).innerHTML).toEqual(`<span>${text}</span>`);
            });
 
        });
        describe('#cfg-selected', function () {

            it('should create view with element with class "textSelected"', function () {
                props.selected = true;
                view = new TextView(props, $parentElement);
                expect(view.el).toHaveClass('textSelected');
            });
            it('should create view with element without class "textSelected"', function () {
                props.selected = false;
                view = new TextView(props, $parentElement);
                expect(view.el).not.toHaveClass('textSelected');
            });
        });
       
    });
});
