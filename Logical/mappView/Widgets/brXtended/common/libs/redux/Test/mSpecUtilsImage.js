define(['widgets/brXtended/common/libs/redux/utils/UtilsImage'],
    function (UtilsImage) {

        'use strict';

        return {
            suite: function (specParam) {
                m.describe(specParam.createImageList.run, '#method-createImageList', function () {
        
                    m.it(specParam.createImageList.listWithImages.run, 'Test that the method can create an image list when images are specified', function () {
                        var result = UtilsImage.createImageList(specParam.createImageList.listWithImages.dp);
    
                        expect(result).toEqual(specParam.createImageList.listWithImages.expect.dp);
                    });
                    m.it(specParam.createImageList.listWithoutImages.run, 'Test that the method can create an image list when there are no images specified', function () {
                        var result = UtilsImage.createImageList(specParam.createImageList.listWithoutImages.dp);
    
                        expect(result).toEqual(specParam.createImageList.listWithoutImages.expect.dp);
                    });
                    m.it(specParam.createImageList.listWithMixOfImages.run, 'Test that the method can create an image list when there is a mix of images specified and not', function () {
                        var result = UtilsImage.createImageList(specParam.createImageList.listWithMixOfImages.dp);
    
                        expect(result).toEqual(specParam.createImageList.listWithMixOfImages.expect.dp);
                    });
                    m.it(specParam.createImageList.undefined.run, 'Test that the method can handle undefined input', function () {
                        var result = UtilsImage.createImageList(specParam.createImageList.undefined.dp);
    
                        expect(result).toEqual(specParam.createImageList.undefined.expect.dp);
                    });
                });

                m.describe(specParam.createImageElements.run, '#method-createImageElements', function () {
        
                    m.it(specParam.createImageElements.undefinedList.run, 'Test that the method can return an empty object if the imageList is undefined', function () {
                        var result = UtilsImage.createImageElements(
                            specParam.createImageElements.undefinedList.il,
                            specParam.createImageElements.undefinedList.ip
                        );
    
                        expect(result).toEqual(specParam.createImageElements.undefinedList.expect.dp);
                    });
                    m.it(specParam.createImageElements.default.run, 'Test that the method can create a correct image object if both the imagePath and the imageList are present', function () {
                        var result = UtilsImage.createImageElements(
                            specParam.createImageElements.default.il,
                            specParam.createImageElements.default.ip
                        );
    
                        expect(result).toEqual(specParam.createImageElements.default.expect.dp);
                    });
                    m.it(specParam.createImageElements.undefinedPath.run, 'Test that the method creates an image object with undefined imagePaths if the imagePath parameter is undefined', function () {
                        var result = UtilsImage.createImageElements(
                            specParam.createImageElements.undefinedPath.il,
                            specParam.createImageElements.undefinedPath.ip
                        );
    
                        expect(result).toEqual(specParam.createImageElements.undefinedPath.expect.dp);
                    });
                });
            }

        };
    });
