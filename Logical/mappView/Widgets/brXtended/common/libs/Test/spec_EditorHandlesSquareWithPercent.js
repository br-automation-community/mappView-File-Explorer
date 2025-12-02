'use strict';
define([
    'brTest',
    'widgets/brXtended/common/libs/EditorHandlesSquare'
], function ({ core: { Utils } }, EditorHandlesSquare) {

    function getWidgetCSS(rect) {
        return {
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            position: 'absolute',
            'background': 'orange'
        };
    }

    describe('widgets.brXtended.common.libs.EditorHandlesSquare', () => {
        var editorHandles,
            widget = {},
            contentEl;
            
        beforeAll(() => {
            contentEl = $('<div/>').css({
                width: '1000px',
                height: '600px',
                top: '0px',
                left: '0px',
                position: 'absolute'
            });
            contentEl.appendTo(document.body);
            widget.el = $('<div id="EditorHandlesSquare_Test"/>').appendTo(contentEl);
            widget.elem = widget.el[0];
            editorHandles = new EditorHandlesSquare(widget);
        });
        afterAll(() => {
            contentEl.remove();
        });
        describe('#behavior-resizeHandles ', () => {
            [
                {
                    initialBox: { top: 100, bottom: 220, left: 100, right: 300, width: 200, height: 120 },
                    settings: { top: 100, left: 100, width: '20%', height: '20%' }
                },
                {
                    initialBox: { top: 100, bottom: 400, left: 100, right: 300, width: 200, height: 300 },
                    settings: { top: 100, left: 100, width: 200, height: 300 }
                },
                {
                    initialBox: { top: 100, bottom: 300, left: 100, right: 400, width: 300, height: 200 },
                    settings: { top: 100, left: 100, width: 300, height: 200 }
                }
            ].forEach(function (config) {
                describe(`with #settings=${JSON.stringify(config.settings)}`, () => {
                    var widgetCss,
                        initialBox;
                    beforeAll(() => {
                        initialBox = config.initialBox;
                        widgetCss = getWidgetCSS(initialBox);
                    });
                    beforeEach(() => {
                        widget.settings = Utils.deepCopy(config.settings);
                        widget.el.css(widgetCss);
                    });
                    describe('#method-update ', () => {
                        var resizeHandle;
                        beforeEach(() => {
                            resizeHandle = editorHandles.getHandles().resizeHandles[0];
                        });
                        [
                            { 
                                direction: 'n', 
                                boxChange: { top: -10, left: 0, width: 0, height: +10 },
                                expected: ['bottom'] },
                            { 
                                direction: 's', 
                                boxChange: { top: 0, left: 0, width: 0, height: +10 },
                                expected: ['top'] },
                            { 
                                direction: 'e', 
                                boxChange: { top: 0, left: 0, width: +10, height: 0 },
                                expected: ['left'] },
                            { 
                                direction: 'w', 
                                boxChange: { top: 0, left: -10, width: +10, height: 0 },
                                expected: ['right'] },
                            { 
                                direction: 'nw', 
                                boxChange: { top: -10, left: -10, width: +10, height: +10 },
                                expected: ['bottom', 'right'] },
                            { 
                                direction: 'ne', 
                                boxChange: { top: -10, left: 0, width: +10, height: +10 },
                                expected: ['bottom', 'left'] },
                            { 
                                direction: 'sw', 
                                boxChange: { top: 0, left: -10, width: +10, height: +10 },
                                expected: ['top', 'right'] },
                            { 
                                direction: 'se', 
                                boxChange: { top: 0, left: 0, width: +10, height: +10 },
                                expected: ['top', 'left'] }
                        ].forEach(function (spec) {
                            describe(`with #param-direction="${spec.direction}" `, () => {
                                var sizeChange;
                                beforeEach(function () {
                                    resizeHandle.start();
                                    resizeHandle.update({
                                        top: initialBox.top + spec.boxChange.top,
                                        left: initialBox.left + spec.boxChange.left,
                                        width: initialBox.width + spec.boxChange.width,
                                        height: initialBox.height + spec.boxChange.height
                                    }, spec.direction);
                                    sizeChange = Math.max(spec.boxChange.width, spec.boxChange.height);
                                });
                                it(`should not change "${spec.expected.join('" and "')}" of widget`, () => {
                                    if (spec.expected.includes('top')) {
                                        expect(widget.settings.top).toEqual(initialBox.top);
                                    }
                                    if (spec.expected.includes('left')) {
                                        expect(widget.settings.left).toEqual(initialBox.left);
                                    }
                                    if (spec.expected.includes('bottom')) {
                                        expect(widget.settings.top + widget.settings.height).toEqual(initialBox.bottom);
                                    }
                                    if (spec.expected.includes('right')) {
                                        expect(widget.settings.left + widget.settings.width).toEqual(initialBox.right);
                                    }
                                });
                                it(`should change dimensions to square`, () => {
                                    expect(widget.settings.width).toEqual(widget.settings.height);
                                });

                                if (spec.direction === 'n' || spec.direction === 's') {
                                    it(`should apply size-change to initial height`, () => {
                                        let expectedSize = initialBox.height + sizeChange;
                                        // one expection is enough, as width==height
                                        expect(widget.settings.width).toEqual(expectedSize); 
                                    });
                                }
                                if (spec.direction === 'e' || spec.direction === 'w') {
                                    it(`should apply size-change to initial width`, () => {
                                        let expectedSize = initialBox.width + sizeChange;
                                        // one expection is enough, as width==height
                                        expect(widget.settings.width).toEqual(expectedSize); 
                                    });
                                }
                                if (spec.direction === 'ne' || spec.direction === 'nw' || spec.direction === 'se' || spec.direction === 'sw') {
                                    it(`should apply size-change to initial max dimension`, () => {
                                        let expectedSize = Math.max(initialBox.width, initialBox.height) + sizeChange;
                                        // one expection is enough, as width==height
                                        expect(widget.settings.width).toEqual(expectedSize); 
                                    });
                                }
                            });
                        });
                    
                    });
                });
            });
        });
        
    });
});
