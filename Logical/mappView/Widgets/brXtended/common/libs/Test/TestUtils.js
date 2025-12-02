'use strict';
define(['brease'], function ({ events: { BreaseEvent }, callWidget }) {

    var TestUtils = {};

    //This function can be used to reset the widget properties to its values settled in options
    TestUtils.restoreInitialWidgetConfig = function (widgets, excludedProperties) {
        for (var i = 0; i < widgets.length; i += 1) {
            var keyToLoopThrough = 'options';

            excludedProperties = Array.isArray(excludedProperties) ? excludedProperties : [];
            excludedProperties.push('parentContentId');

            if (widgets[i].id.indexOf('default') !== -1 && widgets[i].hasOwnProperty('defaultValues')) {
                keyToLoopThrough = 'defaultValues';
            }

            for (var key in widgets[i][keyToLoopThrough]) {
                if (excludedProperties.includes(key) || key.startsWith('_')) {
                    continue;
                } else {
                    var methodName = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
                    callWidget(widgets[i].id, methodName, widgets[i][keyToLoopThrough][key]);
                }   
            }
        }
    };

    TestUtils.restoreInitialWidgetConfigDefault = function (widgets, defaultValues) {
        for (var i = 0; i < widgets.length; i += 1) {
            for (var key in defaultValues) {
                var methodName = 'set' + key.charAt(0).toUpperCase() + key.slice(1),
                    setValue = widgets[i]['options'][key] !== undefined ? widgets[i]['options'][key] : defaultValues[key];
                var widget = callWidget(widgets[i].id, 'widget');
                if (typeof widget[methodName] === 'function') {
                    callWidget(widgets[i].id, methodName, setValue);
                }
            }
        }
    };

    // align hash, transparent and rgba color values to browser representation
    TestUtils.alignColorToBrowserRepresentation = function (colorVal) {
        var r, g, b, 
            retVal = colorVal;

        if (colorVal.includes('#')) {

            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            // eslint-disable-next-line no-unused-vars
            colorVal = colorVal.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });

            colorVal = colorVal.replace('#', '');
            var intVal = parseInt(colorVal, 16);
            r = (intVal >> 16) & 255;
            g = (intVal >> 8) & 255;
            b = intVal & 255;
            retVal = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        } else if (colorVal === ('transparent')) {
            retVal = 'rgba(0, 0, 0, 0)';
        } else {
            var rgb = colorVal.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',');
            if (rgb[3] === '1') {
                retVal = 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
            }
        }  
        return retVal;
    };

    // this method is currently kept due to backward compatibility
    TestUtils.getIdsFromWidgets = function (widgets) {
        return this.getIdsFromWidgetConfiguration(widgets);
    };

    // return widgetIds array including all childIds out of widget configuration file
    TestUtils.getIdsFromWidgetConfiguration = function (widgets) {
        var widgetIdsWithChildren = [],
            parser = new DOMParser();

        widgetIdsWithChildren = widgets.map(function (widget) {

            var htmlContent, childrenNodesList,
                widgetIdWithChildrens = [widget.id];

            if (widget.hasOwnProperty('content') ? (!!widget.content.hasOwnProperty('html')) : false) {

                htmlContent = parser.parseFromString(widget.content.html, 'text/html');
                childrenNodesList = htmlContent.querySelectorAll('[data-brease-widget]');

                // build in the Server is not supporting the for ... of loop
                //for (var childNode of childrenNodesList.values()) {
                //    widgetIdWithChildrens.push(childNode.id);
                //}

                for (var i = 0; i < childrenNodesList.length; i += 1) {
                    widgetIdWithChildrens.push(childrenNodesList[i].id);
                }
            }
            return widgetIdWithChildrens;
        });

        widgetIdsWithChildren = _.flattenDeep(widgetIdsWithChildren);

        return widgetIdsWithChildren;
    };

    //https://css-tricks.com/get-value-of-css-rotation-through-javascript/
    // modified so return angle is between 0...360 instead of -180 ..180
    TestUtils.getAngleOfMatrix = function (matrix) {
        var values = matrix.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        var a = values[0];
        var b = values[1];

        //  convert from radians to degrees, round
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        if (angle < 0) {
            angle = 360 + angle;
        }
        return (angle + 'deg');
    };

    TestUtils.getMatrixOfAngle = function (deg) {
        var rad = parseFloat(deg) * (Math.PI / 180),
            cos_theta = Math.cos(rad),
            sin_theta = Math.sin(rad);

        var factor = 1000000,
            a = cos_theta,
            b = sin_theta,
            c = -sin_theta,
            d = cos_theta;

        // round to 6 digits
        a = Math.round(a * factor) / factor;
        b = Math.round(b * factor) / factor;
        c = Math.round(c * factor) / factor;
        d = Math.round(d * factor) / factor;

        return 'matrix(' + a + ', ' + b + ', ' + c + ', ' + d + ', 0, 0)';
    };

    //helper for phantomJS - do not change 
    // Use when 1 .. 4 values are allowed (e.g. border)
    // property: border, padding, marging ... 
    // type : color, width
    TestUtils.handleCollection = function (dom, property, type) {
        var temp = dom.css([
            property + 'Top' + type,
            property + 'Right' + type,
            property + 'Bottom' + type,
            property + 'Left' + type
        ]);

        // all 4 values are the same return only one
        if ((temp[property + 'Top' + type] === temp[property + 'Right' + type]) &&
        (temp[property + 'Bottom' + type] === temp[property + 'Left' + type]) &&
        (temp[property + 'Top' + type] === temp[property + 'Bottom' + type])) {

            return temp[property + 'Top' + type];
        }

        return '' + temp[property + 'Top' + type] + ' ' + temp[property + 'Right' + type] + ' ' + temp[property + 'Bottom' + type] + ' ' + temp[property + 'Left' + type];
    };

    // Use when 1 .. 4 values are allowed (e.g. border)
    TestUtils.widthCollection = function (dom, property) {
        return this.handleCollection(dom, property, 'Width');
    
    };
    
    // Use when 1 .. 4 values are allowed (e.g. border)
    TestUtils.colorCollection = function (dom, property) {
        return this.handleCollection(dom, property, 'Color');
    };

    TestUtils.radiusCollection = function (dom, property) {
        var type = 'Radius';
        var temp = dom.css([
            property + 'Top' + 'Left' + type,
            property + 'Top' + 'Right' + type,
            property + 'Bottom' + 'Right' + type,
            property + 'Bottom' + 'Left' + type
        ]);

        // all 4 values are the same return only one
        if ((temp[property + 'Top' + 'Left' + type] === temp[property + 'Top' + 'Right' + type]) &&
        (temp[property + 'Bottom' + 'Right' + type] === temp[property + 'Bottom' + 'Left' + type]) &&
        (temp[property + 'Top' + 'Left' + type] === temp[property + 'Bottom' + 'Left' + type])) {

            return temp[property + 'Top' + 'Left' + type];
        }

        return '' + temp[property + 'Top' + 'Left' + type] + ' ' + temp[property + 'Top' + 'Right' + type] + ' ' + temp[property + 'Bottom' + 'Right' + type] + ' ' + temp[property + 'Bottom' + 'Left' + type];

    };

    //recalculate Matrix to Array --> 2 Decimal Places
    TestUtils.recalculateMatrix = function (matrix, decimalPlaces = 2) {
        var matches, output = [];
        matches = matrix.match(/([+\-0-9.e]+)/g);
        matches.map(function (item) { return Number(item); });

        for (var i = 0; i < matches.length; i += 1) {
            output[i] = (Math.round(matches[i] * (Math.pow(10, decimalPlaces))) / (Math.pow(10, decimalPlaces))); 
            // normalize zero, as expect(-0).toEqual(0) is false
            if (output[i] === 0) { output[i] = 0; }
        }

        return output;
    };
    
    //calculate from HEX to RGB
    TestUtils.hexToRgb = function (hex) {
        var result, output; 
        
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        output = 'rgb(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ')';

        return output;
    };

    TestUtils.waitForNumPad = function () {
        return new Promise(resolve => {
            if (callWidget('breaseNumPad', 'widget') === null) {
                let readyHandler;
                readyHandler = function (e) {
                    if (e.target.id === 'breaseNumPad') {
                        document.body.removeEventListener(BreaseEvent.WIDGET_READY, readyHandler);
                        resolve();
                    }
                };
                document.body.addEventListener(BreaseEvent.WIDGET_READY, readyHandler);
            } else {
                resolve();
            }
        }).then(function () {
            expect(callWidget('breaseNumPad', 'widget')).not.toBeNull();
        });
    };

    TestUtils.getRootClassObj = function (widgetObj, rootClassName) {
        var prototype = Object.getPrototypeOf(widgetObj);
        return (prototype.constructor.name === rootClassName) ? prototype : this.getRootClassObj(prototype, rootClassName);
    };

    return TestUtils; 
});
