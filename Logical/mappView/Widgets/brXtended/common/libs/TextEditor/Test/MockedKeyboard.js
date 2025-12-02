define(function () {

    'use strict';

    return function MockedKeyboard() {

        this.isShown = false;

        this.removeCallback = function () {
            this.callback = undefined;
        };

        this.addCallback = function (callback) {
            this.callback = callback;
        };

        this.show = function () {
            this.isShown = true;
        };

        this.hide = function () {
            this.isShown = false;
        };

        this.isShown = function () {
            return this.isShown;
        };

        this.simulateInput = function (input) {
            if (this.callback !== undefined) {
                this.callback(input);
            }
        };

    };

});
