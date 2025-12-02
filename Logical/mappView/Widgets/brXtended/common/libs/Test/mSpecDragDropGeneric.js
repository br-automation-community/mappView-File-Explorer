'use strict';
define(['brTest'], function ({ core: { Utils } }) {

    /*
    * @class widgets.brXtended.common.libs.Test.mSpecDragDropGeneric
    * This module needs to be used to check if the decoration of an Widget with the DragDrop decorator is correct.
    *
    * The Input needs to be the Module of the Widget to Test.
    */

    return {
        suite: function (module) {
            var mut, elem;

            beforeEach(function () {
                elem = document.createElement('div');
                elem.setAttribute('id', 'DragDropDecorator_Test_DIV');
                mut = new module(elem, undefined, true);
            });

            afterEach(function () {
                mut = null;
                elem = null;
            });

            describe('Widget should be decorated correctly with DragDrop Decorator', function () {

                it('The functions \u00BBsetDraggable\u00AB and \u00BBsetDroppable\u00AB should be part of Widget', function () {
                    expect(Utils.isFunction(mut.setDraggable)).toBeTruthy();
                    expect(Utils.isFunction(mut.setDroppable)).toBeTruthy();
                });
            });
        }
    };
});
