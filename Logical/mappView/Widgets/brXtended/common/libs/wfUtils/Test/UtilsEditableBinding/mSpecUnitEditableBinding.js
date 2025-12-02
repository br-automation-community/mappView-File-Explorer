define(['widgets/brXtended/common/libs/wfUtils/UtilsEditableBinding',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'], 
function (UtilsEditableBinding) {

    'use strict';

    return {
        suite: function (specParam) {
            var module;
            beforeEach(function () {
                module = null;
            });

            m.describe(specParam.handleEditable.run, '#method-handleEditable', function () {

                m.it(specParam.handleEditable.metaData_Undefined.run, specParam.handleEditable.metaData_Undefined.description, function () {
                    module = UtilsEditableBinding;

                    spyOn(specParam.handleEditable.metaData_Undefined.parameter.widget, '_internalEnable');

                    module.handleEditable(specParam.handleEditable.metaData_Undefined.parameter.editable,
                        specParam.handleEditable.metaData_Undefined.parameter.metaData,
                        specParam.handleEditable.metaData_Undefined.parameter.widget,
                        specParam.handleEditable.metaData_Undefined.parameter.propertyArray);

                    expect(specParam.handleEditable.metaData_Undefined.parameter.widget._internalEnable.calls.count()).toEqual(0);
                    expect(specParam.handleEditable.metaData_Undefined.parameter.widget.settings.editable).not.toEqual(specParam.handleEditable.metaData_Undefined.parameter.editable);
                });

                m.it(specParam.handleEditable.refAttribute_not_in_propertyArray.run, specParam.handleEditable.refAttribute_not_in_propertyArray.description, function () {
                    module = UtilsEditableBinding;

                    spyOn(specParam.handleEditable.refAttribute_not_in_propertyArray.parameter.widget, '_internalEnable');

                    module.handleEditable(specParam.handleEditable.refAttribute_not_in_propertyArray.parameter.editable,
                        specParam.handleEditable.refAttribute_not_in_propertyArray.parameter.metaData,
                        specParam.handleEditable.refAttribute_not_in_propertyArray.parameter.widget,
                        specParam.handleEditable.refAttribute_not_in_propertyArray.parameter.propertyArray);

                    expect(specParam.handleEditable.refAttribute_not_in_propertyArray.parameter.widget._internalEnable.calls.count()).toEqual(0);
                    expect(specParam.handleEditable.refAttribute_not_in_propertyArray.parameter.widget.settings.editable).not.toEqual(specParam.handleEditable.refAttribute_not_in_propertyArray.parameter.editable);
                });

                m.it(specParam.handleEditable.allParameters_are_correct.run, specParam.handleEditable.allParameters_are_correct.description, function () {
                    module = UtilsEditableBinding;

                    spyOn(specParam.handleEditable.allParameters_are_correct.parameter.widget, '_internalEnable');

                    module.handleEditable(specParam.handleEditable.allParameters_are_correct.parameter.editable,
                        specParam.handleEditable.allParameters_are_correct.parameter.metaData,
                        specParam.handleEditable.allParameters_are_correct.parameter.widget,
                        specParam.handleEditable.allParameters_are_correct.parameter.propertyArray);

                    expect(specParam.handleEditable.allParameters_are_correct.parameter.widget._internalEnable.calls.count()).toEqual(1);
                    expect(specParam.handleEditable.allParameters_are_correct.parameter.widget.settings.editable).toEqual(specParam.handleEditable.allParameters_are_correct.parameter.editable);
                });

            });
        }
    };
});
