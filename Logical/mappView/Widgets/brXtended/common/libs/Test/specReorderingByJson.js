define([
    'widgets/brXtended/common/libs/Test/ReorderingByJson/mSpecReorderingByJson',
    'widgets/brXtended/common/libs/Test/ReorderingByJson/cSpecReorderingByJson',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function (mSpecUnit, cSpecUnit) {
    'use strict';
    describe('widgets.brXtended.common.libs.ReorderingByJson ', function () {

        m.describe(true, 'Unit test', mSpecUnit.suite, [cSpecUnit]);
    });
});
