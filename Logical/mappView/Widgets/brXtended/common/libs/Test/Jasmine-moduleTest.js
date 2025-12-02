(function (global) {

    'use strict';

    function Jasmine_moduleTest() { }

    var p = Jasmine_moduleTest.prototype;

    p._getSuite = function (context, caseParameters) {

        var self = this;

        return {

            describe: function (enable, description, func, params) {
                if (enable !== null && enable !== false) {
                    self._runSuiteSpec(context, description, func, caseParameters, params, context.describe);
                }
            },
            xdescribe: function (enable, description, func, params) {
                console.debug('Call to xdescribe function. Following test is disabled: ', description);
                if (enable !== null && enable !== false) {
                    self._runSuiteSpec(context, description, func, caseParameters, params, context.xdescribe);
                }
            }
        };
    };

    p._getSpec = function (context, caseParameters, caseDescription) {

        var self = this;

        return {

            it: function (enable, description, func, params) {

                if (enable !== null && enable !== false) {
                    self._runSuiteSpec(context, description, func, caseParameters, params, context.it, caseDescription);
                }
                
            },
            xit: function (enable, description, func, params) {
                console.debug('Call to xit function. Following test is disabled: ', description);
                if (enable !== null && enable !== false) {
                    self._runSuiteSpec(context, description, func, caseParameters, params, context.xit, caseDescription);
                }
            }
        };
    };

    p._getCaseDescription = function (context, caseParameters) {

        var self = this;

        return {
            caseDescription: function (description) {
                return self._getSpec(context, caseParameters, description);
            }
        };
    };

    p._getCases = function (context) {

        var self = this;

        return {
            cases: function (caseParameters) {
                return Object.assign(self._getSpec(context, caseParameters), self._getCaseDescription(context, caseParameters));
            }
        };
    };

    p._getSpyOn = function (context) {
        var env = context;

        return {
            spyOn: function (obj, methodName) {
                if (_isSpy(obj[methodName])) {
                    //console.debug('method ' + methodName + ' is already spied on. The spy will be reset');
                    _resetSpy(obj[methodName]);
                    return obj[methodName];
                }
                return env.spyOn(obj, methodName);
            }
        };
    };

    p._mFunc = function (context) {

        return Object.assign(this._getSuite(context), this._getSpec(context), this._getCases(context), this._getSpyOn(context));
    };

    p._runSuiteSpec = function (context, description, func, caseParameters, params, action, caseDescription) {

        var wrapFunc = function (func, args) {
                var strFn = func.toString();
                if (strFn.indexOf('isAsync') !== -1 || strFn.indexOf('runs(') !== -1 || strFn.indexOf('waitsFor(') !== -1) {
                    return function () { /*isAsync*/ return func.apply({ description: description }, args); };
                } else {
                    return function () { return func.apply({ description: description }, args); };
                }
            }, self = this;

        if (caseParameters) {

            context.describe(description, function () {
                for (var i = 0; i < caseParameters.length; i = i + 1) {

                    var ithCaseParameters = [],
                        actionParameters = [],
                        specDescription;

                    ithCaseParameters = (Array.isArray(caseParameters[i])) ? caseParameters[i] : [caseParameters[i]];
                    actionParameters = ithCaseParameters.concat(params);
                    specDescription = (caseDescription) ? self._buildCaseDescription(caseDescription, ithCaseParameters) : self._buildSpecName(i, ithCaseParameters);
                
                    action.call(context, specDescription, wrapFunc(func, actionParameters));
                }
            });
        } else {
            action.call(context, description, wrapFunc(func, params));
        }
    };

    p._buildCaseDescription = function (parameterizeDescription, ithCaseParameters) {

        function getTestValueAsString(stringSelector, ithCaseParameters) {

            var index = /\d+/.exec(stringSelector) ? /\d+/.exec(stringSelector)[0] : null,
                replaceValue = (index) ? ithCaseParameters[index] : ithCaseParameters,
                replaceValueString;

            replaceValueString = (typeof replaceValue === 'object') ? JSON.stringify(replaceValue) : String(replaceValue);

            return replaceValueString;
        }

        function replacer(match) {
            return getTestValueAsString(match, ithCaseParameters);
        }

        return parameterizeDescription.replace(/(\$\$(\d*)?)/g, replacer);
    };

    /* function _buildSpecName and required function are from
     *
     * JasmineParameterize v 1.0
     * A jasmine plugin for running parameterized tests
     * https://github.com/kannokanno/jasmine-parameterize
     * Released under the MIT license.
     *
     * for back compatibility with Sequencer tests
     */
    p._buildSpecName = function (index, params) {
        var str = params.length > 0 ? joinParams(params) : '[]';
        return 'cases[' + index + '] - (' + str + ')';
    };

    function _isSpy(fn) {
        return fn.isSpy === true || (fn.calls !== undefined && fn.and !== undefined);
    }

    function _resetSpy(spy) {
        if (spy.calls !== undefined && typeof spy.calls.reset === 'function') {
            spy.calls.reset();
        } else {
            spy.reset();
        }
    }

    function joinParams(params) {
        var r = [];
        for (var i = 0; i < params.length; i++) {
            r.push(getParamString(params[i]));
        }
        return r.join(', ');
    }

    function isExist(v) {
        return typeof (v) !== 'undefined' && v !== null;
    }

    function getParamString(param) {
        var type = typeof param;
        var typeName = Object.prototype.toString.call(param);
        if (type === 'undefined') {
            return 'undefined';
        } else if (param === null) {
            return 'null';
        } else if (type === 'string') {
            return '"' + param + '"';
        } else if (type === 'number') {
            return param;
        } else if (Array.isArray(param)) {
            // recursive
            return param.length > 0 ? '[' + joinParams(param) + ']' : '[]';
        } else if (type === 'function' && isExist(param.name)) {
            return typeName + param.name;
        } else if (isExist(param.constructor) && isExist(param.constructor.name)) {
            return typeName + param.constructor.name;
        }
        return typeName;
    }
    /* END of functions coming from Jasmine-parameterize*/

    var jasmine_moduleTest = new Jasmine_moduleTest();

    global.m = jasmine_moduleTest._mFunc(global);

})(typeof window === 'undefined' ? this : window);
