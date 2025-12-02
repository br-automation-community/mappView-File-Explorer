/*  
Description: The aim of the module is to create the required HTML structure of nested widgets for testing with jasmine 
and to instantiate these widgets. Basically the provided functionality will provide a string of widgets, 
containing widgets, containing widgets, etc, in HTML format. The provided functionality will take the widget 
configurations out of the brease.objects.WidgetConfig.content.html and add these configuration to the right 
place in the DOM, so that all the widgets will load like they do normally but intended for testing in jasmine.

Additional: Due to compatibility reasons the "recursive_HTMLParser" module is added to the global scope
*/
define(['widgets/brXtended/common/libs/Test/TestUtils'], function (wfTestUtils) {
        
    'use strict';
    
    var instance = {

        // create a html(jquery) object out of the widget configuration including nested widgets
        _createHtmlForWidget: function (classname, options, content, id, htmlTagName, htmlAttributes) {
            
            var itemEl;

            // check if dedicated html element is already defined as tag name or as html formated string
            htmlTagName = (htmlTagName === undefined) ? 'div' : htmlTagName;

            // look for html elements with pattern e.g. start with "<g" and end with ">", create jquery object and set attributes
            if (htmlTagName.match(/^<[a-z].*>+$/)) {
                itemEl = $(htmlTagName);
            } else {
                itemEl = $('<' + htmlTagName + '/>');
            }
            itemEl.attr('id', id);
            itemEl.attr('data-brease-widget', classname);
            if (options !== undefined) {
                itemEl.attr('data-brease-options', JSON.stringify(options).replace(/"/g, "'"));
            }

            // set additional html attributes if available
            if (htmlAttributes) {
                for (var attrName in htmlAttributes) {
                    itemEl.attr(attrName, htmlAttributes[attrName]);
                }
            }

            // check if nested widget is available in content.html and do a recursive call to create and append the nested html
            if (content !== undefined && content.html !== undefined) {
                itemEl.append(this._generateHtmlContent(content.html));
            }

            return itemEl;
        },

        // parse and collect nested widgets to a html format string
        _generateHtmlContent: function (contentConfiguration) {
            var collection = '';
            for (var index in contentConfiguration) {         
                var item = contentConfiguration[index],
                    itemEl;
                itemEl = this._createHtmlForWidget(item.className, item.options, item.content, item.id, item.htmlTagName, item.HTMLAttributes);
                collection = collection + itemEl.prop('outerHTML');
            }  
            return collection;
        },

        // call the parser for all widgets in the configuration if not done yet
        _parseHtmlFromWidgetConfiguration: function (widgets) {
            for (var i in widgets) {
                if (widgets[i].content !== undefined && widgets[i].content.html !== undefined) {
                    widgets[i].content.html = this.generateHtmlContentString(widgets[i].content.html);
                }
            }
        },

        // public: return a widgetIds array including all nested widget ids out of widget configuration
        getIdsFromWidgetConfiguration: function (widgets) {
            this._parseHtmlFromWidgetConfiguration(widgets);
            return wfTestUtils.getIdsFromWidgetConfiguration(widgets);
        },

        // public: parse and collect the widget configuration including nested widgets to a html format string
        // (may rename function to "getGenerateHtmlContentString")
        generateHtmlContentString: function (contentConfiguration) {
            var retVal;
            if (Array.isArray(contentConfiguration)) {
                retVal = this._generateHtmlContent(contentConfiguration);
            } else {
                retVal = contentConfiguration;
            }
            return retVal;
        }
    };
    
    return instance;
});
