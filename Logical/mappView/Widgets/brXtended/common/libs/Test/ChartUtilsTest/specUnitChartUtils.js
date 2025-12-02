'use strict';
define(['widgets/brXtended/common/libs/ChartUtils',
    'widgets/brXtended/common/libs/Test/ChartUtilsTest/UnitTest/cSpecUnitChartUtils',
    'libs/d3/d3',
    'brTest',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function (ChartUtils, specParam, d3, { appElem, core: { Utils }, TestUtils }) {

    var getNumberOfTickLabelPath = specParam.getNumberOfTickLabel;
    describe('widgets.brXtended.common.libs.ChartUtils', function () {
        m.cases(getNumberOfTickLabelPath.cases)
            .caseDescription('- With text rotation of $$3deg, the number of labels should be $$2')
            .it(getNumberOfTickLabelPath.run, 'getNumberOfTickLabel', function (tickLabelSVG, axisData, expectedNumberOfLabel) {

                var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

                svg.appendChild(tickLabelSVG[0]);
                appElem.appendChild(svg);

                var numberOfTickLabel = ChartUtils.getNumberOfTickLabel(tickLabelSVG, axisData);

                expect(numberOfTickLabel).toBe(expectedNumberOfLabel);

                appElem.removeChild(svg);
            });

        var _binarySearchSuccessorPath = specParam._binarySearchSuccessor;

        m.cases(_binarySearchSuccessorPath.cases)
            .caseDescription('- With input array=[$$0] and target value $$1, the expected index is $$2')
            .it(_binarySearchSuccessorPath.run, '_binarySearchSuccessor cases', function (inputArray, target, expectedOutputIndex, rotations) {

                var outputIndex = ChartUtils._binarySearchSuccessor(inputArray, target);

                expect(outputIndex).toBe(expectedOutputIndex);
            });

        m.describe(specParam._getTickLabelStep.run, '_getTickLabelStep', function () {

            var _getTickLabelStepIndexPath = specParam._getTickLabelStep.indexAxis;

            m.cases(_getTickLabelStepIndexPath.cases)
                .caseDescription('- With domain [$$0], maximum number of tick labels $$1 for an axis of type $$2, the step should be $$3')
                .it(_getTickLabelStepIndexPath.run, 'axis type: ' + _getTickLabelStepIndexPath.set.axisType, function (domain, numberOfTickLabel, axisType, expectedStep) {

                    var step = ChartUtils._getTickLabelStep(domain, numberOfTickLabel, axisType);
                    
                    expect(Utils.roundTo(step, 4)).toBe(Utils.roundTo(expectedStep, 4));
                });

            var _getTickLabelStepTimePath = specParam._getTickLabelStep.dateTimeAxis;

            m.cases(_getTickLabelStepTimePath.cases)
                .caseDescription('- With domain [$$0], maximum number of tick labels $$1 for an axis of type $$2, the step should be $$3')
                .it(_getTickLabelStepTimePath.run, 'axis type: ' + _getTickLabelStepTimePath.set.axisType, function (domain, numberOfTickLabel, axisType, expectedStep) {

                    var step = ChartUtils._getTickLabelStep(domain, numberOfTickLabel, axisType);

                    expect(step).toBe(expectedStep);
                });
        });

        m.describe(specParam.minimumStep.run, 'Minimum step for dataTime axis', function () {

            m.it(specParam.minimumStep.run, '- The minimum available step for an axis of type dataTime should be ' + specParam.minimumStep.expect.minimumStep, function () {

                expect(ChartUtils._stepBases[0]).toBe(specParam.minimumStep.expect.minimumStep);
            });
        });

        m.describe(specParam.maximumStep.run, 'A&P 612575 - Maximum step for dataTime axis', function () {

            m.it(specParam.maximumStep.run, '- The maximum available step for an axis of type dataTime should be ' + specParam.maximumStep.expect.maximumStep, function () {

                var numberOfstepBases = ChartUtils._stepBases.length;

                expect(ChartUtils._stepBases[numberOfstepBases - 1]).toBe(specParam.maximumStep.expect.maximumStep);
            });
        });

        m.describe(specParam.getTickLabelValues.run, 'getTickLabelValues', function () {

            var suitePath = specParam.getTickLabelValues;
            m.describe(suitePath.negativeNumber, 'numberOfTickLabel < 0', function () {

                var suitePath1 = suitePath.negativeNumber;
                m.it(suitePath1.run, '- calling getTickLabelValues with \u00BB' + JSON.stringify(suitePath1.set.axisDomain) + ', ' + suitePath1.set.numberOfTickLabel +
                    ', ' + suitePath1.set.axisType + '\u00AB, ' + '_getTickLabelStep should NOT be called', function () {

                    spyOn(ChartUtils, '_getTickLabelStep');

                    TestUtils.spyOnConsole('error', { startsWith: 'ChartUtils.getTickLabelValues: numberOfTickLabel must be >= 0' });
                    ChartUtils.getTickLabelValues(suitePath1.set.axisDomain, suitePath1.set.numberOfTickLabel, suitePath1.set.axisType);

                    expect(ChartUtils._getTickLabelStep).not.toHaveBeenCalled();
                });
            });

            m.cases(suitePath.nonNegativeNumber.cases)
                .caseDescription('- calling getTickLabelValues with \u00BB$$0, $$1, $$2\u00AB, _getTickLabelStep should be called with \u00BB$$3, $$4, $$5\u00AB')
                .it(suitePath.nonNegativeNumber.run, 'numberOfTickLabel >= 0',
                    function (setAxisDomain, setNumberOfTickLabel, setAxisType, expectedAxisDomain, expectedNumberOfTickLabel, expectedAxisType) {

                        spyOn(ChartUtils, '_getTickLabelStep');

                        ChartUtils.getTickLabelValues(setAxisDomain, setNumberOfTickLabel, setAxisType);

                        expect(ChartUtils._getTickLabelStep).toHaveBeenCalledWith(expectedAxisDomain, expectedNumberOfTickLabel, expectedAxisType);
                    });
        });

        m.describe(specParam.getMultiLine.run, 'getMultiLine', function () {

            var suitePath = specParam.getMultiLine,
                suitePath1 = suitePath.multiline.set,
                suitePath2 = suitePath.multiline.expect,
                text = document.createElementNS('http://www.w3.org/2000/svg', 'text'),
                tickLabel = d3.select([text, text, text]);

            beforeEach(function () {
                text.innerHTML = '12\n1209';

            });

            afterEach(function () {
                text.innerHTML = '';
            });

            m.it(suitePath.run, 'Calling getMultiLine with axisPosition =' + suitePath.multiline.set.axisPosition +
                 '\u00BB, should set the correct "dy" position', function () {

                ChartUtils.getMultiLine(tickLabel[0], suitePath1.axisPosition);
                expect(tickLabel[0][0][0].childNodes[2].dy.animVal[0].valueAsString).toBe(suitePath2.attr.valueBottom);
            });

            m.it(suitePath.run, 'Calling getMultiLine with axisPosition =' + suitePath.multiline.set.axisPosition2 +
                '\u00BB, should set the correct "dy" position', function () {

                ChartUtils.getMultiLine(tickLabel[0], suitePath1.axisPosition2);
                expect(tickLabel[0][0][0].childNodes[2].dy.animVal[0].valueAsString).toBe(suitePath2.attr.valueTop);
            });

            m.it(suitePath.run, 'Calling getMultiLine without multiLine should not call any d3 function', function () {
                text.innerHTML = '';

                spyOn(d3.select(tickLabel[0][0][0]), 'text');

                ChartUtils.getMultiLine(tickLabel[0], suitePath1.axisPosition2);
                expect(tickLabel[0][0][0].childNodes.length).toBe(0);
            });

        });
    });

});
