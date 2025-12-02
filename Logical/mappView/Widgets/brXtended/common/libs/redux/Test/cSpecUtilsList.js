define(['brease'], function ({ enum: { Enum } }) {

    var specList = {
        isEqualIntBool: {
            run: true
        },
        parseJSONtoObject: {
            run: true,
            singelQuotes: {
                run: true,
                dp: ['{"value": "0", "text": "index 0"}', '{"value": "1", "text": "index 1"}', "{'value': '2', 'text': 'index 2'}", '{"value": "4", "text": "index 4"}'],
                expect: {
                    dp: [{ 'value': '0', 'text': 'index 0' }, { 'value': '1', 'text': 'index 1' }, { 'value': '2', 'text': 'index 2' }, { 'value': '4', 'text': 'index 4' }]
                }
            },
            emptyEntries: {
                run: true,
                dp: ['{"value": "0", "text": "index 0"}', '{"value": "1", "text": "index 1"}', "{'value': '2', 'text': 'index 2'}", '', '{"value": "4", "text": "index 4"}'],
                expect: {
                    dp: [{ 'value': '0', 'text': 'index 0' }, { 'value': '1', 'text': 'index 1' }, { 'value': '2', 'text': 'index 2' }, { 'value': '4', 'text': 'index 4' }]
                }
            },
            undefined: {
                run: true,
                dp: undefined,
                expect: {
                    dp: []
                }
            },
            null: {
                run: true,
                dp: null,
                expect: {
                    dp: []
                }
            },
            arrayOfEmptyStrings: {
                run: true,
                dp: new Array(10),
                expect: {
                    dp: []
                }
            }
        },
        getItemsFromItems: {
            run: true,
            default: {
                run: true,
                list: [{ 'value': '0', 'text': 'index 0' }, { 'value': '1', 'text': 'index 1' }],
                selected: 1,
                expect: {
                    list: [{ 'imageId': '0', 'textId': '0', 'value': '0', 'selected': false }, { 'imageId': '1', 'textId': '1', 'value': '1', 'selected': true }]
                }
            }
        },
        getSelectedValueFromItems: {
            run: true,
            default: {
                run: true,
                list: [{ 'value': '0', 'text': 'index 0' }, { 'value': '1', 'text': 'index 1' }],
                selected: 1,
                expect: {
                    selected: '1'
                }
            },
            undefined: {
                run: true,
                list: [{ 'value': '0', 'text': 'index 0' }, { 'value': '1', 'text': 'index 1' }],
                selected: undefined,
                expect: {
                    selected: ''
                }
            },
            outofbounds: {
                run: true,
                list: [{ 'value': '0', 'text': 'index 0' }, { 'value': '1', 'text': 'index 1' }],
                selected: 3,
                expect: {
                    selected: ''
                }
            }
        },
        calculateListHeight: {
            run: true,
            default: {
                run: true,
                fitHeight2Items: false,
                numberOfItems: 5,
                maxVisibleEntries: 3,
                itemHeight: 30,
                expect: {
                    listHeight: 90
                }
            },
            noFH2I: {
                run: true,
                fitHeight2Items: false,
                numberOfItems: 4,
                maxVisibleEntries: 5,
                itemHeight: 30,
                expect: {
                    listHeight: 120
                }
            },
            FH2I: {
                run: true,
                fitHeight2Items: true,
                numberOfItems: 5,
                maxVisibleEntries: 3,
                itemHeight: 30,
                expect: {
                    listHeight: 150
                }
            }
        },
        getDataProviderForLanguage: {
            run: true,
            default: {
                run: true,
                languages: { 'de': { 'description': 'Deutsch', 'index': 1 }, 'en': { 'description': 'English', 'index': 0 }, 'fr': { 'description': 'français', 'index': 2 } },
                expect: {
                    languages: [
                        { 'value': 'en', 'text': 'English', 'image': 'en.png', 'index': 0 }, 
                        { 'value': 'de', 'text': 'Deutsch', 'image': 'de.png', 'index': 1 }, 
                        { 'value': 'fr', 'text': 'français', 'image': 'fr.png', 'index': 2 }
                    ]
                }
            }
        },
        getDataProviderForMeasurement: {
            run: true,
            default: {
                run: true,
                system: { 'imperial': { 'description': 'Imperial' }, 'imperial-us': { 'description': 'Imperial U.S' }, 'metric': { 'description': 'Metric' } },
                expect: {
                    system: [
                        { 'value': 'imperial', 'text': 'Imperial', 'image': 'imperial.png' }, 
                        { 'value': 'imperial-us', 'text': 'Imperial U.S', 'image': 'imperial-us.png' }, 
                        { 'value': 'metric', 'text': 'Metric', 'image': 'metric.png' }
                    ]
                }
            }
        },
        getShowValues: {
            run: true,
            default: {
                run: true,
                value: Enum.DropDownDisplaySettings.default,
                expect: {
                    showTexts: true,
                    showImages: true,
                    showTextsInButton: true,
                    showImagesInButton: false
                }
            },
            text: {
                run: true,
                value: Enum.DropDownDisplaySettings.text,
                expect: {
                    showTexts: true,
                    showImages: false,
                    showTextsInButton: true,
                    showImagesInButton: false
                }
            },
            imageAndText: {
                run: true,
                value: Enum.DropDownDisplaySettings.imageAndText,
                expect: {
                    showTexts: true,
                    showImages: true,
                    showTextsInButton: true,
                    showImagesInButton: true
                }
            },
            image: {
                run: true,
                value: Enum.DropDownDisplaySettings.image,
                expect: {
                    showTexts: false,
                    showImages: true,
                    showTextsInButton: false,
                    showImagesInButton: true
                }
            }
        }
    };

    return specList;

});
