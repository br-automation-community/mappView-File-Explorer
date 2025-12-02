define(['widgets/brXtended/common/libs/Test/ImageHandlingTest/mSpecImageHandling',
    'widgets/brXtended/common/libs/Test/ImageHandlingTest/cSpecImageHandling',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'], 
function (mSpecUnit, cSpecUnit) {

    'use strict';

    describe('widgets.brXtended.common.libs.ImageHandling ', function () {

        m.describe(true, 'Unit test', mSpecUnit.suite, [cSpecUnit]);
    });
});
