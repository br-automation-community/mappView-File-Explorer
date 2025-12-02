'use strict';
define(['brTest', 'widgets/brXtended/common/libs/redux/utils/UtilsJSON'],
    function ({ TestUtils }, UtilsJSON) {

        return {
            suite: function (specParam) {

                m.describe(specParam.convertJSONtoObject.run, '#method-convertJSONtoObject', function () {

                    m.it(specParam.convertJSONtoObject.correctJSON.run, 'should return parsed object for valid JSON string', function () {
                        var result = UtilsJSON.convertJSONtoObject(specParam.convertJSONtoObject.correctJSON.dp);
                        expect(result).toEqual(specParam.convertJSONtoObject.correctJSON.expect.dp);
                    });
                    m.it(specParam.convertJSONtoObject.incorrectJSON.run, 'should return empty object for erroneous JSON string', function () {
                        TestUtils.spyOnConsole('iatWarn', { startsWith: 'JSON string erroneous' });
                        var result = UtilsJSON.convertJSONtoObject(specParam.convertJSONtoObject.incorrectJSON.dp);
                        expect(result).toEqual(specParam.convertJSONtoObject.incorrectJSON.expect.dp);
                    });
                    m.it(specParam.convertJSONtoObject.undefined.run, 'should return empty object for undefined argument', function () {
                        var result = UtilsJSON.convertJSONtoObject(specParam.convertJSONtoObject.undefined.dp);
                        expect(result).toEqual(specParam.convertJSONtoObject.undefined.expect.dp);
                    });
                });
                m.describe(specParam.convertObjectToJSON.run, '#method-convertObjectToJSON', function () {

                    m.it(specParam.convertObjectToJSON.correctJSON.run, 'should return stringified array', function () {
                        var result = UtilsJSON.convertObjectToJSON(specParam.convertObjectToJSON.correctJSON.dp);
                        expect(result).toEqual(specParam.convertObjectToJSON.correctJSON.expect.dp);
                    });
                    m.it(specParam.convertObjectToJSON.incorrectJSON.run, 'should return empty string for none arrays', function () {
                        var result = UtilsJSON.convertObjectToJSON(specParam.convertObjectToJSON.incorrectJSON.dp);
                        expect(result).toEqual(specParam.convertObjectToJSON.incorrectJSON.expect.dp);
                    });
                    m.it(specParam.convertObjectToJSON.noneArray.run, 'should return empty string for none arrays', function () {
                        var result = UtilsJSON.convertObjectToJSON(specParam.convertObjectToJSON.noneArray.dp);
                        expect(result).toEqual(specParam.convertObjectToJSON.noneArray.expect.dp);
                    });
                    m.it(specParam.convertObjectToJSON.undefined.run, 'should return empty string for undefined argument', function () {
                        var result = UtilsJSON.convertObjectToJSON(specParam.convertObjectToJSON.undefined.dp);
                        expect(result).toEqual(specParam.convertObjectToJSON.undefined.expect.dp);
                    });
                });

            }

        };
    });
