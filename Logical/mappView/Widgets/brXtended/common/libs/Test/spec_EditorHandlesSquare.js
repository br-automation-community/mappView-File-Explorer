'use strict';
define([
    'brTest',
    'widgets/brXtended/common/libs/EditorHandlesSquare'
], function ({
    core: { Utils }
}, EditorHandlesSquare) {

    describe('widgets.brXtended.common.libs.EditorHandlesSquare', () => {
        var editorHandles,
            initialBox = {
                top: 100,
                left: 100,
                width: 200,
                height: 300
            },
            widget = {
                settings: Utils.deepCopy(initialBox)
            },
            contentCss = {
                width: '1000px',
                height: '500px',
                top: '0px',
                left: '0px',
                position: 'absolute'
            },
            widgetCss = {
                width: `${initialBox.width}px`,
                height: `${initialBox.height}px`,
                top: `${initialBox.top}px`,
                left: `${initialBox.left}px`,
                position: 'absolute',
                'background': 'orange'
            },
            contentEl;
        beforeAll(() => {
            contentEl = $('<div/>').css(contentCss);
            widget.el = $('<div/>').css(widgetCss).appendTo(contentEl);
            contentEl.appendTo(document.body);
            widget.elem = widget.el[0];
            widget.elem.id = 'EditorHandlesSquare_Test';
        });
        afterAll(() => {
            contentEl.remove();
        });
        beforeEach(() => {
            widget.settings = Utils.deepCopy(initialBox);
            widget.el.css(widgetCss);
            editorHandles = new EditorHandlesSquare(widget);
        });

        describe('#method-getSelectionDecoratables', () => {
            it('should return [widget.elem]', () => {
                expect(editorHandles.getSelectionDecoratables()).toEqual([widget.elem]);
            });
        });

        describe('#method-getHandles', () => {
            it('should return array of pointHandles', () => {
                var handles = editorHandles.getHandles();
                expect(handles.pointHandles).toBeInstanceOf(Array);
            });
            it('should return array of resizeHandles', () => {
                var handles = editorHandles.getHandles();
                expect(handles.resizeHandles).toBeInstanceOf(Array);
            });
        });
            
        describe('#behavior-resizeHandles: every resizeHandle ', () => {
                
            var resizeHandles;
            beforeEach(() => {
                resizeHandles = editorHandles.getHandles().resizeHandles;
            });
            it('should have method start', () => {
                resizeHandles.forEach(function (resizeHandle) {
                    expect(typeof resizeHandle.start).toEqual('function');
                });
            });
            it('should have method update', () => {
                resizeHandles.forEach(function (resizeHandle) {
                    expect(typeof resizeHandle.update).toEqual('function');
                });
            });
            it('should have method finish', () => {
                resizeHandles.forEach(function (resizeHandle) {
                    expect(typeof resizeHandle.finish).toEqual('function');
                });
            });
            it('should have method handle', () => {
                resizeHandles.forEach(function (resizeHandle) {
                    expect(typeof resizeHandle.handle).toEqual('function');
                });
            });

            describe('#method-start', () => {
                var resizeHandle;
                beforeEach(() => {
                    resizeHandle = editorHandles.getHandles().resizeHandles[0];
                });
                it('should be callable', () => {
                    expect(resizeHandle.start).not.toThrow();
                });
            });

            describe('#method-update ', () => {
                var resizeHandle,
                    newBox = { top: 10, left: 20, width: 180, height: 390 };
                beforeEach(() => {
                    resizeHandle = editorHandles.getHandles().resizeHandles[0];
                    resizeHandle.start();
                });
                [
                    { 
                        direction: 'n', 
                        boxChange: { top: -10, left: 0, width: 0, height: +10 },
                        expected: { top: initialBox.top - 10, left: initialBox.left - 110 / 2, width: initialBox.height + 10, height: initialBox.height + 10 } 
                    },
                    { 
                        direction: 's', 
                        boxChange: { top: 0, left: 0, width: 0, height: +10 },
                        expected: { top: initialBox.top, left: initialBox.left - 110 / 2, width: initialBox.height + 10, height: initialBox.height + 10 } 
                    },
                    { 
                        direction: 'e', 
                        boxChange: { top: 0, left: 0, width: +10, height: 0 },
                        expected: { top: initialBox.top + 45, left: initialBox.left, width: initialBox.width + 10, height: initialBox.width + 10 } 
                    },
                    { 
                        direction: 'w', 
                        boxChange: { top: 0, left: -10, width: +10, height: 0 },
                        expected: { top: initialBox.top + 45, left: initialBox.left - 10, width: initialBox.width + 10, height: initialBox.width + 10 } 
                    },
                    { 
                        direction: 'nw', 
                        boxChange: { top: -10, left: -10, width: +10, height: +10 },
                        expected: { top: initialBox.top - 10, left: initialBox.left - 110, width: initialBox.height + 10, height: initialBox.height + 10 } 
                    },
                    { 
                        direction: 'ne', 
                        boxChange: { top: -10, left: 0, width: +10, height: +10 },
                        expected: { top: initialBox.top - 10, left: initialBox.left, width: initialBox.height + 10, height: initialBox.height + 10 } 
                    },
                    { 
                        direction: 'sw', 
                        boxChange: { top: 0, left: -10, width: +10, height: +10 },
                        expected: { top: initialBox.top, left: initialBox.left - 110, width: initialBox.height + 10, height: initialBox.height + 10 } 
                    },
                    { 
                        direction: 'se', 
                        boxChange: { top: 0, left: 0, width: +10, height: +10 },
                        expected: { top: initialBox.top, left: initialBox.left, width: initialBox.height + 10, height: initialBox.height + 10 } 
                    }
                ].forEach(function (spec) {
                    describe(`with #param-direction="${spec.direction}" `, () => {
                        beforeEach(function () {
                            spyOn(widget.el, 'css').and.callThrough();
                            widget.el.css.calls.reset();
                            let newBox = {
                                top: initialBox.top + spec.boxChange.top,
                                left: initialBox.left + spec.boxChange.left,
                                width: initialBox.width + spec.boxChange.width,
                                height: initialBox.height + spec.boxChange.height
                            };
                            resizeHandle.update(newBox, spec.direction);
                        });
                        it(`should set widget settings.top = ${spec.expected.top}`, () => {
                            expect(widget.settings.top).toEqual(spec.expected.top);
                        });
                        it(`should set widget settings.left = ${spec.expected.left}`, () => {
                            expect(widget.settings.left).toEqual(spec.expected.left);
                        });
                        it(`should set widget settings.width = ${spec.expected.width}`, () => {
                            expect(widget.settings.width).toEqual(spec.expected.width);
                        });
                        it(`should set widget settings.height = ${spec.expected.height}`, () => {
                            expect(widget.settings.height).toEqual(spec.expected.height);
                        });
                        it(`should call widget.el.css with top = ${spec.expected.top}`, () => {
                            expect(widget.el.css).toHaveBeenCalledWith('top', spec.expected.top);
                        });
                        it(`should call widget.el.css with left = ${spec.expected.left}`, () => {
                            expect(widget.el.css).toHaveBeenCalledWith('left', spec.expected.left);
                        });
                        it(`should call widget.el.css with width = ${spec.expected.width}`, () => {
                            expect(widget.el.css).toHaveBeenCalledWith('width', spec.expected.width);
                        });
                        it(`should call widget.el.css with height = ${spec.expected.height}`, () => {
                            expect(widget.el.css).toHaveBeenCalledWith('height', spec.expected.height);
                        });
                    });
                });
                
                describe(`with #param-direction="unknown"`, () => {
                    it('should call console', () => {
                        spyOn(console, 'iatWarn');
                        resizeHandle.update(Utils.deepCopy(newBox), 'unknown');
                        expect(console.iatWarn).toHaveBeenCalled();
                    });
                });
                    
                it('should call "editorHandles.onResizeHandler", if it exists', () => {
                    var spyObj = {
                        resizeHandler: function () {}
                    };
                    spyOn(spyObj, 'resizeHandler');
                        
                    editorHandles.onResize(spyObj.resizeHandler);

                    resizeHandle.update(Utils.deepCopy(newBox), 'n');
                    expect(spyObj.resizeHandler).toHaveBeenCalledWith(widget);
                });
                    
                it('should call "widget._redrawInEditor", if it exists', () => {
                    widget._redrawInEditor = function () {};
                    spyOn(widget, '_redrawInEditor');
                    resizeHandle.update(Utils.deepCopy(newBox), 'n');
                    expect(widget._redrawInEditor).toHaveBeenCalledWith(newBox.height, newBox.height);
                });
            });

            describe('#method-finish', () => {
                var resizeHandle;
                beforeEach(() => {
                    resizeHandle = editorHandles.getHandles().resizeHandles[0];
                });

                it('should return position and size', () => {
                    expect(resizeHandle.finish()).toEqual({
                        top: widget.settings.top,
                        left: widget.settings.left,
                        width: widget.settings.width,
                        height: widget.settings.height
                    });
                });
            });

            describe('#method-handle', () => {
                var resizeHandle;
                beforeEach(() => {
                    resizeHandle = editorHandles.getHandles().resizeHandles[0];
                });

                it('should return widget.elem', () => {
                    expect(resizeHandle.handle()).toEqual(widget.elem);
                });
            });

            [
                { css: {} },
                { css: { padding: '10px', top: 0, left: 0, width: 100, height: 100 } },
                { css: { padding: '10px', top: 0, left: 0, width: '50%', height: '50%' } },
                { css: { padding: '5px 10px', top: 0, left: 0, width: 100, height: 100 } },
                { css: { 'border': '2px solid', top: 0, left: 0, width: 100, height: 100 } },
                { css: { 'padding': '20px', 'border': '2px solid', 'max-height': '10px' } },
                { css: { 'padding': '20px', 'border': '2px solid', 'max-height': '50px' } },
                { css: { 'padding': '20px', 'border': '2px solid', 'min-height': '20px' } },
                { css: { 'padding': '20px', 'border': '2px solid', 'min-height': '20px', 'max-height': '50px' } },
                { css: { 'padding': '50px', 'border': '2px solid', 'max-height': '50px' } },
                { css: { 'padding': '20px', 'border': '2px solid', 'max-width': '10px' } },
                { css: { 'padding': '20px', 'border': '2px solid', 'max-width': '10%' } },
                { css: { 'padding': '20px', 'border': '2px solid', 'max-height': '20%' } }
            ].forEach(function (test) {
                describe(`while widget has css = ${JSON.stringify(test.css)}`, function () {
                    var resizeHandle, targetRect, startRect;
                    beforeEach(function () {
                        resizeHandle = editorHandles.getHandles().resizeHandles[0];
                        widget.el.css({ top: 0, left: 0, width: 100, height: 100, 'box-sizing': 'border-box' });
                        widget.el.css(test.css);
                        startRect = _getOuterRect();
                        resizeHandle.start();
                    });
                    [{ 'width': 100, 'height': 1, 'top': 99, 'left': 0 }, { 'width': 100, 'height': 0, 'top': 100, 'left': 0 }].forEach(function (newBox) {
                        describe(`and direction = n`, function () {
                            beforeEach(function () {
                                resizeHandle.update(newBox, 'n');
                                targetRect = _getOuterRect();
                            });
                            it('should not move the widget below its initial bottom position', function () {
                                expect(targetRect.bottom).toBeLessThanOrEqual(startRect.bottom);
                            });
                        });
                    });
                    [{ 'width': 3, 'height': 0, 'top': 100, 'left': 0 }].forEach(function (newBox) {
                        describe(`and direction = ne and newBox = ${JSON.stringify(newBox)}`, function () {
                            beforeEach(function () {
                                resizeHandle.update(newBox, 'ne');
                                targetRect = _getOuterRect();
                            });
                            it('should not move the widget below its initial bottom position', function () {
                                expect(targetRect.bottom).toBeLessThanOrEqual(startRect.bottom);
                            });
                            it('should not change the left position of the widget', function () {
                                expect(targetRect.left).toEqual(startRect.left);
                            });
                            it('should not move the widget above its initial left position', function () {
                                expect(targetRect.left).toBeGreaterThanOrEqual(startRect.left);
                            });
                        });
                    });
                    [{ 'width': 0, 'height': 100, 'top': 0, 'left': 0 }].forEach(function (newBox) {
                        describe(`and direction = e`, function () {
                            beforeEach(function () {
                                resizeHandle.update(newBox, 'e');
                                targetRect = _getOuterRect();
                            });
                            it('should not change the left position of the widget', function () {
                                expect(targetRect.left).toEqual(startRect.left);
                            });
                        });
                    });
                    [{ 'width': 95, 'height': 97, 'top': 0, 'left': 0 }, { 'width': 66, 'height': 60, 'top': 0, 'left': 0 }, { 'width': 0, 'height': 0, 'top': 0, 'left': 0 }].forEach(function (newBox) {
                        describe(`and direction = se`, function () {
                            beforeEach(function () {
                                resizeHandle.update(newBox, 'se');
                                targetRect = _getOuterRect();
                            });
                            it('should not change the top position of the widget', function () {
                                expect(targetRect.top).toEqual(startRect.top);
                            });
                            it('should not change the left position of the widget', function () {
                                expect(targetRect.left).toEqual(startRect.left);
                            });
                        });
                    });
                    [{ 'width': 100, 'height': 99, 'top': 0, 'left': 0 }, { 'width': 100, 'height': 50, 'top': 0, 'left': 0 }, { 'width': 100, 'height': 0, 'top': 0, 'left': 0 }].forEach(function (newBox) {
                        describe(`and direction = s and newBox = ${JSON.stringify(newBox)}`, function () {
                            beforeEach(function () {
                                resizeHandle.update(newBox, 's');
                                targetRect = _getOuterRect();
                            });
                            it('should not change the top position of the widget', function () {
                                expect(targetRect.top).toEqual(startRect.top);
                            });
                        });
                    });
                    [{ 'width': 99, 'height': 99, 'top': 0, 'left': 1 }, { 'width': 50, 'height': 50, 'top': 0, 'left': 50 }, { 'width': 0, 'height': 0, 'top': 0, 'left': 100 }].forEach(function (newBox) {
                        describe(`and direction = sw`, function () {
                            beforeEach(function () {
                                resizeHandle.update(newBox, 'sw');
                                targetRect = _getOuterRect();
                            });

                            it('should not change the top position of the widget', function () {
                                expect(targetRect.top).toEqual(startRect.top);
                            });

                            it('should not change the right position of the widget', function () {
                                expect(targetRect.right).toEqual(startRect.right);
                            });
                        });
                    });
                    [{ 'width': 10, 'height': 0, 'top': 90, 'left': 80 }].forEach(function (newBox) {
                        describe(`and direction = w`, function () {
                            beforeEach(function () {
                                resizeHandle.update(newBox, 'w');
                                targetRect = _getOuterRect();
                            });
                            it('should not move the widget above its initial right position', function () {
                                expect(targetRect.left).toBeLessThanOrEqual(startRect.right);
                            });
                        });
                    });
                    [{ 'width': 99, 'height': 99, 'top': 1, 'left': 1 }, { 'width': 60, 'height': 50, 'top': 50, 'left': 40 }, { 'width': 0, 'height': 0, 'top': 100, 'left': 100 }].forEach(function (newBox) {
                        describe(`and direction = nw`, function () {
                            beforeEach(function () {
                                resizeHandle.update(newBox, 'nw');
                                targetRect = _getOuterRect();
                            });
                            it('should not move the widget above its initial right position', function () {
                                expect(targetRect.left).toBeLessThanOrEqual(startRect.right);
                            });
                            it('should not move the widget below its initial bottom position', function () {
                                expect(targetRect.bottom).toBeLessThanOrEqual(startRect.bottom);
                            });
                            it('should not change the right position of the widget', function () {
                                expect(targetRect.right).toEqual(startRect.right);
                            });
                        });
                    });
                    function _getOuterRect() {
                        // return rect including padding and margin
                        var rect = widget.el.offset();
                        rect.width = widget.el.outerWidth();
                        rect.height = widget.el.outerHeight();
                        rect.bottom = rect.top + rect.height;
                        rect.right = rect.left + rect.width;
                        return rect;
                    }
                });
            });
        });
    });
});
