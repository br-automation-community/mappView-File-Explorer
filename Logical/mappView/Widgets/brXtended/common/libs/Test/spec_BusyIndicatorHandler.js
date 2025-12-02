'use strict';
define([
    'widgets/brease/common/BusyIndicatorHandler/libs/BusyIndicatorHandler',
    'brTest',
    'widgets/brease/common/Test/CommonTestUtils'
], function (BusyIndicatorHandler, {
    config: breaseConfig,
    events: { BreaseEvent }
}, CommonTestUtils) {
    
    var widgetName = 'common',
        libPath = 'widgets.brease.',
        subLib = 'libs.BusyIndicatorHandler';

    describe(CommonTestUtils.core.specPath(widgetName, libPath, subLib), function () {
        var instance,
            widget;

        beforeAll(function () {
            widget = {
                settings: {},
                el: $('<div id="someTestWidget"/>').appendTo(document.body)
            };
            widget.elem = widget.el.get(0);
        });

        beforeEach(function () {
            instance = new BusyIndicatorHandler(widget);
        });

        afterEach(function () {
            instance.dispose();
        });

        afterAll(function () {
            widget.el.remove();
        });

        describe('#method-createBusyIndicator', function () {
            
            it('should create a busyWrapper element inside widget.elem', function () {
                instance.createBusyIndicator();
                expect(widget.el.find('.busyWrapper').length).toEqual(1);
            });
            it('should create only one busyWrapper element inside widget.elem, if called twice', function () {
                instance.createBusyIndicator();
                instance.createBusyIndicator();
                expect(widget.el.find('.busyWrapper').length).toEqual(1);
            });

            it('should create a BusyIndicator widget inside busyWrapper element', async function () {
                instance.createBusyIndicator();
                await CommonTestUtils.core.widgetsReady([], [widget.elem.id + '_busyIndicator']);
                expect(widget.el.find('.breaseBusyIndicator').length).toEqual(1);
            });

            it('should create a busyWrapper element with default css, if called without argument', async function () {
                instance.createBusyIndicator();
                await CommonTestUtils.core.widgetsReady([], [widget.elem.id + '_busyIndicator']);
                var styleAttr = widget.busyWrapper.attr('style').replace(/ /g, '');
                expect(styleAttr.includes('width:100%')).toBeTrue();
                expect(styleAttr.includes('height:100%')).toBeTrue();
            });

            it('should create a busyWrapper element with cssObject as argument', async function () {
                var cssObject = {
                    width: '50px',
                    height: '100px'
                };
                instance.createBusyIndicator(cssObject);
                await CommonTestUtils.core.widgetsReady([], [widget.elem.id + '_busyIndicator']);
                var styleAttr = widget.busyWrapper.attr('style').replace(/ /g, '');
                expect(styleAttr.includes(`width:${cssObject.width}`)).toBeTrue();
                expect(styleAttr.includes(`height:${cssObject.height}`)).toBeTrue();
            });

        });

        describe('#method-showBusyIndicator', function () {
            beforeEach(async function () {
                instance.createBusyIndicator();
                await CommonTestUtils.core.widgetsReady([], [widget.elem.id + '_busyIndicator']);
            });
            describe('with widget.settings.busyIndicatorDelay=0', function () {
                beforeEach(async function () {
                    widget.settings.busyIndicatorDelay = 0;
                });
                it('should show busyWrapper immediately', function () {
                    instance.showBusyIndicator();
                    expect(widget.busyWrapper.css('visibility')).toEqual('visible');
                });
                it('should not show busyWrapper in editMode', function () {
                    breaseConfig.editMode = true;
                    instance.showBusyIndicator();
                    expect(widget.busyWrapper.css('visibility')).not.toEqual('visible');
                    breaseConfig.editMode = false;
                });
                describe('and #method-hideBusyIndicator', function () {
                    it('should hide busyWrapper', function () {
                        instance.showBusyIndicator();
                        instance.hideBusyIndicator();
                        expect(widget.busyWrapper.css('visibility')).not.toEqual('visible');
                    });
                });
            });
            describe('with widget.settings.busyIndicatorDelay>0', function () {
                beforeEach(async function () {
                    widget.settings.busyIndicatorDelay = 50;
                });
                it('should show busyWrapper after delay', async function () {
                    instance.showBusyIndicator();
                    expect(widget.busyWrapper.css('visibility')).not.toEqual('visible');
                    await CommonTestUtils.core.promisedTimeout(widget.settings.busyIndicatorDelay);
                    expect(widget.busyWrapper.css('visibility')).toEqual('visible');
                });
                describe('and #method-hideBusyIndicator', function () {
                    it('called immediate after showBusyIndicator should hide busyWrapper', async function () {
                        instance.showBusyIndicator();
                        instance.hideBusyIndicator();
                        expect(widget.busyWrapper.css('visibility')).not.toEqual('visible');
                        await CommonTestUtils.core.promisedTimeout(widget.settings.busyIndicatorDelay);
                        expect(widget.busyWrapper.css('visibility')).not.toEqual('visible');
                    });
                    it('called half of busyIndicatorDelay after showBusyIndicator should hide busyWrapper', async function () {
                        instance.showBusyIndicator();
                        window.setTimeout(function () { instance.hideBusyIndicator(); }, widget.settings.busyIndicatorDelay / 2);
                        expect(widget.busyWrapper.css('visibility')).not.toEqual('visible');
                        await CommonTestUtils.core.promisedTimeout(widget.settings.busyIndicatorDelay);
                        expect(widget.busyWrapper.css('visibility')).not.toEqual('visible');
                    });
                    it('called after busyIndicatorDelay should hide busyWrapper', async function () {
                        instance.showBusyIndicator();
                        window.setTimeout(function () { instance.hideBusyIndicator(); }, widget.settings.busyIndicatorDelay);
                        expect(widget.busyWrapper.css('visibility')).not.toEqual('visible');
                        await CommonTestUtils.core.promisedTimeout(widget.settings.busyIndicatorDelay);
                        expect(widget.busyWrapper.css('visibility')).not.toEqual('visible');
                    });
                });
            });

        });
        
        describe('#method-showBusyIndicator', function () {
            it('should not throw an error, if called without creation of busyWrapper', function () {
                expect(function () {
                    instance.showBusyIndicator();
                }).not.toThrow();
            });
        });
        
        describe('#method-hideBusyIndicator', function () {
            it('should not throw an error, if called without creation of busyWrapper', function () {
                expect(function () {
                    instance.hideBusyIndicator();
                }).not.toThrow();
            });
        });
    });
});
