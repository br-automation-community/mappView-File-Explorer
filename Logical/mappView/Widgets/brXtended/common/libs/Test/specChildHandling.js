'use strict';
define([
    'widgets/brXtended/common/libs/Test/ChildHandlingTest/mSpecChildHandling',
    'widgets/brXtended/common/libs/Test/ChildHandlingTest/cSpecChildHandling',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function (mSpecUnit, cSpecUnit) {

    describe('widgets.brXtended.common.libs.ChildHandlingTest ', function () {

        m.describe(true, 'Unit test', mSpecUnit.suite, [cSpecUnit]);
    });
});
