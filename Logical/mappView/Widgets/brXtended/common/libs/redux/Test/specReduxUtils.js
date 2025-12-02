define([
    'widgets/brXtended/common/libs/redux/Test/mSpecUtilsList',
    'widgets/brXtended/common/libs/redux/Test/cSpecUtilsList',
    'widgets/brXtended/common/libs/redux/Test/mSpecUtilsJSON',
    'widgets/brXtended/common/libs/redux/Test/cSpecUtilsJSON',
    'widgets/brXtended/common/libs/redux/Test/mSpecUtilsImage',
    'widgets/brXtended/common/libs/redux/Test/cSpecUtilsImage',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'],
function (
    mSpecUnitUtilsList, cSpecUnitUtilsList, 
    mSpecUnitUtilsJSON, cSpecUnitUtilsJSON,
    mSpecUnitUtilsImage, cSpecUnitUtilsImage) {

    'use strict';

    describe('widgets.brXtended.common.libs.redux.Utils ', function () {

        m.describe(true, 'UtilsList', mSpecUnitUtilsList.suite, [cSpecUnitUtilsList]);
        m.describe(true, 'UtilsJSON', mSpecUnitUtilsJSON.suite, [cSpecUnitUtilsJSON]);
        m.describe(true, 'UtilsImage', mSpecUnitUtilsImage.suite, [cSpecUnitUtilsImage]);
    });
});
