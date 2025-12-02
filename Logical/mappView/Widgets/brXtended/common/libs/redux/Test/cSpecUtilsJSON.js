define(function () {

    var specList = {
        convertJSONtoObject: {
            run: true,
            correctJSON: {
                run: true,
                dp: '[{"value": "0", "text": "index 0"}]',
                expect: {
                    dp: [{ 'value': '0', 'text': 'index 0' }]
                }
            },
            incorrectJSON: {
                run: true,
                dp: '[{"value": "0", "text: \'index 0\'}]',
                expect: {
                    dp: {}
                }
            },
            undefined: {
                run: true,
                dp: undefined,
                expect: {
                    dp: {}
                }
            }
        },
        convertObjectToJSON: {
            run: true,
            correctJSON: {
                run: true,
                dp: [{ 'value': '0', 'text': 'index 0' }],
                expect: {
                    dp: '[{"value":"0","text":"index 0"}]'
                }
            },
            incorrectJSON: {
                run: true,
                dp: '[{"value": "0", "text: \'index 0\'}]',
                expect: {
                    dp: ''
                }
            },
            noneArray: {
                run: true,
                dp: { 'value': '0', 'text': 'index 0' },
                expect: {
                    dp: ''
                }
            },
            undefined: {
                run: true,
                dp: undefined,
                expect: {
                    dp: ''
                }
            }
        }
    };

    return specList;

});
