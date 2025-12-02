define(function () {

    'use strict';

    var rotations = [-360, -315, -270, -225, -180, -145, -90, -60, -45, 0,
            45, 60, 90, 145, 180, 225, 270, 315, 360],
        specList = {
            rotateTickLabels: {
                run: true,
                axisTop: {
                    run: true,
                    rotations: rotations,
                    positionAttribute: 'y',
                    setup: {
                        axisPosition: 'top',
                        tickLabelDistance: 23
                    },
                    position: {
                        run: true,
                        expect: {
                            y: Array.apply(null, Array(rotations.length)).map(function (item) {
                                return '-23';
                            })
                        }
                    },
                    dy: {
                        run: true,
                        expect: {
                            dy: ['0em', '0em', '0.3em', '0em', '0em', '0em', '0.3em', '0em', '0em', '0em',
                                '0em', '0em', '0.3em', '0em', '0em', '0em', '0.3em', '0em', '0em']
                        }
                    },
                    transform: {
                        run: true,
                        expect: {
                            transform: ['rotate(0, 0, -23)', 'rotate(45, 0, -23)',
                                'rotate(-90, 0, -23)', 'rotate(-45, 0, -23)',
                                'rotate(0, 0, -23)', 'rotate(35, 0, -23)',
                                'rotate(-90, 0, -23)', 'rotate(-60, 0, -23)',
                                'rotate(-45, 0, -23)', 'rotate(0, 0, -23)',
                                'rotate(45, 0, -23)', 'rotate(60, 0, -23)',
                                'rotate(-90, 0, -23)', 'rotate(-35, 0, -23)',
                                'rotate(0, 0, -23)', 'rotate(45, 0, -23)',
                                'rotate(-90, 0, -23)', 'rotate(-45, 0, -23)',
                                'rotate(0, 0, -23)']
                        }
                    },
                    textAnchor: {
                        run: true,
                        expect: {
                            textAnchor: ['middle', 'end',
                                'start', 'start',
                                'middle', 'end',
                                'start', 'start',
                                'start', 'middle',
                                'end', 'end',
                                'start', 'start',
                                'middle', 'end',
                                'start', 'start',
                                'middle']
                        }
                    }
                },
                axisBottom: {
                    run: true,
                    rotations: rotations,
                    positionAttribute: 'y',
                    setup: {
                        axisPosition: 'bottom',
                        tickLabelDistance: 23
                    },
                    position: {
                        run: true,
                        expect: {
                            y: Array.apply(null, Array(rotations.length)).map(function (item) {
                                return '23';
                            })
                        }
                    },
                    dy: {
                        run: true,
                        expect: {
                            dy: ['0.7em', '0.7em', '0.3em', '0.7em', '0.7em', '0.7em', '0.3em', '0.7em', '0.7em', '0.7em',
                                '0.7em', '0.7em', '0.3em', '0.7em', '0.7em', '0.7em', '0.3em', '0.7em', '0.7em']
                        }
                    },
                    transform: {
                        run: true,
                        expect: {
                            transform: ['rotate(0, 0, 23)', 'rotate(45, 0, 23)',
                                'rotate(-90, 0, 23)', 'rotate(-45, 0, 23)',
                                'rotate(0, 0, 23)', 'rotate(35, 0, 23)',
                                'rotate(-90, 0, 23)', 'rotate(-60, 0, 23)',
                                'rotate(-45, 0, 23)', 'rotate(0, 0, 23)',
                                'rotate(45, 0, 23)', 'rotate(60, 0, 23)',
                                'rotate(-90, 0, 23)', 'rotate(-35, 0, 23)',
                                'rotate(0, 0, 23)', 'rotate(45, 0, 23)',
                                'rotate(-90, 0, 23)', 'rotate(-45, 0, 23)',
                                'rotate(0, 0, 23)']
                        }
                    },
                    textAnchor: {
                        run: true,
                        expect: {
                            textAnchor: ['middle', 'start',
                                'end', 'end',
                                'middle', 'start',
                                'end', 'end',
                                'end', 'middle',
                                'start', 'start',
                                'end', 'end',
                                'middle', 'start',
                                'end', 'end',
                                'middle']
                        }
                    }
                },
                axisLeft: {
                    run: true,
                    rotations: rotations,
                    positionAttribute: 'x',
                    setup: {
                        axisPosition: 'left',
                        tickLabelDistance: 23
                    },
                    position: {
                        run: true,
                        expect: {
                            y: Array.apply(null, Array(rotations.length)).map(function (item) {
                                return '-23';
                            })
                        }
                    },
                    dy: {
                        run: true,
                        expect: {
                            dy: ['0.3em', '0.3em', '-0.3em', '0.3em', '0.3em', '0.3em', '-0.3em', '0.3em', '0.3em', '0.3em',
                                '0.3em', '0.3em', '-0.3em', '0.3em', '0.3em', '0.3em', '-0.3em', '0.3em', '0.3em']
                        }
                    },
                    transform: {
                        run: true,
                        expect: {
                            transform: ['rotate(0, -23, 0)', 'rotate(45, -23, 0)',
                                'rotate(-90, -23, 0)', 'rotate(-45, -23, 0)',
                                'rotate(0, -23, 0)', 'rotate(35, -23, 0)',
                                'rotate(-90, -23, 0)', 'rotate(-60, -23, 0)',
                                'rotate(-45, -23, 0)', 'rotate(0, -23, 0)',
                                'rotate(45, -23, 0)', 'rotate(60, -23, 0)',
                                'rotate(-90, -23, 0)', 'rotate(-35, -23, 0)',
                                'rotate(0, -23, 0)', 'rotate(45, -23, 0)',
                                'rotate(-90, -23, 0)', 'rotate(-45, -23, 0)',
                                'rotate(0, -23, 0)']
                        }
                    },
                    textAnchor: {
                        run: true,
                        expect: {
                            textAnchor: ['end', 'end',
                                'middle', 'end',
                                'end', 'end',
                                'middle', 'end',
                                'end', 'end',
                                'end', 'end',
                                'middle', 'end',
                                'end', 'end',
                                'middle', 'end',
                                'end']
                        }
                    }
                },
                axisRight: {
                    run: true,
                    rotations: rotations,
                    positionAttribute: 'x',
                    setup: {
                        axisPosition: 'right',
                        tickLabelDistance: 23
                    },
                    position: {
                        run: true,
                        expect: {
                            y: Array.apply(null, Array(rotations.length)).map(function (item) {
                                return '23';
                            })
                        }
                    },
                    dy: {
                        run: true,
                        expect: {
                            dy: ['0.3em', '0.3em', '0.7em', '0.3em', '0.3em', '0.3em', '0.7em', '0.3em', '0.3em', '0.3em',
                                '0.3em', '0.3em', '0.7em', '0.3em', '0.3em', '0.3em', '0.7em', '0.3em', '0.3em']
                        }
                    },
                    transform: {
                        run: true,
                        expect: {
                            transform: ['rotate(0, 23, 0)', 'rotate(45, 23, 0)',
                                'rotate(-90, 23, 0)', 'rotate(-45, 23, 0)',
                                'rotate(0, 23, 0)', 'rotate(35, 23, 0)',
                                'rotate(-90, 23, 0)', 'rotate(-60, 23, 0)',
                                'rotate(-45, 23, 0)', 'rotate(0, 23, 0)',
                                'rotate(45, 23, 0)', 'rotate(60, 23, 0)',
                                'rotate(-90, 23, 0)', 'rotate(-35, 23, 0)',
                                'rotate(0, 23, 0)', 'rotate(45, 23, 0)',
                                'rotate(-90, 23, 0)', 'rotate(-45, 23, 0)',
                                'rotate(0, 23, 0)']
                        }
                    },
                    textAnchor: {
                        run: true,
                        expect: {
                            textAnchor: ['start', 'start',
                                'middle', 'start',
                                'start', 'start',
                                'middle', 'start',
                                'start', 'start',
                                'start', 'start',
                                'middle', 'start',
                                'start', 'start',
                                'middle', 'start',
                                'start']
                        }
                    }
                }
            }
        };

    var axisPath = {};
    Object.keys(specList.rotateTickLabels)
        .filter(function (key) {
            return key !== 'run';
        })
        .forEach(function (axisKey) {
            var axisPosition = /\w*(?=sixa)/.exec(axisKey.split('').reverse().join(''))[0].split('').reverse().join('');

            axisPath[axisPosition] = specList.rotateTickLabels['axis' + axisPosition];
            axisPath[axisPosition].position.cases = [];
            axisPath[axisPosition].dy.cases = [];
            axisPath[axisPosition].transform.cases = [];
            axisPath[axisPosition].textAnchor.cases = [];

            for (var i = 0; i < rotations.length; i = i + 1) {
                axisPath[axisPosition].position.cases.push([rotations[i], axisPath[axisPosition].position.expect.y[i]]);
                axisPath[axisPosition].dy.cases.push([rotations[i], axisPath[axisPosition].dy.expect.dy[i]]);
                axisPath[axisPosition].transform.cases.push([rotations[i], axisPath[axisPosition].transform.expect.transform[i]]);
                axisPath[axisPosition].textAnchor.cases.push([rotations[i], axisPath[axisPosition].textAnchor.expect.textAnchor[i]]);
            }
        });

    return specList;
});
