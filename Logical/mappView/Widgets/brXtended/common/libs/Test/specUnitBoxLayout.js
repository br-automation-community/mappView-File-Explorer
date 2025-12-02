'use strict';
define([
    'brTest', 
    'widgets/brXtended/common/libs/BoxLayout'
], function ({
    enum: { Enum }
}, BoxLayout) {

    describe('widgets.brXtended.common.libs.BoxLayout ', function () {
        var boxContainer, box1;
        beforeEach(function () {
            boxContainer = BoxLayout.createBoxContainer();
            box1 = BoxLayout.createBox();
        });

        describe('#method-createBoxContainer', function () {
            it('should return a DOM node', function () {
                expect(BoxLayout.createBoxContainer()).toBeInstanceOf(HTMLElement);
            });
            it(`should return a DOM node with css class "${BoxLayout.CONTAINER_CLASS}"`, function () {
                expect(BoxLayout.createBoxContainer()).toHaveClass(BoxLayout.CONTAINER_CLASS);
            });
        });

        describe('#method-createBox', function () {
            it('should return a DOM node', function () {
                expect(BoxLayout.createBox()).toBeInstanceOf(HTMLElement);
            });
            it(`should return a DOM node with css class "${BoxLayout.BOX_CLASS}"`, function () {
                expect(BoxLayout.createBox()).toHaveClass(BoxLayout.BOX_CLASS);
            });
        });

        describe('#method-setOrientation', function () {
            it('should not throw if #param-elem is null', function () {
                expect(function () {
                    BoxLayout.setOrientation(null, Enum.Orientation.BTT);
                }).not.toThrow();
            });
            it('should not throw if #param-elem is undefined', function () {
                expect(function () {
                    BoxLayout.setOrientation(undefined, Enum.Orientation.BTT);
                }).not.toThrow();
            });
            it('should not throw if #param-orientation is null', function () {
                expect(function () {
                    BoxLayout.setOrientation(boxContainer, null);
                }).not.toThrow();
            });
            it('should not throw if #param-orientation is undefined', function () {
                expect(function () {
                    BoxLayout.setOrientation(boxContainer, undefined);
                }).not.toThrow();
            });
            var tests = [{
                orientation: Enum.Orientation.TTB,
                result: {
                    cssClass: BoxLayout.ORIENTATION_TOP
                }
            },
            {
                orientation: Enum.Orientation.RTL,
                result: {
                    cssClass: BoxLayout.ORIENTATION_RIGHT
                }
            },
            {
                orientation: Enum.Orientation.BTT,
                result: {
                    cssClass: BoxLayout.ORIENTATION_BOTTOM
                }
            },
            {
                orientation: Enum.Orientation.LTR,
                result: {
                    cssClass: BoxLayout.ORIENTATION_LEFT
                }
            }];
            tests.forEach(function (test) {
                describe(`with #param-orientation=${test.orientation}`, function () {
                    describe('and #param-elem = boxContainer', function () {
                        beforeEach(function () {
                            BoxLayout.setOrientation(boxContainer, test.orientation);
                        });
                        it(`should add css class = ${test.result.cssClass} to the boxContainer`, function () {
                            expect(boxContainer).toHaveClass(test.result.cssClass);
                        });
                    });
                    describe('and #param-elem = child of boxContainer', function () {
                        beforeEach(function () {
                            boxContainer.appendChild(BoxLayout.createBox());
                            BoxLayout.setOrientation(boxContainer.firstElementChild, test.orientation);
                        });
                        it(`should add css class = ${test.result.cssClass} to the boxContainer`, function () {
                            expect(boxContainer).toHaveClass(test.result.cssClass);
                        });
                    });
                    describe('and #param-elem = grandchild of boxContainer', function () {
                        beforeEach(function () {
                            boxContainer.appendChild(BoxLayout.createBox());
                            boxContainer.firstElementChild.appendChild(document.createElement('span'));
                            BoxLayout.setOrientation(boxContainer.firstElementChild.firstElementChild, test.orientation);
                        });
                        it(`should add css class = ${test.result.cssClass} to the boxContainer`, function () {
                            expect(boxContainer).toHaveClass(test.result.cssClass);
                        });
                    });
                });
            });
            describe(`while orientation = ${Enum.Orientation.BTT}`, function () {
                beforeEach(function () {
                    BoxLayout.setOrientation(boxContainer, Enum.Orientation.BTT);
                });
                describe(`and #param-orientation=${Enum.Orientation.TTB}`, function () {
                    beforeEach(function () {
                        BoxLayout.setOrientation(boxContainer, Enum.Orientation.TTB);
                    });
                    it(`should add css class = ${BoxLayout.ORIENTATION_TOP} to the boxContainer`, function () {
                        expect(boxContainer).toHaveClass(BoxLayout.ORIENTATION_TOP);
                    });
                    it(`should remove css class = ${BoxLayout.ORIENTATION_BOTTOM} from the boxContainer`, function () {
                        expect(boxContainer).not.toHaveClass(BoxLayout.ORIENTATION_BOTTOM);
                    });
                });
            });

            afterEach(function () {
                BoxLayout.resetContainerClass(boxContainer);
            });
        });

        describe('#method-setBoxAlign', function () {
            beforeEach(function () {
                BoxLayout.setBoxAlign(box1, 'BottomRight');
            });

            it('should not throw if #param-elem is null', function () {
                expect(function () {
                    BoxLayout.setBoxAlign(null, Enum.Orientation.BTT);
                }).not.toThrow();
            });
            it('should not throw if #param-elem is undefined', function () {
                expect(function () {
                    BoxLayout.setBoxAlign(undefined, Enum.Orientation.BTT);
                }).not.toThrow();
            });
            it('should not throw if #param-orientation is null', function () {
                expect(function () {
                    BoxLayout.setBoxAlign(box1, null);
                }).not.toThrow();
            });
            it('should not throw if #param-orientation is undefined', function () {
                expect(function () {
                    BoxLayout.setBoxAlign(box1, undefined);
                }).not.toThrow();
            });
            var tests = [{
                alignment: 'TopLeft',
                result: {
                    cssClass: BoxLayout.ALIGNMENT_TOP_LEFT
                }
            }, {
                alignment: 'Top',
                result: {
                    cssClass: BoxLayout.ALIGNMENT_TOP
                }
            }, {
                alignment: 'TopRight',
                result: {
                    cssClass: BoxLayout.ALIGNMENT_TOP_RIGHT
                }
            }, {
                alignment: 'Left',
                result: {
                    cssClass: BoxLayout.ALIGNMENT_LEFT
                }
            }, {
                alignment: 'Center',
                result: {
                    cssClass: BoxLayout.ALIGNMENT_CENTER
                }
            }, {
                alignment: 'Right',
                result: {
                    cssClass: BoxLayout.ALIGNMENT_RIGHT
                }
            }, {
                alignment: 'BottomLeft',
                result: {
                    cssClass: BoxLayout.ALIGNMENT_BOTTOM_LEFT
                }
            }, {
                alignment: 'Bottom',
                result: {
                    cssClass: BoxLayout.ALIGNMENT_BOTTOM
                }
            }, {
                alignment: 'BottomRight',
                result: {
                    cssClass: BoxLayout.ALIGNMENT_BOTTOM_RIGHT
                }
            }];
            tests.forEach(function (test) {
                describe(`with #param-alignment=${test.alignment}`, function () {
                    describe('and #param-elem = box1', function () {
                        beforeEach(function () {
                            BoxLayout.setBoxAlign(box1, test.alignment);
                        });
                        it(`should add css class = ${test.result.cssClass} to box1`, function () {
                            expect(box1).toHaveClass(test.result.cssClass);
                        });
                    });
                    describe('and #param-elem = child of box1', function () {
                        beforeEach(function () {
                            box1.appendChild(document.createElement('span'));
                            BoxLayout.setBoxAlign(box1.firstElementChild, test.alignment);
                        });
                        it(`should add css class = ${test.result.cssClass} to box1`, function () {
                            expect(box1).toHaveClass(test.result.cssClass);
                        });
                    });
                    describe('and #param-elem = grandchild of box1', function () {
                        beforeEach(function () {
                            box1.appendChild(document.createElement('span'));
                            box1.firstElementChild.appendChild(document.createElement('span'));
                            BoxLayout.setBoxAlign(box1.firstElementChild.firstElementChild, test.alignment);
                        });
                        it(`should add css class = ${test.result.cssClass} to box1`, function () {
                            expect(box1).toHaveClass(test.result.cssClass);
                        });
                    });
                });
            });
            describe(`while alignment = Bottom`, function () {
                beforeEach(function () {
                    BoxLayout.setBoxAlign(box1, 'Bottom');
                });
                describe(`and #param-alignment=Top`, function () {
                    beforeEach(function () {
                        BoxLayout.setBoxAlign(box1, 'Top');
                    });
                    it(`should add css class = ${BoxLayout.ALIGNMENT_TOP} to box1`, function () {
                        expect(box1).toHaveClass(BoxLayout.ALIGNMENT_TOP);
                    });
                    it(`should remove css class = ${BoxLayout.ALIGNMENT_BOTTOM} from box1`, function () {
                        expect(box1).not.toHaveClass(BoxLayout.ALIGNMENT_BOTTOM);
                    });
                });
            });

            afterEach(function () {
                BoxLayout.resetBoxClass(box1);
            });
        });

        describe('#method-resetContainerClass', function () {
            var arrContainerClasses = [];
            beforeEach(function () {
                arrContainerClasses = [BoxLayout.ORIENTATION_TOP, BoxLayout.ORIENTATION_RIGHT, BoxLayout.ORIENTATION_BOTTOM, BoxLayout.ORIENTATION_LEFT];
                arrContainerClasses.forEach(function (cssClass) {
                    boxContainer.classList.add(cssClass);
                });
                BoxLayout.resetContainerClass(boxContainer);
            });
            arrContainerClasses.forEach(function (cssClass) {
                it(`should remove css class = ${cssClass} from the boxContainer`, function () {
                    expect(boxContainer).not.toHaveClass(cssClass);
                });
            });

        });
        describe('#method-resetBoxClass', function () {
            var arrBoxClasses = [];
            beforeEach(function () {
                arrBoxClasses = [BoxLayout.ALIGNMENT_TOP, BoxLayout.ALIGNMENT_TOP_RIGHT, BoxLayout.ALIGNMENT_LEFT, BoxLayout.ALIGNMENT_CENTER, BoxLayout.ALIGNMENT_RIGHT, BoxLayout.ALIGNMENT_BOTTOM_LEFT, BoxLayout.ALIGNMENT_BOTTOM, BoxLayout.ALIGNMENT_BOTTOM_RIGHT];
                arrBoxClasses.forEach(function (cssClass) {
                    box1.classList.add(cssClass);
                });
                BoxLayout.resetBoxClass(box1);
            });
            arrBoxClasses.forEach(function (cssClass) {
                it(`should remove css class = ${cssClass} from box1`, function () {
                    expect(box1).not.toHaveClass(cssClass);
                });
            });

        });
        afterEach(function () {
            boxContainer = null;
            box1 = null;
        });
    });
});
