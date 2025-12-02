define(function () {

    'use strict';

    var labelRotations = [0, 4, 8, 9, 18, 22, 25, 54, 70, 80, 90],
        labelText = 'IIIAAAAAAAAAA';

    function generateTickLabelsSVG(rotations, text) {
        
        var tickLabelSVGs = [],
            t;

        for (var i = 0; i < rotations.length; i = i + 1) {
            t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            t.textContent = text;
            t.setAttribute('transform', 'rotate(' + rotations[i] + ', 0, 0)');
            t.setAttribute('font-size', '13px');

            tickLabelSVGs.push([t]);
        }

        return tickLabelSVGs;
    }

    var specList = {
        getNumberOfTickLabel: {
            run: true,
            set: {
                tickLabelSVGs: generateTickLabelsSVG(labelRotations, labelText),
                axisDatas: labelRotations.map(function (rotation) {
                    return {
                        info: {
                            tickLabelRotation: rotation,
                            position: 'bottom'
                        },
                        width: 200
                    };
                })
            },
            expect: {
                numberOfLabels: [1, 2, 2, 2, 3, 3, 4, 8, 9, 10, 10]
            }
        },
        _binarySearchSuccessor: {
            run: true,
            set: {
                inputArrays: [
                    [],
                    [5],
                    [5],
                    [5],
                    [24, 45],
                    [24, 45],
                    [24, 45],
                    [24, 45],
                    [24, 45],
                    [1, 4, 89],
                    [1, 4, 89],
                    [1, 4, 89],
                    [1, 4, 89],
                    [1, 4, 89],
                    [1, 4, 89],
                    [1, 4, 89],
                    [0, 1, 5, 10, 52, 87, 96, 147, 435, 501],
                    [0, 1, 5, 10, 52, 87, 96, 147, 435, 501],
                    [0, 1, 5, 10, 52, 87, 96, 147, 435, 501]
                ],
                targets: [3, 2, 5, 6,
                    13, 24, 27, 45, 48,
                    0, 1, 3, 4, 9, 89, 90,
                    13, 500, 53]
            },
            expect: {
                outputIndexes: [-1, 0, 0, 0,
                    0, 0, 1, 1, 1,
                    0, 0, 1, 1, 2, 2, 2,
                    4, 9, 5]
            }
        },
        _getTickLabelStep: {
            run: true,
            indexAxis: {
                run: true,
                set: {
                    axisType: 'index',
                    numberOfTickLabel: 10,
                    domain: [
                        [0, 15],
                        [-13, 13],
                        [0, 0.05],
                        [-0.09, 0.09]
                    ]
                },
                expect: {
                    step: [2, 3, 0.0064, 0.02]
                }
            },
            dateTimeAxis: {
                run: true,
                set: {
                    axisType: 'dateTime',
                    numberOfTickLabel: 10,
                    domain: [
                        [new Date(0), new Date(36000)],
                        [new Date('2000-01-01T00:00:00'), new Date('2000-03-01T00:00:00')]
                    ]
                },
                expect: {
                    step: [4000, 6048e5]
                }
            }
        },
        minimumStep: {
            run: true,
            expect: {
                minimumStep: 1 // 1 millisecond
            }
        },
        maximumStep: {
            run: true,
            expect: {
                maximumStep: 31536e10 // milliseconds in 10000years
            }
        },
        getTickLabelValues: {
            run: true,
            negativeNumber: {
                run: true,
                set: {
                    axisDomain: [0, 1],
                    numberOfTickLabel: -3,
                    axisType: 'noType'
                }
            },
            nonNegativeNumber: {
                run: true,
                set: {
                    axisDomain: [0, 1],
                    numberOfTickLabel: [0, 4],
                    axisType: 'noType'
                },
                expect: {
                    axisDomain: [0, 1],
                    numberOfTickLabel: [1, 4],
                    axisType: 'noType'
                }
            }
        },
        getMultiLine: {
            run: true,
            multiline: {
                run: true,
                set: {
                    axisPosition: 'bottom',
                    axisPosition2: 'top'
                },
                expect: {
                    append: {
                        callsCount: 2,
                        callsCount2: 3
                    },
                    text: {
                        callsCount: 2,
                        callsCount2: 3
                    },
                    attr: {
                        callsCount: 3,
                        callsCount2: 6,
                        valueBottom: '1em',
                        valueTop: '-1em'
                    }
                }
            }
        }
    };

    var binarySearchSuccessorPath = specList._binarySearchSuccessor;

    binarySearchSuccessorPath.cases = [];

    for (let i = 0; i < binarySearchSuccessorPath.set.inputArrays.length; i = i + 1) {
        binarySearchSuccessorPath.cases.push([
            binarySearchSuccessorPath.set.inputArrays[i],
            binarySearchSuccessorPath.set.targets[i],
            binarySearchSuccessorPath.expect.outputIndexes[i]
        ]);
    }

    var indexStepPath = specList._getTickLabelStep.indexAxis;

    indexStepPath.cases = [];

    for (let i = 0; i < indexStepPath.set.domain.length; i = i + 1) {
        indexStepPath.cases.push([
            indexStepPath.set.domain[i],
            indexStepPath.set.numberOfTickLabel,
            indexStepPath.set.axisType,
            indexStepPath.expect.step[i]
        ]);
    }

    var timeDateStepPath = specList._getTickLabelStep.dateTimeAxis;

    timeDateStepPath.cases = [];

    for (let i = 0; i < timeDateStepPath.set.domain.length; i = i + 1) {
        timeDateStepPath.cases.push([
            timeDateStepPath.set.domain[i],
            timeDateStepPath.set.numberOfTickLabel,
            timeDateStepPath.set.axisType,
            timeDateStepPath.expect.step[i]
        ]);
    }

    var getNumberOfTickLabelPath = specList.getNumberOfTickLabel;

    getNumberOfTickLabelPath.cases = [];

    for (let i = 0; i < getNumberOfTickLabelPath.set.tickLabelSVGs.length; i = i + 1) {
        getNumberOfTickLabelPath.cases.push([
            getNumberOfTickLabelPath.set.tickLabelSVGs[i],
            getNumberOfTickLabelPath.set.axisDatas[i],
            getNumberOfTickLabelPath.expect.numberOfLabels[i],
            labelRotations[i]
        ]);
    }

    var getTickLabelValuesNonNegativeNumberPath = specList.getTickLabelValues.nonNegativeNumber;

    getTickLabelValuesNonNegativeNumberPath.cases = [];

    for (var i = 0; i < getTickLabelValuesNonNegativeNumberPath.set.numberOfTickLabel.length; i = i + 1) {

        getTickLabelValuesNonNegativeNumberPath.cases.push([
            getTickLabelValuesNonNegativeNumberPath.set.axisDomain,
            getTickLabelValuesNonNegativeNumberPath.set.numberOfTickLabel[i],
            getTickLabelValuesNonNegativeNumberPath.set.axisType,
            getTickLabelValuesNonNegativeNumberPath.expect.axisDomain,
            getTickLabelValuesNonNegativeNumberPath.expect.numberOfTickLabel[i],
            getTickLabelValuesNonNegativeNumberPath.expect.axisType
        ]);
    }

    return specList;
});
