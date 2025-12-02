define(['widgets/brXtended/common/libs/wfUtils/Test/UtilsEditableBinding/mSpecUnitEditableBinding',
    'widgets/brXtended/common/libs/wfUtils/Test/UtilsEditableBinding/cSpecUnitEditableBinding',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'], 
function (mSpecUnit, cSpecUnit) {

    'use strict';

    describe('widgets.brXtended.common.libs.wfUtils.UtilsEditableBinding ', function () {

        m.describe(true, 'Unit test', mSpecUnit.suite, [cSpecUnit]);
    });
});
