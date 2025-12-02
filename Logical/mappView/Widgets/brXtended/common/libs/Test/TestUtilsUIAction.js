define(function () {

    'use strict';

    return {

        mouseEvent: function (mouseEventType, parameters) {
            return new MouseEvent(mouseEventType, parameters);
        },

        wheelEvent: function (wheelEventType, parameters) {
            return new WheelEvent(wheelEventType, parameters);
        },

        touchEvent: function (touchEventType, parameters) {
            return new TouchEvent(touchEventType, parameters);
        },

        mouseDown: function (target, parameters) {

            var mouseDownEvent = this.mouseEvent('mousedown', parameters);
            target.dispatchEvent(mouseDownEvent);
        },

        mouseUp: function (target, parameters) {
            var mouseUpEvent = this.mouseEvent('mouseup', parameters);
            target.dispatchEvent(mouseUpEvent);
        },

        mouseMove: function (target, parameters) {
            var mouseMoveEvent = this.mouseEvent('mousemove', parameters);
            target.dispatchEvent(mouseMoveEvent);
        },

        mouseWheel: function (target, parameters) {
            var mouseWheelEvent = this.wheelEvent('wheel', parameters);
            target.dispatchEvent(mouseWheelEvent);
        },

        click: function (target, parameters) {
            var mouseClickEvent = this.mouseEvent('click', parameters);
            target.dispatchEvent(mouseClickEvent);
        },

        touchStart: function (target, parameters) {
            var touchStartEvent = this.touchEvent('touchstart', parameters);
            target.dispatchEvent(touchStartEvent);
        },

        touchEnd: function (target, parameters) {
            var touchEndEvent = this.touchEvent('touchend', parameters);
            target.dispatchEvent(touchEndEvent);
        },

        touchMove: function (target, parameters) {
            var touchMoveEvent = this.touchEvent('touchmove', parameters);
            target.dispatchEvent(touchMoveEvent);
        }
    };
});
