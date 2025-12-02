'use strict';
define([
    'brTest',
    'widgets/brXtended/common/libs/wfUtils/UtilsImage',
    'widgets/brXtended/common/libs/wfUtils/SVGCache'
], function ({ TestUtils, enum: { Enum }, services }, UtilsImage, SVGCache) {

    let widgetName = 'common',
        libPath = 'widgets.brease.',
        subLib = 'libs.wfUtils.UtilsImage';
    
    describe(TestUtils.specPath(widgetName, libPath, subLib), () => {
        describe('#A&P 739575 [Cyber Security] - XSS vulnerability in Image Widget ', () => {
            let brokenSvg = '<svg style="width: 20px; height:23px"><line x1="3.75" y1="-0.069449" x2="0.75" y2="23" stroke="#b2b2b2" stroke-width="1.5"></line><line x1="23" y1="22.25" x2="0" y2="22.25" stroke="#666666" stroke-width="1.5"></line><line x1="22.521265" y1="3.787241" x2="22.521265" y2="16.808505" stroke="#666666" stroke-width="1.5"></line><line x1="19.25" y1="5.202132" x2="19.25" y2="23" stroke="#666666" stroke-width="1.5"></line><rect height="3.339856" width="15.40424" x="2.297881" y="17.436729" stroke="#00bf00" stroke-width="1.5" fill="#00bf00"></rect><rect height="7.914511" width="14.553177" x="2.808519" y="8.01064" stroke="#97c9fc" stroke-width="2.5" fill="#97c9fc"></rect><rect height="3.489358" width="8.51063" x="2.808518" y="2.563837" stroke="#97c9fc" stroke-width="2.5" fill="#97c9fc"></rect><ellipse rx="1.548673" ry="0.309735" cx="5.840707" cy="5.615045" stroke="#ffffff" stroke-width="1.5"></ellipse><ellipse rx="7.743362" ry="2.964602" cx="10.088495" cy="16.676991" stroke="#00bf00" stroke-width="1.5" fill="#00bf00"></ellipse><line x1="21.814158" y1="12.207965" x2="7.743362" y2="25.039822" stroke="#ffffff" stroke-width="3.5"></line><line x1="12.964601" y1="0.349558" x2="19.690264" y2="6.013275" stroke="#666666" stroke-width="1.5"></line><line x1="0" y1="0.615045" x2="13.672565" y2="0.792036" stroke="#b2b2b2" stroke-width="1.5"></line><line x1="12.964601" y1="-0.09292" x2="13.053096" y2="6.89823" stroke="#666666" stroke-width="1.5"></line><line x1="19.867255" y1="6.190266" x2="12.610619" y2="6.278761" stroke="#666666" stroke-width="1.5"></line></svg>';

            describe('#method-getInlineSvg', () => {
                let port = location.port.length > 0 ? ':' + location.port : '';
                let hostname = location.hostname;

                describe('when source has same origin', () => {
                    it('should return valid svg when path is relative', async () => {
                        let src = 'widgets/brXtended/common/libs/wfUtils/Test/UtilsImage/TestSVG.svg';
                        let result = await UtilsImage.getInlineSvg(src);
                        expect(result[0].outerHTML).toContain('<svg xmlns="http://www.w3.org/2000/svg" id="Ebene_1"');
                        SVGCache.remove(src);
                    });
                    it('should return valid svg when path is absolute', async () => {
                        let src = `http://${hostname}${port}/BRVisu/widgets/brXtended/common/libs/wfUtils/Test/UtilsImage/TestSVG.svg`;
                        let result = await UtilsImage.getInlineSvg(src);
                        expect(result[0].outerHTML).toContain('<svg xmlns="http://www.w3.org/2000/svg" id="Ebene_1"');
                        SVGCache.remove(src);
                    });
                });

                let urls = [
                    'https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg',
                    'HTTP://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg',
                    'ftp://example.com/file.svg',
                    '//cdn.example.com/svg.svg',
                    'mailto:test@test.com' // would not even get there if method isStylable used before, just2be safe
                ];

                urls.forEach(src => {
                    describe(`with remote source #param-sourceImage="${src}"`, () => {
                        afterEach(function () {
                            SVGCache.remove(src);
                        });
                        describe(`and #param-avoidBrokenSvg="false"`, () => {
                            it(`should return error svg `, async () => {
                                let result = await UtilsImage.getInlineSvg(src);
                                expect(result[0].outerHTML).toBe(brokenSvg);
                            });
                        });
                        describe(`and #param-avoidBrokenSvg="true"`, () => {
                            it(`should reject promise`, async () => {
                                let promise = UtilsImage.getInlineSvg(src, true);
                                expect(promise.state()).toBe('rejected');
                            });
                        });

                        it(`should write log`, async () => {
                            spyOn(services.logger, 'log');
                            await UtilsImage.getInlineSvg(src);
                            expect(services.logger.log.calls.mostRecent().args[0]).toBe(Enum.EventLoggerId.CROSS_ORIGIN_REQUEST_BLOCKED);
                        });
                    });
                });
            });
        });
    });
});
