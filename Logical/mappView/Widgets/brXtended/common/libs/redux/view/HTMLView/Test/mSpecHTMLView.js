define(['widgets/brXtended/common/libs/redux/view/HTMLView/HTMLView',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'], function (HTMLView) {

    'use strict';

    return {
        suite: function () {

            var parentElement, props, view;

            beforeEach(function () {
                parentElement = $('<div id="WidgetMockHTMLView"></div>');
                props = {
                    selected: false,
                    textSettings: {
                        ellipsis: true,
                        multiLine: true,
                        wordWrap: true,
                        breakWord: true
                    },
                    html: 'some text' 
                };
            });
            afterEach(function () {
                view.dispose();
            });

            m.describe(true, '#method-constructor', function () {

                m.it(true, 'should create view with element with class "HTMLView"', function () {
                    view = new HTMLView(props, parentElement);
                    expect(view.el).toHaveClass('HTMLView');
                });
            });

            m.describe(true, '#cfg-selected', function () {

                m.it(true, 'should create view with element with class "textSelected"', function () {
                    props.selected = true;
                    view = new HTMLView(props, parentElement);
                    expect(view.el).toHaveClass('textSelected');
                });
                m.it(true, 'should create view with element without class "textSelected"', function () {
                    props.selected = false;
                    view = new HTMLView(props, parentElement);
                    expect(view.el).not.toHaveClass('textSelected');
                });
            });

            m.describe(true, '#cfg-html', function () {
                var text = 'some text';
                
                m.it(true, 'should create view with text in span', function () {
                    props.html = text;
                    view = new HTMLView(props, parentElement);
                    
                    expect(view.el.get(0).innerText).toEqual(text);
                    expect(view.el.get(0).innerHTML).toEqual(`<span>${text}</span>`);
                });

                m.it(true, 'should create view with html', function () {
                    props.html = `<strong>${text}</strong>`;
                    view = new HTMLView(props, parentElement);

                    expect(view.el.get(0).innerText).toEqual(text);
                    expect(view.el.get(0).innerHTML).toEqual(props.html);
                });
                m.it(true, 'should create view with text === Number in span', function () {
                    var number = 1;
                    props.html = number;
                    view = new HTMLView(props, parentElement);
                    view.render(props, parentElement);
                    expect(view.el.get(0).innerHTML).toEqual(`<span>${number}</span>`);
                });
                m.it(true, 'should create view with text === String in span', function () {
                    props.html = text;
                    view = new HTMLView(props, parentElement);
                    view.render(props, parentElement);
                    expect(view.el.get(0).innerHTML).toEqual(`<span>${text}</span>`);
                });
            });

        }
    };

});
