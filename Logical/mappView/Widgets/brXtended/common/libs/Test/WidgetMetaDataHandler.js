define(['widgets/brXtended/common/libs/Test/TestUtils', 
    'widgets/brXtended/common/libs/Test/TestEnum',
    'widgets/brXtended/common/libs/Test/jsonpStyleableProperties',
    'widgets/brXtended/common/libs/Test/jsonpMixinAttributes'], function (wfTestUtils, TestEnum,
    styleableProperties,
    mixinAttributes) {

    'use strict';

    // constructor function
    function WidgetMetaDataHandler(pathName) {
        var that = this;
        that._pathName = pathName || '';
        that._widgetData = {};
        that._styleableProperties = styleableProperties || {};
        that._mixinAttributes = mixinAttributes || {};
        that.styleConfig = [];
        that._loadJsonSync(that);
    }

    var p = WidgetMetaDataHandler.prototype;

    // expernal interface
    p.getStyleConfig = function () {
        this._setStyleableProperties();
        return this.styleConfig;
    };

    // load json file sync
    p._loadJsonSync = function () {
        var that = this;
        $.ajax({
            url: that._pathName,
            success: function (json) {
                if (json) {
                    that._widgetData = json; 
                }
            },
            async: false
        });
    };  
    
    // set styleable properties
    p._setStyleableProperties = function () {
        var widgetStyleablePropertiesCollection = this._widgetData.styleproperties.StyleProperty;
        for (var key in widgetStyleablePropertiesCollection) {
            if (widgetStyleablePropertiesCollection.hasOwnProperty(key)) {
                var styleablePropertiesEntry = widgetStyleablePropertiesCollection[key];
                if (styleablePropertiesEntry.$.not_styleable !== 'true') {
                    let styleablePropertyItem = this._createStyleablePropertyItem(styleablePropertiesEntry); 
                    this.styleConfig[styleablePropertyItem.name] = styleablePropertyItem; 
                }
            }
        }
    };

    // set up styleablePropertyItem and parse mixins as well as styleAttributes
    p._createStyleablePropertyItem = function (styleablePropertiesEntry) {
        // set up default currentStyleablePropertyItem
        var styleablePropertiesArray = this._styleableProperties['styleableProperties'],
            mixinAttributesArray = this._mixinAttributes['mixinAttributes'],
            currentStyleablePropertyItem = {
                run: true,
                name: styleablePropertiesEntry.$.name,
                type: styleablePropertiesEntry.$.type,
                attribute: styleablePropertiesEntry.StyleElement[0].$.attribute,
                selector: this._parseSelector(styleablePropertiesEntry.StyleElement),
                valueDefaultWidget: this._getParsedAttributeValue(styleablePropertiesEntry.$.default)
            };

        // set mixin attribute in currentStyleablePropertyItem - if there is one
        if (currentStyleablePropertyItem.attribute.match(/@include|\$index/)) {
            var mixinAttributeDetected = false;
            for (var index = 0; index < mixinAttributesArray.length; index += 1) {
                var mixinAttribute = mixinAttributesArray[index];
                if (currentStyleablePropertyItem.attribute === mixinAttribute.attributeInclude) {
                    currentStyleablePropertyItem.attributeInclude = mixinAttribute.attributeInclude;
                    currentStyleablePropertyItem.attribute = mixinAttribute.attribute; 
                    mixinAttributeDetected = true;         
                    break;
                }
            }
            if (!mixinAttributeDetected) {
                console.error('mixin: ' + currentStyleablePropertyItem.name + ' in mixin-jsonp-file not found!');       
            }
        }
        
        // set up additional pre-defined values for currentStyleablePropertyItem, and consider mixin attribute for currentStyleablePropertyItem - if used
        var styleablePropertyDetected = false;
        for (var i = 0; i < styleablePropertiesArray.length; i += 1) {
            var element = styleablePropertiesArray[i];
            if (currentStyleablePropertyItem.name === element.name && currentStyleablePropertyItem.type === element.type && !currentStyleablePropertyItem.attributeInclude) {
                currentStyleablePropertyItem.valueStyledWidget = (element['valueStyledWidget'] === 'defaultValue') ? this._getParsedAttributeValue(styleablePropertiesEntry.$.default) : this._getParsedAttributeValue(element['valueStyledWidget']);
                currentStyleablePropertyItem.valueThemeWidget = (element['valueThemeWidget'] === 'defaultValue') ? this._getParsedAttributeValue(styleablePropertiesEntry.$.default) : this._getParsedAttributeValue(element['valueThemeWidget']);
                currentStyleablePropertyItem.valueGradientWidget = (element['valueGradientWidget'] === 'defaultValue') ? this._getParsedAttributeValue(styleablePropertiesEntry.$.default) : this._getParsedAttributeValue(element['valueGradientWidget']);
                styleablePropertyDetected = true;
                break;
            } else if (currentStyleablePropertyItem.name === element.name && currentStyleablePropertyItem.type === element.type && currentStyleablePropertyItem.attributeInclude) {
                currentStyleablePropertyItem.valueDefaultWidget = this._parseMixinValue(currentStyleablePropertyItem.attributeInclude, currentStyleablePropertyItem.valueDefaultWidget);
                currentStyleablePropertyItem.valueStyledWidget = (element['valueStyledWidget'] === 'defaultValue') ? this._parseMixinValue(currentStyleablePropertyItem.attributeInclude, styleablePropertiesEntry.$.default) : this._parseMixinValue(currentStyleablePropertyItem.attributeInclude, element['valueStyledWidget']);
                currentStyleablePropertyItem.valueThemeWidget = (element['valueThemeWidget'] === 'defaultValue') ? this._parseMixinValue(currentStyleablePropertyItem.attributeInclude, styleablePropertiesEntry.$.default) : this._parseMixinValue(currentStyleablePropertyItem.attributeInclude, element['valueThemeWidget']);
                currentStyleablePropertyItem.valueGradientWidget = (element['valueGradientWidget'] === 'defaultValue') ? this._parseMixinValue(currentStyleablePropertyItem.attributeInclude, styleablePropertiesEntry.$.default) : this._parseMixinValue(currentStyleablePropertyItem.attributeInclude, element['valueGradientWidget']);
                styleablePropertyDetected = true;
                break;
            }
        }
        if (!styleablePropertyDetected) {
            console.error('styleableProperty: \u00BB' + currentStyleablePropertyItem.name + '\u00AB with type \u00BB' + currentStyleablePropertyItem.type + '\u00AB in styleableProperties-jsonp-file not found!');       
        }
        return currentStyleablePropertyItem;    
    };

    // sum up multiple selectors to one selector
    p._parseSelector = function (selectorArray) {
        var selector = '';

        if (selectorArray[0].$.selector) {
            selectorArray.forEach(function (element) {
                var selectorParsed = element.$.selector.includes('&') ? element.$.selector.replace('&', '') : ' ' + element.$.selector;
                selectorParsed = selectorParsed.includes('$index') ? selectorParsed.replace('.', '[class*=').replace('$index', ']:last') : selectorParsed;
                selector = (selector === '') ? selectorParsed : selector + ', thisId' + selectorParsed;
            });       
        }
        return selector;
    };

    // parse configuration attribute if necessary due to browser representation
    p._getParsedAttributeValue = function (value) {
        var retVal = '' + value,
            key = '',
            _isColor,
            _isColorCollection;

        // check if color !== rgb
        _isColor = /(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)|(^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$)|(transparent)/;
        key = _isColor.test(retVal) ? 'color' : key;

        // check if gradient color
        key = retVal.includes('gradient') || retVal.includes('Gradient') ? 'gradient' : key;

        // check if text-shadow
        key = retVal.match(/(?:px.*){2}(?:px\srgb)|(?:px.*){2}(?:px\srgba)|(?:px.*){2}(?:px\s#)/) ? 'textShadow' : key;

        // check if box-shadow
        key = retVal.match(/(?:px.*){3}(?:px\srgb)|(?:px.*){3}(?:px\srgba)|(?:px.*){3}(?:px\s#)/) ? 'shadow' : key;

        // check if color collection !== rgb
        _isColorCollection = /(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)|(^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$)/;
        var colorArray = retVal.split(' ');
        key = _isColorCollection.test(colorArray[0]) && _isColorCollection.test(colorArray[1]) && _isColorCollection.test(colorArray[2]) && _isColorCollection.test(colorArray[3]) ? 'colorCollection' : key;

        // check if px is added to pixel value
        key = retVal.match(/0\s\d+px$/) ? 'pxValueNotDefined' : key;

        var styleValues = {
            'color': function () {
                return wfTestUtils.alignColorToBrowserRepresentation(value);
            },
            'gradient': function () {
                var retVal = '',
                    valueArray;
                value = value.replace(value.substring(value.indexOf('(') + 1, value.indexOf(',') + 1), '');
                valueArray = value.split(/[\s,]+/);
                valueArray.forEach(function (entry, index) {  
                    if (entry.includes('#')) {
                        entry = wfTestUtils.alignColorToBrowserRepresentation(entry);
                    }
                    retVal = (retVal === '') ? entry : retVal + ' ' + entry;
                });
                return retVal.replace('( ', '(').replace('%', '%,');
            },
            'textShadow': function () {
                var newValueArray = [],
                    newValueArrayLength = 4,
                    valueArray = value.replace(/px\s/g, 'px_').split('_');

                for (var index = 0; index < newValueArrayLength; index += 1) {
                    if (index === 0) {
                        newValueArray[index] = wfTestUtils.alignColorToBrowserRepresentation(valueArray[valueArray.length - 1]);
                    } else {
                        newValueArray[index] = valueArray[index - 1];
                    }
                }
                return newValueArray.join(' ');
            },
            'shadow': function () {
                var newValueArray = [],
                    newValueArrayLength = 5,
                    valueArray = value.replace(/px\s/g, 'px_').split('_');

                for (var index = 0; index < newValueArrayLength; index += 1) {
                    if (index === 0) {
                        newValueArray[index] = wfTestUtils.alignColorToBrowserRepresentation(valueArray[valueArray.length - 1]);
                    } else {
                        newValueArray[index] = valueArray[index - 1];
                    } 
                }
                return newValueArray.join(' ');
            },
            'colorCollection': function () {
                var retVal = '',
                    valueArray;
                value = value.replace(value.substring(value.indexOf('(') + 1, value.indexOf(',') + 1), '');
                valueArray = value.split(' ');
                valueArray.forEach(function (entry, index) {  
                    if (entry.includes('#')) {
                        entry = wfTestUtils.alignColorToBrowserRepresentation(entry);
                    }
                    retVal = (retVal === '') ? entry : retVal + ' ' + entry;
                });
                return retVal;
            },
            'pxValueNotDefined': function () {
                return value.replace(' ', 'px ');
            },
            'default': function () {
                return value;
            }
        };
        return (styleValues[key] || styleValues['default'])();
    };

    // returns css value of mixin attribute
    p._parseMixinValue = function (mixinName, value) {
        var that = this;
        var mixinValues = {
            '@include elemWidth($value)': function () {
                var _hasUnit = /^\d+$/;
                return ((_hasUnit.test(value)) ? value : Math.round(parseFloat(value, 10)) + 'px');
            },
            '@include elemHeight($value)': function () {
                var _hasUnit = /^\d+$/;
                return ((_hasUnit.test(value)) ? value : Math.round(parseFloat(value, 10)) + 'px');
            },
            '@include elemTop($value)': function () {
                return value + 'px';
            },
            '@include elemLeft($value)': function () {
                return value + 'px';
            },
            '@include box-shadow($value)': function () {
                return p._getParsedAttributeValue(value);
            },
            '@include font-weight-bold($value)': function () {
                return ((value === 'true') ? TestEnum.FontWeight.BOLD : TestEnum.FontWeight.NORMAL);
            },
            '@include font-style-italic($value)': function () {
                return (value === 'true' ? 'italic' : 'normal');
            },
            '@include text-alignment($value)': function () {
                return value;
            },
            '@include importantBackColor($value)': function () {
                return wfTestUtils.alignColorToBrowserRepresentation(value);
            },
            '@include importantTextColor($value)': function () {
                return wfTestUtils.alignColorToBrowserRepresentation(value);
            },
            '@include rotate($value)': function () {
                return wfTestUtils.getMatrixOfAngle(parseInt(value, 10));
            },
            '@include SVGFactorBorder($value, 2)': function () {
                return (parseInt(value, 10) * 2) + 'px';
            },
            "@include backGroundImage('../$value')": function () {
                // default value provided by the browser if value === ''
                var retVal = 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box';
                return ((value !== 'none' && value !== '../none' && value !== '' && value !== '../' && value !== 'initial') ? "url('" + value + "')" : retVal);
            },
            '@include elemFlexBasis($value)': function () {
                var _hasUnit = /^\d+$/;
                return ((_hasUnit.test(value)) ? value : Math.round(parseFloat(value, 10)) + 'px');
            },
            '@include writing-mode($value)': function () {
                var retVal = value;
                if (value === 'vertical') {
                    retVal = 'vertical-rl';
                } else if (value === 'horizontal') { 
                    retVal = 'horizontal-tb';
                }
                return retVal;
            },
            "@include text-alignment-all('$value')": function () {
                return value;
            },
            '@include text-decoration-underline($value)': function () {
                return (value === 'true' ? 'underline' : '');
            },
            '@include active-background-color($value)': function () {
                return value;
            },
            '@include importantGradient($value)': function () {
                // default value provided by the browser if value === ''
                var retVal = 'none';
                return ((value !== 'none' && value !== 'initial' && value !== '') ? that._getParsedAttributeValue(value) : retVal);
            },
            '@include backgroundOpacity($value)': function () {
                return 'rgba(255, 255, 255, ' + value + ')';
            },
            "@include pureBackgroundImage('../$value')": function () {
                // default value provided by the browser if value === ''
                var retVal = 'none';//'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box'
                return ((value !== 'none' && value !== '../none' && value !== '' && value !== '../' && value !== 'initial') ? "url('" + value + "')" : retVal);
            },
            '@include border-radius($value)': function () {
                return value; 
            },
            'fill: nth(($value),$index)': function () {
                var retVal = value.replace(/(,\s)([a-z]|#)/g, '$1_$2').split(', _');
                return wfTestUtils.alignColorToBrowserRepresentation(retVal[retVal.length - 1]); 
            },
            '@include importantBoldText($value)': function () {
                return ((value === 'true') ? TestEnum.FontWeight.BOLD : TestEnum.FontWeight.NORMAL);
            },
            '@include importantItalicText($value)': function () {
                return (value === 'true' ? 'italic' : 'normal');
            },
            "@include text-position('$value')": function () {
                if (value === 'center center') {
                    return { 'text-align': 'center', 'vertical-align': 'middle' };
                } else if (value === 'right bottom') {
                    return { 'text-align': 'right', 'vertical-align': 'bottom' };
                } else {
                    return value;
                }
            },
            "@include backGroundGradient('$value')": function () {
                // default value provided by the browser if value === ''
                var retVal = 'none';
                return ((value !== 'none' && value !== 'initial' && value !== '') ? that._getParsedAttributeValue(value) : retVal);
            },

            "@include borderImageGradient('$value')": function () {
                // default value provided by the browser if value === ''
                var retVal = 'none';
                return ((value !== 'none' && value !== 'initial' && value !== '') ? that._getParsedAttributeValue(value) : retVal);
            },
            'default': function () {
                return value;
            }
        };
        return (mixinValues[mixinName] || mixinValues['default'])();
    };

    return WidgetMetaDataHandler;
});
