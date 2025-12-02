define(function () {

    var specList = {
        createImageList: {
            run: true,
            listWithImages: {
                run: true,
                dp: [{ 'image': 'alpha.svg', 'value': '0' }, { 'image': 'beta.svg', 'value': '1' }],
                expect: {
                    dp: ['alpha.svg', 'beta.svg']
                }
            },
            listWithoutImages: {
                run: true,
                dp: [{ 'text': 'alpha', 'value': '0' }, { 'text': 'beta', 'value': '1' }],
                expect: {
                    dp: ['0.png', '1.png']
                }
            },
            listWithMixOfImages: {
                run: true,
                dp: [{ 'text': 'alpha', 'value': '0' }, { 'image': 'alpha.svg', 'value': '1' }, { 'text': 'beta', 'value': '2' }, { 'image': 'beta.svg', 'value': '3' }],
                expect: {
                    dp: ['0.png', 'alpha.svg', '2.png', 'beta.svg']
                }
            },
            undefined: {
                run: true,
                dp: undefined,
                expect: {
                    dp: []
                }
            }
        },
        createImageElements: {
            run: true,
            undefinedList: {
                run: true,
                il: undefined,
                ip: 'test/path/',
                expect: {
                    dp: {}
                }
            },
            default: {
                run: true,
                il: ['imperial.png', 'imperial-us.png', 'metric.png'],
                ip: 'test/path/',
                expect: {
                    dp: {
                        0: {
                            id: '0', 
                            imagePath: 'test/path/imperial.png'
                        },
                        1: {
                            id: '1', 
                            imagePath: 'test/path/imperial-us.png'
                        },
                        2: {
                            id: '2', 
                            imagePath: 'test/path/metric.png'
                        }
                    }
                }
            },
            undefinedPath: {
                run: true,
                il: ['imperial.png', 'imperial-us.png', 'metric.png'],
                ip: undefined,
                expect: {
                    dp: {
                        0: {
                            id: '0', 
                            imagePath: undefined
                        },
                        1: {
                            id: '1', 
                            imagePath: undefined
                        },
                        2: {
                            id: '2', 
                            imagePath: undefined
                        }
                    }
                }
            }
        }
    };

    return specList;

});
