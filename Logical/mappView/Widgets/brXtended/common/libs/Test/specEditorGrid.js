'use strict';
define([
    'brease',
    'brTest',
    'widgets/brXtended/common/libs/EditorGrid',
    'widgets/brXtended/common/libs/Test/CustomMatchers',
    'widgets/brXtended/common/libs/ChartUtils'
], function ({ controller: { uiController } }, { events: { BreaseEvent } }, EditorGrid, CustomMatchers, ChartUtils) {

    function toEqualWidget(actual, expected) {
        var actualExists = !!actual && !!actual.elem,
            expectedExists = !!expected && !!expected.elem,
            pass = actualExists && expectedExists && actual.elem.id === expected.elem.id,
            message;

        if (!actualExists) {
            message = 'Actual is not a widget!';
        } else if (!expectedExists) {
            message = 'Expected is not a widget!';
        } else if (!pass) {
            message = 'Expected actual widget to have the same element id as expected widget';
        }
        return {
            pass: pass,
            message: message
        };
    }

    function getWidget(id) {
        var el = $('#' + id);
        return {
            el: el,
            elem: el.get(0)
        };
    }

    describe('widgets.brXtended.common.libs.EditorGrid', function () {
        var container;
        var editorGrid,
            el,
            widget,
            configuration;

        beforeAll(function () {
            CustomMatchers.addSingleMatcher(this, 'toEqualWidget', toEqualWidget);
        });
        afterAll(function () {
        });

        beforeEach(function () {
            container = $(`<div style="position:absolute; left:100px;top:100px;">
            <div id="widget1" class="breaseWidget"><div id="child1" class="breaseWidget"></div></div>
            <div id="containerWidget1" class="breaseWidget">
                <div id="widget2" class="breaseWidget"></div>
            </div>
        </div>`).appendTo(document.body);
            el = $('#widget1');
            widget = {
                el: el,
                elem: el.get(0)
            };
            configuration = {};
        });

        afterEach(function () {
            editorGrid.dispose();
            container.remove();
        });

        describe('#method-constructor should create an instance', function () {
            it('with referenced widget', function () {
                editorGrid = new EditorGrid(widget, configuration);
                expect(editorGrid.widget).toBe(widget);
            });

            it('which listens to ' + BreaseEvent.WIDGET_ADDED + ' event', function () {
                editorGrid = new EditorGrid(widget, configuration);
                spyOn(editorGrid, 'childrenAdded');
                widget.elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_ADDED, { detail: {} }));
                expect(editorGrid.childrenAdded).toHaveBeenCalled();
            });

            it('which listens to ' + BreaseEvent.WIDGET_REMOVED + ' event', function () {
                editorGrid = new EditorGrid(widget, configuration);
                spyOn(editorGrid, 'childrenRemoved');
                widget.el.trigger(BreaseEvent.WIDGET_REMOVED);
                expect(editorGrid.childrenRemoved).toHaveBeenCalled();
            });
        });

        describe('#method-dispose', function () {
            it('should remove listener to event ' + BreaseEvent.WIDGET_ADDED, function () {
                editorGrid = new EditorGrid(widget, configuration);
                spyOn(editorGrid, 'childrenAdded');
                editorGrid.dispose();
                widget.elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_ADDED, { detail: {} }));
                expect(editorGrid.childrenAdded).not.toHaveBeenCalled();
            });

            it('should remove listener to event ' + BreaseEvent.WIDGET_REMOVED, function () {
                editorGrid = new EditorGrid(widget, configuration);
                spyOn(editorGrid, 'childrenRemoved');
                editorGrid.dispose();
                widget.elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_REMOVED, { detail: {} }));
                expect(editorGrid.childrenRemoved).not.toHaveBeenCalled();
            });
        });

        describe('#configuration-mainContainer', function () {
            beforeAll(function () {
                spyOn(uiController, 'callWidget').and.callFake(function (id) {
                    return getWidget(id);
                });
            });
            it('with parentWidget=undefined, if mainContainer=true', function () {
                widget = getWidget('widget1');
                editorGrid = new EditorGrid(widget, { mainContainer: true });
                expect(editorGrid.parentWidget).toBeUndefined();
            });

            it('with parentWidget=undefined, if mainContainer=false and no parent widget exists', function () {
                widget = getWidget('widget1');
                editorGrid = new EditorGrid(widget, { mainContainer: false });
                expect(editorGrid.parentWidget).toBeUndefined();
            });

            it('with parentWidget=containerWidget1, if mainContainer=false and parent widget exists', function () {
                widget = getWidget('widget2');
                editorGrid = new EditorGrid(widget, { mainContainer: false });
                expect(editorGrid.parentWidget).toEqualWidget(getWidget('containerWidget1'));
            });
        });

        describe('#method-childrenAdded', function () {
            beforeAll(function () {
                spyOn(uiController, 'callWidget').and.callFake(function (id) {
                    return getWidget(id);
                });
            });
            it('should add widget with id=e.detail.widgetId to children', function () {
                var childId = 'child1';
                widget = getWidget('widget1');
                editorGrid = new EditorGrid(widget, { mainContainer: true });
                widget.elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_ADDED, { detail: { widgetId: childId } }));
                expect(editorGrid.children[childId]).toEqualWidget(getWidget(childId));
            });

            it('should add widget with id=e.detail.widgetId to children not twice', function () {
                var childId = 'child1';
                widget = getWidget('widget1');
                editorGrid = new EditorGrid(widget, { mainContainer: true });
                widget.elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_ADDED, { detail: { widgetId: childId } }));
                var childrenLength = Object.keys(editorGrid.children).length;
                expect(childrenLength).toEqual(1);
                widget.elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_ADDED, { detail: { widgetId: childId } }));
                childrenLength = Object.keys(editorGrid.children).length;
                expect(childrenLength).toEqual(1);
            });
        });

        describe('#method-childreRemoved', function () {
            beforeAll(function () {
                spyOn(uiController, 'callWidget').and.callFake(function (id) {
                    return getWidget(id);
                });
            });
            it('should remove widget with id=e.detail.widgetId from children', function () {
                var childId = 'child1';
                widget = getWidget('widget1');
                editorGrid = new EditorGrid(widget, { mainContainer: true });
                widget.elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_ADDED, { detail: { widgetId: childId } }));
                var childrenLength = Object.keys(editorGrid.children).length;
                expect(childrenLength).toEqual(1);
                widget.elem.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_REMOVED, { detail: { widgetId: childId } }));
                childrenLength = Object.keys(editorGrid.children).length;
                expect(childrenLength).toEqual(0);
            });
        });

        describe('#method-createAxis', function () {

            function runSpec(spec) {
                describe(`with #cfg-axisType="${spec.axisType}",#cfg-orientation="${spec.orientation}",#cfg-axisPosition="${spec.axisPosition}",#cfg-tickFormat="${spec.tickFormat}",#cfg-scaleType="${spec.scaleType}" `, function () {
                    beforeAll(function () {
                        spyOn(uiController, 'callWidget').and.callFake(function (id) {
                            return getWidget(id);
                        });
                    });
                    beforeEach(function () {
                        widget = getWidget('widget2');
                        widget.el.addClass('ChartXAxis');
                        widget.editorGrid = { configuration: { tickFormat: spec.tickFormat, scaleType: spec.scaleType } };
                        widget.settings = {
                            orientation: spec.orientation
                        };

                        editorGrid = new EditorGrid(widget, {
                            mainContainer: false,
                            axisType: spec.axisType,
                            tickLabelRotation: spec.tickLabelRotation,
                            axisPosition: spec.axisPosition
                        });
                        editorGrid.parentWidget.editorGrid = {
                            configuration: {
                                // layout: '5Areas'
                            }
                        };
                        editorGrid.createLayout();
                        //console.log(JSON.stringify(spec));
                        editorGrid.createAxis();
                    });
                    it('should create scaleContainer', function () {
                        expect(editorGrid.scaleContainer).not.toBeUndefined();
                    });
                    it('should create axisLabel', function () {
                        var $axisLabel = $(editorGrid.scaleContainer[0][0]).find('.containerAxisDescription');
                        expect($axisLabel.length).toEqual(1);
                        expect($axisLabel.attr('id')).toEqual(`widget2_${spec.expected.axisName}_axisLabel`);
                    });
                    it('should create scale', function () {
                        expect(editorGrid.scale).not.toBeUndefined();
                    });
                    it(`should create scale.range= ${spec.expected.range}`, function () {
                        expect(editorGrid.scale.range()).toEqual(spec.expected.range);
                    });
                    it(`should create scale.domain= ${spec.expected.domain}`, function () {
                        expect(editorGrid.scale.domain()).toEqual(spec.expected.domain);
                    });

                    it('should create axis', function () {
                        expect(editorGrid.axis).not.toBeUndefined();
                    });
                    it('should create axisElement', function () {
                        expect(editorGrid.axisElement).not.toBeUndefined();
                    });
                    it('should create axisElement with id', function () {
                        expect(editorGrid.axisElement.attr('id')).toEqual('widget2_' + spec.expected.axisName);
                    });
                });
            }
            var format1 = { decimalPlaces: 2, minimumIntegerDigits: 0 },
                format2 = { decimalPlaces: 0, minimumIntegerDigits: 1 };
            // es fehlen noch sinnvolle expectations einiger Testfälle und auch noch einige Kombinationen
            [
                {
                    axisType: 'Horizontal',
                    orientation: 'LeftToRight',
                    axisPosition: 'top',
                    expected: { axisName: 'XAxis', range: [20, -20], domain: [0, 100] }
                },
                {
                    axisType: 'Horizontal',
                    orientation: 'LeftToRight',
                    axisPosition: 'top',
                    tickFormat: format1,
                    scaleType: 'number',
                    expected: { axisName: 'XAxis', range: [20, -20], domain: [0, 100] }
                },
                {
                    axisType: 'Horizontal',
                    orientation: 'LeftToRight',
                    axisPosition: 'bottom',
                    tickLabelRotation: '0deg',
                    expected: { axisName: 'XAxis', range: [20, -20], domain: [0, 100] }
                },
                {
                    axisType: 'Horizontal',
                    orientation: 'RightToLeft',
                    axisPosition: 'top',
                    expected: { axisName: 'XAxis', range: [20, -20], domain: [100, 0] }
                },
                // hier wäre noch zu klären wie das time format gesetzt wird
                //{
                //    axisType: 'Horizontal',
                //    orientation: 'RightToLeft',
                //    axisPosition: 'top',
                //    tickFormat: '%B %d, %Y',
                //    scaleType: 'time',
                //    expected: { axisName: 'XAxis', range: [20, -20], domain: [0, 100] }
                //},
                {
                    axisType: 'Horizontal',
                    orientation: 'RightToLeft',
                    axisPosition: 'bottom',
                    tickLabelRotation: '0deg',
                    expected: { axisName: 'XAxis', range: [20, -20], domain: [100, 0] }
                },
                {
                    axisType: 'Vertical',
                    orientation: 'BottomToTop',
                    axisPosition: 'left',
                    expected: { axisName: 'YAxis', range: [20, -20], domain: [100, 0] }
                },
                {
                    axisType: 'Vertical',
                    orientation: 'BottomToTop',
                    axisPosition: 'left',
                    tickFormat: format2,
                    scaleType: 'number',
                    expected: { axisName: 'YAxis', range: [20, -20], domain: [100, 0] }
                },
                {
                    axisType: 'Vertical',
                    orientation: 'BottomToTop',
                    axisPosition: 'right',
                    tickLabelRotation: '180deg',
                    expected: { axisName: 'YAxis', range: [20, -20], domain: [100, 0] }
                },
                {
                    axisType: 'Vertical',
                    orientation: 'TopToBottom',
                    axisPosition: 'left',
                    expected: { axisName: 'YAxis', range: [20, -20], domain: [0, 100] }
                },
                // hier wäre noch zu klären wie das time format gesetzt wird
                //{
                //    axisType: 'Vertical',
                //    orientation: 'TopToBottom',
                //    axisPosition: 'left',
                //    tickFormat: 'd-m-Y',
                //    scaleType: 'time',
                //    expected: { axisName: 'YAxis', range: [20, -20], domain: [0, 100] }
                //},
                {
                    axisType: 'Vertical',
                    orientation: 'TopToBottom',
                    axisPosition: 'right',
                    tickLabelRotation: '180deg',
                    expected: { axisName: 'YAxis', range: [20, -20], domain: [0, 100] }
                }
            ].forEach(runSpec);

        });

        describe('#method-createLayout  ', function () {
            beforeAll(function () {
                spyOn(uiController, 'callWidget').and.callFake(function (id) {
                    return getWidget(id);
                });
            });
            it('should create areas', function () {
                widget = getWidget('widget1');
                editorGrid = new EditorGrid(widget, { mainContainer: true });
                editorGrid.createLayout();
                expect(editorGrid.areas).not.toBeUndefined();
            });

            it('should create 3 areas, if configuration.layout=undefined', function () {
                widget = getWidget('widget1');
                editorGrid = new EditorGrid(widget, { mainContainer: true });
                editorGrid.createLayout();
                expect(Object.keys(editorGrid.areas).length).toEqual(3);
            });

            describe('with configuration.layout="2Areas"', () => {
                beforeEach(() => {
                    widget = getWidget('widget1');
                    editorGrid = new EditorGrid(widget, { mainContainer: true, layout: '2Areas' });
                    editorGrid.createLayout();
                });
                it('should create areaLeft as first child of widget', () => {
                    expect(widget.elem.children[1]).toHaveClass('areaLeft');
                });
                it('should create areaRight as second child of widget', () => {
                    expect(widget.elem.children[2]).toHaveClass('areaRight');
                });
                it('should create areaGraph inside areaRight', () => {
                    expect(widget.elem.children[2].children[0]).toHaveClass('areaGraph');
                });
            });

            describe('with configuration.layout="5Areas"', () => {
                beforeEach(() => {
                    widget = getWidget('widget1');
                    editorGrid = new EditorGrid(widget, { mainContainer: true, layout: '5Areas' });
                    editorGrid.createLayout();
                });
                it('should create areaLeft as first child of widget', () => {
                    expect(widget.elem.children[1]).toHaveClass('areaLeft');
                });
                it('should create areaCenter as second child of widget', () => {
                    expect(widget.elem.children[2]).toHaveClass('areaCenter');
                });
                it('should create areaRight as third child of widget', () => {
                    expect(widget.elem.children[3]).toHaveClass('areaRight');
                });
                it('should create areaTop as first child of areaCenter', () => {
                    expect(widget.elem.children[2].children[0]).toHaveClass('areaTop');
                });
                it('should create areaGraph as second child of areaCenter', () => {
                    expect(widget.elem.children[2].children[1]).toHaveClass('areaGraph');
                });
                it('should create areaBottom as third child of areaCenter', () => {
                    expect(widget.elem.children[2].children[2]).toHaveClass('areaBottom');
                });
            });
        });

        describe('#method-updateAllChildren', function () {
            beforeEach(() => {
                widget = getWidget('widget1');
                editorGrid = new EditorGrid(widget, { });
                
            });
            it('should not throw when being called', () => {
                expect(function () { editorGrid.updateAllChildren(); }).not.toThrow();
            });
        });
        describe('#method-updateAxis', function () {
            beforeAll(function () {
                spyOn(uiController, 'callWidget').and.callFake(function (id) {
                    return getWidget(id);
                });
            });
            beforeEach(function () {
                widget = getWidget('widget2');
                widget.editorGrid = {
                    configuration: {}
                };
                widget.settings = {};
            });
            it('should not throw when being called', () => {
                createGrid();
                expect(function () { editorGrid.updateAxis(); }).not.toThrow();
            });
            describe('with #property-editorGrid.configuration.tickLabelRotation = "0deg"', function () {
                beforeEach(function () {
                    spyOn(ChartUtils, 'rotateTickLabels').and.callThrough();
                    createGrid({ tickLabelRotation: '0deg' });
                    editorGrid.updateAxis();
                });
                it('should apply the tickLabel rotation by calling #method-ChartUtils.rotateTickLabels', () => {
                    expect(ChartUtils.rotateTickLabels).toHaveBeenCalled();
                });
            });
            describe('while widget element contains css class "ChartXAxis"', function () {
                beforeEach(function () {
                    widget.el.addClass('ChartXAxis');
                });
                it('should apply no tick values', () => {
                    createGrid();
                    editorGrid.updateAxis();
                    expect(editorGrid.axis.tickValues().length).toEqual(0);
                });
                describe('and #property-editorGrid.configuration.scaleType = "time"', function () {
                    it('should apply the tickValues as date', () => {
                        createGrid({ scaleType: 'time' });
                        editorGrid.updateAxis();
                        expect(editorGrid.axis.tickValues()[0]).toBeInstanceOf(Date);
                    });
                });
            });
            describe('while widget element contains css class "breaseChartYAxisWidget"', function () {
                beforeEach(function () {
                    widget.el.addClass('breaseChartYAxisWidget');
                    widget.settings.width = 20;
                });
                it('should rotate the axis by -90 degrees', () => {
                    createGrid({ axisType: 'Vertical' });
                    editorGrid.updateAxis();
                    let arrMatrix = transformMatrixToArray(window.getComputedStyle(editorGrid.scaleContainer.select('.containerAxisDescription')[0][0]).getPropertyValue('transform'));
                    expect(arrMatrix[1]).toEqual(-1);
                });
            });
            function createGrid(editorGridConfig = {}) {
                editorGrid = new EditorGrid(widget, Object.assign({}, {
                    mainContainer: false,
                    axisType: 'Horizontal'
                }, editorGridConfig));
                editorGrid.parentWidget.editorGrid = {
                    configuration: {}
                };
                editorGrid.createLayout();
                editorGrid.createAxis();
            }
            function transformMatrixToArray(matrix) {
                return matrix.match(/[0-9,.-]/g).join('').split(',').map(function (entry) { return Number(entry); });
            }
        });
    });
});
