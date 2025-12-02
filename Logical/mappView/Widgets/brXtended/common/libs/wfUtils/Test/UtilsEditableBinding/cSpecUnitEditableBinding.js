define([], function () {
    var specList = {
        handleEditable: {
            run: true,
            metaData_Undefined: {
                run: true,
                description: 'Nothing should happen if the Function \u00BBUtilsEditableBinding.handleEditable\u00AB is called, but metaData is undefined',
                parameter: {
                    metaData: undefined,
                    propertyArray: ['value', 'node'],
                    editable: true,
                    widget: {
                        settings: {
                            editable: false
                        },
                        _internalEnable: function () { }
                    }
                }
            },
            refAttribute_not_in_propertyArray: {
                run: true,
                description: 'Nothing should happen if the Function \u00BBUtilsEditableBinding.handleEditable\u00AB is called, but the metaData.refAttribute is not inside the propertyArray',
                parameter: {
                    metaData: {
                        refAttribute: 'test'
                    },
                    propertyArray: ['value', 'node'],
                    editable: true,
                    widget: {
                        settings: {
                            editable: false
                        },
                        _internalEnable: function () { }
                    }
                }
            },
            allParameters_are_correct: {
                run: true,
                description: 'All Parameters are correct, so the _internalEnable should be called and the this.settings.editable updated',
                parameter: {
                    metaData: {
                        refAttribute: 'value'
                    },
                    propertyArray: ['value', 'node'],
                    editable: true,
                    widget: {
                        settings: {
                            editable: false
                        },
                        _internalEnable: function () { }
                    }
                }
            }
        }
    };

    return specList;
});
