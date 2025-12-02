'use strict';
define(['brTest', 'widgets/brXtended/common/libs/redux/utils/UtilsList'],
    function ({ TestUtils }, UtilsList) {

        return {
            suite: function (specParam) {

                m.describe(specParam.isEqualIntBool.run, '#method-isEqualIntBool', function () {

                    var tests = [
                        { input: { in1: 0, in2: false }, result: true },
                        { input: { in1: 0, in2: 0 }, result: true },
                        { input: { in1: 1, in2: true }, result: true },
                        { input: { in1: 1, in2: 1 }, result: true },
                        { input: { in1: 2, in2: 2 }, result: true },
                        { input: { in1: 3, in2: 3 }, result: true },
                        { input: { in1: 2, in2: 0 }, result: false },
                        { input: { in1: 2, in2: 1 }, result: false },
                        { input: { in1: 2, in2: false }, result: false },
                        { input: { in1: 2, in2: true }, result: false }
                    ];

                    function testRunner(spec) {

                        m.it(specParam.isEqualIntBool.run, '(' + spec.input.in1 + ',' + spec.input.in2 + ') should equal ' + spec.result, function () {
                            var result = UtilsList.isEqualIntBool(spec.input.in1, spec.input.in2);

                            expect(result).toEqual(spec.result);
                        });
                    }

                    for (var i = 0; i < tests.length; i += 1) {
                        testRunner(tests[i]);
                    }
                });
                m.describe(specParam.parseJSONtoObject.run, '#method-parseJSONtoObject', function () {
        
                    m.it(specParam.parseJSONtoObject.singelQuotes.run, 'Test that the method can handle single quotes', function () {
                        var result = UtilsList.parseJSONtoObject(specParam.parseJSONtoObject.singelQuotes.dp);
    
                        expect(result).toEqual(specParam.parseJSONtoObject.singelQuotes.expect.dp);
                    });
                    
                    m.it(specParam.parseJSONtoObject.emptyEntries.run, 'Test that the method removes empty entries and truncates the data', function () {
                        
                        TestUtils.spyOnConsole('iatWarn', { startsWith: 'malformed data provider' });
                        var result = UtilsList.parseJSONtoObject(specParam.parseJSONtoObject.emptyEntries.dp, 'UtilsList-Test');
    
                        expect(result).toEqual(specParam.parseJSONtoObject.emptyEntries.expect.dp);
                    });

                    m.it(specParam.parseJSONtoObject.undefined.run, 'Test that the method returns an empty array if passed dataprovider is undefined', function () {
                        var result = UtilsList.parseJSONtoObject(specParam.parseJSONtoObject.undefined.dp);
    
                        expect(result).toEqual(specParam.parseJSONtoObject.undefined.expect.dp);
                    });

                    m.it(specParam.parseJSONtoObject.null.run, 'Test that the method returns empty array if passed dataprovider is null', function () {
                        var result = UtilsList.parseJSONtoObject(specParam.parseJSONtoObject.null.dp);
    
                        expect(result).toEqual(specParam.parseJSONtoObject.null.expect.dp);
                    });

                    m.it(specParam.parseJSONtoObject.arrayOfEmptyStrings.run, 'Test that the method returns an empty array if passed dataprovider is an array of empty strings', function () {
                        var result = UtilsList.parseJSONtoObject(specParam.parseJSONtoObject.arrayOfEmptyStrings.dp);
    
                        expect(result).toEqual(specParam.parseJSONtoObject.arrayOfEmptyStrings.expect.dp);
                    });
                });

                m.describe(specParam.getItemsFromItems.run, '#method-getItemsFromItems', function () {
        
                    m.it(specParam.getItemsFromItems.default.run, 'Test that the method builds a correct list', function () {
                        var result = UtilsList.getItemsFromItems(specParam.getItemsFromItems.default.list, specParam.getItemsFromItems.default.selected);
    
                        expect(result).toEqual(specParam.getItemsFromItems.default.expect.list);
                    });
                });

                m.describe(specParam.getSelectedValueFromItems.run, '#method-getSelectedValueFromItems', function () {
        
                    m.it(specParam.getSelectedValueFromItems.default.run, 'Test that the method builds a correct list', function () {
                        var result = UtilsList.getSelectedValueFromItems(specParam.getSelectedValueFromItems.default.list, specParam.getSelectedValueFromItems.default.selected);
    
                        expect(result).toEqual(specParam.getSelectedValueFromItems.default.expect.selected);
                    });
                    m.it(specParam.getSelectedValueFromItems.undefined.run, 'Test that the method returns an empty string if undefined is passed as a selected value', function () {
                        var result = UtilsList.getSelectedValueFromItems(specParam.getSelectedValueFromItems.undefined.list, specParam.getSelectedValueFromItems.undefined.selected);
    
                        expect(result).toEqual(specParam.getSelectedValueFromItems.undefined.expect.selected);
                    });
                    m.it(specParam.getSelectedValueFromItems.outofbounds.run, 'Test that the method returns an empty string if a selected value doesnt exist in the list ', function () {
                        var result = UtilsList.getSelectedValueFromItems(specParam.getSelectedValueFromItems.outofbounds.list, specParam.getSelectedValueFromItems.outofbounds.selected);
    
                        expect(result).toEqual(specParam.getSelectedValueFromItems.outofbounds.expect.selected);
                    });
                });
                m.describe(specParam.calculateListHeight.run, '#method-calculateListHeight', function () {
        
                    m.it(specParam.calculateListHeight.default.run, 'Test that the method returns correct height (' + 
                        specParam.calculateListHeight.default.expect.listHeight + 'px) if fitHeight2Items is false,' +
                        ' the number of items visible are equal to the number of items', function () {
                        var result = UtilsList.calculateListHeight(
                            specParam.calculateListHeight.default.fitHeight2Items, 
                            specParam.calculateListHeight.default.numberOfItems, 
                            specParam.calculateListHeight.default.maxVisibleEntries, 
                            specParam.calculateListHeight.default.itemHeight);
    
                        expect(result).toEqual(specParam.calculateListHeight.default.expect.listHeight);
                    });
                    
                    m.it(specParam.calculateListHeight.noFH2I.run, 'Test that the method returns correct height (' + 
                    specParam.calculateListHeight.noFH2I.expect.listHeight + 'px) if fitHeight2Items is false,' +
                    ' the number of items visible is less to the number of items', function () {
                        var result = UtilsList.calculateListHeight(
                            specParam.calculateListHeight.noFH2I.fitHeight2Items, 
                            specParam.calculateListHeight.noFH2I.numberOfItems, 
                            specParam.calculateListHeight.noFH2I.maxVisibleEntries, 
                            specParam.calculateListHeight.noFH2I.itemHeight);
    
                        expect(result).toEqual(specParam.calculateListHeight.noFH2I.expect.listHeight);
                    });

                    m.it(specParam.calculateListHeight.FH2I.run, 'Test that the method returns correct height (' + 
                        specParam.calculateListHeight.FH2I.expect.listHeight + 'px) if fitHeight2Items is true,' +
                        ' and the number of items visible is less to the number of items', function () {
                        var result = UtilsList.calculateListHeight(
                            specParam.calculateListHeight.FH2I.fitHeight2Items, 
                            specParam.calculateListHeight.FH2I.numberOfItems, 
                            specParam.calculateListHeight.FH2I.maxVisibleEntries, 
                            specParam.calculateListHeight.FH2I.itemHeight);
    
                        expect(result).toEqual(specParam.calculateListHeight.FH2I.expect.listHeight);
                    });
                });
                
                m.describe(specParam.getDataProviderForLanguage.run, '#method-getDataProviderForLanguage', function () {
        
                    m.it(specParam.getDataProviderForLanguage.default.run, 'Test that the method builds a correct list', function () {
                        var result = UtilsList.getDataProviderForLanguage(specParam.getDataProviderForLanguage.default.languages);
    
                        expect(result).toEqual(specParam.getDataProviderForLanguage.default.expect.languages);
                    });
                });

                m.describe(specParam.getDataProviderForMeasurement.run, '#method-getDataProviderForMeasurement', function () {
        
                    m.it(specParam.getDataProviderForMeasurement.default.run, 'Test that the method builds a correct list', function () {
                        var result = UtilsList.getDataProviderForMeasurement(specParam.getDataProviderForMeasurement.default.system);
    
                        expect(result).toEqual(specParam.getDataProviderForMeasurement.default.expect.system);
                    });
                });

                m.describe(specParam.getShowValues.run, '#method-getShowValues', function () {
        
                    m.it(specParam.getShowValues.default.run, 'Test that the method builds the correct default object', function () {
                        var result = UtilsList.getShowValues(specParam.getShowValues.default.value);
    
                        expect(result).toEqual(specParam.getShowValues.default.expect);
                    });
                    m.it(specParam.getShowValues.text.run, 'Test that the method builds the correct object if text is selected', function () {
                        var result = UtilsList.getShowValues(specParam.getShowValues.text.value);
    
                        expect(result).toEqual(specParam.getShowValues.text.expect);
                    });
                    m.it(specParam.getShowValues.imageAndText.run, 'Test that the method builds the correct object if imageAndText is selected', function () {
                        var result = UtilsList.getShowValues(specParam.getShowValues.imageAndText.value);
    
                        expect(result).toEqual(specParam.getShowValues.imageAndText.expect);
                    });
                    m.it(specParam.getShowValues.image.run, 'Test that the method builds the correct object if image is selected', function () {
                        var result = UtilsList.getShowValues(specParam.getShowValues.image.value);
    
                        expect(result).toEqual(specParam.getShowValues.image.expect);
                    });
                });
            }
        };
    });
