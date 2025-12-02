'use strict';
define([
    'brTest',
    'widgets/brXtended/common/libs/wfUtils/UtilsImage',
    'widgets/brXtended/common/libs/wfUtils/SVGCache',
    'libs/d3/d3',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'
], function ({ TestUtils }, UtilsImage, SVGCache, d3) {

    return {
        suite: function (specParam) {
                
            m.describe(specParam.getInlineSvg.run, 'getInlineSvg', function () {

                m.it(specParam.getInlineSvg.consoleException.run, ' / When the \u00BBfile is missing\u00AB, there should be no console exception, the broken SVG should be returned',
                    async function () {
                        var fileName = 'testConsoleException.svg',
                            result,
                            promisedError = TestUtils.promisedEvent(window, 'error', { capture: true }),
                            $img = $('<img src="' + fileName + '" />').appendTo(document.body); // provoke a additional 404 error with this, otherwise event listener won't fire on missing file
                        
                        var svgPromise = UtilsImage.getInlineSvg(fileName).then(function (response) {                                
                            result = response;
                        });

                        await Promise.all([svgPromise, promisedError]);
            
                        expect(result[0].outerHTML).toBe(specParam.getInlineSvg.brokenSvg);
                        $img.remove();
                        SVGCache.remove(fileName);
                    });

                m.it(specParam.getInlineSvg.imageMissing.run, ' / When the \u00BBfile is missing\u00AB,the broken svg should be returned', async function () {
                    var result;
                    await UtilsImage.getInlineSvg('testMissingFile.svg').then(function (response) {
                        result = response;
                    });
                    expect(result[0].outerHTML).toBe(specParam.getInlineSvg.brokenSvg);
                    SVGCache.remove('testMissingFile.svg');
                });

                m.it(specParam.getInlineSvg.imageNotMissing.run, ' / When the \u00BBfile is not missing\u00AB, the svg should be returned', async function () {
                    var result;
                    await UtilsImage.getInlineSvg(specParam.getInlineSvg.validSvgPath).then(function (response) {
                        result = response;
                    });
                    expect(result[0].outerHTML).toBe(specParam.getInlineSvg.validSvg);
                    SVGCache.remove(specParam.getInlineSvg.validSvgPath);
                });

                m.it(specParam.getInlineSvg.imageNotMissing.run, ' / when caching is enabled, the svg should be loaded only once', async function () {
                    var result1 = 'init', 
                        result2 = 'init', 
                        result3 = 'init';

                    spyOn(d3, 'xml').and.callThrough();

                    await UtilsImage.getInlineSvg(specParam.getInlineSvg.validSvgPath2, false, undefined, true).then(function (response) {
                        result1 = response.find('title')[0].textContent;
                    });
                    await UtilsImage.getInlineSvg(specParam.getInlineSvg.validSvgPath2, false, undefined, true).then(function (response) {
                        result2 = response.find('title')[0].textContent;
                    });

                    expect(d3.xml.calls.count()).toEqual(1);
                    expect(result1).toEqual('TestSVG2');
                    expect(result2).toEqual('TestSVG2');

                    await UtilsImage.getInlineSvg(specParam.getInlineSvg.validSvgPath2, false, undefined, true).then(function (response) {
                        result3 = response.find('title')[0].textContent;
                    });

                    expect(d3.xml.calls.count()).toEqual(1);
                    expect(result3).toEqual('TestSVG2');
                    SVGCache.remove(specParam.getInlineSvg.validSvgPath2);
                });

                m.it(specParam.getInlineSvg.imageNotMissing.run, ' / when caching=true/avoidBrokenSvg=false/files is missing, loading should be triggered only once', async function () {
                    var result1 = 'init', 
                        result2 = 'init';

                    spyOn(d3, 'xml').and.callThrough();

                    await UtilsImage.getInlineSvg('testMissingFile.svg', false, undefined, true).then(function (response) {
                        result1 = response[0].outerHTML;
                    });
                    await UtilsImage.getInlineSvg('testMissingFile.svg', false, undefined, true).then(function (response) {
                        result2 = response[0].outerHTML;
                    });

                    expect(d3.xml.calls.count()).toEqual(1);
                    expect(result1).toBe(specParam.getInlineSvg.brokenSvg);
                    expect(result2).toBe(specParam.getInlineSvg.brokenSvg);
                    SVGCache.remove('testMissingFile.svg');
                });

                m.it(specParam.getInlineSvg.imageNotMissing.run, ' / when caching=true/avoidBrokenSvg=true/files is missing, loading should be triggered only once', async function () {
                    var result1 = 'init', 
                        result2 = 'init';

                    spyOn(d3, 'xml').and.callThrough();

                    await Promise.allSettled([
                        UtilsImage.getInlineSvg('testMissingFile2.svg', true, undefined, true).then(function (response) {
                            result1 = response[0].outerHTML;
                        }).fail(function () {
                            result1 = 'failed';
                        }),
                        UtilsImage.getInlineSvg('testMissingFile2.svg', true, undefined, true).then(function (response) {
                            result2 = response[0].outerHTML;
                        }).fail(function () {
                            result2 = 'failed';
                        })
                    ]);

                    expect(d3.xml.calls.count()).toEqual(1);
                    expect(result1).toEqual('failed');
                    expect(result2).toEqual('failed');
                    SVGCache.remove('testMissingFile2.svg');
                });
            });
        }
    };
});
