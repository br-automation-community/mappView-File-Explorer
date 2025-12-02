'use strict';
define([
    'widgets/brXtended/common/libs/BindingSync',
    'brTest',
    './cSpecUnitBindingSync',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function (BindingSync, { appElem, enum: { Enum }, TestUtils }, specParam) {

    m.describe(true, 'widgets.brXtended.common.libs.BindingSync', function () {

        var widgetMock,
            widgetMockId = 'widgetMock',
            WidgetMockClass = function () {

                this.state = 0;
                this.bindings = {
                    value: {
                        active: true,
                        attribute: 'value'
                    },
                    string: {
                        active: true,
                        attribute: 'string'
                    },
                    dataEnable: {
                        active: true,
                        attribute: 'dataEnable'
                    }
                };
                this.settings = {
                    value: specParam.widgetMockDefaultSettings.value,
                    string: specParam.widgetMockDefaultSettings.string,
                    dataEnable: specParam.widgetMockDefaultSettings.dataEnable
                };
            };

        WidgetMockClass.prototype.getValue = function () {
            return this.settings.value;
        };

        WidgetMockClass.prototype.setValue = function (value) {
            this.settings.value = value;
        };
         
        WidgetMockClass.prototype.setString = function (string) {
            this.settings.string = string;
        };
        WidgetMockClass.prototype.getString = function () {
            return this.settings.string;
        };

        WidgetMockClass.prototype.setDataEnable = function (enable) {
            this.settings.dataEnable = enable;
        };

        WidgetMockClass.prototype.getDataEnable = function () {
            return this.settings.dataEnable;
        };

        WidgetMockClass.prototype.dispatchEvent = function (event) {
            this.elem.dispatchEvent(event);
        };

        beforeEach(function () {

            widgetMock = new WidgetMockClass();
            widgetMock.state = Enum.WidgetState.INITIALIZED;

            widgetMock.elem = document.createElement('div');
            widgetMock.elem.setAttribute('id', widgetMockId);
            appElem.appendChild(widgetMock.elem);

            BindingSync.setupPropertyOrder(widgetMock, specParam.initialized.setup.dependencies);
        });

        afterEach(function () {

            appElem.removeChild(widgetMock.elem);
            widgetMock = null;
        });

        m.describe(specParam.initialized.run, 'property \u00BBvalue\u00AB should be set after the properties \u00BBdataEnable\u00AB and \u00BBstring\u00AB have been set', function () {

            var suitePath = specParam.initialized;
            beforeEach(function () {
                TestUtils.addSpyStrategy('callThroughAndThen');
            });

            m.it(suitePath.dependenciesNotSatisfied.run, '- A&P 604660: Calling \u00BBsetValue\u00AB with ' + suitePath.dependenciesNotSatisfied.set.value +
                ' when widget is INITIALIZED but NOT READY and without calling setEnableState and setString should keep value to ' +
                suitePath.dependenciesNotSatisfied.expect.value, function () {

                var specPath = suitePath.dependenciesNotSatisfied;

                expect(widgetMock.state).toEqual(specPath.expect.widgetState);
                expect(widgetMock.getValue()).toEqual(specPath.expect.value);

                widgetMock.setValue(specPath.set.value);

                expect(widgetMock.getValue()).toEqual(specPath.expect.value);
            });

            m.it(suitePath.dependenciesPartiallySatisfied.run, '- A&P 604660 Calling \u00BBsetValue\u00AB with ' + suitePath.dependenciesPartiallySatisfied.set.value +
                ' when widget is INITIALIZED but NOT READY, with setEnableState called but setString NOT called should keep value to ' +
                suitePath.dependenciesPartiallySatisfied.expect.value, function () {
                
                var specPath = suitePath.dependenciesPartiallySatisfied;

                expect(widgetMock.state).toEqual(specPath.expect.widgetState);
                expect(widgetMock.getValue()).toEqual(specPath.expect.value);

                widgetMock.setDataEnable(specPath.set.dataEnable);
                widgetMock.setValue(specPath.set.value);

                expect(widgetMock.getValue()).toEqual(specPath.expect.value);
            });

            m.it(suitePath.dependenciesFullySatisfied.run, '- A&P 604660: - Calling \u00BBsetValue\u00AB twice with ' + suitePath.dependenciesFullySatisfied.set.value.firstCall +
                ' and ' + suitePath.dependenciesFullySatisfied.set.value.secondCall + ' when widget is INITIALIZED but NOT READY, with setEnableState and setString called with ' + 
                suitePath.dependenciesFullySatisfied.expect.dataEnable + ' and ' + suitePath.dependenciesFullySatisfied.expect.string +
                ', should change value to ' + suitePath.dependenciesFullySatisfied.expect.value, function () {

                var specPath = suitePath.dependenciesFullySatisfied;

                return new Promise(function (resolve) {
                    var spy = spyOn(WidgetMockClass.prototype, 'setValue');
                    spy.and.callThroughAndThen(widgetMock, spy, function () {
                        if (WidgetMockClass.prototype.setValue.calls.count() === 2) {
                            resolve();
                        }
                    });
    
                    expect(widgetMock.state).toEqual(specPath.expect.widgetState);
                    expect(widgetMock.getDataEnable()).not.toEqual(specPath.expect.dataEnable);
                    expect(widgetMock.getString()).not.toEqual(specPath.expect.string);
                    expect(widgetMock.getValue()).not.toEqual(specPath.expect.value);
                    widgetMock.setValue(specPath.set.value.firstCall);
                    widgetMock.setValue(specPath.set.value.secondCall);
                    widgetMock.setDataEnable(specPath.expect.dataEnable);
                    widgetMock.setString(specPath.expect.string);
                })
                    .then(function () {
                        expect(widgetMock.getDataEnable()).toEqual(specPath.expect.dataEnable);
                        expect(widgetMock.getString()).toEqual(specPath.expect.string);
                        expect(widgetMock.getValue()).toEqual(specPath.expect.value);
                    });
            });
        });

    });
});
