'use strict';
define(['brTest'], function ({ enum: { Enum } }) {

    var widgetMockDefaultSettings = {
        value: 0,
        dataEnable: false,
        string: ''
    };

    return {
        widgetMockDefaultSettings: widgetMockDefaultSettings,
        initialized: {
            run: true,
            setup: {
                dependencies: [
                    {
                        name: 'value',
                        waitFor: ['dataEnable', 'string']
                    }
                ]
            },
            dependenciesNotSatisfied: {
                run: true,
                set: {
                    value: 3
                },
                expect: {
                    widgetState: Enum.WidgetState.INITIALIZED,
                    value: widgetMockDefaultSettings.value
                }
            },
            dependenciesPartiallySatisfied: {
                run: true,
                set: {
                    dataEnable: true,
                    value: 3
                },
                expect: {
                    widgetState: Enum.WidgetState.INITIALIZED,
                    value: widgetMockDefaultSettings.value
                }
            },
            dependenciesFullySatisfied: {
                run: true,
                set: {
                    value: {
                        firstCall: 3,
                        secondCall: 4
                    }
                },
                expect: {
                    widgetState: Enum.WidgetState.INITIALIZED,
                    dataEnable: true,
                    string: 'string',
                    value: 4
                }
            }           
        }
    };

});
