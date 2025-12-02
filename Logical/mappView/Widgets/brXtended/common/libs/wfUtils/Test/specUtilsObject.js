'use strict';
define([
    'widgets/brXtended/common/libs/wfUtils/UtilsObject', 
    'brTest'
], function (UtilsObject, { TestUtils, services }) {

    var suite = {
        name: 'widgets.brXtended.common.libs.wfUtils.UtilsObject'
    };

    describe(suite.name, function () {

        beforeAll(function () {
            TestUtils.logSuite(suite);
        });

        describe('#method-createFormatObject', function () {
            var successString = "{'metric': {'decimalPlaces': 1, 'minimumIntegerDigits': 1}}",
                failString = "{'metric':",
                successObj = { 'metric': { 'decimalPlaces': 1, 'minimumIntegerDigits': 1 } };

            it('should return object for valid string', function () { 
                
                expect(UtilsObject.createFormatObject({}, successString)).toEqual(successObj);
            });

            it('should return object for valid string extended with default format', function () { 
                
                var defaultFormat = { 
                        default: { decimalPlaces: 2, minimumIntegerDigits: 1 } 
                    },
                    expected = { 
                        default: { decimalPlaces: 2, minimumIntegerDigits: 1 },
                        metric: { decimalPlaces: 1, minimumIntegerDigits: 1 } 
                    };
                expect(UtilsObject.createFormatObject(defaultFormat, successString)).toEqual(expected);
            });

            it('should call iatWarn if failing', function () {
                var message = 'some warning';
                TestUtils.spyOnConsole('iatWarn', { startsWith: message });
                UtilsObject.createFormatObject(null, failString, message);
                expect(console.iatWarn).toHaveBeenCalledWith(message);
            });
        });

        describe('#method-parseObject', function () {
            var successString = "{'metric':'MMT'}",
                failString = "{'metric':'MMT'",
                successObj = { metric: 'MMT' };

            it('should return object for valid string', function () { 
                
                expect(UtilsObject.parseObject(successString)).toEqual(successObj);
            });

            it('should return object for valid object', function () { 
                
                expect(UtilsObject.parseObject(successObj)).toEqual(successObj);
            });

            it('should return object for valid data from text system', function () { 
                
                var textID = 'IAT/parseObjectTestSuccess';
                services.language.addTextKey(textID, successString);
                expect(UtilsObject.parseObject(services.language.TEXTKEYPREFIX + textID)).toEqual(successObj);
            });

            it('should return null for illegal data in string', function () { 
                TestUtils.spyOnConsole('iatWarn', { startsWith: 'SyntaxError' });
                expect(UtilsObject.parseObject(failString)).toBeNull();
            });

            it('should return null for illegal data from text system', function () { 
                TestUtils.spyOnConsole('iatWarn', { startsWith: 'SyntaxError' });
                var textID = 'IAT/parseObjectTestFail';
                services.language.addTextKey(textID, failString);
                expect(UtilsObject.parseObject(services.language.TEXTKEYPREFIX + textID)).toBeNull();
            });

            it('should return null for any other argument type', function () { 
                
                expect(UtilsObject.parseObject(27)).toBeNull();
            });

            it('should call iatWarn if failing', function () { 
                
                var message = 'some warning';
                spyOn(console, 'iatWarn');
                UtilsObject.parseObject(failString, message);
                expect(console.iatWarn).toHaveBeenCalledWith(message);
            });

        });

    });
});
