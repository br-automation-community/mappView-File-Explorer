'use strict';
define([
    'brTest',
    'widgets/brXtended/common/libs/flux/stores/ImageStore/ImageStore',
    'widgets/brXtended/common/libs/flux/stores/ImageStore/ImageActions',
    'widgets/brXtended/common/libs/flux/stores/ImageStore/ImageTypes',
    'widgets/brXtended/common/libs/wfUtils/UtilsImage',
    'widgets/brXtended/common/libs/flux/mocks/MockedDispatcher',
    'widgets/brXtended/common/libs/flux/mocks/MockedView'
], function ({ enum: { Enum }, TestUtils }, ImageStore, ImageActions, ImageTypes, UtilsImage, MockedDispatcher, MockedView) {

    var initStateNonDefault = {
        imageList: ['bild1.png', 'bild2.jpg', 'img1.svg', 'img2.svg', 'img3.svg'],
        imageIndex: 2,
        pathPrefix: 'projects/UnitTest/img/',
        sizeMode: Enum.SizeMode.FILL,
        backgroundAlignment: 'right bottom',
        type: undefined,
        svgInline: undefined,
        actualImage: '',
        useSVGStyling: true,
        height: '100px',
        width: '200px',
        visible: false
    };

    var defaultStore, nonDefaultStore, imageActions, mockedView, mockedDispatcher;

    describe('widgets.brXtended.common.libs.flux.stores.ImageStore', function () {

        beforeEach(function () {
            mockedDispatcher = new MockedDispatcher();
            mockedView = new MockedView();
            imageActions = new ImageActions(mockedDispatcher);
        });

        afterEach(function () {
            defaultStore = undefined;
            nonDefaultStore = undefined;
            mockedDispatcher = undefined;
            mockedView = undefined;
        });

        describe(' / Actions ', function () {

            describe(' * Default configuration: ', function () {

                beforeEach(async function () {
                    mockedView.reset();
                    defaultStore = new ImageStore(mockedDispatcher);
                    defaultStore.registerView(mockedView);
                    imageActions.initImage();
                    await mockedView.isUpdated();
                });

                describe(' - INIT_IMAGE: ', function () {

                    it(' # getImageType should return INVALID', function () {
                        expect(defaultStore.getImageType()).toEqual(ImageTypes.INVALID);
                    });

                    it(' # getImagePath should return empty string', function () {
                        expect(defaultStore.getImagePath()).toEqual('');
                    });

                    it(' # getSvgInline should return undefined', function () {
                        expect(defaultStore.getSvgInline().html()).toEqual($('<svg xmlns="http://www.w3.org/2000/svg" viewBox="1 1 1 1"></svg>').html());
                    });

                    it(' # getImageSizeMode should return CONTAIN', function () {
                        expect(defaultStore.getImageSizeMode()).toEqual(Enum.SizeMode.CONTAIN);
                    });

                    it(' # getBackgroundAlignment should return ["left","top"]', function () {
                        expect(defaultStore.getBackgroundAlignment()).toEqual(['left', 'top']);
                    });

                    it(' # getHeight should return "auto"', function () {
                        expect(defaultStore.getHeight()).toEqual('auto');
                    });

                    it(' # getWidth should return "auto"', function () {
                        expect(defaultStore.getWidth()).toEqual('auto');
                    });

                    it(' # getVisible should return true', function () {
                        expect(defaultStore.getVisible()).toEqual(true);
                    });

                    it(' # getUseSVGStyling should return true', function () {
                        expect(defaultStore.getUseSVGStyling()).toEqual(true);
                    });

                });

            });

            describe(' * No default configuration: ', function () {

                beforeEach(async function () {
                    mockedView.reset();
                    nonDefaultStore = new ImageStore(mockedDispatcher, initStateNonDefault);
                    nonDefaultStore.registerView(mockedView);
                    imageActions.initImage();
                    await mockedView.isUpdated();
                });

                describe(' - INIT_IMAGE: ', function () {

                    it(' # getImageType should return the value configure on the object: SVG', function () {
                        expect(nonDefaultStore.getImageType()).toEqual(ImageTypes.SVG);
                    });

                    it(' # getImageType should return the type other if useSVGStyling is false: OTHER', async function () {
                        imageActions.setUseSVGStyling(false);

                        await nonDefaultStore.state.promise;

                        expect(nonDefaultStore.getImageType()).toEqual(ImageTypes.OTHER);
                    });

                    it(' # getImagePath should return the full path of the image (path+image name)', function () {
                        expect(nonDefaultStore.getImagePath()).toEqual('projects/UnitTest/img/img1.svg');
                    });

                    it(' # getSvgInline should return the inline SVG provided as input', async function () {
                        var svgInline;
                        
                        await UtilsImage.getInlineSvg('projects/UnitTest/img/img1.svg')
                            .then(function (svgElement) {
                                svgInline = svgElement;
                            });
                        
                        expect(nonDefaultStore.getSvgInline().html()).toEqual(svgInline.html());
                            
                    });

                    it(' # getImageSizeMode should return the value configure on the object: FILL', function () {
                        expect(nonDefaultStore.getImageSizeMode()).toEqual(Enum.SizeMode.FILL);
                    });
                    it(' # getBackgroundAlignment should return the value configure on the object: ["right","bottom"]', function () {
                        expect(nonDefaultStore.getBackgroundAlignment()).toEqual(['right', 'bottom']);
                    });

                    it(' # getHeight should return the value configure on the object: 100px', function () {
                        expect(nonDefaultStore.getHeight()).toEqual('100px');
                    });

                    it(' # getWidth should return the value configure on the object: 100px', function () {
                        expect(nonDefaultStore.getWidth()).toEqual('200px');
                    });

                    it(' # getVisible should return the value configure on the object: false', function () {
                        expect(nonDefaultStore.getVisible()).toEqual(false);
                    });
                });

                describe(' - SET_IMAGE_LIST: ', function () {

                    var setImageList = ['Image1.jpg', 'Image2.jpg', 'Image3.jpg'],
                        invalidInput = 3,
                        actualSelectedIndex = initStateNonDefault.imageIndex,
                        pathPrefix = initStateNonDefault.pathPrefix;

                    beforeEach(function () {
                        mockedView.reset();
                    });

                    it(' # getImageType should return OTHER if a valid array is provided', async function () {
                        imageActions.setImageList(setImageList);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImageType()).toEqual(ImageTypes.OTHER);
                    });

                    it(' # getImageType should return INVALID if a invalid array is provided', async function () {
                        imageActions.setImageList(invalidInput);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImageType()).toEqual(ImageTypes.INVALID);
                    });

                    it(' # getImagePath should return the path to the new image if a valid array is provided', async function () {
                        imageActions.setImageList(setImageList);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImagePath()).toEqual(pathPrefix + setImageList[actualSelectedIndex]);
                    });

                    it(' # getImagePath should return an empty string if an invalid array is provided', async function () {
                        imageActions.setImageList(invalidInput);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImagePath()).toEqual('');
                    });
                });

                describe(' - SET_IMAGE_FROM_INDEX: ', function () {

                    var imageToSet = 'Image1.jpg',
                        invalidImage = 3,
                        actualSelectedIndex = initStateNonDefault.imageIndex,
                        setImageFromIndex = actualSelectedIndex,
                        pathPrefix = initStateNonDefault.pathPrefix;

                    beforeEach(function () {
                        mockedView.reset();
                    });

                    it(' # getImageType should return OTHER if a valid image is provided for the actual index', async function () {
                        imageActions.setImageFromIndex(imageToSet, setImageFromIndex);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImageType()).toEqual(ImageTypes.OTHER);
                    });

                    it(' # getImageType should return INVALID if a non valid image is provided for the actual index', async function () {
                        imageActions.setImageFromIndex(invalidImage, setImageFromIndex);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImageType()).toEqual(ImageTypes.INVALID);
                    });

                    it(' # getImagePath should return the path to the new image if a valid image is provided', async function () {
                        imageActions.setImageFromIndex(imageToSet, setImageFromIndex);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImagePath()).toEqual(pathPrefix + imageToSet);
                    });

                    it(' # getImagePath should return an empty string if a invalid image is provided', async function () {
                        imageActions.setImageFromIndex(invalidImage, setImageFromIndex);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImagePath()).toEqual('');
                    });
                });

                describe(' - SET_IMAGE_INDEX: ', function () {

                    var indexToPNGImage = 0,
                        indexToJPGImage = 1,
                        indexToSVGImage = 4,
                        indexToSVGImage2 = 2,
                        indexOutsideBoundaries = 100,
                        inavlidIndex = 'WrongValue',
                        imageList = initStateNonDefault.imageList,
                        pathPrefix = initStateNonDefault.pathPrefix;

                    beforeEach(function () {
                        mockedView.reset();
                    });

                    it(' # getImageType should return OTHER if the index of the image is a png', async function () {
                        imageActions.setImageIndex(indexToPNGImage);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImageType()).toEqual(ImageTypes.OTHER);
                    });

                    it(' # getImageType should return OTHER if the index of the image is a jpg', async function () {
                        imageActions.setImageIndex(indexToJPGImage);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImageType()).toEqual(ImageTypes.OTHER);
                    });

                    it(' # getImageType should return SVG if the index of the image is a svg', async function () {
                        imageActions.setImageIndex(indexToSVGImage);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImageType()).toEqual(ImageTypes.SVG);
                    });

                    it(' # getImageType should return INVALID if the index of the image outside boundaries', async function () {
                        imageActions.setImageIndex(indexOutsideBoundaries);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImageType()).toEqual(ImageTypes.INVALID);
                    });

                    it(' # getImageType should return INVALID if the index of the image with wrong datatype', async function () {
                        imageActions.setImageIndex(inavlidIndex);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImageType()).toEqual(ImageTypes.INVALID);
                    });

                    it(' # getImagePath should return the path to the new image if a valid index is provided', async function () {
                        imageActions.setImageIndex(indexToPNGImage);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImagePath()).toEqual(pathPrefix + imageList[indexToPNGImage]);
                    });

                    it(' # getImagePath should return an empty string if an invalid index is provided', async function () {
                        imageActions.setImageIndex(inavlidIndex);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImagePath()).toEqual('');
                    });

                    it(' # getImagePath should return an empty string if an index outside bounsaries is provided', async function () {
                        imageActions.setImageIndex(indexOutsideBoundaries);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImagePath()).toEqual('');
                    });

                    it(' # getSvgInline should return the inline SVG provided as input', async function () {
                        var promiseSvgImage, svgInline;
                        
                        promiseSvgImage = UtilsImage.getInlineSvg(pathPrefix + imageList[indexToSVGImage]);
                        await promiseSvgImage;
                        
                        imageActions.setImageIndex(indexToSVGImage);
                            
                        await mockedView.isUpdated();

                        await promiseSvgImage.then(function (svgElement) {
                            svgInline = svgElement;
                        });
                        expect(nonDefaultStore.getSvgInline().html()).toEqual(svgInline.html());
                    });

                    it(' # getImagePath should return the path to the last image if two simultaneous indexs are set for SVG images', async function () {
                        imageActions.setImageIndex(indexToSVGImage2);
                        imageActions.setImageIndex(indexToSVGImage);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImagePath()).toEqual(pathPrefix + imageList[indexToSVGImage]);
                    });

                });

                describe(' - SET_PATH_PREFIX: ', function () {

                    var setPath = 'newPath/test/',
                        invalidPath = 1,
                        actualSelectedIndex = initStateNonDefault.imageIndex,
                        imageList = initStateNonDefault.imageList;

                    beforeEach(function () {
                        spyOn(UtilsImage, 'getInlineSvg').and.returnValue(Promise.resolve({ remove: () => {} }));
                        mockedView.reset();
                    });

                    it(' # getImagePath should return the path to the image with the new path if the path is valid', async function () {
                        imageActions.setPathPrefix(setPath);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImagePath()).toEqual(setPath + imageList[actualSelectedIndex]);
                    });

                    it(' # getImagePath should return the image selected without path if an invalid path is provided', async function () {
                        imageActions.setPathPrefix(invalidPath);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImagePath()).toEqual(imageList[actualSelectedIndex]);
                    });

                });

                describe(' - SET_SIZE_MODE: ', function () {

                    var setSizeModeValue = Enum.SizeMode.CONTAIN;

                    beforeEach(function () {
                        mockedView.reset();
                    });

                    it(' # getImageSizeMode should return the value set on the action', async function () {
                        imageActions.setSizeMode(setSizeModeValue);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getImageSizeMode()).toEqual(setSizeModeValue);
                    });

                });

                describe(' - SET_BACKGROUND_ALIGNMENT: ', function () {

                    var setBackgroundAlignmentValue = 'left top';

                    beforeEach(function () {
                        mockedView.reset();
                    });

                    it(' # getBackgroundAlignment should return the value set on the action', async function () {
                        imageActions.setBackgroundAlignment(setBackgroundAlignmentValue);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getBackgroundAlignment()).toEqual(['left', 'top']);
                    });

                });

                describe(' - SET_WIDTH: ', function () {

                    var setWidthValue = '20px';

                    beforeEach(function () {
                        mockedView.reset();
                    });

                    it(' # getWidth should return the value set on the action', async function () {
                        imageActions.setWidth(setWidthValue);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getWidth()).toEqual(setWidthValue);
                    });
                });

                describe(' - SET_HEIGHT: ', function () {

                    var setHeightValue = '10px';

                    beforeEach(function () {
                        mockedView.reset();
                    });

                    it(' # getHeight should return the value set on the action', async function () {
                        imageActions.setHeight(setHeightValue);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getHeight()).toEqual(setHeightValue);
                    });
                });

                describe(' - SET_VISIBLE: ', function () {

                    var setVisibleValue = true;

                    beforeEach(function () {
                        mockedView.reset();
                    });

                    it(' # getVisible should return the value set on the action', async function () {
                        imageActions.setVisible(setVisibleValue);
                        await mockedView.isUpdated();
                        expect(nonDefaultStore.getVisible()).toEqual(setVisibleValue);
                    });

                });

                describe(' - BUGS: ', function () {

                    var setPath = 'projects/UnitTest/img/',
                        setImageList = ['bild1.png', 'bild2.jpg', 'img1.svg', 'img2.svg', 'img3.svg'],
                        actualSelectedIndex = 0,
                        pathPrefix = initStateNonDefault.pathPrefix;

                    beforeEach(function () {
                        mockedView.reset();
                    });

                    it(' # If we set a svg path and then immediately a png path afterwards the png should load and not the svg', async function () {
                        spyOn(mockedView, 'update').and.callThrough();
                        var processor = spyOn(ImageStore.prototype, '_processImage').and.callThrough();
                        
                        imageActions.setPathPrefix(setPath);
                        
                        await mockedView.isUpdated();

                        mockedView.reset();
                        imageActions.setImageIndex(2);
                            
                        await TestUtils.pollAndWait(function () {
                            return processor.calls.count() > 1;
                        });
                        
                        imageActions.setImageIndex(0);
                        
                        await mockedView.isUpdated();

                        expect(nonDefaultStore.getImagePath()).toEqual(pathPrefix + setImageList[actualSelectedIndex]);
                    });

                });

            });

        });

    });
});
