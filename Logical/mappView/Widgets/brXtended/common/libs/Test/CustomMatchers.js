'use strict';
define(['brTest'], function ({ core: { Utils }, jasmine: { matcherFactory } }) {
    
    var objFn = {
        pathToBeEqual: function (actual, expected, decimals) {
            var regExpAlphabet = /[a-zA-z]/ig,
                regExpRealNumber = /(\d+\.?\d*)/ig,
                actualElements = actual.match(regExpAlphabet),
                expectedElements = expected.match(regExpAlphabet),
                actualNumbers = actual.match(regExpRealNumber),
                expectedNumbers = expected.match(regExpRealNumber),
                i;
    
            if (actualElements.length === expectedElements.length) {
                for (i = 0; i < expectedElements.length; i = i + 1) {
                    if (actualElements[i] !== expectedElements[i]) {
                        return {
                            pass: false,
                            message: 'Expected ' + actualElements[i] + ' to be ' + expectedElements[i]
                        };
                    }
                }
            } else {
                return {
                    pass: false,
                    message: 'Expected ' + actualElements + ' to have same length of ' + expectedElements
                };
            }
    
            if (actualNumbers.length === expectedNumbers.length) {
                for (i = 0; i < expectedElements.length; i = i + 1) {
                    if (Math.round(actualNumbers[i] * Math.pow(10, decimals)) !== Math.round(expectedNumbers[i] * Math.pow(10, decimals))) {
                        return {
                            pass: false,
                            message: 'Expected ' + Math.round(actualNumbers[i] * Math.pow(10, decimals)) + ' to be ' + Math.round(expectedNumbers[i] * Math.pow(10, decimals))
                        };
                    }
                }
            } else {
                return {
                    pass: false,
                    message: 'Expected ' + actualNumbers + ' to have same length of ' + expectedNumbers
                };
            }
    
            return {
                pass: true
            };
        },
        toBeCloseWithToleranceTo: function (actual, expected, tolerance) {
            if (Utils.isString(tolerance)) {
                tolerance = expected * Number(tolerance.match(/\d+(\.\d+)?/)[0]) / 100;
            }
            var distance = Math.abs(parseFloat(actual) - parseFloat(expected)),
                result = distance <= tolerance;

            return {
                pass: result,
                message: 'Expected ' + actual + ' to equal ' + expected + ' with tolerance of ' + tolerance
            };
        },
        toBeGreaterThanWithTolerance: function (actual, expected, tolerance) {
            if (Utils.isString(tolerance)) {
                tolerance = expected * Number(tolerance.match(/\d+(\.\d+)?/)[0]) / 100;
            }
            var result = parseFloat(actual) > parseFloat(expected) + tolerance;

            return {
                pass: result,
                message: 'Expected ' + actual + ' to be greater than ' + expected + ' with tolerance of ' + tolerance
            };
        },
        toBeLessThanWithTolerance: function (actual, expected, tolerance) {

            if (Utils.isString(tolerance)) {
                tolerance = expected * Number(tolerance.match(/\d+(\.\d+)?/)[0]) / 100;
            }
            var result = parseFloat(actual) < parseFloat(expected) - tolerance;
            return {
                pass: result,
                message: 'Expected ' + actual + ' to be less than ' + expected + ' with tolerance of ' + tolerance
            };
        },
        toBeHtmlOrSvgElement: function (actual) {
                             
            return {
                pass: /(SVG|HTML)\w*Element/.test(actual.constructor.name),
                message: 'Expected ' + actual + ' to be an SVG or HTML Element'
            };
        },
        toBeTheSameNodeAs: function (actual, expected) {
            var sameValue = false,
                sameUnit = false,
                sameMinValue = false,
                sameMaxValue = false,
                sameId = false,
                pass;

            if (Utils.isObject(actual)) {
                sameValue = actual.value === expected.value;
                sameUnit = actual.unit === expected.unit;
                sameMinValue = actual.minValue === expected.minValue;
                sameMaxValue = actual.maxValue === expected.maxValue;
                sameId = actual.id === expected.id;

                pass = sameValue && sameUnit && sameMinValue && sameMaxValue && sameId;
            } else {
                pass = false;
            }             
            return {
                pass: pass,
                message: 'Expected ' + JSON.stringify(actual) + ' to equal ' + JSON.stringify(expected)
            };
        },
        toHaveSameOrderOf: function (actual, expected) {
            var pass = true,
                message;
            for (var i = 0; i < expected.length; i = i + 1) {
                if (actual[i] !== expected[i]) {
                    pass = false;
                    message = 'Expected elements on index ' + i + ' to equal, but they are different: actual="' + actual[i] + '", expected="' + expected[i] + '"';
                    break;
                }
            }
            return {
                pass: pass,
                message: message
            };
        },
        toHaveBeenCalledWithConstructor: function (actual, expectedName) {
            var constructor = (actual.mostRecentCall) ? actual.mostRecentCall.args[0] : actual.calls.mostRecent().args[0],
                actualName = constructor.prototype.constructor.name,
                message,
                pass = actualName === expectedName;
            if (!pass) {
                message = 'Expected constructor name to be ' + expectedName + ', but actual name is ' + actualName;
            }
            return {
                pass: pass,
                message: message
            };
        },
        roundedUpToBeEqual: function (actual, expected) {
            var pass = Math.ceil(actual) === expected,
                message;
            if (!pass) {
                message = 'Expected ' + actual + ' rounded up to equal ' + expected;
            }
            return {
                pass: pass,
                message: message
            };
        }
    };

    var objMatcher = {};

    for (var matcherName in objFn) {
        objMatcher[matcherName] = matcherFactory.createMatcher(objFn[matcherName]);
    }
    
    var CustomMatchers = {
        
        addMatchers: function (testcase, arType) {
            var matcher = {};
            if (Array.isArray(arType)) {
                arType.forEach(function (type) {
                    if (objMatcher[type]) {
                        matcher[type] = objMatcher[type];
                    }
                });
            }
            matcherFactory.addMatchers(testcase, matcher);
                
        },
        addSingleMatcher: function (testcase, matcherName, fn) {
            matcherFactory.addSingleMatcher(testcase, matcherName, fn);
        }
    };
    
    return CustomMatchers;
});
