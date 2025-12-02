define(['widgets/brXtended/common/libs/Test/ShakeElements/mSpecShakeElements',
    'widgets/brXtended/common/libs/Test/ShakeElements/cSpecShakeElements',
    'widgets/brXtended/common/libs/Test/TestUtils',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'], 
function (mSpecUnit, cSpecUnit, TestUtils) {

    'use strict';

    describe('widgets.brXtended.common.libs.ShakeElements ', function () {

        m.describe(true, 'Unit test', mSpecUnit.suite, [cSpecUnit]);
    });
});
