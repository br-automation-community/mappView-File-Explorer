'use strict';
define([
    'widgets/brXtended/common/libs/BreaseResizeObserver',
    'brTest',
    'widgets/brease/common/Test/CommonTestUtils'
], function (BreaseResizeObserver, { appElem, events: { BreaseEvent }, config: breaseConfig }, CommonTestUtils) {

    var widgetName = 'common',
        libPath = 'widgets.brease.',
        subLib = 'libs.BreaseResizeObserver';

    describe(CommonTestUtils.core.specPath(widgetName, libPath, subLib), function () {
        var instance, elem, parent, grandParent, parentSibling, grandParentSibling;
        beforeEach(function () {
            elem = document.createElement('DIV');
            parent = document.createElement('DIV');
            parentSibling = document.createElement('DIV');
            grandParent = document.createElement('DIV');
            grandParentSibling = document.createElement('DIV');
        });
        afterEach(function () {
            if (elem.parentNode) {
                elem.parentNode.removeChild(elem);
            }
            if (parent.parentNode) {
                parent.parentNode.removeChild(parent);
            }
            if (parentSibling.parentNode) {
                parentSibling.parentNode.removeChild(parentSibling);
            }
            if (grandParent.parentNode) {
                grandParent.parentNode.removeChild(grandParent);
            }
            if (grandParentSibling.parentNode) {
                grandParentSibling.parentNode.removeChild(grandParentSibling);
            }
        });
        describe('#behavior-initialization', function () {
            afterEach(function () {
                instance.dispose();
            });
            it('should trigger a warning when instance was created with #param-elem = null', function () {
                spyOn(console, 'warn');
                instance = new BreaseResizeObserver(null, function () { });
                expect(console.warn).toHaveBeenCalled();
            });
            describe('#method-init', function () {
                it('should not throw an exception when instance was created with #param-elem = null', function () {
                    spyOn(console, 'warn');
                    instance = new BreaseResizeObserver(null, function () { });
                    expect(function () {
                        instance.init();
                    }).not.toThrow();
                });
                it('should not throw an exception when instance was created with #param-callback = undefined', function () {
                    instance = new BreaseResizeObserver(elem, undefined);
                    expect(function () {
                        instance.init();
                    }).not.toThrow();
                });
                it('should trigger #param-callback for initial redraw', function () {
                    var callback = jasmine.createSpy();
                    instance = new BreaseResizeObserver(elem, callback);
                    instance.init();
                    expect(callback).toHaveBeenCalled();
                });
            });
            describe('#method-wake', function () {
                var callback;
                beforeEach(function () {
                    callback = jasmine.createSpy();
                    instance = new BreaseResizeObserver(elem, callback);
                    instance.init();
                    instance.suspend();
                    callback.calls.reset();
                });
                it('should trigger #param-callback for initial redraw', function () {
                    instance.wake();
                    expect(callback).toHaveBeenCalled();
                });
            });
            describe('#event-FlexSizeChanged', function () {
                var callback;
                describe('on parent element', function () {
                    beforeEach(function () {
                        parent.appendChild(elem);
                        appElem.appendChild(parent);
                        callback = jasmine.createSpy();
                        instance = new BreaseResizeObserver(elem, callback);
                        instance.init();
                        callback.calls.reset();
                    });
                    it('should not trigger callback', function () {
                        $(parent).trigger('FlexSizeChanged');
                        expect(callback).not.toHaveBeenCalled();
                    });
                });
                describe('on grandParent element', function () {
                    beforeEach(function () {
                        grandParent.appendChild(parent);
                        parent.appendChild(elem);
                        appElem.appendChild(grandParent);
                        callback = jasmine.createSpy();
                        instance = new BreaseResizeObserver(elem, callback);
                        instance.init();
                        callback.calls.reset();
                    });
                    it('should not trigger callback', function () {
                        $(grandParent).trigger('FlexSizeChanged');
                        expect(callback).not.toHaveBeenCalled();
                    });
                });
            });
        });
        describe('#property-initialized', function () {
            beforeEach(function () {
                instance = new BreaseResizeObserver(elem, function () { });
            });
            it('should be false initially', function () {
                expect(instance.initialized).toBeFalse();
            });
            describe('when calling #method-init', function () {
                beforeEach(function () {
                    instance.init();
                });
                it('should be true', function () {
                    expect(instance.initialized).toBeTrue();
                });
                describe('and #method-init a second time', function () {
                    beforeEach(function () {
                        instance.init();
                    });
                    it('should be true', function () {
                        expect(instance.initialized).toBeTrue();
                    });
                });
                describe('and #method-suspend', function () {
                    beforeEach(function () {
                        instance.suspend();
                    });
                    it('should be true', function () {
                        expect(instance.initialized).toBeTrue();
                    });
                    describe('and #method-wake', function () {
                        beforeEach(function () {
                            instance.wake();
                        });
                        it('should be true', function () {
                            expect(instance.initialized).toBeTrue();
                        });
                    });
                    describe('and #method-dispose', function () {
                        beforeEach(function () {
                            instance.dispose();
                        });
                        it('should be false', function () {
                            expect(instance.initialized).toBeFalse();
                        });
                    });
                });
                describe('and #method-wake', function () {
                    beforeEach(function () {
                        instance.wake();
                    });
                    it('should be true', function () {
                        expect(instance.initialized).toBeTrue();
                    });
                    describe('and #method-suspend', function () {
                        beforeEach(function () {
                            instance.suspend();
                        });
                        it('should be true', function () {
                            expect(instance.initialized).toBeTrue();
                        });
                    });
                    describe('and #method-dispose', function () {
                        beforeEach(function () {
                            instance.dispose();
                        });
                        it('should be false', function () {
                            expect(instance.initialized).toBeFalse();
                        });
                    });
                });
                describe('and #method-dispose', function () {
                    beforeEach(function () {
                        instance.dispose();
                    });
                    it('should be false', function () {
                        expect(instance.initialized).toBeFalse();
                    });
                });
            });
        });
        describe('#property-active', function () {
            beforeEach(function () {
                instance = new BreaseResizeObserver(elem, function () { });
            });
            it('should be false initially', function () {
                expect(instance.active).toBeFalse();
            });
            describe('when calling #method-init', function () {
                beforeEach(function () {
                    instance.init();
                });
                it('should be true', function () {
                    expect(instance.active).toBeTrue();
                });
                describe('and #method-init a second time', function () {
                    beforeEach(function () {
                        instance.init();
                    });
                    it('should be true', function () {
                        expect(instance.active).toBeTrue();
                    });
                });
                describe('and #method-suspend', function () {
                    beforeEach(function () {
                        instance.suspend();
                    });
                    it('should be false', function () {
                        expect(instance.active).toBeFalse();
                    });
                    describe('and #method-wake', function () {
                        beforeEach(function () {
                            instance.wake();
                        });
                        it('should be true', function () {
                            expect(instance.active).toBeTrue();
                        });
                    });
                    describe('and #method-dispose', function () {
                        beforeEach(function () {
                            instance.dispose();
                        });
                        it('should be false', function () {
                            expect(instance.active).toBeFalse();
                        });
                    });
                });
                describe('and #method-wake', function () {
                    beforeEach(function () {
                        instance.wake();
                    });
                    it('should be true', function () {
                        expect(instance.active).toBeTrue();
                    });
                    describe('and #method-suspend', function () {
                        beforeEach(function () {
                            instance.suspend();
                        });
                        it('should be false', function () {
                            expect(instance.active).toBeFalse();
                        });
                    });
                    describe('and #method-dispose', function () {
                        beforeEach(function () {
                            instance.dispose();
                        });
                        it('should be false', function () {
                            expect(instance.active).toBeFalse();
                        });
                    });
                });
                describe('and #method-dispose', function () {
                    beforeEach(function () {
                        instance.dispose();
                    });
                    it('should be false', function () {
                        expect(instance.active).toBeFalse();
                    });
                });
            });
        });
        describe('while #cfg-breaseConfig.editMode = true', function () {
            beforeEach(function () {
                breaseConfig.editMode = true;
            });
            afterEach(function () {
                breaseConfig.editMode = false;
            });
            runFlexBoxTests();
            describe(`#event-${BreaseEvent.WIDGET_PROPERTIES_CHANGED}`, function () {
                var callback;
                beforeEach(function () {
                    grandParent.appendChild(parent);
                    parent.appendChild(elem);
                    appElem.appendChild(grandParent);
                    grandParent.insertBefore(parentSibling, parent);
                    appElem.insertBefore(grandParentSibling, grandParent);
                    callback = jasmine.createSpy();
                    instance = new BreaseResizeObserver(elem, callback);
                    instance.init();
                    callback.calls.reset();
                });
                it('should not throw if instance was created with invalid callback when being fired on the widget element', function () {
                    instance = new BreaseResizeObserver(elem, undefined);
                    instance.init();
                    expect(function () {
                        elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_PROPERTIES_CHANGED, { bubbles: true }));
                    }).not.toThrow();
                });
                it('should trigger callback when being fired on the widget element', function () {
                    elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).toHaveBeenCalled();
                });
                it('should trigger callback when being fired on the parent', function () {
                    parent.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the parentSibling', function () {
                    parentSibling.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).not.toHaveBeenCalled();
                });
                it('should trigger callback when being fired on the grandParent', function () {
                    parent.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the grandParentSibling', function () {
                    $(grandParentSibling).trigger(BreaseEvent.WIDGET_PROPERTIES_CHANGED);
                    expect(callback).not.toHaveBeenCalled();
                });
            });
            describe(`#event-${BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED}`, function () {
                var callback;
                beforeEach(function () {
                    grandParent.appendChild(parent);
                    parent.appendChild(elem);
                    appElem.appendChild(grandParent);
                    grandParent.insertBefore(parentSibling, parent);
                    appElem.insertBefore(grandParentSibling, grandParent);
                    callback = jasmine.createSpy();
                    instance = new BreaseResizeObserver(elem, callback);
                    instance.init();
                    callback.calls.reset();
                });
                it('should not throw if instance was created with invalid callback when being fired on the widget element', function () {
                    instance = new BreaseResizeObserver(elem, undefined);
                    instance.init();
                    expect(function () {
                        elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED, { bubbles: true }));
                    }).not.toThrow();
                });
                it('should trigger callback when being fired on the widget element', function () {
                    elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).toHaveBeenCalled();
                });
                it('should trigger callback when being fired on the parent', function () {
                    parent.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the parentSibling', function () {
                    parentSibling.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).not.toHaveBeenCalled();
                });
                it('should trigger callback when being fired on the grandParent', function () {
                    parent.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the grandParentSibling', function () {
                    $(grandParentSibling).trigger(BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED);
                    expect(callback).not.toHaveBeenCalled();
                });
            });
            describe(`#event-${BreaseEvent.WIDGET_RESIZE}`, function () {
                var callback;
                beforeEach(function () {
                    grandParent.appendChild(parent);
                    parent.appendChild(elem);
                    appElem.appendChild(grandParent);
                    grandParent.insertBefore(parentSibling, parent);
                    appElem.insertBefore(grandParentSibling, grandParent);
                    callback = jasmine.createSpy();
                    instance = new BreaseResizeObserver(elem, callback);
                    instance.init();
                    callback.calls.reset();
                });
                it('should not throw if instance was created with invalid callback when being fired on the widget element', function () {
                    instance = new BreaseResizeObserver(elem, undefined);
                    instance.init();
                    expect(function () {
                        elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_RESIZE, { bubbles: true }));
                    }).not.toThrow();
                });
                it('should trigger callback when being fired on the widget element', function () {
                    elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_RESIZE, { bubbles: true }));
                    expect(callback).toHaveBeenCalled();
                });
                it('should trigger callback when being fired on the parent', function () {
                    parent.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_RESIZE, { bubbles: true }));
                    expect(callback).toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the parentSibling', function () {
                    parentSibling.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_RESIZE, { bubbles: true }));
                    expect(callback).not.toHaveBeenCalled();
                });
                it('should trigger callback when being fired on the grandParent', function () {
                    parent.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_RESIZE, { bubbles: true }));
                    expect(callback).toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the grandParentSibling', function () {
                    $(grandParentSibling).trigger(BreaseEvent.WIDGET_RESIZE);
                    expect(callback).not.toHaveBeenCalled();
                });
            });
        });
        describe('while #cfg-breaseConfig.editMode = false', function () {
            beforeEach(function () {
                breaseConfig.editMode = false;
            });
            runFlexBoxTests();
            describe(`#event-${BreaseEvent.WIDGET_PROPERTIES_CHANGED}`, function () {
                var callback;
                beforeEach(function () {
                    grandParent.appendChild(parent);
                    parent.appendChild(elem);
                    appElem.appendChild(grandParent);
                    grandParent.insertBefore(parentSibling, parent);
                    appElem.insertBefore(grandParentSibling, grandParent);
                    callback = jasmine.createSpy();
                    instance = new BreaseResizeObserver(elem, callback);
                    instance.init();
                    callback.calls.reset();
                });
                it('should not trigger callback when being fired on the widget element', function () {
                    elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).not.toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the parent', function () {
                    parent.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).not.toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the parentSibling', function () {
                    parentSibling.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).not.not.toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the grandParent', function () {
                    parent.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).not.toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the grandParentSibling', function () {
                    $(grandParentSibling).trigger(BreaseEvent.WIDGET_PROPERTIES_CHANGED);
                    expect(callback).not.toHaveBeenCalled();
                });
            });
            describe(`#event-${BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED}`, function () {
                var callback;
                beforeEach(function () {
                    grandParent.appendChild(parent);
                    parent.appendChild(elem);
                    appElem.appendChild(grandParent);
                    grandParent.insertBefore(parentSibling, parent);
                    appElem.insertBefore(grandParentSibling, grandParent);
                    callback = jasmine.createSpy();
                    instance = new BreaseResizeObserver(elem, callback);
                    instance.init();
                    callback.calls.reset();
                });
                it('should not trigger callback when being fired on the widget element', function () {
                    elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).not.toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the parent', function () {
                    parent.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).not.toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the parentSibling', function () {
                    parentSibling.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).not.not.toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the grandParent', function () {
                    parent.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED, { bubbles: true }));
                    expect(callback).not.toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the grandParentSibling', function () {
                    $(grandParentSibling).trigger(BreaseEvent.WIDGET_STYLE_PROPERTIES_CHANGED);
                    expect(callback).not.toHaveBeenCalled();
                });
            });
            describe(`#event-${BreaseEvent.WIDGET_RESIZE}`, function () {
                var callback;
                beforeEach(function () {
                    grandParent.appendChild(parent);
                    parent.appendChild(elem);
                    appElem.appendChild(grandParent);
                    grandParent.insertBefore(parentSibling, parent);
                    appElem.insertBefore(grandParentSibling, grandParent);
                    callback = jasmine.createSpy();
                    instance = new BreaseResizeObserver(elem, callback);
                    instance.init();
                    callback.calls.reset();
                });
                it('should not trigger callback when being fired on the widget element', function () {
                    elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_RESIZE, { bubbles: true }));
                    expect(callback).not.toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the parent', function () {
                    parent.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_RESIZE, { bubbles: true }));
                    expect(callback).not.toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the parentSibling', function () {
                    parentSibling.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_RESIZE, { bubbles: true }));
                    expect(callback).not.not.toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the grandParent', function () {
                    parent.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_RESIZE, { bubbles: true }));
                    expect(callback).not.toHaveBeenCalled();
                });
                it('should not trigger callback when being fired on the grandParentSibling', function () {
                    $(grandParentSibling).trigger(BreaseEvent.WIDGET_RESIZE);
                    expect(callback).not.toHaveBeenCalled();
                });
            });
        });
        function runFlexBoxTests() {
            var callback;
            describe('and parent element has class "breaseFlexBoxItem"', function () {
                beforeEach(function () {
                    parent.classList.add('breaseFlexBoxItem');
                    parent.appendChild(elem);
                    appElem.appendChild(parent);
                    appElem.insertBefore(parentSibling, parent);
                    callback = jasmine.createSpy();
                    instance = new BreaseResizeObserver(elem, callback);
                    instance.init();
                    callback.calls.reset();
                });
                describe('#event-FlexSizeChanged', function () {
                    it('should trigger callback when being fired on the parent', function () {
                        $(parent).trigger('FlexSizeChanged');
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should not throw if instance was created with invalid callback when being fired on the parent', function () {
                        instance = new BreaseResizeObserver(elem, undefined);
                        instance.init();
                        expect(function () {
                            $(parent).trigger('FlexSizeChanged');
                        }).not.toThrow();
                    });
                    it('should trigger callback once when being fired on the parent after calling #method-init twice', function () {
                        instance.init();
                        callback.calls.reset();
                        $(parent).trigger('FlexSizeChanged');
                        expect(callback.calls.count()).toEqual(1);
                    });
                    it('should not trigger callback when being fired on the parentSibling', function () {
                        $(parentSibling).trigger('FlexSizeChanged');
                        expect(callback).not.toHaveBeenCalled();
                    });
                    describe('when calling #method-suspend', function () {
                        beforeEach(function () {
                            instance.suspend();
                        });
                        it('should not trigger callback when being fired on the parent', function () {
                            $(parent).trigger('FlexSizeChanged');
                            expect(callback).not.toHaveBeenCalled();
                        });
                        describe('and #method-wake', function () {
                            beforeEach(function () {
                                instance.wake();
                                callback.calls.reset();
                            });
                            it('should trigger callback when being fired on the parent', function () {
                                $(parent).trigger('FlexSizeChanged');
                                expect(callback).toHaveBeenCalled();
                            });
                            it('should trigger callback once when being fired on the parent after calling #method-wake twice', function () {
                                instance.wake();
                                callback.calls.reset();
                                $(parent).trigger('FlexSizeChanged');
                                expect(callback.calls.count()).toEqual(1);
                            });
                        });
                    });
                });
            });
            describe('and grandParent element has class "breaseFlexBoxItem"', function () {
                beforeEach(function () {
                    grandParent.classList.add('breaseFlexBoxItem');
                    grandParent.appendChild(parent);
                    parent.appendChild(elem);
                    appElem.appendChild(grandParent);
                    grandParent.insertBefore(parentSibling, parent);
                    appElem.insertBefore(grandParentSibling, grandParent);
                    callback = jasmine.createSpy();
                    instance = new BreaseResizeObserver(elem, callback);
                    instance.init();
                    callback.calls.reset();
                });
                describe('#event-FlexSizeChanged', function () {
                    it('should trigger callback when being fired on the grandParent', function () {
                        $(grandParent).trigger('FlexSizeChanged');
                        expect(callback).toHaveBeenCalled();
                    });
                    it('should not throw if instance was created with invalid callback when being fired on the grandParent', function () {
                        instance = new BreaseResizeObserver(elem, undefined);
                        instance.init();
                        expect(function () {
                            $(grandParent).trigger('FlexSizeChanged');
                        }).not.toThrow();
                    });
                    it('should not trigger callback when being fired on the grandParentSibling', function () {
                        $(grandParentSibling).trigger('FlexSizeChanged');
                        expect(callback).not.toHaveBeenCalled();
                    });
                    describe('when calling #method-suspend', function () {
                        beforeEach(function () {
                            instance.suspend();
                        });
                        it('should not trigger callback when being fired on the grandParent', function () {
                            $(grandParent).trigger('FlexSizeChanged');
                            expect(callback).not.toHaveBeenCalled();
                        });
                        describe('and #method-wake', function () {
                            beforeEach(function () {
                                instance.wake();
                                callback.calls.reset();
                            });
                            it('should trigger callback when being fired on the grandParent', function () {
                                $(grandParent).trigger('FlexSizeChanged');
                                expect(callback).toHaveBeenCalled();
                            });
                        });
                    });
                });
            });
        }
    });
});
