define(['widgets/brXtended/common/libs/ImageHandling',
    'widgets/brXtended/common/libs/Test/Jasmine-moduleTest'], 
function (ImageHandling) {

    'use strict';

    return {
        suite: function (specParam) {

            var imageHandling;

            beforeEach(function () {
                imageHandling = new ImageHandling();
            });

            m.describe(true, 'Check if the Initialization of the Module was successfull', function () {
                m.it(specParam.initialization.run, specParam.initialization.description, function () {
                    expect(typeof (imageHandling.setImage) === 'function').toBeTruthy();
                    expect(typeof (imageHandling.createSvgTag) === 'function').toBeTruthy();
                    expect(typeof (imageHandling.createImgTag) === 'function').toBeTruthy();
                    expect(typeof (imageHandling.createImgSvgTags) === 'function').toBeTruthy();
                });
            });

            m.describe(specParam.setImage.run, specParam.setImage.description, function () {

                m.it(specParam.setImage.run, specParam.setImage.png.description, function () {
                    var callback = jasmine.createSpy();
                    return new Promise(function (resolve) {
                        imageHandling.setImage(specParam.setImage.png.image, function () {
                            callback.apply(null, arguments);
                            resolve();
                        });
                    })
                        .then(function () {
                            expect(callback.calls.argsFor(0)[0][0].outerHTML).toBe('<img class="" src="widgets/brXtended/common/libs/Test/ImageHandlingTest/mappView.png">');
                        });
                });

                m.it(specParam.setImage.run, specParam.setImage.svg.description, function () {
                    
                    var callback = jasmine.createSpy();
                    return new Promise(function (resolve) {
                        imageHandling.setImage(specParam.setImage.svg.image, function () {
                            callback.apply(null, arguments);
                            resolve();
                        });
                    })
                        .then(function () {
                            expect(callback.calls.argsFor(0)[0][0].id).toBe('Ebene_1');
                        });
                });

            });

            m.describe(specParam.createImgTag.run, '\u00BBcreateImgTag\u00AB', function () {
                m.it(specParam.createImgTag.run, specParam.createImgTag.description, function () {
                    var imgTag;

                    imgTag = imageHandling.createImgTag();
                    expect(imgTag.hasClass('remove')).toBeTruthy();
                    expect(imgTag[0].outerHTML).toBe('<img class="remove">');
                });
            });

            m.describe(specParam.createSvgTag.run, '\u00BBcreateSvgTag\u00AB', function () {
                m.it(specParam.createSvgTag.run, specParam.createSvgTag.description, function () {
                    var svgTag;

                    svgTag = imageHandling.createSvgTag();
                    expect(svgTag.hasClass('remove')).toBeTruthy();
                    expect(svgTag[0].outerHTML).toBe('<svg class="remove"></svg>');
                });
            });

            m.describe(specParam.createImgSvgTags.run, '\u00BBcreateImgSvgTags\u00AB', function () {
                m.it(specParam.createImgSvgTags.run, specParam.createImgSvgTags.description, function () {
                    var obj;
                            
                    obj = imageHandling.createImgSvgTags();
                    expect(obj.imgEl[0].outerHTML).toBe('<img class="remove">');
                    expect(obj.svgEl[0].outerHTML).toBe('<svg class="remove"></svg>');
                });
            });
        }
    };
});
